import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

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
    { href: '/', label: 'Home' },
    { href: '/playbook', label: 'Playbook' },
    { href: '/#features', label: 'Features' },
    { href: '/#download', label: 'Download' },
    { href: '/#about', label: 'About' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neo-bg text-neo-text font-sans selection:bg-primary/30 selection:text-white">
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-4 px-4 md:px-8' : 'top-0'}`}>
        <nav className={`mx-auto transition-all duration-300 ${
          scrolled 
            ? 'max-w-5xl bg-surface/80 backdrop-blur-lg border border-white/10 shadow-2xl rounded-full px-6 py-2' 
            : 'max-w-7xl bg-transparent px-6 py-4'
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
                    scrolled ? 'text-red-400 hover:bg-red-500/10' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 backdrop-blur-md border border-red-500/10'
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
          <div ref={sidebarRef} className={`md:hidden bg-surface/95 backdrop-blur-xl absolute w-full left-0 animate-slide-down shadow-2xl ${scrolled ? 'mt-4 rounded-3xl mx-4 w-[calc(100%-2rem)] border border-white/10' : 'border-t border-white/5'}`}>
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
                  <button onClick={() => { supabase.auth.signOut(); router.push('/'); }} className="block w-full px-4 py-3 text-center rounded-xl text-red-400 hover:bg-red-500/10 font-medium mt-2">Sign Out</button>
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

      <footer className="bg-surface border-t border-white/5 py-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-3 font-bold text-xs text-white shadow-glow-accent">
                  AI
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Aetheria AI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                The operating system for the next generation of intelligence. Seamless, powerful, and built for the future.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/#download" className="hover:text-primary transition-colors">Download App</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Web Workspace</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/playbook" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Creator</h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img src="/Prajwal.jpg" alt="Prajwal" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-white">Prajwal</p>
                  <div className="flex space-x-3 mt-1 text-gray-400 text-sm">
                    <a href="https://github.com/GodBoii" target="_blank" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="https://www.instagram.com/prajwal_._7/?hl=en" target="_blank" className="hover:text-primary transition-colors">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div>© {new Date().getFullYear()} Aetheria AI. All rights reserved.</div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-6 justify-center">
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