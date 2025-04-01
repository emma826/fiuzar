import { AppSidebar } from "@/layout/admin-sidebar";
import { Navbar } from "@/layout/admin-navbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({children}) {
    return (
        <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />

        <div className="gap-4 p-4 pt-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
    )
}