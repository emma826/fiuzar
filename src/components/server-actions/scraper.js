import * as cheerio from "cheerio";

export async function scrape_data(content) {
    const supportedWebsites = ["x", "facebook", "instagram", "linkedin", "youtube"];
    try {
        // Extract hostname from the URL
        const url = new URL(content);
        let hostname = url.hostname;

        // Remove common prefixes like www.
        hostname = hostname.replace(/^www\./, "");

        // Extract the website name (e.g., "facebook" from "facebook.com")
        const websiteName = hostname.split(".")[0];

        // Check if the website is supported
        if (!supportedWebsites.includes(websiteName)) {
            return { success: false, message: `Unsupported website: ${websiteName}` };
        }

        // Fetch the HTML content of the URL
        const response = await fetch(content);
        if (!response.ok) {
            return { success: false, message: "Failed to fetch the URL content" };
        }
        const html = await response.text();

        // Use Cheerio to parse the HTML and extract meaningful data
        const $ = cheerio.load(html);
        const title = $("title").text() || "No title found";
        const description = $('meta[name="description"]').attr("content") || "No description found";
        const contentData = $("body").text() || "No body content found";

        // Return the scraped data
        return {
            success: true,
            contentData,
            contentprofile: {
                websiteName,
                title,
                description,
            },
        };
    } catch (error) {
        return { success: false, message: "Invalid URL provided or scraping failed" };
    }
}
