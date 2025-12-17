import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user || null));
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  // Auto-close mobile menu on outside click or scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    function handleScroll() {
      setMobileMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
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
    <div className="flex flex-col min-h-screen bg-neo-bg text-black font-sans selection:bg-neo-lime">
      <header className="fixed top-0 w-full z-50 bg-white border-b-2 border-black">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="w-12 h-12 flex items-center justify-center mr-3 border-2 border-black bg-neo-lime shadow-brutal-sm group-hover:shadow-none group-hover:translate-y-1 transition-all">
                  <img src="/icon.ico" alt="Logo" className="w-8 h-8" />
                </div>
                <span className="text-2xl font-black tracking-tighter">Aetheria ai</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 font-bold uppercase text-sm border-2 border-transparent hover:border-black hover:bg-neo-yellow transition-all ${router.pathname === link.href ? 'bg-black text-white' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3 pl-6 border-l-2 border-black ml-6 h-10">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link href="/dashboard" className="btn-brutal bg-neo-mint py-2 px-4 shadow-brutal-sm hover:shadow-brutal text-sm">
                    Dashboard
                  </Link>
                  <button onClick={() => { supabase.auth.signOut(); router.push('/'); }} className="font-bold border-b-2 border-black hover:bg-red-500 hover:text-white transition-colors">
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="font-bold hover:underline">Log In</Link>
                  <Link href="/auth/signup" className="btn-brutal bg-black text-white py-2 px-6 shadow-brutal-sm text-sm hover:bg-gray-800">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 border-2 border-black shadow-brutal-sm active:shadow-none active:translate-y-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div ref={sidebarRef} className="md:hidden border-t-2 border-black bg-white absolute w-full left-0 animate-slide-down">
            <div className="p-4 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 border-2 border-black font-bold uppercase hover:bg-neo-yellow shadow-brutal-sm text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-black my-2"></div>
              {user ? (
                <>
                  <Link href="/dashboard" className="btn-brutal bg-neo-mint text-center block">Dashboard</Link>
                  <button onClick={() => { supabase.auth.signOut(); router.push('/'); }} className="btn-brutal bg-red-500 text-white text-center block w-full mt-2">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block text-center font-bold py-2 border-2 border-transparent hover:border-black">Log In</Link>
                  <Link href="/auth/signup" className="btn-brutal bg-black text-white text-center block">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-24 pb-12 overflow-x-hidden">
        {children}
      </main>

      <footer className="bg-black text-white border-t-4 border-neo-lime py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-neo-lime border-2 border-white text-black flex items-center justify-center mr-3 font-bold text-xl shadow-[4px_4px_0px_0px_#fff]">
                  AI
                </div>
                <span className="text-2xl font-bold font-mono">AETHERIA</span>
              </div>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                The operating system for the next generation of intelligence.
                <br />
                Brutally efficient.
              </p>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-neo-lime mb-6 border-b-2 border-neo-lime inline-block pb-1">Product</h4>
              <ul className="space-y-3 font-mono">
                <li><Link href="/#features" className="hover:text-neo-lime hover:translate-x-1 inline-block transition-transform">Features</Link></li>
                <li><Link href="/#download" className="hover:text-neo-lime hover:translate-x-1 inline-block transition-transform">Download</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-neo-lime mb-6 border-b-2 border-neo-lime inline-block pb-1">Interact</h4>
              <ul className="space-y-3 font-mono">
                <li><Link href="/contact" className="hover:text-neo-lime hover:translate-x-1 inline-block transition-transform">Contact Protocols</Link></li>
                <li><Link href="/playbook" className="hover:text-neo-lime hover:translate-x-1 inline-block transition-transform">The Playbook</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-neo-lime mb-6 border-b-2 border-neo-lime inline-block pb-1">Creator</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border-2 border-white shadow-[4px_4px_0px_0px_#fff] overflow-hidden grayscale hover:grayscale-0 transition-all">
                  <img src="/Prajwal.jpg" alt="Prajwal" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-lg">Prajwal</p>
                  <div className="flex space-x-2 mt-2">
                    <a href="https://github.com/GodBoii" target="_blank" className="bg-white text-black p-1 hover:bg-neo-lime transition-colors">GH</a>
                    <a href="https://www.instagram.com/prajwal_._7/?hl=en" target="_blank" className="bg-white text-black p-1 hover:bg-neo-pink transition-colors">IG</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 font-mono text-xs uppercase">
            <div>© 2025 Aetheria AI // All Systems Operational</div>
            <div className="mt-4 md:mt-0">
              <a href="mailto:prajwalghadge2005@gmail.com" className="hover:text-white mr-6">Email_Link</a>
              <a href="tel:9619039912" className="hover:text-white">Secure_Line</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;