"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { ContinueSignup } from "../server-actions/authentication"

export function VerifyUserEmail({ className, ...props }) {

    const searchParams = useSearchParams()
    const router = useRouter()
    const [message, setMessage] = useState("")

    const email = searchParams.get("email")
    const pin = searchParams.get("pin")

    if (!email || !pin) {
        return router.push("/signup")
    }

    useEffect(() => {
        alert(message)
    }, [message])

    return (
        <>

            <form action={async (formData) => {

                const name = formData.get("name")
                const emailaddress = formData.get("email")
                const password = formData.get("password")
                const confirm_password = formData.get("confirm_password")

                try {
                    const {success, message} = await ContinueSignup(name, email, password, confirm_password, pin)

                    if(!success) {
                        return setMessage(message)
                    }

                    setMessage(message)
                    router.push("/login")
                }
                catch (error) {
                    setMessage(error)
                }

            }} className={cn("flex flex-col gap-6", className)} {...props} method="POST">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Continue Your Registration</h1>
                    <p className="text-balance text-sm py-2 text-muted-foreground">
                        Fill in the remaining fields below to register your account
                    </p>
                </div>
                <div className="grid gap-6 mb-3">

                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" name="name" placeholder="John Emmanuel" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" value={email} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="********" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <Input id="confirm_password" type="password" name="confirm_password" placeholder="********" />
                    </div>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </div>
            </form>

            <div className="grid gap-6 mb-3">

                <div className="text-center text-sm">
                    Back to{" "}
                    <Link href="/" className="underline underline-offset-4">
                        Home
                    </Link>
                </div>
            </div >

        </>

    )
}
