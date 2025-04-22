import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { CheckSession } from '@/lib/session';
import { scrape_data } from '@/components/server-actions/scraper'; // Updated import
import { repurposeContent } from '@/components/server-actions/repurposer';

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
            SELECT id, project_name, created_at, platformType 
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
    const { success, user } = await CheckSession();
    let projectData, platform;

    if (!contentType || !content) {
        return NextResponse.json({ success: false, message: "Error, please paste in your content" }, { status: 200 });
    }

    if (!success) {
        return NextResponse.json({ success: false, message: "Session lost, please login to fix issue" }, { status: 200 });
    }
    
    const user_id = user.id;

    if (contentType === "url") {
        let { success, contentData, contentprofile, message } = await scrape_data(content);

        if (success) {
            projectData = contentData;
            platform = contentprofile.websiteName;
        } else {
            return NextResponse.json({ success: false, message });
        }
    } else {
        projectData = content;
        platform = "custom"; // Default platform for non-URL content
    }

    // Repurpose content using the imported function
    const repurposedData = await repurposeContent(projectData);
    const project_title = repurposedData.title || "Untitled Project"

    try {
        const createProjectQueryText = `
            INSERT INTO projects (
                user_id, 
                project_name, 
                project_data, 
                platformType, 
                x, 
                linkedin, 
                facebook, 
                youtube, 
                tiktok, 
                instagram
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING id
        `;
        const { rows } = await query(createProjectQueryText, [
            user_id, 
            project_title, 
            projectData, 
            "blog", 
            repurposedData.platforms.x, 
            repurposedData.platforms.linkedin, 
            repurposedData.platforms.facebook, 
            repurposedData.platforms.youtube, 
            repurposedData.platforms.tiktok, 
            repurposedData.platforms.instagram
        ]);
        const project_id = rows[0].id;

        return NextResponse.json({ success: true, message: "Project Created successfully", project_id }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server error, please try again later" });
    }
}