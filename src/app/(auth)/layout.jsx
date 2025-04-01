import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({ children }) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex items-center justify-center rounded-md text-primary">
                            {/* <GalleryVerticalEnd className="size-4" /> */}
                            <Image src={`/img/logo-2.png`} className="w-8 h-8" width={300} height={300} alt="Fiuzar logo" />
                        </div>
                        Fiuzar
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {children}
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}