import { CheckSession } from "@/lib/session";

export default async function BlogPage() {
    const { success, user } = await CheckSession()
    const session_id = user.id
}