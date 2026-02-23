"use client";

import type { ReactNode } from "react";

type GoldButtonProps = {
  children: ReactNode;
  className?: string;
  asAnchor?: boolean;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function GoldButton({
  children,
  className = "",
  asAnchor = false,
  href,
  type = "button",
  disabled = false,
  onClick
}: GoldButtonProps): JSX.Element {
  const baseClassName =
    "group relative overflow-hidden inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-xl border border-gold/65 bg-gold px-8 text-sm font-medium tracking-[0.09em] text-[#14181f] shadow-[0_4px_16px_rgba(198,167,94,0.15)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/80 hover:bg-gold-hover hover:shadow-[0_8px_24px_rgba(198,167,94,0.25)] hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.98] active:shadow-[0_4px_16px_rgba(198,167,94,0.15)] disabled:cursor-not-allowed disabled:border-gold/30 disabled:bg-gold/50 disabled:text-[#1a1f27]/70 disabled:shadow-none disabled:hover:translate-y-0 disabled:active:scale-100 sm:w-auto";

  const ShimmerEffect = () => (
    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full" />
  );

  if (asAnchor && href) {
    return (
      <a
        href={href}
        className={`${baseClassName} ${className}`.trim()}
        aria-label={typeof children === "string" ? children : undefined}
      >
        <ShimmerEffect />
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClassName} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      <ShimmerEffect />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
