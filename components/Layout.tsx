import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { FaThreads } from 'react-icons/fa6';

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user || null));
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile menu on outside click or scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    function handleScrollClose() {
      setMobileMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScrollClose, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScrollClose);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/for-you', label: 'For You' },
    { href: '/#download', label: 'Download' },
    { href: '/investor', label: 'Investor' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neo-bg text-neo-text font-sans selection:bg-primary/30 selection:text-white">
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-4 px-4 md:px-8' : 'top-0'}`}>
        <nav className={`mx-auto transition-all duration-300 ${
          scrolled 
            ? 'max-w-5xl bg-surface/80 backdrop-blur-lg border border-white/10 shadow-2xl rounded-full px-6 py-2' 
            : 'max-w-7xl bg-transparent border border-transparent px-6 py-4'
        }`}>
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <img src="/icon.ico" alt="Logo" className="w-8 h-8 mr-3 transition-transform group-hover:scale-105" />
                <span className="text-xl font-bold tracking-tight text-white">Aetheria AI</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = router.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-5 py-2 font-medium text-sm rounded-full transition-all ${
                      scrolled 
                        ? (isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5')
                        : (isActive 
                            ? 'bg-white/10 text-white backdrop-blur-md border border-white/10 shadow-sm' 
                            : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-md border border-white/5')
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3 pl-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link href="/dashboard" className={`px-5 py-2 text-sm font-medium transition-all rounded-full ${
                    scrolled ? 'text-white hover:bg-white/10' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10'
                  }`}>
                    Dashboard
                  </Link>
                  <button onClick={() => { supabase.auth.signOut(); router.push('/'); }} className={`px-5 py-2 text-sm font-medium transition-all rounded-full ${
                    scrolled ? 'text-purple-400 hover:bg-purple-500/10' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 backdrop-blur-md border border-purple-500/10'
                  }`}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className={`px-5 py-2 text-sm font-medium transition-all rounded-full ${
                    scrolled ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-md border border-white/5'
                  }`}>Log In</Link>
                  <Link href="/auth/signup" className={`px-6 py-2 text-sm font-bold text-black transition-all rounded-full ${
                    scrolled ? 'bg-primary hover:bg-primary-dark shadow-glow' : 'bg-primary hover:bg-primary-dark shadow-glow'
                  }`}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div ref={sidebarRef} className={`md:hidden bg-surface/95 backdrop-blur-xl absolute top-full left-0 animate-slide-down shadow-2xl ${scrolled ? 'mt-2 rounded-3xl mx-4 w-[calc(100%-2rem)] border border-white/10' : 'border-t border-white/5 w-full'}`}>
            <div className="p-4 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-gray-300 font-medium hover:text-white hover:bg-white/5 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2"></div>
              {user ? (
                <>
                  <Link href="/dashboard" className="block px-4 py-3 text-center rounded-xl bg-white/10 text-white font-medium">Dashboard</Link>
                  <button onClick={() => { supabase.auth.signOut(); router.push('/'); }} className="block w-full px-4 py-3 text-center rounded-xl text-purple-400 hover:bg-purple-500/10 font-medium mt-2">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-4 py-3 text-center text-gray-300 hover:text-white font-medium">Log In</Link>
                  <Link href="/auth/signup" className="block px-4 py-3 text-center rounded-xl bg-primary text-black font-bold shadow-glow mt-2">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20 overflow-x-hidden relative">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        {children}
      </main>

      <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 relative overflow-hidden mt-12">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Brand & Mission */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-6 group">
                <img src="/icon.ico" alt="Logo" className="w-10 h-10 mr-3 transition-transform group-hover:scale-105 drop-shadow-md" />
                <span className="text-2xl font-bold tracking-tight text-white">Aetheria AI</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
                We are a cutting-edge startup building the autonomous operating system for the next generation of artificial intelligence. Seamless, powerful, and designed to automate the future.
              </p>
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="https://youtube.com/@aetheriaai.007?si=cWgv0Rcvh-X3kA1l" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all border border-white/5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.instagram.com/aetheria._.ai?igsh=MnhsZW5hbG9xNDkz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(225,48,108,0.3)] transition-all border border-white/5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.threads.com/@aetheria._.ai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all border border-white/5">
                  <FaThreads className="w-5 h-5" />
                </a>
                <a href="https://x.com/Aetheria__ai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(29,155,240,0.3)] transition-all border border-white/5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Product</h4>
              <ul className="space-y-3.5 text-sm">
                <li><Link href="/#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#download" className="text-gray-400 hover:text-white transition-colors">Download App</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/changelog" className="text-gray-400 hover:text-white transition-colors flex items-center">Changelog <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/20">New</span></Link></li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Company</h4>
              <ul className="space-y-3.5 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors flex items-center">Careers <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20">Hiring</span></Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm flex items-center">
              © {new Date().getFullYear()} Aetheria AI Inc. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 items-center text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Layout;