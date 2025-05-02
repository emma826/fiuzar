"use client"

import AppNavbar from "@/layout/app-navbar"
import NameRepurpose from "@/components/app/name-repurpose"

import { createContext, useState } from "react"

export const nameContext = createContext("")

export default function AppPage() {
    const [recent, fetchRecent] = useState(true)

    return (
        <nameContext.Provider value={{ recent, fetchRecent }}>
            <div className="w-full mx-auto overflow-y-hidden">
                <AppNavbar />
                
                <NameRepurpose />
            </div>
        </nameContext.Provider>
    )
}