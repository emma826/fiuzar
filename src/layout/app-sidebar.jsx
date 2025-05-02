"use client"

import * as React from "react"
import { Home, Settings, LogOut } from "lucide-react"
import AppProjectHistory from "./app-project-history"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

import Link from "next/link"
import Image from "next/image"

import { signOut } from "next-auth/react"
import { useState } from "react"

const data = {
	navMain: [
		{
			title: "Home",
			url: "/app",
			icon: Home,
			isActive: true,
		},
		{
			title: "Settings",
			url: "/app/integration",
			icon: Settings,
			isActive: false,
		},
	],
}

export default function AppSidebar({ ...props }) {
	const [activeItem, setActiveItem] = useState(data.navMain[0])

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
			{...props}
		>
			<Sidebar
				collapsible="none"
				className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0 bg-white">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Link className="h-6 w-6 mx-auto" href="/">
										<Image
											className="w-8 mx-auto"
											src="/img/logo-2.png"
											alt="svelte logo"
											width={300}
											height={300}
										/>
									</Link>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0">
							<SidebarMenu>
								{data.navMain.map((item) => (
									<SidebarMenuItem key={item.title}>

										<Link href={item.url} className="cursor-pointer">
											<SidebarMenuButton
												tooltip={{
													children: item.title,
													hidden: false,
												}}
												onClick={() => setActiveItem(item)}
												isActive={activeItem?.title === item.title}
												className="px-2.5 md:px-2 cursor-pointer"
											>
												<item.icon />
												<span>{item.title}</span>
											</SidebarMenuButton>
										</Link>


									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<Button onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer px-0 bg-white hover:bg-white">
						<SidebarMenuButton className={`cursor-pointer px-2 hover:bg-transparent text-red-800 font-bold dark:text-red-400 hover:text-red-800 dark:hover:text-red-400`}>
							<LogOut />
						</SidebarMenuButton>
					</Button>
				</SidebarFooter>
			</Sidebar>

			<AppProjectHistory />
		</Sidebar>
	)
}
