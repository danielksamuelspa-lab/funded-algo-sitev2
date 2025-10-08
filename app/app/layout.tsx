export const metadata = {
  title: 'Funded Algorithmic Trader',
  description: 'Forex & Gold roadmap, daily plan, strategies, and resources.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
