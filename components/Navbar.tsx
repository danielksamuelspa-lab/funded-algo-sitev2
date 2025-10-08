import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-brand-blue/90 to-brand-turq/80 text-white shadow-lg">
      {/* Logo and title */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.svg"
          alt="Funded Algorithmic Trader Logo"
          className="h-8 w-8"
        />
        <span className="font-semibold tracking-tight text-lg text-brand-gold drop-shadow-sm">
          Funded Algorithmic Trader
        </span>
      </div>

      {/* Navigation links */}
      <div className="flex gap-

