import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

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
    const imageExtension = path.extname(image.name);
    const uniqueImageName = `${uuidv4()}${imageExtension}`;
    const imagePath = path.join(process.cwd(), "/public/uploads/featured_img", uniqueImageName);

    try {
        const buffer = Buffer.from(await image.arrayBuffer());
        fs.writeFileSync(imagePath, buffer);

        const queryText = "INSERT INTO blogs (title, image, url) VALUES ($1, $2, $3) RETURNING id";
        const values = [title, uniqueImageName, url];
        const { rows } = await query(queryText, values);
        const blogId = rows[0].id;

        return NextResponse.json({ success: true, message: "Submitted successfully", blogId }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
    }
}