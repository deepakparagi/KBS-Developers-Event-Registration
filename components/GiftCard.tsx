"use client";

import { motion } from "framer-motion";

interface GiftCardProps {
    name: string;
}

export function GiftCard({ name }: GiftCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl w-full perspective-[1000px] shadow-2xl"
        >
            <div className="relative overflow-hidden rounded-2xl border-[0.5px] border-gold/40 bg-[#080b11] p-[2px] transition-transform duration-500 ease-out group-hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] origin-center inline-block w-full">

                {/* Animated Gold Gradient Border wrapper */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/50 via-transparent to-gold/20 opacity-40 mix-blend-overlay group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute inset-x-0 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
                <div className="absolute inset-x-0 -bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-20" />

                <div className="relative rounded-xl bg-[#030508] p-8 md:p-12 overflow-hidden flex flex-col items-center text-center">

                    {/* Background glow & noise */}
                    <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gold/5 blur-[80px]" />
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: 'url("/noise.png")' }} />


                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                        className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-lg rotate-45 border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        <div className="absolute inset-0 border border-gold/20 m-1 rounded-sm" />
                        <svg className="h-6 w-6 -rotate-45 text-gold translate-x-[1px] translate-y-[-1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>

                    <h3 className="relative z-10 mb-2 font-heading text-3xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-wide md:text-4xl pb-1">
                        Registration Confirmed
                    </h3>

                    <p className="relative z-10 mb-10 text-[10px] tracking-[0.3em] font-medium uppercase text-gold">
                        Your Exclusive Pass
                    </p>

                    <div className="w-full relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 md:p-8 backdrop-blur-xl group-hover:border-gold/30 transition-colors duration-500">
                        {/* Shimmer effect inside card */}
                        <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                        <p className="relative z-10 text-[9px] font-semibold uppercase tracking-[0.4em] text-white/50 mb-4">
                            Guest of Honor
                        </p>
                        <p className="relative z-10 font-heading text-2xl md:text-3xl text-gold tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            {name}
                        </p>

                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    <p className="relative z-10 mt-10 text-[10px] tracking-[0.2em] text-white/40 uppercase text-center w-full">
                        Your VIP Access &bull; An unforgettable evening awaits
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
