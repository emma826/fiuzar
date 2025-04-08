import Image from "next/image";
import Link from "next/link"

export default function FeaturedBlog({ blogs }) {
    return (
        <>
            <div className="w-full dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
                        {blogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-700 px-8 py-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                            >
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}/featured_img/${blog.image}`}
                                    alt={blog.title}
                                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
                                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                    <time dateTime={blog.created_at} className="mr-8">
                                        {new Date(blog.created_at).toDateString() || ""}
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
                                                src={blog.author.image  || "/img/admin.jpg"}
                                                alt={blog.author.name || "Amoke Emmanuel"}
                                                className="h-6 w-6 flex-none rounded-full bg-white/10"
                                                width={300}
                                                height={300}
                                            />
                                            {blog.author.name || "Amoke Emmanuel"}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                    <Link href={`/blog/${blog.url}`}>
                                        <span className="absolute inset-0"></span>
                                        {blog.title}
                                    </Link>
                                </h3>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}