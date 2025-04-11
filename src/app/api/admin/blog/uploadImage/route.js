import { NextResponse } from "next/server";
import https from "https";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        if (!image || !image.name) {
            return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
        }

        // Create a buffer from the image
        const imageBuffer = Buffer.from(await image.arrayBuffer());

        // Prepare the FormData to forward to the PHP server
        const phpFormData = new FormData();
        phpFormData.append("file", new File([imageBuffer], image.name));
        phpFormData.append("category", "media");

        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const phpResponse = await fetch(`${process.env.STORAGE_SERVER}`, {
            method: "POST",
            body: phpFormData,
            headers: {
                "Accept": "application/json"
            },
            agent,
        });

        if (!phpResponse.ok) {
            const errorText = await phpResponse.text();
            throw new Error(`Failed to upload image to PHP server: ${errorText}`);
        }

        const phpResponseData = await phpResponse.json();
        if (!phpResponseData.success) {
            throw new Error(phpResponseData.message);
        }

        // Assuming PHP returns a unique image name for storage
        const uniqueImageName = phpResponseData.fileName;

        // Construct the image URL
        const imageUrl = `${process.env.STORAGE_SERVER}/media/${uniqueImageName}`;
        
        // Respond with success and image URL
        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            url: imageUrl,
        }, { status: 200 });

    } catch (error) {
        console.error("Error uploading file:", error.message || error);
        return NextResponse.json(
            { success: false, message: error.message || "An error occurred while uploading the file" },
            { status: 500 }
        );
    }
}
