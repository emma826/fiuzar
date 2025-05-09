import AppSidebar from "@/layout/app-sidebar"
import { Toaster } from "@/components/ui/sonner"

// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export const metadata = {
    title: "App | Fiuzar"
}

export default function AppLayout({ children }) {
    return (
        <>
            <SidebarProvider style={{ "--sidebar-width": "350px", }}>
                <AppSidebar />
                <SidebarInset>
                    {children}
                    <Toaster />
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}