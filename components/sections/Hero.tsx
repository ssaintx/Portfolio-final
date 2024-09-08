"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";
import { ChevronDownIcon, ChevronRightIcon, FileIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import GridPattern from "../magicui/grid-pattern";
import AnimatedShinyText from "../magicui/animated-shiny-text";

export const Hero = () => {
    const t = useTranslations("Hero");

    return (
        <section className="flex flex-col items-center justify-center pt-20" id="home">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                }}
                className="mt-5 z-10">
                <div
                    className={cn(
                        "border-none h-8 rounded-full text-base transition-all ease-in hover:cursor-pointer dark-light-secondary hover:bg-zinc-200 dark:hover:bg-zinc-800",
                    )}
                >
                    <AnimatedShinyText className="flex items-center justify-center px-4 py-1 transition ease-out hover:text-zinc-600 hover:duration-300 hover:dark:text-zinc-400">
                        <span>{t("Badge")}</span>
                        <ChevronRightIcon className="transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                </div>
            </motion.div>

            <div>
                <motion.h1
                    initial={{
                        opacity: 0,
                        x: -50,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 1,
                    }}
                    className="mt-10 text-2xl md:text-4xl capitalize font-semibold text-center">{t("Heading")}</motion.h1>
                <motion.p
                    initial={{
                        opacity: 0,
                        x: -100,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 2,
                    }}
                    className="text-gray-500">{t("Subheading")}</motion.p>
            </div>

            <div>
                <Link
                    href={`/assets/LazizbekCV.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="LazizbekCV.pdf"
                    className="button"
                >
                    <FileIcon className="size-5" /> {t("Button")}
                </Link>
            </div>

            <Separator orientation="horizontal" className="mt-10 bg-gray-500 w-[100px]" />

            <div className="flex items-center justify-center mt-3 gap-3">
                <GitHubLogoIcon className="size-7" />
                <Separator orientation="vertical" className="bg-gray-500 h-[40px]" />
                <LinkedInLogoIcon className="size-7" />
            </div>

            <div className="mt-8 md:mt-18 xl:mt-20 animate-bounce">
                <Link href="#about"><ChevronDownIcon className="size-7 cursor-pointer" /></Link>
            </div>

            <GridPattern
                width={60}
                height={60}
                x={-1}
                y={-1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                )}
            />
        </section>
    );
};