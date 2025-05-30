import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request) {
    const { url } = await request.json();

    return NextResponse.json({ error: "submitted successfully"})

    // if (!url || typeof url !== "string") {
    //     return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    // }

    // try {
    //     new URL(url);
    // } catch (error) {
    //     return NextResponse.json({ error: "Invalid URL format. Add https:// if not added" }, { status: 400 });
    // }

    // try {
    //     const controller = new AbortController();
    //     const timeout = setTimeout(() => controller.abort(), 30000); 

    //     const response = await fetch(url, { signal: controller.signal });
    //     clearTimeout(timeout);

    //     if (!response.ok) {
    //         return NextResponse.json({ error: "Failed to fetch the URL" }, { status: response.status });
    //     }
    //     const html = await response.text();

    //     const $ = cheerio.load(html);

    //     const h1 = $("h1").first().text().trim();
    //     let article = $("article").clone();
    //     if (!article.length) {
    //         article = $("main").clone();
    //     }

    //     article.find("img, video, iframe, picture, script, style").remove();

    //     article.find("*").each((_, el) => {
    //         $(el).removeAttr("style").removeAttr("class");
    //     });

    //     const articleText = article.text().trim();

    //     if (!h1 && !articleText) {
    //         return NextResponse.json({ error: "Could not extract blog post content" }, { status: 404 });
    //     }



    //     return NextResponse.json({ h1: h1 || null, article: articleText || null });
    // } catch (error) {
    //     if (error.name === "AbortError") {
    //         return NextResponse.json({ error: "Request timed out" }, { status: 408 });
    //     }
    //     return NextResponse.json({ error: "An error occurred during scraping" }, { status: 500 });
    // }
}