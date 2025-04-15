import { CheckSession } from "@/lib/session";
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const { success, user } = await CheckSession();

    if (!success) {
        return NextResponse.json({ success: false, message: "Session lost please try again later" });
    }

    const user_id = user.id;

    try {
        const userQueryText = "SELECT name, email, profile_image FROM users WHERE id = $1";
        const { rows } = await query(userQueryText, [user_id]);
        const userDetails = rows[0];

        if (!userDetails) {
            return NextResponse.json({ success: false, message: "No user found with this id" });
        }

        console.log(userDetails)

        return NextResponse.json({ success: true, userDetails });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Server error, please try again later" });
    }
}

export async function POST(request) {
    const { success, user } = await CheckSession();

    if (!success) {
        return NextResponse.json({ success: false, message: "Session lost, please try again later" });
    }

    const user_id = user.id;

    try {
        const contentType = request.headers.get("Content-Type");

        let userData;
        if (contentType === "application/json") {
            userData = await request.json();
        } else if (contentType === "multipart/form-data") {
            const formData = await request.formData();
            userData = Object.fromEntries(formData.entries());
        } else {
            return NextResponse.json({ success: false, message: "Unsupported Content-Type" });
        }

        const { name, email, profileImage } = userData;

        // Update the database with the new user details
        let updateQueryText;
        let queryParams;

        if (profileImage) {
            updateQueryText = `
                UPDATE users
                SET name = $1, email = $2, profile_image = $3
                WHERE id = $4
            `;
            queryParams = [name, email, profileImage, user_id];
        } else {
            updateQueryText = `
                UPDATE users
                SET name = $1, email = $2
                WHERE id = $3
            `;
            queryParams = [name, email, user_id];
        }

        await query(updateQueryText, queryParams);

        return NextResponse.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ success: false, message: "Server error, please try again later" });
    }
}