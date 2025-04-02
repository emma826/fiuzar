import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const blogId = searchParams.get("id");

    if (!blogId) {
        return NextResponse.json(
            { success: false, message: "Blog ID is required" },
            { status: 400 }
        );
    }

    try {
        const blogs = await query("SELECT * FROM blogs WHERE id = $1", [blogId]);

        if (blogs.length === 0) {
            return NextResponse.json(
                { success: false, message: "No blog found with the given ID" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, blogs });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error, Please try again later" },
            { status: 500 }
        );
    }
}