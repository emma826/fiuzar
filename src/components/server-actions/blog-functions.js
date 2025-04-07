import { query } from "@/lib/db";

export async function IndexBlogFunction() {
    try {
        const queryText = "SELECT * FROM blogs ORDER BY id DESC LIMIT 3";
        const { rows: blogs } = await query(queryText);
        return { success: true, blogs }
    } catch (error) {
        return { success: false, message: "Database error" };
    }
}

export async function BlogData(url) {

    try {

        const queryText = "SELECT * FROM blogs WHERE url = $1";
        const {rows: blogs} = await query(queryText, [url])

        if (blogs.length === 0) {
            return { success: false, message: "No blog found for this url" }
        }

        return { success: true, blogs: blogs[0] }

    } catch (error) {
        console.log(error)
        return { success: false, message: "failed to get blog" }
    }
}