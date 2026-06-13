import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Cpu, Mail, Database, ArrowRight, DownloadCloud, TrendingUp, FileText, Users } from 'lucide-react';
import { FaWindows, FaLinux, FaAndroid, FaGithub } from 'react-icons/fa6';

export default function Header() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [activeDropdown, setActiveDropdown] = useState<'for-you' | 'download' | 'investor' | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (tab: 'for-you' | 'download' | 'investor') => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveDropdown(tab);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setTimeoutId(id);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

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
    { id: 'for-you', href: '/for-you', label: 'For You' },
    { id: 'download', href: '/download', label: 'Download' },
    { id: 'investor', href: '/investor', label: 'Investor' },
  ] as const;

  const renderDropdownContent = (id: 'for-you' | 'download' | 'investor') => {
    switch (id) {
      case 'for-you':
        return (
          <div className="w-[480px] bg-[#020202]/95 border border-white/[0.08] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-accent-violet/10 text-accent-violet">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold tracking-widest text-accent-violet uppercase">Integrations & Workflows</span>
            </div>
            
            <p className="text-sm text-white/50 mb-5 leading-relaxed font-light">
              Connect Aetheria with your existing tool stack to automate coding, communications, and daily tasks.
            </p>
            
            <div className="grid grid-cols-1 gap-2 mb-6">
              <Link href="/for-you" className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="p-2 rounded-lg bg-white/[0.03] text-white/70 group-hover/item:text-white group-hover/item:bg-white/[0.06] transition-colors mt-0.5">
                  <FaGithub className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">GitHub & Vercel</h4>
                  <p className="text-xs text-white/40 mt-0.5 font-light">Autonomously review PRs, write code, and ship builds.</p>
                </div>
              </Link>
              
              <Link href="/for-you" className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="p-2 rounded-lg bg-white/[0.03] text-white/70 group-hover/item:text-white group-hover/item:bg-white/[0.06] transition-colors mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">Google Workspace</h4>
                  <p className="text-xs text-white/40 mt-0.5 font-light">Draft emails, manage Drive files, and automate sheets.</p>
                </div>
              </Link>

              <Link href="/for-you" className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="p-2 rounded-lg bg-white/[0.03] text-white/70 group-hover/item:text-white group-hover/item:bg-white/[0.06] transition-colors mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">Cloud Databases</h4>
                  <p className="text-xs text-white/40 mt-0.5 font-light">Query, structure, and manage Supabase databases.</p>
                </div>
              </Link>
            </div>
            
            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-xs text-white/30 font-light">Connect in seconds</span>
              <Link href="/for-you" className="inline-flex items-center gap-1 text-xs font-semibold text-accent-violet hover:text-accent-violet/85 transition-colors group/link">
                Explore all workflows 
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>
        );
      case 'download':
        return (
          <div className="w-[400px] bg-[#020202]/95 border border-white/[0.08] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-accent-violet/10 text-accent-violet">
                <DownloadCloud className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold tracking-widest text-accent-violet uppercase">Native Applications</span>
            </div>

            <p className="text-sm text-white/50 mb-5 leading-relaxed font-light">
              Deploy and run autonomous agents locally. Choose your platform to get started.
            </p>

            <div className="grid grid-cols-1 gap-2 mb-6">
              <a href="https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.24/Aetheria.AI.Setup.1.2.24.exe" className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="p-2 rounded-lg bg-[#00a4ef]/10 text-[#00a4ef]/80 group-hover/item:text-[#00a4ef] transition-colors">
                  <FaWindows className="w-4 h-4" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">Windows</h4>
                    <p className="text-xs text-white/30 font-light">x64 Installer (.exe)</p>
                  </div>
                  <span className="text-[10px] text-white/20 px-2 py-0.5 rounded-full border border-white/5 group-hover/item:border-white/10 group-hover/item:text-white/40 transition-colors font-mono">v1.2.24</span>
                </div>
              </a>

              <a href="https://github.com/GodBoii/AI-OS-website/releases/download/v0.0.1/Aetheria.apk" className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="p-2 rounded-lg bg-[#3ddc84]/10 text-[#3ddc84]/80 group-hover/item:text-[#3ddc84] transition-colors">
                  <FaAndroid className="w-4 h-4" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">Android</h4>
                    <p className="text-xs text-white/30 font-light">Mobile client (.apk)</p>
                  </div>
                  <span className="text-[10px] text-white/20 px-2 py-0.5 rounded-full border border-white/5 group-hover/item:border-white/10 group-hover/item:text-white/40 transition-colors font-mono">v0.0.1</span>
                </div>
              </a>

              <a href="https://github.com/GodBoii/AI-OS-website/releases" className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="p-2 rounded-lg bg-white/[0.05] text-white/60 group-hover/item:text-white transition-colors">
                  <FaLinux className="w-4 h-4" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">Linux</h4>
                    <p className="text-xs text-white/30 font-light">Debian/Ubuntu (.deb)</p>
                  </div>
                  <span className="text-[10px] text-white/20 px-2 py-0.5 rounded-full border border-white/5 group-hover/item:border-white/10 group-hover/item:text-white/40 transition-colors font-mono">Stable</span>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-xs text-white/30 font-light">Open source client</span>
              <Link href="/download" className="inline-flex items-center gap-1 text-xs font-semibold text-accent-violet hover:text-accent-violet/85 transition-colors group/link">
                All downloads
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>
        );
      case 'investor':
        return (
          <div className="w-[450px] bg-[#020202]/95 border border-white/[0.08] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-accent-violet/10 text-accent-violet">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs font-bold tracking-widest text-accent-violet uppercase">Investor Relations</span>
                <span className="text-[9px] bg-accent-violet/20 text-accent-violet px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90 origin-left">Seed Open</span>
              </div>
            </div>

            <p className="text-sm text-white/50 mb-5 leading-relaxed font-light">
              Partner with Aetheria to power the next generation of autonomous desktop & mobile software execution.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">Market</span>
                <span className="text-base font-bold text-white tracking-tight">$150B+</span>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">Traction</span>
                <span className="text-base font-bold text-white tracking-tight">10k+</span>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-1">Retention</span>
                <span className="text-base font-bold text-white tracking-tight">25% MoM</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <a href="mailto:aetheria.ai28@gmail.com" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-violet hover:bg-accent-violet/90 text-white text-xs font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-center">
                <FileText className="w-3.5 h-3.5" />
                Request Deck
              </a>
              <a href="mailto:aetheria.ai28@gmail.com" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] text-white text-xs font-bold rounded-xl border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-center">
                <Users className="w-3.5 h-3.5" />
                Contact Founders
              </a>
            </div>

            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-xs text-white/30 font-light">Strategic rounds</span>
              <Link href="/investor" className="inline-flex items-center gap-1 text-xs font-semibold text-accent-violet hover:text-accent-violet/85 transition-colors group/link">
                Investor Page
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            <div 
              key={link.label}
              className="relative py-2"
              onMouseEnter={() => handleMouseEnter(link.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide block"
              >
                {link.label}
              </Link>

              <AnimatePresence>
                {activeDropdown === link.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onMouseEnter={handleDropdownMouseEnter}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 cursor-default"
                  >
                    {renderDropdownContent(link.id)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
