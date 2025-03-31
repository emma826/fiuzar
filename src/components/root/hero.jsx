import { Button } from "@/components/ui/button";

import Image from "next/image"

export default function Hero() {
    return (
        <section className="py-24">
            <div className="overflow-hidden border-b border-muted">
                <div className="container mx-auto">
                    <div className="mx-auto flex max-w-5xl flex-col items-center">
                        <div className="z-10 items-center text-center">
                            <h1 className="mb-8 text-3xl font-semibold text-pretty lg:text-6xl">
                                Repurpose Your Content With Fiuzar
                            </h1>
                            <p className="mx-auto max-w-screen-md text-muted-foreground lg:text-xl">
                                Transform your existing content into platform-specific formats with our AI-powered tool.
                            </p>
                            <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                                <Button className={`py-7`}>
                                    Get started now
                                </Button>
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
                        className="mx-auto mt-24 max-h-[700px] w-full max-w-[900px] rounded-t-lg object-cover shadow-lg"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
        </section>
    );
}