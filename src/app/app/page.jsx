"use client"

import AppNavbar from "@/layout/app-navbar"
import NameRepurpose from "@/components/app/name-repurpose"
import { IndexRepurposeGrid } from "@/components/app/repurpose-grid"

import { createContext, useState } from "react"

export const nameContext = createContext("")

export default function AppPage() {
    const [recent, fetchRecent] = useState(true)

    return (
        <nameContext.Provider value={{ recent, fetchRecent }}>
            <div className="w-full mx-auto overflow-y-hidden">
                <AppNavbar />
                <div className="container mx-auto py-1 min-h-[70vh] flex flex-col justify-center gap-6">
                    <h1 className="text-green-800 font-bold text-center text-4xl lg:text-6xl py-3">Welcome To Fiuzar</h1>
                    <NameRepurpose />
                    <IndexRepurposeGrid />
                </div>
            </div>
        </nameContext.Provider>
    )
}