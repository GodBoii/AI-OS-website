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
          <div className="w-full h-[290px] bg-[#020202]/95 border border-white/[0.08] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-left flex gap-8">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3.5">
                  <div className="p-1 rounded-lg bg-accent-violet/10 text-accent-violet">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-accent-violet uppercase">Integrations & Workflows</span>
                </div>
                
                <p className="text-sm text-white/50 mb-3.5 leading-relaxed font-light max-w-xl">
                  Connect Aetheria with your existing tool stack to automate coding, communications, and daily tasks. 
                  Streamline your execution pipeline directly from the OS.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-3.5">
                  <Link href="/for-you" className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
                    <div className="p-2 rounded-lg bg-white/[0.03] text-white/70 group-hover/item:text-white group-hover/item:bg-white/[0.06] transition-colors mt-0.5">
                      <FaGithub className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors mb-0.5">GitHub & Vercel</h4>
                      <p className="text-xs text-white/40 font-light leading-snug">Autonomously review PRs, write code, and ship builds.</p>
                    </div>
                  </Link>
                  
                  <Link href="/for-you" className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
                    <div className="p-2 rounded-lg bg-white/[0.03] text-white/70 group-hover/item:text-white group-hover/item:bg-white/[0.06] transition-colors mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors mb-0.5">Google Workspace</h4>
                      <p className="text-xs text-white/40 font-light leading-snug">Draft emails, manage Drive files, and automate sheets.</p>
                    </div>
                  </Link>

                  <Link href="/for-you" className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
                    <div className="p-2 rounded-lg bg-white/[0.03] text-white/70 group-hover/item:text-white group-hover/item:bg-white/[0.06] transition-colors mt-0.5">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors mb-0.5">Cloud Databases</h4>
                      <p className="text-xs text-white/40 font-light leading-snug">Query, structure, and manage Supabase databases.</p>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="pt-3.5 border-t border-white/[0.05] flex items-center justify-between mt-auto">
                <span className="text-xs text-white/30 font-light">Connect in seconds</span>
                <Link href="/for-you" className="inline-flex items-center gap-2 text-xs font-semibold text-accent-violet hover:text-accent-violet/85 transition-colors group/link">
                  Explore all workflows 
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
            
            <div className="w-[320px] bg-white/[0.02] rounded-2xl border border-white/[0.05] overflow-hidden relative group shrink-0">
              <img src="/integrations.png" alt="Integrations" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-8 h-8 rounded-full bg-accent-violet/20 flex items-center justify-center mb-3 backdrop-blur-sm border border-accent-violet/30">
                  <Cpu className="w-4 h-4 text-accent-violet" />
                </div>
                <span className="text-white font-semibold text-lg block mb-1 drop-shadow-md tracking-tight">Seamless Integrations</span>
                <span className="text-white/70 text-xs block font-light leading-relaxed">Connect with the tools you already use every day directly from the OS layer.</span>
              </div>
            </div>
          </div>
        );
      case 'download':
        return (
          <div className="w-full h-[290px] bg-[#020202]/95 border border-white/[0.08] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-left flex gap-8">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3.5">
                  <div className="p-1 rounded-lg bg-accent-violet/10 text-accent-violet">
                    <DownloadCloud className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-accent-violet uppercase">Native Applications</span>
                </div>

                <p className="text-sm text-white/50 mb-3.5 leading-relaxed font-light max-w-xl">
                  Deploy and run autonomous agents locally. Choose your platform to get started with blazing fast execution speeds.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3.5">
                  <a href="https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.24/Aetheria.AI.Setup.1.2.24.exe" className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
                    <div className="p-2 rounded-lg bg-[#00a4ef]/10 text-[#00a4ef]/80 group-hover/item:text-[#00a4ef] transition-colors">
                      <FaWindows className="w-5 h-5" />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors mb-0.5">Windows</h4>
                        <p className="text-xs text-white/30 font-light">x64 Installer (.exe)</p>
                      </div>
                      <span className="text-[10px] text-white/20 px-2 py-0.5 rounded-full border border-white/5 group-hover/item:border-white/10 group-hover/item:text-white/40 transition-colors font-mono">v1.2.24</span>
                    </div>
                  </a>

                  <a href="https://github.com/GodBoii/AI-OS-website/releases/download/v0.0.1/Aetheria.apk" className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
                    <div className="p-2 rounded-lg bg-[#3ddc84]/10 text-[#3ddc84]/80 group-hover/item:text-[#3ddc84] transition-colors">
                      <FaAndroid className="w-5 h-5" />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors mb-0.5">Android</h4>
                        <p className="text-xs text-white/30 font-light">Mobile client (.apk)</p>
                      </div>
                      <span className="text-[10px] text-white/20 px-2 py-0.5 rounded-full border border-white/5 group-hover/item:border-white/10 group-hover/item:text-white/40 transition-colors font-mono">v0.0.1</span>
                    </div>
                  </a>

                  <a href="https://github.com/GodBoii/AI-OS-website/releases" className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
                    <div className="p-2 rounded-lg bg-white/[0.05] text-white/60 group-hover/item:text-white transition-colors">
                      <FaLinux className="w-5 h-5" />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors mb-0.5">Linux</h4>
                        <p className="text-xs text-white/30 font-light">Debian/Ubuntu (.deb)</p>
                      </div>
                      <span className="text-[10px] text-white/20 px-2 py-0.5 rounded-full border border-white/5 group-hover/item:border-white/10 group-hover/item:text-white/40 transition-colors font-mono">Stable</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="pt-3.5 border-t border-white/[0.05] flex items-center justify-between mt-auto">
                <span className="text-xs text-white/30 font-light">Open source client</span>
                <Link href="/download" className="inline-flex items-center gap-2 text-xs font-semibold text-accent-violet hover:text-accent-violet/85 transition-colors group/link">
                  All downloads
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="w-[320px] bg-white/[0.02] rounded-2xl border border-white/[0.05] overflow-hidden relative group shrink-0">
              <img src="/stock4_deployed.png" alt="Deploy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 backdrop-blur-sm border border-blue-500/30">
                  <DownloadCloud className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-white font-semibold text-lg block mb-1 drop-shadow-md tracking-tight">Native Performance</span>
                <span className="text-white/70 text-xs block font-light leading-relaxed">Experience Aetheria locally with deep OS-level integrations.</span>
              </div>
            </div>
          </div>
        );
      case 'investor':
        return (
          <div className="w-full h-[290px] bg-[#020202]/95 border border-white/[0.08] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-left flex gap-8">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3.5">
                  <div className="p-1 rounded-lg bg-accent-violet/10 text-accent-violet">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-bold tracking-widest text-accent-violet uppercase">Investor Relations</span>
                    <span className="text-[9px] bg-accent-violet/20 text-accent-violet px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Seed Open</span>
                  </div>
                </div>

                <p className="text-sm text-white/50 mb-3.5 leading-relaxed font-light max-w-xl">
                  Partner with Aetheria to power the next generation of autonomous desktop & mobile software execution. 
                  We are building the foundational orchestration engine for AI.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-3.5">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl py-2 px-3 text-center transition-colors hover:bg-white/[0.04]">
                    <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-0.5">Market</span>
                    <span className="text-lg font-bold text-white tracking-tight">$150B+</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl py-2 px-3 text-center transition-colors hover:bg-white/[0.04]">
                    <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-0.5">Traction</span>
                    <span className="text-lg font-bold text-white tracking-tight">10k+</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl py-2 px-3 text-center transition-colors hover:bg-white/[0.04]">
                    <span className="text-[10px] uppercase tracking-wider text-white/30 block mb-0.5">Retention</span>
                    <span className="text-lg font-bold text-white tracking-tight">25% MoM</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3.5">
                  <a href="mailto:aetheria.ai28@gmail.com" className="flex items-center justify-center gap-2 px-4 py-2 bg-accent-violet hover:bg-accent-violet/90 text-white text-xs font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <FileText className="w-3.5 h-3.5" />
                    Request Deck
                  </a>
                  <a href="mailto:aetheria.ai28@gmail.com" className="flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] text-white text-xs font-bold rounded-xl border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-center">
                    <Users className="w-3.5 h-3.5" />
                    Contact Founders
                  </a>
                </div>
              </div>

              <div className="pt-3.5 border-t border-white/[0.05] flex items-center justify-between mt-auto">
                <span className="text-xs text-white/30 font-light">Strategic rounds</span>
                <Link href="/investor" className="inline-flex items-center gap-2 text-xs font-semibold text-accent-violet hover:text-accent-violet/85 transition-colors group/link">
                  Investor Page
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="w-[320px] bg-white/[0.02] rounded-2xl border border-white/[0.05] overflow-hidden relative group shrink-0">
              <img src="/stock3_rocket.png" alt="Growth" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-3 backdrop-blur-sm border border-green-500/30">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white font-semibold text-lg block mb-1 drop-shadow-md tracking-tight">Join the Revolution</span>
                <span className="text-white/70 text-xs block font-light leading-relaxed">Be part of the next generation of AI execution.</span>
              </div>
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
      <div className="container relative mx-auto px-4 max-w-7xl flex items-center justify-between">
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

        {/* Full Width Mega Menu Dropdown */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute top-full mt-4 left-4 right-4 z-50 cursor-default"
            >
              {renderDropdownContent(activeDropdown)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
