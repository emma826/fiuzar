import AppSidebar from "@/layout/app-sidebar"

export default function AppLayout({ children }) {
    return (
        <>
            <div className="h-screen w-screen flex bg-gray-100">
                <AppSidebar />
                {children}
            </div>
        </>
    )
}