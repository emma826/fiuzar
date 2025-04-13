"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Send } from "lucide-react"
import { Suspense, useContext } from "react"
import { SkeletonPageSingle } from "@/layout/skeleton-page"
import { toast } from "sonner"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { nameContext } from "@/app/app/page"

export default function NameRepurpose() {
    const router = useRouter()
    const { recent, fetchRecent } = useContext(nameContext)
    const [url, setURL] = useState(false)
    const [project, setProject] = useState("")

    function create_projects() {
        fetchRecent(false)
        let contentType

        if (url === true) {
            contentType = "url"
        } else {
            contentType = "text"
        }

        fetch("/api/app/create-project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contentType: contentType,
                content: project,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to process project")
                }
                return response.json()
            })
            .then(data => {
                if (data.success) {
                    toast(<div className="text-green-700">Project created successfully!</div>)
                    router.push(`/project/${data.id}`)
                } else {
                    toast(<div className="text-red-700">{data.message}</div>)
                }
            })
            .catch(error => {
                toast(<div className="text-red-700">Error: {error.message}</div>)
                console.error("Error:", error)
            })
    }

    return (
        <Suspense fallback={<SkeletonPageSingle />}>
            <div className="max-w-[700px] w-full mx-auto">
                <div className="rounded-2xl border border-gray-200 bg-white py-2 px-5 dark:border-gray-800 dark:bg-white/[0.03] md:px-6">
                    {url ? (
                        <Input
                            className={`shadow-none focus-visible:border-none border-none py-4 outline-none resize-none focus:outline-none focus:border-none mb-3`}
                            type="text"
                            placeholder="Paste your content URL here"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                        />
                    ) : (
                        <Textarea
                            className={`shadow-none focus-visible:border-none border-none py-4 outline-none resize-none focus:outline-none focus:border-none mb-3 max-h-80`}
                            placeholder="Type in your content here"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                        />
                    )}

                    <div className="border-t border-gray-300 py-2 flex gap-2 justify-between">
                        <div className="flex gap-2">
                            <Button onClick={() => {
                                setURL(false)
                                setProject("")
                            }} className="rounded-2xl py-2.5 px-3 hover:bg-gray-300 cursor-pointer text-gray-900 bg-gray-200 border border-gray-200">Text</Button>
                        </div>
                        <Button onClick={() => create_projects()} className="cursor-pointer p-3 hover:bg-green-700 bg-green-800 rounded-lg">
                            <Send className="text-white w-7 h-7" />
                        </Button>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}