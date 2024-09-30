import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex justify-center items-center">
        <Image
          src="/login.png"
          alt="login"
          width={700} // Original width
          height={1000} // Original height
          className="max-w-full h-auto" // Make image responsive
        />
      </div>
      <div className="flex justify-center items-center h-full order-first md:order-last">
        <SignUp />
      </div>
    </div>
  );
}
