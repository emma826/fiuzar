"use client";

import { Suspense } from "react";
import BlogPost from "./blogPost";
import SharePost from "./SharePost";
import Image from "next/image"
import RelatedPosts from "./relatedPosts";


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
            <div className="py-8">
                <div className="container mx-auto">
                    <div className="block lg:flex lg:gap-2 lg:justify-between">

                        <div className="mb-3 flex-auto px-4">

                            <h1 className="text-3xl lg:text-4xl font-bold">{blogData.title}</h1>

                            <img src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}/featured_img/${blogData.image}`} alt={blogData.title} className="w-full my-8 rounded-sm" />

                            <article className="text-lg">
                                <BlogPost blogPost={blogBody} />
                            </article>

                        </div>

                        <div className="lg:min-w-96 lg:max-w-[500px] w-full px-4">

                            <SharePost blogUrl={blogData.url} />

                            <div className="py-4 border-t">
                                <div className="mt-2 pt-8 bg-white shadow-xl rounded-lg text-gray-900">
                                    <div className="mx-auto w-32 h-32 relative border-4 bg-black border-white rounded-full overflow-hidden">
                                        <Image
                                            className="object-cover object-center h-32 w-32"
                                            src={`/img/admin.jpg`} // Prepend base URL
                                            alt="User Profile"
                                            width={600}
                                            height={600}
                                        />
                                    </div>
                                    <div className="text-center mt-2">
                                        <h2 className="font-semibold">Amoke Emmanuel</h2>
                                    </div>
                                    <div className="border-t p-4 mt-2">
                                        <p className="text-md text-center text-gray-600">
                                            Amoke Emmanuel is a dedicated writer with a passion for storytelling and creating valuable content. Through insightful articles and engaging blog posts, he strives to inform, inspire, and connect with readers on a deeper level.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <RelatedPosts postId={blogData.id} />
                        </div>

                    </div>

                </div>
            </div>
        </Suspense>
    );
}