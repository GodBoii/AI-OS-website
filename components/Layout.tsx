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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 glass-effect">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center mr-3">
                  <img src="/icon.ico" alt="AI-OS Logo" className="w-full h-full" />
                </div>
                <span className="text-xl font-bold">AI-OS</span>
              </Link>
              
              <div className="hidden md:flex ml-6 space-x-8">
                <Link href="/" className={`hover:text-blue-400 transition-colors ${router.pathname === '/' ? 'text-blue-400' : ''}`}>Home</Link>
                <Link href="/#features" className="hover:text-blue-400 transition-colors">Features</Link>
                <Link href="/#download" className="hover:text-blue-400 transition-colors">Download</Link>
                <Link href="/#about" className="hover:text-blue-400 transition-colors">About</Link>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">Dashboard</Link>
                  <button onClick={() => { supabase.auth.signOut(); router.push('/'); }} className="text-red-400 hover:text-red-300 transition-colors px-4 py-2">Sign Out</button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2">Log In</Link>
                  <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Sign Up</Link>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div ref={sidebarRef} className="md:hidden glass-effect">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className={`block px-3 py-2 hover:text-blue-400 ${router.pathname === '/' ? 'text-blue-400' : ''}`}>Home</Link>
              <Link href="/#features" className="block px-3 py-2 hover:text-blue-400">Features</Link>
              <Link href="/#download" className="block px-3 py-2 hover:text-blue-400">Download</Link>
              <Link href="/#about" className="block px-3 py-2 hover:text-blue-400">About</Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="block px-3 py-2 hover:text-blue-400">Dashboard</Link>
                  <button onClick={() => { supabase.auth.signOut(); router.push('/'); }} className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-3 py-2 hover:text-blue-400">Log In</Link>
                  <Link href="/auth/signup" className="block px-3 py-2 hover:text-blue-400">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-16">{children}</main>

      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <span className="text-lg font-bold">AI-OS</span>
              </div>
              <p className="text-gray-400">The future of intelligent computing</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#features" className="hover:text-white">Features</Link></li>
                <li><Link href="/#download" className="hover:text-white">Download</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">About Me</h4>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                  <img src="/Prajwal.jpg" alt="Prajwal" className="w-full h-full object-cover" />
                </div>
                <p className="text-gray-400 mb-3">Prajwal</p>
                <div className="flex space-x-3">
                  <a href="https://github.com/GodBoii" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/prajwal_._7/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772a4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="mb-2">developed by Prajwal Ghadge</div>
            <div className="mb-1">Email: <a href="mailto:prajwalghadge2005@gmail.com" className="text-blue-400 underline">prajwalghadge2005@gmail.com</a></div>
            <div>Phone: <a href="tel:9619039912" className="text-blue-400 underline">9619039912</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;