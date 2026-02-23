"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AppLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Artificial delay to show the loader, combined with window load event
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setIsLoading(false), 800); // 800ms fade transition
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <AnimatePresence>
            {!fadeOut && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05080c] overflow-hidden ${fadeOut ? "pointer-events-none" : ""}`}
                >
                    {/* Subtle background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />

                    <div className="relative flex flex-col items-center">
                        {/* Logo Mark or Monogram */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative flex h-20 w-20 items-center justify-center mb-8"
                        >
                            <div className="absolute inset-0 border border-gold/30 rotate-45 animate-pulse" />
                            <div className="absolute inset-2 border border-gold/20 -rotate-12 transition-transform duration-1000" />
                            <span className="font-heading text-3xl text-gold">K</span>
                        </motion.div>

                        {/* Typography */}
                        <div className="overflow-hidden mb-2">
                            <motion.h1
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="font-heading text-2xl tracking-widest text-white md:text-3xl"
                            >
                                KBS DEVELOPERS
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[10px] tracking-[0.4em] uppercase text-gold/70"
                            >
                                Exclusive Property Showcase
                            </motion.p>
                        </div>

                        {/* Progress line */}
                        <div className="mt-12 w-48 h-[1px] bg-white/10 overflow-hidden rounded-full">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                                className="h-full w-full bg-gradient-to-r from-transparent via-gold to-transparent"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
