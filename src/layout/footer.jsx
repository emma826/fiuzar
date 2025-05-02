import Image from "next/image"
import Link from "next/link"

const sections = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: "Pricing", href: "/pricing" },
            { name: "About Us", href: "/about" },
            // { name: "Careers", href: "#" },
        ],
    },
    {
        title: "Features",
        links: [
            { name: "Automated Text Extraction & Variation", href: "#" },
            { name: "Instant Video Clip Creation", href: "#" },
            { name: "Automated Image Optimization", href: "#" },
            { name: "Audio Transcription and Summarization", href: "#" },
            { name: "Scheduled Posting", href: "#" },
            { name: "Content Performance Analytics", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "#" },
            { name: "Documentation", href: "#" },
            { name: "Tutorial", href: "#" },
            { name: "Community", href: "#" },
        ],
    },
];

export default function Footer({ logo = { url: "/", src: "/img/logo-2.png", alt: "fiuzar logo", title: "Fiuzar", } }) {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
                    <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
                        {/* Logo */}
                        <div className="flex items-center gap-2 lg:justify-start">
                            <Link href="/">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    title={logo.title}
                                    className="w-8"
                                    width={400}
                                    height={400}
                                />
                            </Link>
                            <h2 className="text-xl font-bold">{logo.title}</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Transform your existing content with our AI-powered tool.
                        </p>
                        <ul className="flex items-center space-x-6 text-muted-foreground">
                            <li className="font-medium hover:text-primary">
                                <Link href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </Link>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <Link href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                </Link>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <Link href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube-icon lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="grid w-full grid-cols-3 gap-6 lg:gap-20">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-6 font-bold">{section.title}</h3>
                                <ul className="space-y-4 text-sm text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-primary"
                                        >
                                            <Link href={link.href}>{link.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-10 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
                    <p>© 2025 fiuzar.com. All rights reserved.</p>
                    <ul className="flex justify-center gap-4 lg:justify-start">
                        <li className="hover:text-primary">
                            <Link href="#"> Terms and Conditions</Link>
                        </li>
                        <li className="hover:text-primary">
                            <Link href="#"> Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
