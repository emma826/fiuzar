import { CircleArrowRight, Files, Settings } from "lucide-react";

import Image from "next/image";

export default function AboutPage() {
    return (
        <>
            <section className="py-16">
                <div className="container flex flex-col gap-28 mx-auto">
                    <div className="flex flex-col gap-7">
                        <h1 className="text-3xl font-extrabold text-green-800 max-w-3xl text-center mx-auto lg:text-6xl">
                            Simplifying Content Repurposing for Everyone
                        </h1>
                        <p className="max-w-xl mx-auto text-center text-lg">
                            We're a team of content creators and marketers who understand the struggle of repurposing content. That's why we built Fiuzar to simplify the process and help you maximize your content's impact.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Image
                            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
                            alt="placeholder"
                            className="size-full max-h-96 rounded-2xl object-cover"
                            width={400}
                            height={400}
                        />
                        <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
                            <p className="text-sm text-muted-foreground">OUR MISSION</p>
                            <p className="text-lg font-medium">
                                We're on a mission to empower 100,000 marketers to reclaim their time and amplify their impact. We're building Fiuzar, a platform designed to streamline your content repurposing and eventually, your entire marketing automation workflow. We believe that efficient marketing shouldn't be a luxury, it should be the standard.
                            </p>
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-6 md:gap-20">
                        <div className="max-w-xl">
                            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                                We make creating software ridiculously easy
                            </h2>
                            <p className="text-muted-foreground">
                                We aim to help empower 1,000,000 teams to create their own
                                software. Here is how we plan on doing it.
                            </p>
                        </div>
                        <div className="grid gap-10 md:grid-cols-3">
                            <div className="flex flex-col">
                                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                                    <Files className="size-5" />
                                </div>
                                <h3 className="mt-2 mb-3 text-lg font-semibold">
                                    Being radically open
                                </h3>
                                <p className="text-muted-foreground">
                                    We believe there’s no room for big egos and there’s always time
                                    to help each other. We strive to give and receive feedback,
                                    ideas, perspectives
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                                    <CircleArrowRight className="size-5" />
                                </div>
                                <h3 className="mt-2 mb-3 text-lg font-semibold">
                                    Moving the needle
                                </h3>
                                <p className="text-muted-foreground">
                                    Boldly, bravely and with clear aims. We seek out the big
                                    opportunities and double down on the most important things to
                                    work on.
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                                    <Settings className="size-5" />
                                </div>
                                <h3 className="mt-2 mb-3 text-lg font-semibold">
                                    Optimizing for empowerment
                                </h3>
                                <p className="text-muted-foreground">
                                    We believe that everyone should be empowered to do whatever they
                                    think is in the company&apos;s best interests.
                                </p>
                            </div>
                        </div>
                    </div> */}
                    <div className="grid gap-10 md:grid-cols-2">
                        <div>
                            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                                What Drives Us: Empowerment, Boldness, and Openness in Marketing
                            </h2>
                        </div>
                        <div>
                            <p className="font-bold text-lg mb-2">At Fiuzar, we're guided by these core values:</p>

                            <p>We believe in transparency, collaboration, and open communication in the marketing world.</p>
                            <p>We're driven by bold ambitions and a commitment to making a real impact on marketing efficiency.</p>
                            <p>We believe in giving you the tools and autonomy to succeed in your marketing efforts.</p>

                            <p className="mt-2">These values are woven into the fabric of our product and our company culture, driving us to build the best possible marketing automation platform.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}