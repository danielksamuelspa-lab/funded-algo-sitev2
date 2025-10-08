import "./globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Funded Algorithmic Trader",
  description: "Forex & Gold roadmap, daily plan, strategies, and resources.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white via-brand-turq/5 to-brand-blue/10 text-brand-ink">
        {children}
      </body>
    </html>
  );
}

