"use client";

import { motion } from "framer-motion";

export function Floating3DBackground(): JSX.Element {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#05080c]">
            {/* Ambient Base Glow */}
            <motion.div
                className="absolute left-[-15%] top-[-10%] h-[50rem] w-[50rem] rounded-full opacity-[0.15] mix-blend-screen blur-[120px]"
                style={{
                    background: "radial-gradient(circle, rgba(198,167,94,0.4) 0%, rgba(14,21,30,0) 70%)"
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.15, 0.2, 0.15]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Deep Crimson/Warm Accent Intersection */}
            <motion.div
                className="absolute right-[-10%] top-[20%] h-[40rem] w-[40rem] rounded-full opacity-[0.12] mix-blend-color-dodge blur-[100px]"
                style={{
                    background: "radial-gradient(circle, rgba(140,70,30,0.4) 0%, rgba(0,0,0,0) 70%)"
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, 40, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Core Bright Gold Sphere */}
            <motion.div
                className="absolute left-[30%] top-[40%] h-64 w-64 rounded-full opacity-40 mix-blend-screen blur-[60px] md:h-96 md:w-96"
                style={{
                    background: "radial-gradient(circle, rgba(220,185,110,0.8) 0%, rgba(198,167,94,0.1) 50%, rgba(0,0,0,0) 80%)"
                }}
                animate={{
                    x: [0, 20, 0, -15, 0],
                    y: [0, -15, 0, 10, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Subtle 3D Orbital Ring */}
            <motion.div
                className="absolute left-[15%] top-[25%] h-[150%] w-[150%] rounded-[100%] border border-gold/5 border-t-gold/10 border-b-transparent border-l-transparent opacity-30 shadow-[0_0_60px_rgba(198,167,94,0.05)] md:h-[120%] md:w-[120%]"
                style={{
                    transformStyle: "preserve-3d",
                    transformPerspective: "1000px"
                }}
                animate={{
                    rotateZ: [0, 360],
                    rotateX: [65, 70, 65],
                    rotateY: [-15, -10, -15]
                }}
                transition={{
                    rotateZ: { duration: 120, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 25, repeat: Infinity, ease: "easeInOut" }
                }}
            />

            {/* Complex Floating "Glass" and "Gold" Particles */}
            {[...Array(8)].map((_, i) => {
                const isGold = i % 3 === 0;
                return (
                    <motion.div
                        key={`particle-${i}`}
                        className={`absolute rounded-full shadow-glass-glow backdrop-blur-[12px] ${isGold ? "h-3 w-3 blur-[1px]" : "h-12 w-12"
                            }`}
                        style={{
                            left: `${15 + i * 12}%`,
                            top: `${15 + (i * 17) % 70}%`,
                            background: isGold
                                ? "radial-gradient(circle, rgba(255,225,140,0.8) 0%, rgba(198,167,94,0.3) 100%)"
                                : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
                            border: isGold ? "none" : "1px solid rgba(255,255,255,0.04)",
                            opacity: isGold ? 0.8 : 0.5
                        }}
                        animate={{
                            y: [0, isGold ? -20 : -10, 0],
                            x: [0, (isGold ? 10 : 5) * (i % 2 === 0 ? 1 : -1), 0],
                            rotateX: isGold ? 0 : [0, 15, 0, -10, 0],
                            rotateY: isGold ? 0 : [0, 20, 0, -15, 0]
                        }}
                        transition={{
                            duration: (isGold ? 8 : 12) + (i * 0.8),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.4
                        }}
                    />
                );
            })}
        </div>
    );
}
