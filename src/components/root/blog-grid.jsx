'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import FeaturedBlog from "./featured-blog";
import { CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BlogGrid() {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [nextStartId, setNextStartId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch initial blogs on page load
        async function fetchInitialBlogs() {
            try {
                const response = await fetch("/api/root/blog");
                const data = await response.json();
                if (data.success) {
                    setFeaturedBlogs(data.blogs.slice(0, 3));
                    setRecentBlogs(data.blogs.slice(3));
                    setNextStartId(data.nextStartId);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }
        fetchInitialBlogs();
    }, []);

    const loadMoreBlogs = async () => {
        if (!nextStartId || loading) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/root/blog?startId=${nextStartId}`);
            const data = await response.json();
            if (data.success) {
                setRecentBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]); // Append new blogs
                setNextStartId(data.blogs.length > 0 ? data.blogs[data.blogs.length - 1].id : null); // Update nextStartId
            }
        } catch (error) {
            console.error("Error loading more blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FeaturedBlog blogs={featuredBlogs} />

            <div className="px-4 pt-10">
                <h1 className="text-3xl text-black font-bold">Recent Blogs</h1>
            </div>

            <div className="relative px-6 pb-20 lg:px-8">
                <div className="relative mx-auto max-w-7xl">
                    <div className="mx-auto mt-6 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
                        {recentBlogs.map((blog) => (
                            <div key={blog.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}/featured_img/${blog.image}`} alt={blog.title} />
                                </div>
                                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                    <div className="flex-1">
                                        <Link href={`/blog/${blog.url}`} className="mt-2 block">
                                            <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{blog.paragraph}</p>
                                        </Link>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <Link href={`/blog/${blog.url}`}>
                                                <Image className="h-10 w-10 rounded-full" src={blog.author.image || "/img/admin.jpg"} alt={blog.author.name || "Amoke Emmanuel"} width={350} height={350} />
                                            </Link>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                <Link href={`/blog/${blog.url}`} className="hover:underline">{blog.author.name}</Link>
                                            </p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <time>{new Date(blog.created_at).toDateString()}</time>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {nextStartId && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={loadMoreBlogs}
                                className="px-4 py-2 text-white bg-green-800 rounded hover:bg-green-700 cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}