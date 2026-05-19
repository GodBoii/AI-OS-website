import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Careers() {
  return (
    <>
      <Head>
        <title>Careers | Aetheria AI</title>
        <meta name="description" content="Join our team to build the future of AI operating systems." />
      </Head>

      <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 right-0 w-full max-w-md h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-4xl w-full mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 font-bold tracking-widest uppercase rounded-full mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)] text-sm">
              We're Hiring
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">Build the future with us</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Aetheria AI is on a mission to democratize intelligence. We're looking for passionate individuals who want to craft extraordinary experiences.
            </p>
          </div>

          <div className="bg-[#0c0f12]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-white">Video Editor</h3>
                  <span className="px-2.5 py-1 bg-white/10 text-white text-xs font-semibold rounded-lg">Full-time / Contract</span>
                </div>
                <p className="text-gray-400 text-base max-w-xl">
                  We're looking for an incredibly talented Video Editor to help tell the story of Aetheria AI. You'll be responsible for creating high-end promotional videos, feature showcases, and social media content with a premium, cinematic tech aesthetic.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300">Remote</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300">Premiere Pro / DaVinci</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300">Motion Graphics</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-bold rounded-xl transition-all hover:bg-primary-dark shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105"
                >
                  Contact Us to Apply
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center text-gray-500">
            <p>Don't see a role for you? <Link href="/contact" className="text-primary hover:underline">Reach out</Link> anyway.</p>
          </div>
        </div>
      </div>
    </>
  );
}
