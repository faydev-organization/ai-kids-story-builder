"use client";
import React, { useState } from "react";

const BuyCredits = () => {
  const options = [
    {
      id: 1,
      price: 9.999,
      credits: 10,
    },
    {
      id: 2,
      price: 14.999,
      credits: 25,
    },
    {
      id: 3,
      price: 24.999,
      credits: 75,
    },
    {
      id: 4, // Changed from 1 to 4 for uniqueness
      price: 39.999,
      credits: 150,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<number>();

  return (
    <div className="min-h-screen text-center p-10 md:px-20 lg:px-40">
      <h2 className="text-4xl font-bold text-primary">Add More Credits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {options.map((option, index) => (
          <div
            key={option.id}
            className={`p-6 my-3 border bg-primary text-center rounded-lg text-white cursor-pointer hover:scale-105 transition-all ${
              selectedOption == option.id && "bg-black"
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <h2 className="">
              {option.credits} Credits = {option.credits} Story
            </h2>
            <h2 className="font-bold text-2xl">Rp. {option.price}</h2>

            <button className="">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredits;
