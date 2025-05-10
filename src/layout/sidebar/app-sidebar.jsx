'use client'

import Image from "next/image";

import { useUIContext } from "@/context/ui-context";
import { X, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signOut } from "next-auth/react";

export function SideBar({ children }) {
    const { isMobile } = useUIContext();

    return (
        <div className={`relative ${isMobile ? "" : "flex"}`}>
            {children}
        </div>
    );
}

export function NavSidebar({ menu }) {
    const { isOpen, setIsOpen, isMobile } = useUIContext();

    return (
        <aside className={`${isMobile && isOpen ? "block": "hidden lg:block"} ${!isOpen && !isMobile ? "lg:max-w-12" : "lg:max-w-96"} ${isMobile ? "fixed" : "lg:static"} border-r z-50 w-full h-screen overflow-hidden ${isOpen ? 'bg-black/40' : 'bg-white'}`}>
            <div className="bg-muted h-full max-w-96 py-2 flex justify-between">
                <div className="border-r relative">
                    <div className="px-2 w-12 grid gap-3">
                        <Image className="w-12 rounded-full border bg-green-500" src={`/img/logo-2.png`} alt="fiuzar logo" width={400} height={400} />

                        {menu.map((menuItem, index) => (
                            <Link href={menuItem.url} key={index} className="w-full text-center">
                                <menuItem.icon className="px-auto w-full block text-sm" />
                            </Link>
                        ))}

                    </div>

                    <div className={`absolute px-2 ${isMobile ? 'bottom-15' : 'bottom-1'}`}>
                        <Button onClick={signOut} className="text-center bg-white">
                            <LogOut className="px-auto w-full block text-sm text-red-500" />
                        </Button>
                    </div>
                </div>
                <div className={`flex-auto px-2 ${isOpen && !isMobile ? "block" : "lg:hidden"}`}>
                    <div className="mb-2" onClick={() => setIsOpen(!isOpen)}>
                        <div className="float-end lg:hidden block">
                            <X />
                        </div>
                        <h2 className="font-bold text-xl">History</h2>
                    </div>

                    <div className="pb-3 border-b">
                        <Input className={`py-2`} placeholder="Search projects" />
                    </div>
                    emma
                </div>
            </div>
        </aside>
    );
}