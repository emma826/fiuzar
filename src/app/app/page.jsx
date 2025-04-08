import AppNavbar from "@/layout/app-navbar"

export const metadata = {
    title: "App | Fiuzar"
}

export default function AppPage() {
    return (
        <>
            <div className="container mx-auto">
                <AppNavbar />
            </div>
        </>
    )
}