import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { query } from "@/lib/db";

async function saveImageMetadataToDB(uniqueImageName) {
    const queryText = "INSERT INTO media (media_file, media_type, date) VALUES ($1, $2, $3)";
    const values = [uniqueImageName, "image", new Date().getTime()];
    const [result] = await query(queryText, values);
    return result;
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        if (!image || !image.name) {
            return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
        }

        // Send the file to the PHP server
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const phpFormData = new FormData();
        phpFormData.append("file", new Blob([imageBuffer]), image.name);
        phpFormData.append("category", "media");

        const phpResponse = await fetch(process.env.STORAGE_SERVER, {
            method: "POST",
            body: phpFormData,
        });

        if (!phpResponse.ok) {
            throw new Error("Failed to upload image to PHP server");
        }

        const phpResponseData = await phpResponse.json();
        if (!phpResponseData.success) {
            throw new Error(phpResponseData.message);
        }

        const uniqueImageName = phpResponseData.fileName;

        
        const queryText = "INSERT INTO media (media_file, media_type, date) VALUES ($1, $2, $3)";
        const values = [uniqueImageName, "image", new Date().getTime()];
        await query(queryText, values);

        const imageUrl = `/uploads/media/image/${uniqueImageName}`;
        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            url: imageUrl,
        }, { status: 200 });

    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ success: false, message: "An error occurred while uploading the file" }, { status: 500 });
    }
}
