"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const MenuList = [
    { name: "Home", link: "/" },
    { name: "Create Story", link: "/create-story" },
    { name: "Explore Stories", link: "/explore" },
    // { name: "Contact Us", link: "/contact" },
  ];

  const [isMenuOpen, setMenuIsOpen] = useState(false);

  return (
    <div>
      <Navbar maxWidth="full" onMenuOpenChange={setMenuIsOpen}>
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          />
          <NavbarBrand className="gap-3">
            <Image src={"/logo.svg"} alt={"Logo"} width={40} height={40} />
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => router.push("/")}
            >
              <h2 className="font-bold text-2xl text-primary ml-3u">
                FAY.AI Kids Story
              </h2>
            </div>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center" className="hidden md:flex">
          {MenuList.map((item, index) => (
            <NavbarItem
              key={index}
              className="text-xl text-primary font-medium hover:underline mx-2"
            >
              <Link href={item.link}>{item.name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <Link href={"/dashboard"}>
            <Button color="primary">
              {isSignedIn ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
          <UserButton />
        </NavbarContent>
        <NavbarMenu>
          {MenuList.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link href={item.link}>{item.name}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Header;
