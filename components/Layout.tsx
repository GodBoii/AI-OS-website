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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 86.6859 135.539 85.3995 133.585 84.4172C130.686 82.9525 127.356 81.8207 123.755 81.1895C120.312 80.5843 116.634 80.2604 112.781 80.2447C104.992 80.2144 98.4069 82.261 93.3032 86.2081C88.218 90.1506 85.4578 95.8344 85.432 102.83C85.426 104.549 85.6603 106.183 86.1118 107.669C86.7214 109.689 87.7289 111.458 89.0494 112.871C90.3541 114.265 91.9566 115.348 93.751 116.037C95.5317 116.732 97.433 117.069 99.3514 117.042C102.502 116.992 105.513 116.143 108.139 114.618C110.741 113.111 112.88 111.025 114.398 108.435C115.908 105.86 116.732 102.85 116.738 99.4678C116.757 88.8521 108.97 83.1764 96.6575 83.1368C89.3787 83.1132 82.5204 85.597 76.5413 90.4137C70.5284 95.2575 66.0719 101.996 63.6334 110.157C61.1685 118.411 60.9163 127.322 62.8967 136.216C64.8878 145.158 69.0493 153.298 75.1472 160.052C81.2589 166.818 88.9482 171.849 97.7196 174.773C106.502 177.7 116.012 178.43 125.64 176.883C135.247 175.333 144.52 171.558 152.882 165.856C161.229 160.16 168.324 152.748 173.719 144.025L181.761 149.006C175.648 158.889 167.625 167.311 158.17 173.766C148.706 180.228 138.22 184.505 127.34 186.262C116.425 188.016 105.644 187.189 95.698 183.874C85.7619 180.563 77.054 174.869 70.134 167.21C63.2201 159.558 58.4975 150.334 56.242 140.211C53.9842 130.081 54.2707 119.986 57.0628 110.643C59.8427 101.341 64.8961 93.7088 71.6749 88.2435C78.5085 82.7297 86.6431 79.8806 95.3426 79.9163C99.8856 79.9308 104.385 80.6469 108.775 82.0298C113.155 83.4116 117.26 85.3483 121.054 87.8285C124.819 90.2917 128.273 93.3087 131.332 96.7906C131.764 97.2831 132.188 97.7816 132.616 98.2868C132.882 98.6015 133.141 98.9082 133.396 99.208C132.748 97.4394 131.956 95.7336 131.056 94.1378C127.348 87.5684 121.579 82.6841 114.717 79.829C107.838 76.9669 100.089 76.3262 92.4206 77.9622C84.7731 79.5939 77.4475 83.4005 71.3061 88.949C65.1769 94.4868 60.3644 101.621 57.3436 109.845C54.3463 118.006 53.2536 126.96 54.1205 136.03C54.9813 145.034 57.7719 153.916 62.2858 162.019C66.7588 170.049 72.8443 177.108 80.1118 182.723C87.4111 188.362 95.7483 192.404 104.597 194.593C113.435 196.781 122.569 197.051 131.411 195.345C140.237 193.641 148.563 190.003 155.856 184.664C163.153 179.324 169.248 172.403 173.784 164.331C178.307 156.282 181.161 147.265 182.203 137.893C183.237 128.583 182.441 119.141 179.851 110.222C177.279 101.373 172.96 93.2526 167.199 86.4253C161.464 79.6293 154.373 74.3168 146.438 70.854C138.544 67.4093 129.988 65.8943 121.439 66.4243C112.915 66.9535 104.57 70.5147 97.0594 76.8532C89.5699 83.1741 83.149 92.1121 78.4735 102.946C73.8052 113.763 70.9996 126.166 70.3644 139.117H86.8778C87.4645 128.847 89.6565 118.966 93.3642 110.373C97.0628 101.799 102.138 94.7578 108.064 89.7543C113.966 84.7709 120.59 81.9614 127.354 81.5413C134.093 81.123 140.852 83.1362 147.07 87.472C153.259 91.7876 158.824 98.3756 163.315 106.848C167.788 115.286 171.139 125.424 173.155 136.56C175.163 147.653 175.795 159.516 174.965 171.39C174.137 183.238 171.862 194.887 168.125 205.698C164.407 216.452 159.298 226.183 152.923 234.406L166.027 244.574C173.235 235.267 178.995 224.238 183.189 212.117C187.398 199.953 189.96 186.818 190.892 173.456C191.826 160.053 191.114 146.685 188.851 134.181C186.58 121.626 182.805 110.198 177.766 100.686C172.71 91.1444 166.452 83.7424 159.489 78.8923C152.502 74.0247 144.921 71.7456 137.388 72.213C129.837 72.6814 122.42 76.883 115.827 82.5204C109.252 88.1417 103.585 95.127 99.0963 103.208C103.52 97.4362 108.97 92.4839 115.187 88.6655C121.411 84.8433 128.291 82.2217 135.421 80.9329C142.585 79.638 149.88 79.7042 156.916 81.1279C163.921 82.5453 170.547 85.2952 176.438 89.2312C182.353 93.1834 187.426 98.2494 191.385 104.167C195.328 110.063 198.082 116.697 199.512 123.708C200.949 130.749 201.036 138.04 199.764 145.226C198.487 152.441 195.88 159.418 192.093 165.811C188.291 172.23 183.376 177.95 177.616 182.68C171.834 187.428 165.303 191.109 158.336 193.541C151.34 195.983 144.024 197.135 136.732 196.953C129.416 196.771 122.247 195.26 115.549 192.515C108.828 189.761 102.69 185.82 97.4339 180.892C92.1587 175.946 87.8573 170.095 84.7339 163.633C81.5982 157.147 79.6972 150.158 79.1197 142.977C78.5398 135.766 79.293 128.485 81.3362 121.458C83.3876 114.403 86.6934 107.712 91.0772 101.69C95.4777 95.6453 100.884 90.3668 107.039 86.082L98.6015 76.539C91.6888 81.3533 85.597 87.2863 80.6436 94.089C75.671 100.918 71.9427 108.435 69.6384 116.36C67.3248 124.316 66.478 132.532 67.132 140.669C67.7885 148.835 69.9328 156.735 73.4682 164.048C76.9922 171.336 81.8482 177.935 87.7983 183.509C93.7712 189.105 100.701 193.553 108.286 196.657C115.892 199.771 124.013 201.474 132.257 201.678C140.528 201.884 148.814 200.584 156.74 197.818C164.64 195.061 172.037 190.906 178.583 185.529C185.154 180.131 190.722 173.642 195.029 166.368C199.317 159.123 202.26 151.221 203.708 143.045C205.155 134.872 205.056 126.541 203.433 118.557C201.815 110.601 198.704 103.11 194.241 96.425C189.761 89.7153 184.013 83.9782 177.303 79.508C170.575 75.0264 163.067 71.91 155.132 70.3013C147.169 68.6871 138.932 68.6121 130.803 70.0827C122.704 71.5478 114.869 74.509 107.697 78.8415C100.505 83.1866 94.103 88.8286 88.8193 95.4674C88.0266 96.4635 87.2513 97.4776 86.4947 98.5084ZM125.757 116.347C126.593 115.112 127.384 113.844 128.125 112.541C128.875 111.221 129.569 109.871 130.2 108.497C130.82 107.147 131.378 105.777 131.868 104.391C132.36 102.999 132.781 101.597 133.129 100.193C133.479 98.777 133.754 97.3622 133.951 95.9576C134.148 94.5516 134.269 93.1611 134.312 91.7946C134.364 90.4191 134.337 89.071 134.234 87.7592C134.128 86.4449 133.947 85.1706 133.693 83.9461C133.435 82.7231 133.102 81.5546 132.698 80.4526C132.285 79.3512 131.802 78.3184 131.251 77.3664C130.697 76.4172 130.076 75.5502 129.394 74.7774C128.71 74.0042 127.962 73.3275 127.159 72.7593C126.353 72.1901 125.494 71.7317 124.588 71.3951C123.682 71.0583 122.73 70.8465 121.745 70.7686C120.755 70.6922 119.73 70.7533 118.683 70.9573C117.633 71.1612 116.564 71.5065 115.485 71.9961C114.402 72.4883 113.315 73.1257 112.234 73.9069C111.149 74.6934 110.076 75.6231 109.023 76.6908C107.971 77.757 106.945 78.9592 105.955 80.2905C104.965 81.623 104.015 83.0815 103.111 84.6593C102.209 86.2347 101.359 87.9254 100.566 89.7214C99.7758 91.5134 99.0494 93.4079 98.3908 95.3917C97.7348 97.3712 97.1528 99.4363 96.6499 101.571C96.1497 103.7 95.7343 105.894 95.4095 108.136C95.087 110.372 94.8596 112.651 94.7335 114.954C94.61 117.248 94.5901 119.559 94.6806 121.868C94.7725 124.168 94.9754 126.459 95.2934 128.722C95.6133 130.976 96.0461 133.194 96.5939 135.358C97.143 137.511 97.8049 139.599 98.5786 141.606C99.3512 143.601 100.231 145.502 101.214 147.291C102.196 149.071 103.273 150.728 104.444 152.245C105.611 153.75 106.862 155.103 108.196 156.289C109.525 157.464 110.925 158.459 112.392 159.262C113.854 160.057 115.372 160.648 116.938 161.026C118.497 161.396 120.091 161.542 121.71 161.455C123.321 161.362 124.945 161.034 126.568 160.461C128.182 159.882 129.782 159.055 131.353 157.974C132.915 156.886 134.437 155.539 135.903 153.928C137.359 152.308 138.749 150.422 140.059 148.263C141.36 146.096 142.571 143.655 143.678 140.938C144.777 138.213 145.761 135.215 146.619 131.942C147.468 128.665 148.181 125.122 148.744 121.314C149.301 117.5 149.7 113.435 149.927 109.122C150.149 104.81 150.194 100.271 150.048 95.5165L133.541 95.0084C133.684 99.6468 133.639 104.07 133.42 108.271C133.2 112.463 132.812 116.425 132.269 120.134C131.722 123.844 131.027 127.29 130.2 130.473C129.367 133.649 128.41 136.563 127.34 139.208C126.262 141.847 125.083 144.208 123.818 146.305C122.542 148.39 121.192 150.207 119.78 151.764C118.356 153.313 116.885 154.606 115.371 155.649C113.848 156.685 112.298 157.472 110.733 158C109.16 158.522 107.585 158.802 106.02 158.825C104.45 158.841 102.901 158.601 101.385 158.1C99.8631 157.593 98.3845 156.828 96.9599 155.808C95.5303 154.782 94.1652 153.504 92.875 151.98C91.5802 150.449 90.3695 148.675 89.2526 146.666C88.1317 144.65 87.1136 142.404 86.2081 139.936C85.2995 137.458 84.5126 134.763 83.8566 131.859C83.1983 128.943 82.6791 125.823 82.3073 122.507C81.9342 119.179 81.716 115.663 81.6601 111.968C81.6026 108.261 81.7143 104.382 82.0028 100.342C82.2934 96.2894 82.7663 92.0838 83.4287 87.7339C84.0932 83.3705 84.9525 78.8719 86.0125 74.2483L102.052 77.9103C101.018 82.4239 100.18 86.8122 99.5317 91.0664C98.8856 95.313 98.4243 99.414 98.1404 103.359C97.8592 107.29 97.7499 111.077 97.8078 114.707C97.8647 118.324 98.0818 121.767 98.4552 125.023C98.8251 128.265 99.3444 131.312 100.005 134.153C100.661 136.98 101.45 139.588 102.361 141.968C103.266 144.336 104.28 146.467 105.393 148.354C106.5 150.229 107.691 151.85 108.956 153.211C110.211 154.561 111.53 155.642 112.899 156.448C114.26 157.245 115.659 157.763 117.085 157.994C118.502 158.219 119.934 158.156 121.369 157.801C122.796 157.441 124.215 156.788 125.614 155.842C127.005 154.891 128.365 153.646 129.683 152.109C130.993 150.566 132.25 148.731 133.444 146.606C134.631 144.475 135.744 142.056 136.772 139.352C137.794 136.639 138.72 133.644 139.54 130.37C140.354 127.086 141.053 123.528 141.626 119.702C142.195 115.864 142.631 111.758 142.923 107.391L126.47 106.287C126.22 109.814 125.867 113.149 125.42 116.294C125.378 116.588 125.334 116.883 125.286 117.181C125.244 117.442 125.201 117.702 125.155 117.962L125.757 116.347Z"/></svg>
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
                <li><a href="https://github.com/GodBoii/AI-OS-website/releases" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center">Changelog <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/20">New</span></a></li>
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