import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { query } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "/public/uploads/media/image");

async function saveImageToDisk(image, uniqueImageName) {
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const imagePath = path.join(UPLOAD_DIR, uniqueImageName);
    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(imagePath, buffer);

    return imagePath;
}

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

        const imageExtension = path.extname(image.name);
        const uniqueImageName = `${uuidv4()}${imageExtension}`;

        await saveImageToDisk(image, uniqueImageName);
        await saveImageMetadataToDB(uniqueImageName);

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
