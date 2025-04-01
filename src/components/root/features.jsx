import Image from "next/image"

export default function Features({
    heading = "Effortlessly Repurpose Your Content with These Powerful Features",
    features = [
        {
            id: "feature-1",
            title: "Automated Text Extraction & Variation",
            // subtitle: "FOR DESIGNERS",
            description:
                "Automatically extract key points and generate multiple text variations from your blog posts and articles for social media.",
            image: "/icons/ai.png",
        },
        {
            id: "feature-2",
            title: "Instant Video Clip Creation",
            // subtitle: "FOR DEVELOPERS",
            description:
                "Transform long videos into short, captivating clips optimized for social media, with automated captions and resizing.",
            image: "/icons/scissors.png",
        },
        {
            id: "feature-3",
            title: "Automated Image Optimization",
            // subtitle: "FOR DEVELOPERS",
            description:
                "Automatically resize and optimize images for different platforms, with easy text overlay and branding options.",
            image: "/icons/resize.png",
        },
        {
            id: "feature-4",
            title: "Audio Transcription and Summarization",
            // subtitle: "FOR DEVELOPERS",
            description:
                "Automatically transcribe audio content and create summaries, allowing you to create text based content from your audio.",
            image: "/icons/audio.png",
        },
        {
            id: "feature-5",
            title: "Scheduled Posting",
            // subtitle: "FOR DEVELOPERS",
            description:
                "Schedule your repurposed content to post on multiple social media platforms, from within our software.",
            image: "/icons/calendar.png",
        },
        {
            id: "feature-6",
            title: "Content Performance Analytics",
            subtitle: "FOR DEVELOPERS",
            description:
                "Track the performance of your repurposed content across all platforms, and see what works best.",
            image: "/icons/analytics.png",
        },
    ],
}) {
    return (
        <section className="py-16 px-3 lg:px-0">
            <div className="container max-w-7xl mx-auto">
                <h2 className="text-3xl font-medium lg:text-4xl text-center">{heading}</h2>
                <div className="mt-20 grid gap-9 lg:grid-cols-2">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex flex-col justify-between rounded-lg bg-accent"
                        >
                            <div className="flex justify-between gap-10 border-b">
                                <div className="flex flex-col justify-between gap-14 py-6 pl-4 md:py-10 md:pl-8 lg:justify-normal">
                                    {/* <p className="text-xs text-muted-foreground">
                                        {feature.subtitle}
                                    </p> */}
                                    <h3 className="text-2xl md:text-4xl">{feature.title}</h3>
                                </div>
                                <div className="md:1/3 w-2/5 shrink-0 items-center rounded-r-lg border-l">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        className="max-w-16 w-full object-cover"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            </div>
                            <div className="p-4 text-muted-foreground md:p-8">
                                {feature.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}