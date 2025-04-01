"use server"

import { signIn } from "@/auth"

export async function credentialsAction(formData) {
    await signIn("credentials", formData)
}