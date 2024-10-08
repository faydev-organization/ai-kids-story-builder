import { storage } from "@/config/firebashConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { url } = data;

    // Validate URL
    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    // Convert the image
    const base64Image = "data:image/png;base64," + (await convertImage(url));
    if (!base64Image) {
      return NextResponse.json(
        { message: "Failed to convert image" },
        { status: 500 }
      );
    }

    const fieldName = "/ai-story/" + Date.now() + ".png";
    const imageRef = ref(storage, fieldName);

    // Upload the image
    await uploadString(imageRef, base64Image, "data_url");
    console.log("File Uploaded");

    // Get download URL
    const downloaderUrl = await getDownloadURL(imageRef);

    return NextResponse.json({ imageUrl: downloaderUrl });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Convert image function (not exported)
const convertImage = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");
    return base64Image;
  } catch (error) {
    throw new Error("Failed to convert image"); // Rethrow error to be caught in the main handler
  }
};
