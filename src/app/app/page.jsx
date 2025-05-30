import RepurposeUrl from "@/components/app/repurpose-url"

export default function AppPage() {
    return (
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[70vh]">
            <div className="w-full">
                <h1 className="text-green-800 text-4xl md:text-5xl lg:text-6xl mb-6 text-center font-extrabold">Welcome to Fiuzar</h1>
                <RepurposeUrl />
            </div>
        </div>
    )
}