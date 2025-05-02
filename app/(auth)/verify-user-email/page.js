"use client"; // Mark this as a Client Component
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyUserEmailPage() {
    // Wrap the component logic in a Suspense boundary
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyUserEmail />
        </Suspense>
    );
}

function VerifyUserEmail() {
    const searchParams = useSearchParams();

    // ...existing code using searchParams...
    return (
        <div>
            {/* Your component logic */}
        </div>
    );
}
