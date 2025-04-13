import AppSidebar from "@/layout/app-sidebar"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
    title : "App | Fiuzar"
}

export default function AppLayout({ children }) {
    return (
        <>
            <div className="h-screen w-screen flex bg-gray-100">
                <AppSidebar />
                {children}
                <Toaster />
            </div>
        </>
    )
}