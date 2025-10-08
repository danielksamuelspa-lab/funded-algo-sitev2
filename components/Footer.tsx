export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-brand-blue/90 to-brand-turq/80 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-brand-gold/90">
          © {new Date().getFullYear()} Funded Algorithmic Trader. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-brand-gold transition-colors">Terms of Use</a>
          <a href="/contact" className="hover:text-brand-gold transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
