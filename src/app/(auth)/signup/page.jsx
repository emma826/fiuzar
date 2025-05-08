import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { SignupForm } from "@/components/root/signup-form";

export default async function SignupPage() {
    const session = await auth();

    if (!session) {
        return <SignupForm />
    }

    if (session.user.id == "Admin_001") {
        redirect("/admin")
    }
    else {
        redirect("/app")
    }
}