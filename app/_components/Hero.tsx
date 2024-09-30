import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative px-10 md:px-28 lg:px-44 mt-10 min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center z-10 relative">
          <h2 className="text-[70px] text-primary font-extrabold py-10">
            Craft Magical Stories for Kids in Minutes
          </h2>
          <p className="text-2xl text-primary font-light">
            Create fun and personalised stories that bring your child's
            adventures to life and spark their passion for reading. It only
            takes a few seconds!
          </p>
          <Link href="/create-story">
            <Button
              size="lg"
              color="primary"
              className="mt-5 font-bold text-2xl p-8"
            >
              Create Story
            </Button>
          </Link>
        </div>

        {/* Image Container */}
        <div className="hidden md:block">
          <Image
            src="/hero.png"
            alt="hero"
            width={700}
            height={500}
            className="w-full h-auto" // Ensure it's behind the content
          />
        </div>
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden relative mt-10">
        <Image
          src="/hero.png"
          alt="hero"
          layout="responsive"
          width={700}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
