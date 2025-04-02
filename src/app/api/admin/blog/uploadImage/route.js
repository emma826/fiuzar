import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { pool } from "@/lib/db";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        if (!image || !image.name) {
            return NextResponse.json({ success: false, message: "No image provided" });
        }

        const imageExtension = path.extname(image.name);
        const uniqueImageName = `${uuidv4()}${imageExtension}`;

        const uploadDir = path.join(process.cwd(), "/public/uploads/media/image");
        const imagePath = path.join(uploadDir, uniqueImageName);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const buffer = Buffer.from(await image.arrayBuffer());
        fs.writeFileSync(imagePath, buffer);

        const [result] = await pool.query("INSERT INTO media (media_file, media_type, date) VALUES (?, ?, ?)", [uniqueImageName, "image", new Date().getTime()])

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
