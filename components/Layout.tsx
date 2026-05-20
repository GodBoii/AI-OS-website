import React, { ReactNode } from 'react';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import SmoothScroll from './homepage/SmoothScroll';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-[#020202] text-white font-sans selection:bg-white/20 selection:text-white relative">
        {/* Global ambient particle system for scene continuity */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
           <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
           <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        <Header />
        
        <main className="flex-grow pt-28 pb-20 relative z-10">
          {children}
        </main>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Layout;