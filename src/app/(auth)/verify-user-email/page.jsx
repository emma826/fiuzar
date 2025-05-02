import { VerifyUserEmail } from "@/components/root/veriy-user-email"

export default function VerifyUserEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyUserEmail />
        </Suspense>
    );
}