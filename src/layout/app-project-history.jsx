import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import Link from "next/link"

const data = {
	mails: [
		{
			name: "William Smith",
			email: "williamsmith@example.com",
			subject: "Meeting Tomorrow",
			date: "09:34 AM",
			teaser:
				"Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
		},
		// ...other mail data...
	],
}

export default function AppProjectHistory() {
	const [history, setHistory] = useState([])
	const [loading, setLoading] = useState(false)
	const [nextIndex, setNextIndex] = useState(null)

	async function fetchProjectHistory(index = 0) {
		setLoading(true)

		try {

			const response = await fetch(`/api/app/create-project?limit=10&index=${index}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (response.ok) {
				const data = await response.json()

				const projects = data.recent_projects.map((project) => ({
					id: project.id,
					project_name: project.project_name,
					date: new Date(project.created_at).toLocaleTimeString(),
				}))
				setHistory((prevHistory) => [...prevHistory, ...projects])
				setNextIndex(data.next_index)
			}
			else {
				console.error('Failed to fetch project history')
			}

		} catch (error) {
			console.error('Error fetching project history:', error)
		} finally {
			setLoading(false)
		}

	}

	useEffect(() => {
		fetchProjectHistory()
	}, [])

	return (
		<Sidebar collapsible="none" className="hidden flex-1 md:flex">
			<SidebarHeader className="gap-3.5 p-4 border-b">
				<div className="flex w-full items-center justify-between">
					<div className="text-base font-medium text-foreground">History</div>
				</div>
				<SidebarInput placeholder="Type to search..." />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className="px-0">
					<SidebarGroupContent>
						{history.map((historyDetails, index) => (
							<Link
								href={`/app/project/${historyDetails.id}`}
								key={index}
								className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
							>
								<span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
									{historyDetails.project_name}
								</span>
								<div className="flex w-full items-center gap-2">
									<span className="ml-auto text-xs">{historyDetails.date}</span>
								</div>
							</Link>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{nextIndex !== null && (
				<div className="p-4 text-center">
					<Button
						onClick={() => fetchProjectHistory(nextIndex)}
						disabled={loading}
						className="px-4 cursor-pointer py-2 bg-primary text-white rounded hover:bg-green-900 disabled:opacity-50"
					>
						{loading ? "Loading..." : "Load More"}
					</Button>
				</div>
			)}

		</Sidebar>
	)
}