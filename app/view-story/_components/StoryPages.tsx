import { s } from "framer-motion/client";
import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";

const StoryPages = ({ storyChapter }: any) => {
  const PlaySpeech = (text: string) => {
    const synth = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary flex justify-between">
        {storyChapter?.title}{" "}
        <span
          className="text-3xl cursor-pointer"
          onClick={() => PlaySpeech(storyChapter?.description)}
        >
          <MdPlayCircleFilled />
        </span>
      </h2>
      <p className="text-xl p-10 mt-3 rounded-lg bg-slate-100">
        {storyChapter?.description}
      </p>
    </div>
  );
};

export default StoryPages;
