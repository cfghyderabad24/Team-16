"use client";

import { LampContainer } from "@/components/ui/lamp";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";

import { motion } from "framer-motion";
// import { LampContainer } from "../ui/lamp";

export default function Home() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen pt-24 overflow-hidden rounded-md">
            {/* <div className="absolute inset-0 w-full h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={2.6}
                    maxSize={3.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="FFFF00"
                />
            </div>
            <h1 className="relative z-20 text-2xl font-bold text-center md:text-7xl lg:text-6xl">
                Welcome to CRY Alerts Portal
            </h1> */}
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="py-4 mt-8 text-4xl font-medium tracking-tight text-center text-transparent bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text md:text-7xl"
                >
                    Welcome to
                    <br /> CRY Alerts
                </motion.h1>
            </LampContainer>
        </div>
    );
}
