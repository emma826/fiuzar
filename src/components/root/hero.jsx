import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link"

import Image from "next/image"

import { Button, buttonVariants } from "../ui/button";

export default function Hero() {

    return (
        <section className="relative overflow-hidden py-20 min-h-screen">
            <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
                <Image
                    alt="background"
                    src="/img/download.jpeg"
                    style={{ filter: "brightness(30%)" }}
                    className="opacity-90 w-full h-screen -mt-20 object-cover"
                    width={400}
                    height={400}
                />
            </div>
            <div className="relative z-10 container mx-auto">
                <div className="mx-auto flex max-w-5xl flex-col items-center mt-16">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="rounded-xl bg-white p-4 shadow-sm backdrop-blur-sm">
                            <Image
                                src="/img/logo-2.png"
                                alt="logo"
                                className="w-24"
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                                Repurpose Your Content With{" "}
                                <span className="text-primary">Fiuzar</span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-white lg:text-xl">
                                Transform your existing content into platform-specific formats with our AI-powered tool.
                            </p>
                        </div>
                        <div className="mt-6 flex justify-center gap-3">
                            <Link href={`/signup`}>
                                <Button className="shadow-sm transition-shadow hover:shadow cursor-pointer py-7">
                                    Get Started
                                </Button>
                            </Link>

                            <Link href={`/blog`}>
                                <Button variant="outline" className="group py-7">
                                    Learn more
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}