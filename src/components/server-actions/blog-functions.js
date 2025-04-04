import { query } from "@/lib/db";

export async function IndexBlogFunction() {
    try {
        const queryText = "SELECT * FROM blogs ORDER BY id DESC LIMIT 3";
        const { rows: blogs } = await query(queryText);
        return { success: true, blogs }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Database error" };
    }
}