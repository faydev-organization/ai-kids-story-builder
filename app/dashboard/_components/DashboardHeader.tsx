"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const DashboardHeader = () => {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="p-5 md:p-7 bg-primary text-white flex justify-between items-center">
      <h2 className="font-bold text-2xl md:text-3xl">My Stories</h2>
      <div className="flex gap-2 md:gap-3 items-center">
        <Image src="/coin.webp" alt="Coin" width={40} height={40} />
        <span className="text-xl md:text-2xl">
          {userDetail?.credit} Credit Left
        </span>
        {/* Uncomment if you want to include the button */}
        {/* <Link href={"/buy-credits"}>
          <Button className="" color="secondary">
            Buy More Credits
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
