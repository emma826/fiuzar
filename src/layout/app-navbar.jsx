"use client"

import { useUIContext } from "@/context/ui-context";
import { User, Menu } from "lucide-react";

export default function AppNavbar() {

    const { isOpen, setIsOpen, isMobile } = useUIContext()

    return (
        <>
            <div className="sticky top-0 flex justify-between shrink-0 items-center gap-2 bg-background px-2 py-1 border-b">
                <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer w-10 h-10 rounded-md hover:bg-gray-100 px-2 py-2" />
                <div className="flex-auto flex justify-end px-1">
                    {/* <div className="flex-auto">
                    </div> */}
                    <div className="cursor-pointer hover:bg-gray-200 rounded-lg">
                        <User className="cursor-pointer w-10 h-10 rounded-md hover:bg-gray-100 px-2 py-2" />
                    </div>
                </div>
            </div>
        </>
    )
}