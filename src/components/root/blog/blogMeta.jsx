"use client";

import { Suspense } from "react";

function BlogMetaSkeleton() {
    return (
        <div className="lg:pt-16 pt-8 animate-pulse">
            <div className="container mx-auto px-4">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
}

export default function BlogMeta({ blogBody, blogData }) {
    return (
        <Suspense fallback={<BlogMetaSkeleton />}>
            
        </Suspense>
    );
}