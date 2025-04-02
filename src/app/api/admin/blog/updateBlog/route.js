import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function POST(request) {
    const { title, metaDescription, body, date, author, category, blogId } = await request.json()
    let updatedDate = new Date(date).getTime()

    try {
        const [result] = await pool.query("UPDATE blog SET title = ?, meta_description = ?, body = ?, date = ?, author = ?, category = ?, status = ? WHERE id = ?", [title, metaDescription, JSON.stringify(body), updatedDate, author, category, "published", parseInt(blogId)])
        return NextResponse.json({success: true, message: "Blog updated successfully"}, {status: 200})
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Server error, please try again" }, { status: 500 })
    }

}