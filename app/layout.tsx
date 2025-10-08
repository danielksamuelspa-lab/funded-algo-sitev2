import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Funded Algorithmic Trader",
  description: "Forex & Gold roadmap, daily plan, strategies, and resources.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-white via-brand-turq/5 to-brand-blue/10 text-brand-ink antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}



