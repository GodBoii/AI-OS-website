import Link from 'next/link';
import { FaThreads } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-[#020202] pt-24 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-violet/5 rounded-t-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <img src="/icon-192.png" alt="Aetheria AI Logo" className="w-10 h-10 transition-transform group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              <span className="text-2xl font-bold tracking-tight text-white/90">
                Aetheria AI
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
              We are a cutting-edge startup building the autonomous operating system for the next generation of artificial intelligence. Seamless, powerful, and designed to automate the future.
            </p>
            {/* Original Social Icons */}
            <div className="flex space-x-4">
              <a href="https://youtube.com/@aetheriaai.007?si=cWgv0Rcvh-X3kA1l" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.instagram.com/aetheria._.ai?igsh=MnhsZW5hbG9xNDkz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(225,48,108,0.3)] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.threads.com/@aetheria._.ai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
                <FaThreads className="w-4 h-4" />
              </a>
              <a href="https://x.com/Aetheria__ai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(29,155,240,0.3)] transition-all">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white/90 font-semibold mb-6 text-sm tracking-wider uppercase">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/#features" className="text-white/40 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/download" className="text-white/40 hover:text-white transition-colors">Download App</Link></li>
              <li><Link href="/pricing" className="text-white/40 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/changelog" className="text-white/40 hover:text-white transition-colors flex items-center">Changelog <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white border border-white/10">New</span></Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white/90 font-semibold mb-6 text-sm tracking-wider uppercase">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-white/40 hover:text-white transition-colors">About Us</a></li>
              <li><Link href="/careers" className="text-white/40 hover:text-white transition-colors flex items-center">Careers <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">Hiring</span></Link></li>
              <li><Link href="/contact" className="text-white/40 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05]">
          <div className="text-white/30 text-xs font-mono uppercase tracking-widest mb-4 md:mb-0">
            © {new Date().getFullYear()} Aetheria AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-white/40 text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 text-xs hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
