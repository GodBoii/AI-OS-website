import React from 'react';
import Head from 'next/head';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing | Aetheria AI</title>
        <meta name="description" content="Choose the perfect plan for your AI workflows." />
      </Head>

      <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-6xl w-full mx-auto">
          <div className="text-center mb-16 relative z-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">Choose your plan</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Subscriptions are billed monthly through Razorpay. Upgrade anytime to scale your intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Core Plan */}
            <div className="bg-[#0f1115]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col relative transition-transform hover:scale-105 duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
              <div className="mb-6 relative z-10">
                <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-wider uppercase rounded-full mb-4">Core</span>
                <h3 className="text-2xl font-bold text-white mb-4">Core</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-white">Rs 0</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-400 h-10">For evaluation and light daily usage.</p>
              </div>
              <div className="mt-4 mb-8 flex-grow relative z-10">
                <div className="text-sm text-white font-medium">50,000 tokens/day</div>
              </div>
              <button className="relative z-10 w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                Current plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#121110]/80 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 flex flex-col relative transition-transform hover:scale-105 duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden transform md:-translate-y-4">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none"></div>
              <div className="absolute -top-[100px] -left-[100px] w-[200px] h-[200px] bg-yellow-500/20 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="mb-6 relative z-10">
                <span className="inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-xs font-bold tracking-wider uppercase rounded-full mb-4 shadow-[0_0_10px_rgba(234,179,8,0.2)]">Most Popular</span>
                <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-white">Rs 428</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-400 h-10">For steady builder workflows and larger token budgets.</p>
              </div>
              <div className="mt-4 mb-8 flex-grow relative z-10">
                <div className="text-sm text-white font-medium">5,000,000 tokens/month</div>
              </div>
              <button className="relative z-10 w-full py-3.5 rounded-xl bg-white text-black font-bold transition-all hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]">
                Upgrade to Pro
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-[#130f14]/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 flex flex-col relative transition-transform hover:scale-105 duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none"></div>
              <div className="mb-6 relative z-10">
                <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-wider uppercase rounded-full mb-4 shadow-[0_0_10px_rgba(168,85,247,0.2)]">High Capacity</span>
                <h3 className="text-2xl font-bold text-white mb-4">Elite</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-white">Rs 4,428</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-400 h-10">For sustained, high-volume work across coding and automation.</p>
              </div>
              <div className="mt-4 mb-8 flex-grow relative z-10">
                <div className="text-sm text-white font-medium">50,000,000 tokens/month</div>
              </div>
              <button className="relative z-10 w-full py-3.5 rounded-xl bg-white text-black font-bold transition-all hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]">
                Upgrade to Elite
              </button>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm max-w-lg mx-auto relative z-10">
            Your current usage and renewal window will update after payment verification.
          </div>
        </div>
      </div>
    </>
  );
}
