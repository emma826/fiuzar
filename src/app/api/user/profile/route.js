import { CheckSession } from "@/lib/session";
import { query } from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET() {
    const { success, user } = await CheckSession()

    if (!success) {
        return NextResponse.json({ success: false, message: "Session lost please try again later" })
    }

    const user_id = user.id

    try {

        const userQueryText = "SELECT name, email FROM users WHERE id = $1";
        const { rows } = await query(userQueryText, [user_id])
        const userDetails = rows[0]

        if(!userDetails) {
            return NextResponse.json({success: false, message: "No user found with this id"})
        }

        return NextResponse.json({success: true, userDetails})

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error, please try again later" })
    }
}