import BlogGrid from "@/components/root/blog-grid"

import { Button } from "@/components/ui/button";

import Link from "next/link"

const featured_blog = {
    id: 1,
    title: "Best UI components for modern websites",
    url: "#",
    meta_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
    image: "/images/blog/blog-01.jpg",
    author: {
        name: "Samuyl Joshi",
        image: "/images/blog/author-01.png",
        designation: "Graphic Designer",
    },
    tags: ["creative"],
    publishDate: "2025",
}

export default function BlogPage() {
    return (
        <section className="py-[60px]">
            <div className="container mx-auto">

                <div className="rounded-lg w-full min-h-[550px] relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(/img/download.jpeg)` }} >
                    <div className="absolute text-white bottom-0 w-full">
                        <div className="px-5 py-10">
                            <h1 className="text-6xl mb-4 font-bold">
                                <Link href={`/blog/${featured_blog.url}`}>{featured_blog.title}</Link>
                            </h1>
                            <p className="text-lg font-semibold mt-2 text-gray-800">{featured_blog.meta_description}</p>
                        </div>
                    </div>
                </div>

                <div className="pb-7 px-4 pt-10">
                    <h1 className="text-3xl text-black font-bold">Recent Blogs</h1>
                </div>

                <BlogGrid />

                <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
                    <div className="w-full">
                        <Button className={`py-8 px-12 bg-green-800 text-white block mx-auto hover:bg-green-700`}>Load More</Button>
                    </div>
                </div>
            </div>
        </section >
    )
}