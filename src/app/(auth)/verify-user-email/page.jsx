"use client"

import { VerifyUserEmail } from "@/components/root/veriy-user-email"
import { Suspense } from "react";

export default function VerifyUserEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyUserEmail />
        </Suspense>
    );
}