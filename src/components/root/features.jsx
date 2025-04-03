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
                <h2 className="text-3xl font-bold lg:text-4xl text-center">{heading}</h2>
                <div className="mt-20 grid gap-9 md:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature) => (
                        <div key={feature.id} className="w-full">
                            <div className="wow fadeInUp" data-wow-delay=".15s">
                                <div className="mb-10 rounded-md bg-white bg-opacity-10 text-green-700">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        className="max-w-16 w-full block mx-auto object-cover"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <h3 className="mb-5 text-xl font-semibold text-green-800 sm:text-2xl lg:text-xl xl:text-2xl">
                                    {feature.title}
                                </h3>
                                <p className="pr-[10px] text-base font-medium leading-relaxed text-gray-700">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}