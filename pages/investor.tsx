import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function Investor() {
  return (
    <Layout>
      <Head>
        <title>Investor Relations | Aetheria AI</title>
        <meta name="description" content="Invest in Aetheria AI. We are building the autonomous operating system for the next generation of artificial intelligence." />
      </Head>

      <div className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          
          <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Seed Round Open
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              Invest in the Future of <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-yellow-accent">Autonomous Execution</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Aetheria is defining the next frontier of AI. We're moving beyond mere chatbots to intelligent swarms that write, deploy, and manage entire software ecosystems autonomously.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-surface border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Market Size</h3>
              <div className="text-4xl font-bold text-white mb-2 tracking-tight">$150B+</div>
              <p className="text-sm text-gray-500">Expanding TAM across enterprise automation, coding, and infrastructure.</p>
            </div>
            <div className="bg-surface border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Traction</h3>
              <div className="text-4xl font-bold text-white mb-2 tracking-tight">10k+</div>
              <p className="text-sm text-gray-500">Waitlist signups and active sandbox deployments in Q1.</p>
            </div>
            <div className="bg-surface border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Growth</h3>
              <div className="text-4xl font-bold text-white mb-2 tracking-tight">25%</div>
              <p className="text-sm text-gray-500">Month-over-month active user retention & workflow engagement.</p>
            </div>
          </div>

          <div className="bg-surface-light border border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Partner with Aetheria</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We are actively looking for strategic partners and visionaries to lead our Seed round. If you understand the shift from generative AI to agentic execution, we want to talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:founders@aetheria.ai" className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary-dark hover:scale-105 transition-all shadow-glow whitespace-nowrap">
                Request Pitch Deck
              </a>
              <a href="mailto:founders@aetheria.ai" className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 hover:scale-105 transition-all whitespace-nowrap">
                Contact Founders
              </a>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
