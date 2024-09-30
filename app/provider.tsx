"use client";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Header from "./_components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDetailContext } from "./_context/UserDetailContext";
import { Users } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        await saveNewUserIfNotExist();
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  const saveNewUserIfNotExist = async () => {
    const userResp = await db
      .select()
      .from(Users)
      .where(
        eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? "")
      );

    // console.log("ExistingUser", userResp);
    if (!userResp[0]) {
      const result = await db
        .insert(Users)
        .values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          userName: user?.fullName,
        })
        .returning({
          userEmail: Users.userEmail,
          userName: Users.userName,
          userImage: Users.userImage,
          credit: Users.credit,
        });
      // console.log("New User", result[0]);
      setUserDetail(result[0]);
    } else {
      setUserDetail(userResp[0]);
    }
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <NextUIProvider>
        <Header />
        {children}
        <ToastContainer />
      </NextUIProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
