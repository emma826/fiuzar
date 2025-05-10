'use client'

import { Home, Settings } from "lucide-react"
import { UIProvider, useUIContext } from "@/context/ui-context";

import { SideBar, NavSidebar } from "./sidebar/app-sidebar"
import AppNavbar from "./app-navbar";

const menu = [
	{
		icon: Home,
		url: "/app"
	},
	{
		icon: Settings,
		url: "/settings"
	}
];

export function AppSidebar({ children }) {
	return (
		<UIProvider>
			<SideBar>
				<NavSidebar menu={menu} />
				{children}
			</SideBar>
		</UIProvider>
	)
}

export function SidebarMainContent({ children }) {

	const {isMobile} = useUIContext()

	return (
		<main className={`${isMobile ? "" : "flex-auto"}`}>
			<AppNavbar />
			{children}
		</main>
	)
}