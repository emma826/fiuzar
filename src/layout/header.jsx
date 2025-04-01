"use client";

import Image from "next/image"
import Link from "next/link"

import { MenuIcon } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const features = [
    {
        title: "Dashboard",
        description: "Overview of your activity",
        href: "#",
    },
    {
        title: "Analytics",
        description: "Track your performance",
        href: "#",
    },
    {
        title: "Settings",
        description: "Configure your preferences",
        href: "#",
    },
    {
        title: "Integrations",
        description: "Connect with other tools",
        href: "#",
    },
    {
        title: "Storage",
        description: "Manage your files",
        href: "#",
    },
    {
        title: "Support",
        description: "Get help when needed",
        href: "#",
    },
];

export default function Header() {
    return (
        <section className="px-3 sticky top-0 bg-white z-50">
            <div className="container md:mx-auto py-3">
                <nav className="flex items-center justify-between pt-5 lg:pt-0">
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <Image
                            src="/img/logo-2.png"
                            className="h-8 w-8"
                            alt="Fiuzar logo"
                            width={400}
                            height={400}
                        />
                        <span className="text-2xl font-bold tracking-tighter">
                            Fiuzar
                        </span>
                    </Link>
                    <NavigationMenu className="hidden lg:block">
                        <NavigationMenuList>
                            {/* <NavigationMenuItem>
                                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid w-[600px] grid-cols-2 p-3">
                                        {features.map((feature, index) => (
                                            <NavigationMenuLink
                                                href={feature.href}
                                                key={index}
                                                className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                            >
                                                <div key={feature.title}>
                                                    <p className="mb-1 font-semibold text-foreground">
                                                        {feature.title}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem> */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {/* <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/pricing"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Pricing
                                </NavigationMenuLink>
                            </NavigationMenuItem> */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/blog"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Blog
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/about"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    About Us
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="hidden items-center gap-4 lg:flex">
                        <Link href={`login`} className={`rounded-lg py-3 px-6 bg-green-800 text-background`}>Start for free</Link>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline" size="icon">
                                <MenuIcon className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="max-h-screen overflow-hidden px-1">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2"
                                    >
                                        <Image
                                            src="/img/logo-2.png"
                                            className="h-8 w-8"
                                            alt="Fiuzar logo"
                                            width={400}
                                            height={400}
                                        />
                                        <span className="text-lg font-semibold tracking-tighter">
                                            Fiuzar
                                        </span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col p-4">
                                {/* <Accordion type="single" collapsible className="mt-4 mb-2">
                                    <AccordionItem value="solutions" className="border-none">
                                        <AccordionTrigger className="text-base hover:no-underline">
                                            Features
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid md:grid-cols-2">
                                                {features.map((feature, index) => (
                                                    <a
                                                        href={feature.href}
                                                        key={index}
                                                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                                    >
                                                        <div key={feature.title}>
                                                            <p className="mb-1 font-semibold text-foreground">
                                                                {feature.title}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {feature.description}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion> */}
                                <div className="flex flex-col gap-6">
                                    <Link href="/" className="font-medium">
                                        Home
                                    </Link>
                                    <Link href="/blog" className="font-medium">
                                        Blog
                                    </Link>
                                    <Link href="/about" className="font-medium">
                                        About Us
                                    </Link>
                                </div>
                                <div className="mt-6 flex flex-col gap-4">
                                    <Link href={`login`} className={`rounded-lg py-3 px-6 bg-green-800 text-background`}>Start for free</Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    )
}