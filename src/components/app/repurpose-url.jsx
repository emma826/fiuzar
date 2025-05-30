'use client'

import { useState } from "react"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { SendHorizonal } from "lucide-react"
import { toast } from "sonner"

import { useRouter } from "next/navigation"

export default function RepurposeUrl() {
    const [url, setUrl] = useState("")
    const [isDisabled, SetIsDisabled] = useState(false)
    const router = useRouter()

    async function scrapeUrl() {
        if (!url) {
            toast(<div className="text-red-700">Please enter a URL.</div>);
            return;
        }

        // if (isDisabled == false) {
            SetIsDisabled(true)

            try {
                const response = await fetch("/api/app/create-project/scrapeBlog", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ url })
                });

                const data = await response.json();

                if(data.success){
                    router.push(`/project/${data.id}`)
                }
                else {
                    throw new Error(data.error)
                }
            } catch (error) {
                toast(<div className="text-red-700">{error}</div>);
                SetIsDisabled(false)
            }
        // }
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03]">
            <Input type={`text`} value={url} placeholder="Enter the blog url" className={`py-6 border-none outline-none mb-2 focus-visible:border-none shadow-none`} onChange={(e) => setUrl(e.target.value)} />
            <Separator />
            <div className="flex justify-end mt-2">
                <span className="bg-green-800 rounded-lg cursor-pointer" onClick={scrapeUrl}>
                    <SendHorizonal className="m-2 text-white" size={24} />
                </span>
            </div>
        </div>
    )
}