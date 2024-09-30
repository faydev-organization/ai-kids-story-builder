"use client";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const ViewStory = ({ params }: any) => {
  const [story, setStory] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    getStory();
  }, []);

  const getStory = async () => {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.storyId, params.id));

    setStory(result[0]);
  };

  const handleNextPage = () => {
    if (currentPage < story?.output?.story?.chapters?.length - 1) {
      bookRef.current.pageFlip().flipNext();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      bookRef.current.pageFlip().flipPrev();
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="p-10 md:px-20 lg:px-40 flex-col">
      <h2 className="font-bold text-4xl text-center p-10 bg-primary text-white">
        {story?.output?.story?.title}
      </h2>
      <div className="flex justify-center relative">
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          className="mt-10"
          useMouseEvents={false}
          ref={bookRef}
        >
          <div>
            <BookCoverPage imageUrl={story?.coverImage} />
          </div>
          {story?.output?.story?.chapters?.map(
            (chapter: any, index: number) => (
              <div key={index} className="bg-white p-10 border">
                <StoryPages storyChapter={chapter} />
              </div>
            )
          )}
        </HTMLFlipBook>
        {currentPage > 0 && (
          <div
            className="absolute -left-7 top-[250px]"
            onClick={handlePrevPage}
          >
            <IoIosArrowDropleftCircle className="text-[50px] cursor-pointer text-primary" />
          </div>
        )}
        {currentPage < story?.output?.story?.chapters?.length - 2 && (
          <div
            className="absolute -right-7 top-[250px]"
            onClick={handleNextPage}
          >
            <IoIosArrowDroprightCircle className="text-[50px] cursor-pointer text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStory;
