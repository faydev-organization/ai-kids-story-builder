import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import Header from "./_components/Header";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Header />
      <NextUIProvider>{children}</NextUIProvider>)
    </ClerkProvider>
  );
}

export default Provider;
