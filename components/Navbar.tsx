import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-brand-blue/90 to-brand-turq/80 text-white shadow-soft sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt="Brand logo"
          className="h-8 w-8 rounded-lg shadow-soft"
        />
        <span className="font-semibold tracking-tight text-lg">
          Funded Algorithmic Trader
        </span>
      </div>

      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <Link href="/course" className="hover:text-brand-gold transition-colors">Course</Link>
        <Link href="/roadmap" className="hover:text-brand-gold transition-colors">Roadmap</Link>
        <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
