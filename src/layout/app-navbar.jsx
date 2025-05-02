"use client"

import { User, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useState } from "react"

export default function AppNavbar() {

    // const [search, setSearch] = useState("")

    return (
        <>
            <div className="sticky top-0 flex justify-between shrink-0 items-center gap-2 bg-background p-2 mb-3">
                <SidebarTrigger className="-ml-1 cursor-pointer" />
                <div className="flex-auto flex justify-between px-1">
                    <div className="flex-auto">

                        {/* <div className="mx-auto rounded-sm border max-w-[500px] w-full border-gray-200 bg-white flex justify-between dark:border-gray-800 overflow-hidden dark:bg-white/[0.03]">
                            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} style={{ outline: "none", border: "none" }} placeholder="Search ..." className="border-none py-5 flex-auto rounded-none focus:ring-0" />
                            <SearchIcon className="block w-10 mt-2 cursor-pointer align-middle text-gray-500" />
                        </div> */}

                    </div>
                    <div className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </>
    )
}