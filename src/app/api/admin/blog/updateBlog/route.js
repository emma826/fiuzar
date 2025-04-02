import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request) {
    const { title, metaDescription, body, date, author, category, blogId } = await request.json();
    const updatedDate = new Date(date).getTime();

    try {
        const queryText = `UPDATE blogs SET title = $1, meta_description = $2, body = $3, date = $4, author = $5, category = $6, status = $7 WHERE id = $8`;
        const values = [title, metaDescription, JSON.stringify(body), updatedDate, author, category, "published", parseInt(blogId)];

        await query(queryText, values);

        return NextResponse.json({ success: true, message: "Blog updated successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Server error, please try again" }, { status: 500 });
    }
}