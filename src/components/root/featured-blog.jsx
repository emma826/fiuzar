import Image from "next/image";
import Link from "next/link";

function LoadingSkeleton() {
    return (
        <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-700 px-8 py-8 pb-8 pt-80 sm:pt-48 lg:pt-80 animate-pulse">
            <div className="absolute inset-0 -z-10 bg-gray-600"></div>
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-600"></div>
            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-400">
                <div className="h-4 w-24 bg-gray-500 rounded"></div>
                <div className="ml-4 flex items-center gap-x-4">
                    <div className="h-6 w-6 bg-gray-500 rounded-full"></div>
                    <div className="h-4 w-16 bg-gray-500 rounded"></div>
                </div>
            </div>
            <div className="mt-3 h-6 w-3/4 bg-gray-500 rounded"></div>
        </div>
    );
}

export default function FeaturedBlog({ blogs }) {
    return (
        <>
            <div className="w-full dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
                        {blogs.map((blog, index) => (
                            <article
                                key={blog?.id || index}
                                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-700 px-8 py-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                            >
                                {blog?.image ? (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}/featured_img/${blog.image}`}
                                        alt={blog.title || "Blog Image"}
                                        className="absolute inset-0 -z-10 h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 -z-10 h-full w-full bg-gray-700"></div>
                                )}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
                                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                    <time dateTime={blog?.created_at || ""} className="mr-8">
                                        {blog?.created_at ? new Date(blog.created_at).toDateString() : "Loading..."}
                                    </time>
                                    <div className="-ml-4 flex items-center gap-x-4">
                                        <svg
                                            viewBox="0 0 2 2"
                                            className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                                        >
                                            <circle cx="1" cy="1" r="1"></circle>
                                        </svg>
                                        <div className="flex gap-x-2.5">
                                            <Image
                                                src={blog?.author?.image || "/img/admin.jpg"}
                                                alt={blog?.author?.name || "Amoke Emmanuel"}
                                                className="h-6 w-6 flex-none rounded-full bg-white/10"
                                                width={300}
                                                height={300}
                                            />
                                            {blog?.author?.name || "Amoke Emmanuel"}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                    {blog?.url ? (
                                        <Link href={`/blog/${blog.url}`}>
                                            <span className="absolute inset-0"></span>
                                            {blog.title}
                                        </Link>
                                    ) : (
                                        "Loading..."
                                    )}
                                </h3>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}