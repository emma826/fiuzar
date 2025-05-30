import {AppSidebar, SidebarMainContent} from "@/layout/app-sidebar"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
    title: "App | Fiuzar"
}

export default function AppLayout({ children }) {
    return (
        <AppSidebar>
            <SidebarMainContent>{children}</SidebarMainContent>
            <Toaster />
        </AppSidebar>
    )
}