import { SignupForm } from "@/components/root/signup-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {

    const session = await auth();

    if (!session) {
        return <SignupForm />
    }

    if (session.user.email == "mail@fiuzar.com") {
        redirect("/admin")
    }
    else {
        redirect("/app")
    }
}