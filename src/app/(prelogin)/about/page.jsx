import { CircleArrowRight, Files, Settings } from "lucide-react";

import Image from "next/image";

export default function AboutPage() {
    return (
        <>
            <section className="py-16">
                <div className="container flex flex-col gap-28 mx-auto">

                    <section className="relative xl:mr-0 lg:mr-5 mr-0">
                        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                            <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
                                <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                                    <div className="w-full flex-col justify-center items-start gap-8 flex">
                                        <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                                            <h6 className="text-gray-400 text-base font-normal leading-relaxed">About Us</h6>
                                            <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                                <h1
                                                    className="text-4xl text-green-800 font-bold font-manrope leading-normal lg:text-start text-center">
                                                    Simplifying Content Repurposing for Everyone</h1>
                                                <p
                                                    className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                                    We're a team of content creators and marketers who understand the struggle of repurposing content. That's why we built Fiuzar to simplify the process and help you maximize your content's impact.
                                                    </p>
                                            </div>
                                        </div>
                                        <div className="w-full flex-col justify-center items-start gap-6 flex">
                                            <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                                                <div
                                                    className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">5000+ Projects Completed</h4>
                                                    <p className="text-gray-500 text-base font-normal leading-relaxed">Delivering quality and innovation across diverse industries.</p>
                                                </div>
                                                <div
                                                    className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">10+ Team Members</h4>
                                                    <p className="text-gray-500 text-base font-normal leading-relaxed">A passionate team dedicated to achieving excellence.</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                                                <div
                                                    className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">5+ Countries Served</h4>
                                                    <p className="text-gray-500 text-base font-normal leading-relaxed">Expanding our reach to empower global audiences.</p>
                                                </div>
                                                <div
                                                    className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">98% Customer Satisfaction</h4>
                                                    <p className="text-gray-500 text-base font-normal leading-relaxed">Committed to delivering exceptional experiences.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:justify-start justify-center items-start flex">
                                    <div
                                        className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                                        <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                                            src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    
                    <div className="flex flex-col gap-6 md:gap-20 px-4">
                        <div className="max-w-xl">
                            <h2 className="mb-2.5 text-2xl font-semibold md:text-5xl">
                                Our Mission & Values
                            </h2>
                            <p className="text-muted-foreground">
                                We aim to make content creation effortless by turning long form pieces into platform-ready gems in seconds
                            </p>
                            <p className="text-muted-foreground">
                                We are just getting started, New features, smarter AI and a full suite of marketing tools are coming.
                            </p>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}