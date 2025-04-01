import Link from "next/link"
import Image from "next/image"

import { CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react"

const blogData = [
    {
        id: 1,
        title: "Best UI components for modern websites",
        paragraph:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
        image: "/img/download.jpeg",
        author: {
            name: "Samuyl Joshi",
            image: "/images/blog/author-01.png",
            designation: "Graphic Designer",
        },
        tags: ["creative"],
        publishDate: "2025",
    },
    {
        id: 2,
        title: "9 simple ways to improve your design skills",
        paragraph:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
        image: "/images/blog/blog-02.jpg",
        author: {
            name: "Musharof Chy",
            image: "/images/blog/author-02.png",
            designation: "Content Writer",
        },
        tags: ["computer"],
        publishDate: "2025",
    },
    {
        id: 3,
        title: "Tips to quickly improve your coding speed.",
        paragraph:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
        image: "/images/blog/blog-03.jpg",
        author: {
            name: "Lethium Deo",
            image: "/images/blog/author-03.png",
            designation: "Graphic Designer",
        },
        tags: ["design"],
        publishDate: "2025",
    },
];

export default function BlogGrid() {
    return (
        <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                {blogData.map((blog) => (
                    <div key={blog.id} className="w-full">
                        <div className="group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
                            <Link
                                href={`/blog/${blog.url}`}
                                className="relative block aspect-[37/22] w-full"
                            >
                                <Image src={blog.image} alt="image" width={400} height={400} className="w-full" />
                            </Link>
                            <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                                <h3>
                                    <Link
                                        href="/blog-details"
                                        className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
                                    >
                                        {blog.title}
                                    </Link>
                                </h3>
                                <p className="mb-6 pb-6 text-base font-medium text-body-color">
                                    {blog.paragraph}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}