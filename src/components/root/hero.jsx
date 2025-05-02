import { Wifi, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link"
import Image from "next/image"

export default function Header({
    button = {
        text: "Get Started",
        url: "/signup",
    },
    trustText = "Trusted by 500+ Creators Worldwide",
    imageSrc = "/img/hero_bg.png",
    imageAlt = "Fiuzar hero",
}) {
    return (
        <section className="overflow-hidden py-10">
            <div className="container mx-auto">
                <div className="flex flex-col gap-5">
                    <div className="relative flex flex-col gap-5">
                        <div
                            style={{
                                transform: "translate(-50%, -50%)",
                            }}
                            className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
                        >
                            <div className="size-full rounded-full border p-16 md:p-32">
                                <div className="size-full rounded-full border"></div>
                            </div>
                        </div>
                        <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
                            <Image className="w-10 h-10 object-center" src="/img/logo-2.png" width={600} height={600} alt="fiuzar logo" />
                        </span>
                        <h1 className="mx-auto max-w-screen-lg text-center text-4xl font-bold text-balance md:text-6xl">
                            Repurpose Your Content With{" "}
                            <span className="text-primary">Fiuzar</span>
                        </h1>
                        <p className="mx-auto max-w-screen-md text-center text-muted-foreground md:text-lg">
                            Transform your existing content into platform-specific formats with our AI-powered tool.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
                            <Button size="lg" className={`py-7`} asChild>
                                <Link href={button.url}>
                                    {button.text}
                                </Link>
                            </Button>
                            {trustText && (
                                <div className="text-xs text-muted-foreground">{trustText}</div>
                            )}
                        </div>
                    </div>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={400}
                        height={400}
                        className="mx-auto h-full w-full max-w-screen-lg rounded-2xl object-cover lg:hidden"
                    />
                </div>
            </div>
        </section>
    );
};