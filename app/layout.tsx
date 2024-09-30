import type { Metadata } from "next";

import "./globals.css";
import Provider from "./provider";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const MyappFont = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FAY.AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={MyappFont.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
