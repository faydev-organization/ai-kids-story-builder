"use client";
import { db } from "@/config/db";
import { desc, eq } from "drizzle-orm";
import { StoryData } from "@/config/schema";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import UserItemCard from "./StoryItemCard";
import CustomLoader from "@/app/create-story/_components/CustomLoader";

export type StoryItemType = {
  id: number;
  storyId: string;
  storySubject: string;
  storyType: string;
  ageGroup: string;
  imageStyle: string;
  output: [] | string;
  coverImage: string;
  userEmail: string;
  userName: string;
  userImage: string;
};

const UserStoryList = () => {
  const { user } = useUser();
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    user && getUserStory();
  }, [user]);

  const getUserStory = async () => {
    setloading(true);
    const result: any = await db
      .select()
      .from(StoryData)
      .where(
        eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress ?? "")
      )
      .orderBy(desc(StoryData.id));
    // console.log(result);

    setStoryList(result);
    setloading(false);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
        {storyList &&
          storyList.map((item: StoryItemType, index: number) => (
            <div>
              <UserItemCard story={item} />
            </div>
          ))}
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
};

export default UserStoryList;
