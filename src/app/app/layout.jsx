import {AppSidebar, SidebarMainContent} from "@/layout/app-sidebar"

export const metadata = {
    title: "App | Fiuzar"
}

export default function AppLayout({ children }) {
    return (
        <AppSidebar>
            <SidebarMainContent>{children}</SidebarMainContent>
        </AppSidebar>
    )
}