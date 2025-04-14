import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { CheckSession } from '@/lib/session';
import * as cheerio from "cheerio"

export async function GET(request) {
    const { success, user } = await CheckSession()

    if (!success) {
        return NextResponse.json({ success: false, message: "Session lost, please login to fix issue" }, { status: 200 })
    }
    
    const user_id = user.id

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 8;
    const index = parseInt(searchParams.get("index")) || 0;

    try {
        const fetchProjectsQuery = `
            SELECT id, project_name, created_at 
            FROM projects 
            WHERE user_id = $1
            ORDER BY id DESC 
            LIMIT $2 OFFSET $3
        `;
        const { rows } = await query(fetchProjectsQuery, [user_id, limit, index]);
        const nextIndex = rows.length < limit ? null : index + limit;

        return NextResponse.json({
            success: true,
            message: "Projects fetched successfully",
            recent_projects: rows,
            next_index: nextIndex,
            notice: nextIndex === null ? "No more projects to fetch" : undefined,
        });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server error, please try again later" });
    }

}

export async function POST(req) {
    const { contentType, content } = await req.json();
    const { success, user } = await CheckSession()
    let projectData;

    if (!contentType || !content) {
        return NextResponse.json({ success: false, message: "Error, please paste in your content" }, { status: 200 })
    }

    if (!success) {
        return NextResponse.json({ success: false, message: "Session lost, please login to fix issue" }, { status: 200 })
    }
    
    const user_id = user.id

    if (contentType == "url") {
        let { success, contentData } = await scrape_data(content)

        if (success) {
            projectData = contentData
        }
        else {
            return NextResponse.json({ success: false, message })
        }
    }
    else {
        projectData = content
    }

    try{

        const createProjectQueryText = "INSERT INTO projects (user_id, project_name, project_data) VALUES ($1, $2, $3) RETURNING id"
        const {rows} = await query(createProjectQueryText, [user_id, "Untitled Project", projectData])
        const project_id = rows[0].id

        return NextResponse.json({ success: true, message: "Project Created successfully", project_id }, { status: 200 })

    }
    catch (err) {
        return NextResponse.json({success: false, message: "Server error, please try again later"})
    }

}

async function scrape_data(content) {
    const supportedWebsites = ["x", "facebook", "instagram", "linkedin", "youtube"];
    try {
        // Extract hostname from the URL
        const url = new URL(content);
        let hostname = url.hostname;

        // Remove common prefixes like www.
        hostname = hostname.replace(/^www\./, "");

        // Extract the website name (e.g., "facebook" from "facebook.com")
        const websiteName = hostname.split(".")[0];

        // Check if the website is supported
        if (!supportedWebsites.includes(websiteName)) {
            return { success: false, message: `Unsupported website: ${websiteName}` };
        }

        // Fetch the HTML content of the URL
        const response = await fetch(content);
        if (!response.ok) {
            return { success: false, message: "Failed to fetch the URL content" };
        }
        const html = await response.text();

        // Use Cheerio to parse the HTML and extract meaningful data
        const $ = cheerio.load(html);
        const title = $("title").text() || "No title found";
        const description = $('meta[name="description"]').attr("content") || "No description found";
        const contentData = $("body").text() || "No body content found";

        // Return the scraped data
        return {
            success: true,
            contentData,
            contentprofile: {
                websiteName,
                title,
                description,
            },
        };
    } catch (error) {
        return { success: false, message: "Invalid URL provided or scraping failed" };
    }
}