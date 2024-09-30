import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols1 md:grid-cols-2 h-full">
      <div>
        <Image
          src={"/login.png"}
          alt="login"
          width={700}
          height={1000}
          className="w-full"
        />
      </div>
      <div className="flex justify-center items-center h-screen order-first md:order-last">
        <SignUp />
      </div>
    </div>
  );
}
