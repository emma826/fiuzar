"use server"

import { query } from "@/lib/db";
import AppNavbar from "@/layout/app-navbar";

async function fetchProjectData(projectId) {
    try {
        const queryText = "SELECT * FROM projects WHERE id = $1";
        const { rows } = await query(queryText, [projectId]);
        const project = rows[0];

        if (project) {
            return { success: true, project };
        }
    } catch (err) {
        return { success: false, message: "Couldn't fetch projects, try again later" };
    }

    return { success: false, message: "Project not found" };
}

export async function generateMetadata({ params }) {
    const { "project-id": projectId } = await params;
    const { success, project } = await fetchProjectData(projectId);

    if (success) {
        return {
            title: project.project_name,
            description: `Details about project ${projectId}`,
        };
    }

    return {
        title: `Project ${projectId}`,
        description: `Details about project ${projectId}`,
    };
}

export default async function ProjectIdPage({ params }) {
    const { "project-id": projectId } = await params;
    const { success, project } = await fetchProjectData(projectId);

    if (!success) {
        return <>Error, please try again later</>;
    }

    return (
        <>
            <div className="w-full mx-auto overflow-y-hidden">
                <AppNavbar />
                <div className="container mx-auto py-1 min-h-[70vh] flex flex-col justify-center gap-6">
                    
                </div>
            </div>
        </>
    );
}