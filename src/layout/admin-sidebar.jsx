"use client"

import * as React from "react"
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/layout/nav-main"
import { NavProjects } from "@/layout/nav-projects"
import { NavUser } from "@/layout/nav-user"
import { TeamSwitcher } from "@/layout/team-switcher"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Fiuzar",
			logo: GalleryVerticalEnd,
			plan: "/favicon.ico",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Revenue Summary",
					url: "/admin",
				},
				{
					title: "User Analytics",
					url: "#",
				},
				{
					title: "Affiliate Performance",
					url: "#",
				},
				{
					title: "Blog Performance",
					url: "#",
				},
				{
					title: "System Health",
					url: "#",
				},
			],
		},
		{
			title: "Blog Management",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "All Blog Posts",
					url: "/admin/blog",
				},
				{
					title: "Drafts & Scheduled Posts",
					url: "#",
				},
				{
					title: "Categories & Tags",
					url: "#",
				},
				{
					title: "Author Management",
					url: "#",
				},
			],
		},
		{
			title: "User Management",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "All Users",
					url: "#",
				},
				{
					title: "Assign Roles",
					url: "#",
				},
				{
					title: "Customer Segmentation",
					url: "#",
				},
				{
					title: "Account Approvals",
					url: "#",
				},
				{
					title: "Activity Logs",
					url: "#",
				}
			],
		},
		{
			title: "CRM",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Contact List",
					url: "#",
				},
				{
					title: "Messaging Center",
					url: "#",
				},
				{
					title: "Campaign Library",
					url: "#",
				},
				{
					title: "Drafts & Templates",
					url: "#",
				},
				{
					title: "Chatbot & Autoresponder",
					url: "#",
				},
				{
					title: "Engagement Tracking",
					url: "#",
				},
				{
					title: "Customer Support",
					url: "#",
				},
			],
		},
		{
			title: "Billing",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "Subscription Plans",
					url: "#",
				},
				{
					title: "Billing History",
					url: "#",
				},
				{
					title: "Dispute Handling",
					url: "#",
				},
			],
		},
		{
			title: "Affiliate Management",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "Affiliate Dashboard",
					url: "#",
				},
				{
					title: "Affiliate Users",
					url: "#",
				},
				{
					title: "Commission Structure",
					url: "#",
				},
				{
					title: "Payout Requests",
					url: "#",
				},
				{
					title: "Affiliate Marketing Assets",
					url: "#",
				},
			],
		},
		{
			title: "Analytics & Reports",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "User Growth Trends",
					url: "#",
				},
				{
					title: "Churn & Retention Metrics",
					url: "#",
				},
				{
					title: "Revenue Reports",
					url: "#",
				},
				{
					title: "Marketing Performance",
					url: "#",
				},
			],
		},
		{
			title: "Support & Ticketing",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "All Tickets",
					url: "#",
				},
				{
					title: "User Chat Logs",
					url: "#",
				},
				{
					title: "FAQs & Help Center",
					url: "#",
				},
			],
		},
		{
			title: "Settings & Configurations",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General Settings",
					url: "#",
				},
				{
					title: "API & Integrations",
					url: "#",
				},
				{
					title: "Email & Notifications",
					url: "#",
				},
				{
					title: "Security & Compliance",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Home",
			url: "/",
			icon: Frame,
		},
		{
			name: "Features",
			url: "/features",
			icon: PieChart,
		},
		{
			name: "Blog",
			url: "/blog",
			icon: Map,
		},
		{
			name: "About Us",
			url: "/about",
			icon: Map,
		},
	],
}

export function AppSidebar({ ...props }) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
