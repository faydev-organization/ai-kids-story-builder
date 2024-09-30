"use client";
import React, { use, useContext } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { chatSession } from "@/config/GeminiAi";
import { StoryData, Users } from "@/config/schema";
import { db } from "@/config/db";
import { v4 as uuidv4 } from "uuid";
import { s } from "framer-motion/client";
import CustomLoader from "./_components/CustomLoader";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMT;
export interface fieldData {
  FieldValue: string;
  fieldName: string;
}

export interface formDataType {
  storySubject: string;
  storyType: string;
  ageGroup: string;
  imageStyle: string;
}

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  /**
   * used to add data to form
   * @param data
   */
  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.FieldValue,
    }));
    // console.log(formData);
  };

  const GenerateStory = async () => {
    if (userDetail.credit <= 0) {
      notifyError("You dont have enough credits!");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = CREATE_STORY_PROMPT?.replace(
      "{ageGroup}",
      formData?.ageGroup ?? ""
    )
      .replace("{storyType}", formData?.storyType ?? "")
      .replace("{storySubject}", formData?.storySubject ?? "")
      .replace("{imageStyle}", formData?.imageStyle ?? "");
    //Generate Ai Story
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response.text());
      const imageResp = await axios.post("/api/generate-image", {
        prompt:
          "Add text with title:" +
          story?.story.title +
          "in bold text for book cover," +
          story?.story?.cover?.image_prompt,
      });

      const AiImageUrl = imageResp?.data?.imageUrl;

      const imageResult = await axios.post("/api/save-image", {
        url: AiImageUrl,
      });

      const FireBaseStorageImageUrl = imageResult.data?.imageUrl;
      // console.log(imageResult.data?.imageUrl);

      const resp = await SaveInDb(
        result?.response.text(),
        FireBaseStorageImageUrl
      );
      if (resp && resp.length > 0) {
        notify("Story Generated");
        await UpdateUserCredits();
        router.push(`/view-story/${resp[0].storyId}`);
      } else {
        notifyError("Server error, try again later.");
      }
      setLoading(false);
    } catch (error: any) {
      // console.error(
      //   "Error in GenerateStory:",
      //   error.response?.data || error.message
      // );

      setLoading(false);
    }

    //GenerateImage
  };

  const SaveInDb = async (output: string, imageUrl: string) => {
    const recordId = uuidv4();
    setLoading(true);
    try {
      const result = await db
        .insert(StoryData)
        .values({
          storyId: recordId,
          storySubject: formData?.storySubject,
          storyType: formData?.storyType,
          ageGroup: formData?.ageGroup,
          imageStyle: formData?.imageStyle,
          output: JSON.parse(output),
          coverImage: imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          userName: user?.fullName,
        })
        .returning({ storyId: StoryData?.storyId });
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  const UpdateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credit: Number(userDetail?.credit - 1),
      })
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
      .returning({ id: Users.id });
  };

  return (
    <div className="p-10 md:px-28 lg:px-40">
      <h2 className="font-extrabold text-[70px] text-primary text-center">
        CREATE YOUR STORY
      </h2>
      <p className="text-2xl text-primary text-center">
        Unlock your creativity with AI-Kids: Craft stories like never before!
        Let out AI bring your imagination to life, one story at a time
      </p>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
        {/* Story Subject */}
        <StorySubjectInput userSelection={onHandleUserSelection} />
        {/* Story Type */}
        <StoryType userSelection={onHandleUserSelection} />
        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection} />
        {/* Image Style */}
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>

      <div className="flex justify-end my-10 flex-col items-end">
        <Button
          disabled={loading}
          color="primary"
          className="p-10 text-2xl"
          onClick={GenerateStory}
        >
          Generate Story
        </Button>
        <span>1 Credit will user</span>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
};

export default page;
