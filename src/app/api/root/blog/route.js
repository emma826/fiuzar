import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const startId = searchParams.get("startId");

        if (startId) {
            const queryText = "SELECT * FROM blogs WHERE id <= $1 ORDER BY id DESC LIMIT 12";
            const { rows: blogs } = await query(queryText, [startId]);
            return NextResponse.json({ success: true, blogs });
        } else {
            const queryText = "SELECT * FROM blogs ORDER BY id DESC LIMIT 15";
            const { rows: blogs } = await query(queryText);

            const nextStartId = blogs.length > 0 ? blogs[blogs.length - 1].id : null;

            console.log(blogs)

            return NextResponse.json({ success: true, blogs, nextStartId });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Database error" }, { status: 500 });
    }
}