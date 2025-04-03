import { NextResponse } from "next/server";
import { query } from "@/lib/db";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";
import fetch from "node-fetch";

export async function GET() {
    try {
        const queryText = "SELECT * FROM blogs ORDER BY id DESC";
        const { rows: blogs } = await query(queryText);
        return NextResponse.json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
    }
}

export async function POST(request) {
    const formData = await request.formData();
    const title = formData.get("title").trim();
    const image = formData.get("image");

    if (!title || !image.name) {
        return NextResponse.json({ success: false, message: "Empty fields please fill in the blank spaces" });
    }

    const url = title.toLowerCase().replace(/\s+/g, "-");

    try {
        // Send the file to the PHP server
        const phpServerUrl = "https://your-php-server.com/upload.php";
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const phpFormData = new FormData();
        phpFormData.append("file", new Blob([imageBuffer]), image.name);

        const phpResponse = await fetch(phpServerUrl, {
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

        const queryText = "INSERT INTO blogs (title, image, url) VALUES ($1, $2, $3) RETURNING id";
        const values = [title, uniqueImageName, url];
        const { rows } = await query(queryText, values);
        const blogId = rows[0].id;

        return NextResponse.json({ success: true, message: "Submitted successfully", blogId }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
    }
}