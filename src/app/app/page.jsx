import AppNavbar from "@/layout/app-navbar"
import { Textarea } from "@/components/ui/textarea"

import { Send } from "lucide-react"

export const metadata = {
    title: "App | Fiuzar"
}

export default function AppPage() {
    return (
        <>
            <div className="w-full mx-auto overflow-y-hidden">
                <AppNavbar />

                <div className="container mx-auto py-1 min-h-[70vh] flex flex-col justify-center gap-6">

                    <h1 className="text-green-800 font-bold text-center text-4xl lg:text-6xl py-3">Welcome To Fiuzar</h1>

                    <div className="max-w-[700px] w-full mx-auto">
                        <div className="rounded-2xl border border-gray-200 bg-white py-2 px-5 dark:border-gray-800 dark:bg-white/[0.03] md:px-6">
                            <Textarea className={`border-none py-4 outline-none resize-none focus:outline-none focus:border-none mb-3 max-h-80`} placeholder="Type in your content"/>

                            <div className="border-t border-gray-300 py-2 flex gap-2 justify-between">
                                <div></div>
                                <div className="cursor-pointer hover:bg-green-700 bg-green-800 rounded-lg">
                                    <Send className="m-2 text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}