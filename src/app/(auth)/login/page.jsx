import { LoginForm } from "@/components/root/login-form"

import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function LoginPage() {

    try {
        const session = await auth();

        if (!session) {
            return <LoginForm />
        }

        if (session.user.email == "mail@fiuzar.com") {
            redirect("/admin")
        }
        else {
            redirect("/app")
        }
    } catch (error) {
        return <LoginForm />
    }


}
