import { VerifyUserEmail } from "@/components/root/veriy-user-email";
import { Suspense } from "react";

import Loading from "@/app/(prelogin)/loading";
import { redirect } from "next/navigation";

import { otpVerification } from "@/components/server-actions/authentication";

export default async function VerifyUserEmailPage({ params }) {
    const { otp } = await params;
    let email, errorMessage;

    try {
        const { success, message } = await otpVerification("verified", otp, true);

        if (success) {
            email = message;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        errorMessage = error.message;
        redirect("/signup")
    }

    return (
        <Suspense fallback={<Loading />}>
            {email ? (
                <VerifyUserEmail email={email} />
            ) : (
                <div>Error: {errorMessage || "An unknown error occurred."}</div>
            )}
        </Suspense>
    );
}