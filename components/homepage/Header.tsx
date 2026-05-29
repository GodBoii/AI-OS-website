import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Header() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user || null));
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  const navLinks = [
    { href: '/for-you', label: 'For You' },
    { href: '/download', label: 'Download' },
    { href: '/investor', label: 'Investor' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#020202]/80 backdrop-blur-xl border-b border-white/[0.05] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/icon-192.png" alt="Aetheria AI Logo" className="w-8 h-8 transition-transform group-hover:scale-105 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          <span className="text-lg font-bold tracking-tight text-white/90">
            Aetheria AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide">
                Dashboard
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { supabase.auth.signOut(); router.push('/'); }}
                className="px-5 py-2 rounded-full border border-accent-violet/20 bg-accent-violet/10 text-accent-violet text-sm font-medium tracking-wide hover:bg-accent-violet/20 transition-colors"
              >
                Sign Out
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide">
                Log In
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:bg-white/90 transition-colors"
              >
                Sign Up
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
