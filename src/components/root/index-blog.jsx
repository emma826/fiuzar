import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import Link from "next/link";

import { IndexBlogFunction } from "../server-actions/blog-functions";

export default async function IndexBlog({
    heading = "Blog Posts",
    buttonText = "View all articles",
    buttonUrl = "/blog",
}) {

    let blog;

    try {
        const { success, message, blogs } = await IndexBlogFunction()

        if(!success) {
            throw new Error(message)
        }

        blog = blogs
    } catch (error) {
        return
    }

    return (
        <section className="py-16">
            <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
                <div className="text-center">
                    <h2 className="mb-3 text-3xl text-green-800 font-extrabold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
                        {heading}
                    </h2>
                    {/* <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
                        {description}
                    </p> */}
                    <Button variant="link" className="w-full sm:w-auto" asChild>
                        <Link href={buttonUrl}>
                            {buttonText}
                            <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {blog.map((post) => (
                        <Card
                            key={post.id}
                            className="grid grid-rows-[auto_auto_1fr_auto] pt-0 overflow-hidden "
                        >
                            <div className="aspect-[16/9] w-full">
                                <Link
                                    href={post.url}
                                    target="_blank"
                                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                                >
                                    <img
                                        src={`${process.env.LOADING_SERVER}/featured_img/${post.image}`}
                                        alt={post.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </Link>
                            </div>
                            <CardHeader>
                                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                                    <a href={post.url} target="_blank">
                                        {post.title}
                                    </a>
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{post.meta_description}</p>
                            </CardContent>
                            <CardFooter>
                                <Link
                                    href={post.url}
                                    className="flex items-center text-foreground hover:underline"
                                >
                                    Read more
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
