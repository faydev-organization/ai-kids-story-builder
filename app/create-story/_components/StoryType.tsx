"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface OptionField {
  label: string;
  imageUrl: string;
  isFree: boolean;
}

const StoryType = ({ userSelection }: any) => {
  const OptionList = [
    {
      label: "Story Book",
      imageUrl: "/story.png",
      isFree: true,
    },
    {
      label: "Bed Story",
      imageUrl: "/bedstory.png",
      isFree: true,
    },
    {
      label: "Educational",
      imageUrl: "/educational.png",
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<String>();

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);

    userSelection({
      FieldValue: item.label,
      fieldName: "storyType",
    });
  };

  return (
    <div>
      <label className="font-bold text-4xl text-primary">2. Story Type</label>
      <div
        className="grid grid-cols-3 gap-5 mt-3
      "
      >
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 
                ${
                  selectedOption == item.label
                    ? "grayscale-0 rounded-3xl border-2 border-primary"
                    : "grayscale"
                }`}
            onClick={() => onUserSelect(item)}
          >
            <h2 className="absolute bottom-5 text-white text-2xl text-center w-full">
              {item.label}
            </h2>
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={300}
              height={500}
              className="object-cover h-[260px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryType;
