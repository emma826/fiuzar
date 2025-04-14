'use client'

import Link from "next/link"
import Image from "next/image"
import { signOut } from "next-auth/react"

export default function AppSidebar() {
    return (
        <aside className="flex flex-col items-center bg-white text-gray-700 shadow h-full">

            <div className="h-16 flex items-center w-full">
                <Link className="h-6 w-6 mx-auto" href="/">
                    <Image
                        className="h-6 w-6 mx-auto"
                        src="/img/logo-2.png"
                        alt="svelte logo"
                        width={300}
                        height={300}
                    />
                </Link>
            </div>

            <ul className="w-20">
                <li className="hover:bg-gray-100">
                    <Link href="/app" className="h-16 px-2 flex flex-col justify-center items-center w-full">
                        <svg className="h-5 w-5 mx-auto mb-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
                        </svg>
                        <span className="text-xs">Home</span>
                    </Link>
                </li>

                <li className="hover:bg-gray-100">
                    <Link href="#" className="h-16 px-2 flex flex-col justify-center items-center w-full">
                        <svg className="h-5 w-5 mx-auto mb-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 4 1 10 7 10"></polyline>
                            <path d="M3.51 15a9 9 0 1 0 .49-9.27L1 10"></path>
                            <line x1="12" y1="7" x2="12" y2="12"></line>
                            <line x1="12" y1="12" x2="15" y2="15"></line>
                        </svg>
                        <span className="text-xs">History</span>
                    </Link>
                </li>

                <li className="hover:bg-gray-100">
                    <Link href="/app/integration" className="h-16 px-2 flex flex-col justify-center items-center w-full">
                        <svg className="h-6 w-6 mx-auto mb-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"></path>
                            <line x1="7" y1="12" x2="17" y2="12"></line>
                            <line x1="9" y1="16" x2="9" y2="8"></line>
                            <line x1="15" y1="16" x2="15" y2="8"></line>
                        </svg>
                        <span className="text-xs">Settings</span>
                    </Link>
                </li>
            </ul>

            <div className="mt-auto h-16 flex items-center w-full">
                <button onClick={() => signOut({ callbackUrl: "/" })} className="h-16 w-full mx-auto flex justify-center items-center hover:bg-red-200 focus:outline-none">
                    <svg className="h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </div>

        </aside>
    )
}