import { BlogData } from "@/components/server-actions/blog-functions";
import { redirect } from "next/navigation";
import BlogMeta from "@/components/root/blog/blogMeta";

export async function generateMetadata({ params }) {
    const { blog_url } = await params;

    try {
        const { success, blogs } = await BlogData(blog_url);

        if (!success) {
            throw new Error("Failed to fetch blog data");
        }

        return {
            title: blogs.title || "Blog",
            description: blogs.meta_description || "Read our latest blog post.",
        };
    } catch {
        return {
            title: "Blog",
            description: "Read our latest blog post.",
        };
    }
}

async function fetchBlogData(blog_url) {
    try {
        const { success, message, blogs } = await BlogData(blog_url);

        if (!success) {
            throw new Error(message);
        }

        const blogBody = JSON.parse(blogs.body).blocks;
        return { blogData: blogs, blogBody };
    } catch (error) {
        redirect("/blog");
    }
}

export default async function Blog_urlPage({ params }) {

    const { blog_url } = await params;

    const { blogData, blogBody } = await fetchBlogData(blog_url)

    return <BlogMeta blogBody={blogBody} blogData={blogData} />
}