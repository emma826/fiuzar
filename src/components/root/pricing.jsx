"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useState } from "react";

import Link from "next/link";

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
    singlePlan = [
        { text: "Automated Text Extraction & Variation" },
        { text: "Video to Social Clip Generation" },
        { text: "Basic Image & Graphic Adaptation" },
        { text: "Audio to Text Transcription & Summarization" },
        { text: "Scheduled Platform Posting" },
        { text: "Basic Content Analytics Dashboard & Reporting" },
    ],
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
        <div className="p-4 h-screen container mx-auto dark:bg-gray-800">
            <div
                className="max-w-lg mx-auto rounded-lg overflow-hidden lg:max-w-none lg:flex my-10 shadow-teal border-4 border-green-800">
                <div className="bg-white px-6 py-8 lg:flex-shrink-1 lg:p-12">
                    <h2
                        className="text-3xl text-left leading-8 font-extrabold text-green-800 sm:text-3xl sm:leading-9 dark:text-gray-100">
                        Pricing
                    </h2>
                    <p className="mt-6 text-left font-ttnorms leading-8 text-gray-500 text-lg dark:text-gray-400">
                        The subscription grants you access to a wide range of exclusive benefits and perks.
                    </p>
                    <div className="mt-8">
                        <div className="flex items-center">
                            <h4
                                className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-green-800">
                                What's included
                            </h4>
                            <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <ul className="pl-0 mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 space-y-5 lg:space-y-0">
                            {singlePlan.map((plan, index) => (
                                <li key={index} className="flex items-start lg:col-span-1">
                                    <div className="flex-shrink-0"><svg className="h-5 w-5 text-green-800 dark:text-teal-300"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd">
                                        </path>
                                    </svg>
                                    </div>
                                    <p className="ml-3 text-lg leading-5 text-gray-700 font-ttnorms text-left dark:text-gray-300">
                                        {plan.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div
                    className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 dark:bg-gray-900">
                    <p
                        className="text-xl leading-6 font-medium text-gray-900 lg:max-w-xs lg:mx-auto mb-0 lg:mb-6 dark:text-gray-100">
                        For individuals and small teams
                    </p>
                    <div
                        className="my-10 lg:my-6 flex items-baseline justify-center text-5xl leading-none font-extrabold text-gray-900 dark:text-gray-100">
                        <span className="font-brown">$15</span><span className="text-xl leading-7 font-medium text-gray-500 font-ttnorms">/month</span>
                    </div>
                    <div className="lg:mt-6">
                        <div className="rounded-md shadow">
                            <Link href="/checkout"
                                className="flex items-center justify-center px-5 py-3 leading-6 font-medium rounded-md focus:outline-none focus:ring transition duration-200 ease-in-out shadow-teal border-2 border-green-800 bg-white hover:bg-green-700 hover:shadow-green-hover text-green-800 hover:text-white text-lg relative z-20 dark:bg-teal-400 dark:text-white dark:hover:bg-teal-500 dark:hover:text-white">
                                Start your 14-days trial
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <section className="py-16">
    //         <div className="container mx-auto px-2 lg:px-0">
    //             <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
    //                 <h2 className="text-4xl font-bold text-green-800 text-pretty lg:text-6xl">
    //                     {heading}
    //                 </h2>
    //                 <p className="text-muted-foreground lg:text-xl">{description}</p>
    //                 <div className="flex items-center text-black gap-3 text-lg">
    //                     Monthly
    //                     <Switch
    //                         checked={isYearly}
    //                         onCheckedChange={() => setIsYearly(!isYearly)}
    //                     />
    //                     Yearly
    //                 </div>
    //                 <div className="flex flex-col items-stretch gap-6 md:flex-row">
    //                     {plans.map((plan) => (
    //                         <Card
    //                             key={plan.id}
    //                             className="flex w-96 flex-col justify-between text-left"
    //                         >
    //                             <CardHeader>
    //                                 <CardTitle className={`text-green-800 text-lg font-bold`}>
    //                                     <p>{plan.name}</p>
    //                                 </CardTitle>
    //                                 <p className="text-sm text-muted-foreground">
    //                                     {plan.description}
    //                                 </p>
    //                                 <span className="text-4xl font-bold">
    //                                     {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
    //                                 </span>
    //                                 {/* <p className="text-muted-foreground">
    //                                     Billed{" "}
    //                                     {isYearly
    //                                         ? `$${Number(plan.yearlyPrice.slice(1)) * 10}`
    //                                         : `$${Number(plan.monthlyPrice.slice(1)) * 10}`}{" "}
    //                                     annually
    //                                 </p> */}
    //                             </CardHeader>
    //                             <CardContent>
    //                                 <Separator className="mb-6" />
    //                                 {plan.id === "pro" && (
    //                                     <p className="mb-3 font-semibold">
    //                                         Everything in Basic, and:
    //                                     </p>
    //                                 )}
    //                                 <ul className="space-y-4">
    //                                     {plan.features.map((feature, index) => (
    //                                         <li key={index} className="flex items-center gap-2">
    //                                             <CircleCheck className="size-4" />
    //                                             <span>{feature.text}</span>
    //                                         </li>
    //                                     ))}
    //                                 </ul>
    //                             </CardContent>
    //                             <CardFooter className="mt-auto">
    //                                 <Button asChild className="w-full text-white bg-green-800 hover:bg-green-700">
    //                                     <a href={plan.button.url} target="_blank">
    //                                         {plan.button.text}
    //                                         <ArrowRight className="ml-2 size-4" />
    //                                     </a>
    //                                 </Button>
    //                             </CardFooter>
    //                         </Card>
    //                     ))}
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // )
}