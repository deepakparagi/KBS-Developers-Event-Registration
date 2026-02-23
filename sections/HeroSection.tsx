"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { GlassPanel } from "@/components/GlassPanel";
import { GoldButton } from "@/components/GoldButton";

const heroContainer = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2.2,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export function HeroSection(): JSX.Element {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 30]);
  const yGlass = useTransform(scrollY, [0, 800], [0, -15]);

  // Live Hover / Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x * -20); // Move opposite to mouse
    mouseY.set(y * -20);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden px-4 py-16 md:px-10 md:py-20"
    >
      {/* Subtle Parallax Architectural Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <motion.div
          className="relative h-full w-full origin-center"
          style={{ x: smoothMouseX, y: smoothMouseY, scale: 1.05 }}
        >
          <Image
            src="/new-bg-1.jpg"
            alt="Luxury modern architecture skyline"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05080c]/70 via-[#05080c]/60 to-[#05080c]" />
        </motion.div>
      </motion.div>

      <div className="section-shell z-10 w-full relative">
        <motion.div variants={heroContainer} initial="hidden" animate="show" className="w-full">
          <motion.div
            style={{ y: yGlass }}
            className="w-full"
          >
            <GlassPanel className="mx-auto w-full max-w-lg border-white/20 px-4 py-8 md:max-w-xl md:px-8 md:py-12">
              <motion.div variants={textItem} className="mb-6 flex justify-center md:mb-8">
                <Image
                  src="/kbs-logo.png"
                  alt="KBS Developers logo"
                  width={120}
                  height={120}
                  className="h-16 w-16 object-contain md:h-20 md:w-20"
                  priority
                />
              </motion.div>

              <motion.p
                variants={textItem}
                className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted"
              >
                KBS Developers
              </motion.p>

              <motion.p
                variants={textItem}
                className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-gold/70 md:mb-8"
              >
                Knowledge Beyond Success
              </motion.p>

              <motion.h1
                variants={textItem}
                className="mx-auto max-w-2xl text-center font-heading text-3xl leading-tight text-text-primary md:text-5xl lg:text-6xl"
              >
                Exclusive Property Showcase
              </motion.h1>

              <motion.p
                variants={textItem}
                className="mt-5 text-center text-xs uppercase tracking-[0.18em] text-gold md:mt-6 md:text-sm"
              >
                28 February 2026
              </motion.p>

              <motion.p
                variants={textItem}
                className="mx-auto mt-4 max-w-md text-center text-sm text-text-muted md:mt-5 md:text-base"
              >
                An invitation to experience elevated living.
              </motion.p>

              <motion.div
                variants={textItem}
                className="mt-8 flex w-full justify-center md:mt-10"
              >
                <GoldButton asAnchor href="#registration" className="w-full sm:w-auto">
                  Reserve Your Invitation
                </GoldButton>
              </motion.div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
