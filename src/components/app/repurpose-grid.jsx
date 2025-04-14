import { Suspense, useEffect, useState, useContext } from "react"
import { SkeletonPageGrid } from "@/layout/skeleton-page"
import { nameContext } from "@/app/app/page"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

export function IndexRepurposeGrid() {
    const { recent, fetchRecent } = useContext(nameContext)
    const [recentProjects, setRecentProjects] = useState([])

    useEffect(() => {
        async function loadRecent() {
            if (!recent) {
                return
            }

            const response = await fetch(`/api/app/create-project?limit=4`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    setRecentProjects(data.recent_projects)
                }
            } else {
                console.error('Failed to fetch recent projects')
            }
        }

        loadRecent()
    }, [recent])

    if (recentProjects.length > 0) {
        return (
            <>
                <h2 className="text-2xl text-center mt-10 font-bold">Recent Projects</h2>
                <Suspense fallback={<SkeletonPageGrid />}>
                    <div className="grid md:grid-cols-2 gap-4 max-w-[750px] w-full mx-auto">
                        {recentProjects.map((project) => (
                            <Card key={project.id}>
                                <CardHeader>
                                    <CardTitle className={`mb-3`}>
                                        <Link href={`/app/project/${project.id}`}>
                                            {project.project_name}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription>
                                        Created on: {new Date(project.created_at).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </Suspense>
            </>
        )
    }
}