import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user || null));
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 glass-effect">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-xl font-bold">AI</span>
                </div>
                <span className="text-xl font-bold">AI-OS</span>
              </Link>
              
              <div className="hidden md:flex ml-6 space-x-8">
                <Link href="/" className={`hover:text-blue-400 transition-colors ${router.pathname === '/' ? 'text-blue-400' : ''}`}>Home</Link>
                <Link href="/#features" className="hover:text-blue-400 transition-colors">Features</Link>
                <Link href="/#download" className="hover:text-blue-400 transition-colors">Download</Link>
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
          <div className="md:hidden glass-effect">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className={`block px-3 py-2 hover:text-blue-400 ${router.pathname === '/' ? 'text-blue-400' : ''}`}>Home</Link>
              <Link href="/#features" className="block px-3 py-2 hover:text-blue-400">Features</Link>
              <Link href="/#download" className="block px-3 py-2 hover:text-blue-400">Download</Link>
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
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI-OS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 