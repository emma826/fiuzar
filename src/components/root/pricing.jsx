"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Pricing({
    heading = "Pricing",
    description = "Choose the Plan That Fits Your Needs",
    plans = [
        {
            id: "plus",
            name: "Basic",
            description: "For individuals and small teams",
            monthlyPrice: "$10",
            yearlyPrice: "$100",
            features: [
                { text: "Automated Text Extraction & Variation (Limited character count/variations)" },
                { text: "Video to Social Clip Generation (Limited video length/clips)" },
                { text: "Basic Image & Graphic Adaptation" },
                { text: "Audio to Text Transcription & Summarization (Limited audio length)" },
                { text: "Scheduled Platform Posting (Limited platforms/posts)" },
                { text: "Basic Content Analytics Dashboard & Reporting" },
            ],
            button: {
                text: "Start Free Trial",
                url: "https://www.shadcnblocks.com",
            },
        },
        {
            id: "pro",
            name: "Pro",
            description: "For growing businesses",
            monthlyPrice: "$30",
            yearlyPrice: "$300",
            features: [
                { text: "Automated Text Extraction & Variation (Increased character count/unlimited variations)" },
                { text: "Video to Social Clip Generation (Increased video length/unlimited clips)" },
                { text: "Image & Graphic Adaptation (Advanced editing/branding)" },
                { text: "Audio to Text Transcription & Summarization (Increased audio length)" },
                { text: "Scheduled Platform Posting (All supported platforms/unlimited posts)" },
                { text: "Content Analytics Dashboard (Advanced reporting/data export)" },
                { text: "Team collaboration (up to 3 users)" },
            ],
            button: {
                text: "Start Free Trial",
                url: "https://www.shadcnblocks.com",
            },
        },
    ],
}) {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section className="py-16">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                    <h2 className="text-4xl font-bold text-green-800 text-pretty lg:text-6xl">
                        {heading}
                    </h2>
                    <p className="text-muted-foreground lg:text-xl">{description}</p>
                    <div className="flex items-center text-black gap-3 text-lg">
                        Monthly
                        <Switch
                            checked={isYearly}
                            onCheckedChange={() => setIsYearly(!isYearly)}
                        />
                        Yearly
                    </div>
                    <div className="flex flex-col items-stretch gap-6 md:flex-row">
                        {plans.map((plan) => (
                            <Card
                                key={plan.id}
                                className="flex w-96 flex-col justify-between text-left"
                            >
                                <CardHeader>
                                    <CardTitle className={`text-green-800 text-lg font-bold`}>
                                        <p>{plan.name}</p>
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {plan.description}
                                    </p>
                                    <span className="text-4xl font-bold">
                                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    {/* <p className="text-muted-foreground">
                                        Billed{" "}
                                        {isYearly
                                            ? `$${Number(plan.yearlyPrice.slice(1)) * 10}`
                                            : `$${Number(plan.monthlyPrice.slice(1)) * 10}`}{" "}
                                        annually
                                    </p> */}
                                </CardHeader>
                                <CardContent>
                                    <Separator className="mb-6" />
                                    {plan.id === "pro" && (
                                        <p className="mb-3 font-semibold">
                                            Everything in Basic, and:
                                        </p>
                                    )}
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CircleCheck className="size-4" />
                                                <span>{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button asChild className="w-full text-white bg-green-800 hover:bg-green-700">
                                        <a href={plan.button.url} target="_blank">
                                            {plan.button.text}
                                            <ArrowRight className="ml-2 size-4" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}