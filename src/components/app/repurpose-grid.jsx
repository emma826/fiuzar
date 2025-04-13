import { Suspense, useEffect, useState, useContext } from "react"
import { SkeletonPageGrid } from "@/layout/skeleton-page"
import { nameContext } from "@/app/app/page"

export function IndexRepurposeGrid() {
    const { recent, fetchRecent } = useContext(nameContext)
    const [recentProjects, setRecentProjects] = useState([])

    useEffect(() => {
        async function loadRecent() {
            if(!recent) {
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
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {/* Render recent projects */}
                    </div>
                </Suspense>
            </>
        )
    }
}