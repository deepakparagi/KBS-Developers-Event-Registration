import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { AppLoader } from "@/components/AppLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  title: "KBS Developers | Exclusive Property Showcase",
  description: "An invitation to experience elevated living with KBS Developers."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-background text-text-primary`}>
        <AppLoader />
        {children}
      </body>
    </html>
  );
}
