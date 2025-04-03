import { ArrowRight } from "lucide-react";
import Link from "next/link"

import Image from "next/image"

export default function Hero() {
    return (
        <section className="py-10">
            <div className="overflow-hidden border-b border-muted">
                <div className="container mx-auto">
                    <div className="mx-auto flex max-w-5xl flex-col items-center px-3">
                        <div className="z-10 items-center text-center">
                            <h1 className="mb-8 text-3xl font-extrabold text-green-800 text-pretty lg:text-6xl">
                                Repurpose Your Content With Fiuzar
                            </h1>
                            <p className="mx-auto max-w-screen-md text-black font-bold lg:text-xl">
                                Transform your existing content into platform-specific formats with our AI-powered tool.
                            </p>
                            <div className="mt-7 flex w-full flex-col justify-center gap-2 sm:flex-row">
                                <Link href={`signup`} className={`rounded-lg py-4 px-6 bg-green-800 font-semibold hover:bg-green-700 text-background flex gap-2`}>
                                    Get Started <ArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-12">
                        <Image
                            src="/img/animated.gif"
                            alt="Animated GIF"
                            className="mx-auto max-w-full rounded-lg shadow-md"
                            width={500}
                            height={300}
                        />
                    </div> */}

                    <Image
                        src="/img/download.jpeg"
                        alt="placeholder"
                        className="mx-auto px-3 mt-10 max-h-[700px] w-full max-w-[900px] rounded-t-lg object-cover shadow-lg"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
        </section>
    );
}