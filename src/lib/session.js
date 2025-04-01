import { auth } from "@/auth"

export async function CheckSession() {
    const session = await auth()

    if (!session) {
        return { success: false }
    }
    else {
        return { success: true, user: session.user }
    }
}