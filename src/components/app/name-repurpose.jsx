"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { SendHorizontal, SearchIcon } from "lucide-react"
import { Suspense, useContext } from "react"
import { SkeletonPageSingle } from "@/layout/skeleton-page"
import { toast } from "sonner"
import DocumentEditor from "./document-editor"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { nameContext } from "@/app/app/page"

export default function NameRepurpose() {
    const router = useRouter()
    const { recent, fetchRecent } = useContext(nameContext)
    const [url, setURL] = useState("")
    const [shouldScrape, setShouldScrape] = useState(true)
    const [h1, setH1] = useState("")
    const [article, setArticle] = useState("")

    async function scrapeUrl() {
        if (!url || !shouldScrape) {
            return
        }

        setShouldScrape(false)

        try {

            const response = await fetch("/api/app/create-project/scrapeBlog", {
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url }),
                method: "POST"
            })
            
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to scrape data")
            }

            setURL("")
            setH1(data.h1 || "")
            setArticle(data.article || "")
            setShouldScrape(true)

        } catch (error) {
            setShouldScrape(true)
            toast(<div className="text-red-700">{error.message}</div>) // Use error.message
        }

    }

    function create_projects() {
        fetchRecent(false)

        fetch("/api/app/create-project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: h1,
                content: article,
                type: "blog",
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
                    router.push(`/app/project/${data.project_id}`)
                } else {
                    toast(<div className="text-red-700">{data.message}</div>)
                }
            })
            .catch(error => {
                toast(<div className="text-red-700">Error: {error.message}</div>) // Use error.message
                console.error("Error:", error)
            })
    }

    return (
        <Suspense fallback={<SkeletonPageSingle />}>

            <div className="px-4 md:px-10 flex justify-center gap-4 sticky top-0">
                <div className="rounded-sm border max-w-[500px] w-full border-gray-200 bg-white flex justify-between dark:border-gray-800 overflow-hidden dark:bg-white/[0.03]">
                    <Input type="text" value={url} onChange={(e) => setURL(e.target.value)} style={{ outline: "none", border: "none" }} placeholder="Paste blog url ..." className="border-none py-6 flex-auto rounded-none focus:ring-0" />
                    <SearchIcon onClick={() => scrapeUrl()} className="block w-10 mt-3 cursor-pointer align-middle text-gray-500" />
                </div>

                <div onClick={() => create_projects()} className="cursor-pointer flex gap-2 font-semibold py-3 text-white align-center px-3 hover:bg-green-700 bg-green-800 rounded-lg">
                    Repurpose
                    <span className="text-white">
                        <SendHorizontal />
                    </span>
                </div>
            </div>

            <DocumentEditor h1={h1} setH1={setH1} article={article} setArticle={setArticle} />
        </Suspense>
    )
}