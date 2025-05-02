'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import FeaturedBlog from "./featured-blog";

function BlogCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg animate-pulse">
            <div className="flex-shrink-0 h-48 w-full bg-gray-300"></div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1 space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
                <div className="mt-6 flex items-center">
                    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                    <div className="ml-3 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BlogGrid() {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [nextStartId, setNextStartId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

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
            } finally {
                setInitialLoading(false);
            }
        }
        fetchInitialBlogs();
    }, []);

    const loadMoreBlogs = async () => {
        if (!nextStartId || loading) return; // Prevent multiple calls or loading when no more blogs
        setLoading(true);
        try {
            const response = await fetch(`/api/root/blog?startId=${nextStartId}`);
            const data = await response.json();
            if (data.success) {
                setRecentBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]); // Append new blogs
                setNextStartId(data.nextStartId || null); // Update nextStartId from API response
            } else {
                setNextStartId(null); // No more blogs to load
            }
        } catch (error) {
            console.error("Error loading more blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {initialLoading ? (
                <FeaturedBlog blogs={Array.from({ length: 3 })} />
            ) : (
                <FeaturedBlog blogs={featuredBlogs} />
            )}

            <div className="px-4 pt-10">
                <h1 className="text-3xl text-black font-bold">Recent Blogs</h1>
            </div>

            <div className="relative px-6 pb-20 lg:px-8">
                <div className="relative mx-auto max-w-7xl">
                    <div className="mx-auto mt-6 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
                        {initialLoading
                            ? Array.from({ length: 6 }).map((_, index) => <BlogCardSkeleton key={index} />)
                            : recentBlogs.map((blog) => (
                                  <div key={blog.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                                      <div className="flex-shrink-0">
                                          <img
                                              className="h-48 w-full object-cover"
                                              src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}/featured_img/${blog.image}`}
                                              alt={blog.title}
                                          />
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
                                                      <Image
                                                          className="h-10 w-10 rounded-full"
                                                          src={blog.author.image || "/img/admin.jpg"}
                                                          alt={blog.author.name || "Amoke Emmanuel"}
                                                          width={350}
                                                          height={350}
                                                      />
                                                  </Link>
                                              </div>
                                              <div className="ml-3">
                                                  <p className="text-sm font-medium text-gray-900">
                                                      <Link href={`/blog/${blog.url}`} className="hover:underline">
                                                          {blog.author.name || "Amoke Emmanuel"}
                                                      </Link>
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
                    {nextStartId && !initialLoading && (
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