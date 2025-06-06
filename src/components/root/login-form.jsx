'use client'

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

import { credentialsAction, googleSignIn } from "../server-actions/authentication"
import Link from "next/link"

import { useState } from "react"

export function LoginForm({
    className,
    ...props
}) {
    const [isSuccess, setSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function processLogin() {
        setMessage("")
        const { success, message } = await credentialsAction(email, password)
        displayAlert(success, message)
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
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below to login to your account
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
                <div>
                    <div className="grid gap-2 mb-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={email} type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" value={password} type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button onClick={processLogin} className="w-full cursor-pointer" disabled={process.env.NODE_ENV === "production"}>
                        Login
                    </Button>
                </div>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>

                <Button onClick={googleSignIn} variant="outline" className="w-full" disabled={process.env.NODE_ENV === "production"}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Signin with Google
                </Button>

            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
