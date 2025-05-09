"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

import { ContinueSignup } from "../server-actions/authentication"

export function VerifyUserEmail({ className, ...props }) {
    const { email } = props;

    const searchParams = useSearchParams()
    const router = useRouter()
    const [isSuccess, setSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirm_password] = useState("")

    async function submitUserData() {
        try {
            const { success, message } = await ContinueSignup(name.trim(), email.trim(), password, confirm_password)

            displayAlert(success, message)

            if (success) {
                router.push(`/login`)
            }
        }
        catch (error) {
            setMessage(error)
        }
    }

    function displayAlert(success, message) {
        if (!success) {
            setSuccess(false)
            setMessage(message)
        }
        else {
            setSuccess(true)
            setMessage(message)
        }

        setTimeout(() => {
            setMessage("")
        }, 3000);
    }

    return (
        <>

            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Continue Your Registration</h1>
                    <p className="text-balance text-sm py-2 text-muted-foreground">
                        Fill in the remaining fields below to register your account
                    </p>
                </div>
                <div className="grid gap-6">

                    {message && (
                        <Alert variant={isSuccess ? "success" : "destructive"}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}


                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" value={email} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} placeholder="********" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <Input id="confirm_password" type="password" value={confirm_password} placeholder="********" onChange={(e) => { setConfirm_password(e.target.value) }} />
                    </div>
                    <Button onClick={submitUserData} className="w-full">
                        Submit
                    </Button>

                </div>
            </div>

            <div className="grid gap-6 mt-5">

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
