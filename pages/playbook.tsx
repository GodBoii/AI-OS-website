import React, { useState } from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import DetailedPlaybook from '../components/DetailedPlaybook';

export default function Playbook() {
    const [showDetailed, setShowDetailed] = useState(false);
    return (
        <Layout>
            <SEO 
                title="The Playbook | Aetheria AI"
                description="Our mission, product roadmap, financial projections, and master plan for Aetheria AI. Building the agentic future in public."
            />

            <div className="bg-neo-bg text-white font-sans pb-24 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                
                <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
                    {/* Header Section */}
                    <header className="mb-24 text-center border-b border-white/10 pb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold text-accent uppercase tracking-widest mb-6">
                            Building in Public
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">
                            The Playbook
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-center">
                            We are building the operating system for the agentic future. <br className="hidden md:block" />
                            Here is our roadmap, our numbers, and our vision. Unfiltered.
                        </p>
                    </header>

                    {/* Section 1: The Mission */}
                    <section className="mb-32">
                        <div className="flex items-center mb-10 border-b border-white/10 pb-4">
                            <span className="text-4xl font-bold mr-4 text-primary opacity-50">01</span>
                            <h2 className="text-3xl md:text-4xl font-bold">The Mission</h2>
                        </div>
                        <div className="text-lg leading-relaxed space-y-6 max-w-4xl text-gray-300">
                            <p>
                                Knowledge workers waste over <strong className="text-white bg-white/10 px-2 py-0.5 rounded">40% of their daily time</strong> on repetitive tasks.
                                We are drowning in context switching.
                            </p>
                            <p>
                                Existing solutions are static.
                                <strong className="text-white"> Aetheria AI</strong> is different. We are building an <em className="text-primary not-italic font-medium">active</em> Agent Operating System.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                <div className="card-brutal group p-6">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="font-semibold text-white mb-2 text-lg">Offline-First</h3>
                                    <p className="text-sm text-gray-400">Built for the real world commute.</p>
                                </div>
                                <div className="card-brutal group p-6">
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-accent">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <h3 className="font-semibold text-white mb-2 text-lg">Action-Oriented</h3>
                                    <p className="text-sm text-gray-400">Executes code. Manages files.</p>
                                </div>
                                <div className="card-brutal group p-6">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-emerald-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="font-semibold text-white mb-2 text-lg">Global Native</h3>
                                    <p className="text-sm text-gray-400">Localized & Compliant globally.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: The Roadmap */}
                    <section className="mb-32">
                        <div className="flex items-center mb-10 border-b border-white/10 pb-4">
                            <span className="text-4xl font-bold mr-4 text-primary opacity-50">02</span>
                            <h2 className="text-3xl md:text-4xl font-bold">The Roadmap</h2>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-surface p-4 shadow-xl mb-12 overflow-hidden">
                            <div className="relative rounded-xl overflow-hidden border border-white/5 bg-black/50">
                                <img
                                    src="/Aetheria_AI_Mobile_6-Month_Product_Roadmap__MVP_→_v1.1_→_v2.png"
                                    alt="Aetheria AI 6-Month Product Roadmap"
                                    className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-500"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                            <p className="text-center text-sm font-medium mt-4 pb-2 text-gray-400 uppercase tracking-widest">From MVP to Enterprise Scale in 6 Months</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="card-brutal p-8 bg-gradient-to-br from-surface to-primary/10">
                                <h3 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4 text-white">Phase 1: Mobile MVP</h3>
                                <p className="text-sm leading-relaxed text-gray-300">
                                    <span className="block mb-2"><strong className="text-primary">Focus:</strong> Voice-to-Action.</span>
                                    <span className="block mb-2"><strong className="text-primary">Integrations:</strong> Gmail, Google Calendar, Slack.</span>
                                    <span className="block"><strong className="text-primary">Goal:</strong> Hands-free digital life.</span>
                                </p>
                            </div>
                            <div className="card-brutal p-8 bg-gradient-to-br from-surface to-accent/10">
                                <h3 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4 text-white">Phase 2: Enterprise OS</h3>
                                <p className="text-sm leading-relaxed text-gray-300">
                                    <span className="block mb-2"><strong className="text-accent">Focus:</strong> Team Scale.</span>
                                    <span className="block mb-2"><strong className="text-accent">Features:</strong> Multi-agent orchestration.</span>
                                    <span className="block"><strong className="text-accent">Goal:</strong> Productivity multiplier.</span>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Financial Transparency */}
                    <section className="mb-32">
                        <div className="flex items-center mb-10 border-b border-white/10 pb-4">
                            <span className="text-4xl font-bold mr-4 text-primary opacity-50">03</span>
                            <h2 className="text-3xl md:text-4xl font-bold">Financials</h2>
                        </div>

                        <div className="mb-8">
                            <p className="text-lg text-gray-300">
                                Targeting pre-seed: <strong className="text-white bg-primary/20 px-3 py-1 rounded-full border border-primary/30">₹50L</strong>
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-surface p-4 shadow-xl mb-12 overflow-hidden">
                            <div className="relative rounded-xl overflow-hidden border border-white/5 bg-black/50">
                                <img
                                    src="/3-Year_Financial_Projection__Aetheria_AI_MRR_vs._Monthly_Burn_Rate_(Three_Scenarios).png"
                                    alt="Financial Projections"
                                    className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-500"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-8 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm">
                                <div className="text-5xl font-bold mb-3 text-white">M11</div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-primary border-t border-primary/20 pt-4 mt-2">Profitability</div>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/10 bg-surface">
                                <div className="text-5xl font-bold mb-3 text-white">5.3x</div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-t border-white/10 pt-4 mt-2">LTV : CAC</div>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/10 bg-surface">
                                <div className="text-5xl font-bold mb-3 text-white">40%</div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-t border-white/10 pt-4 mt-2">Day 30 Retention</div>
                            </div>
                        </div>
                    </section>

                    {/* Detailed Playbook Toggle */}
                    <div className="text-center py-16 px-6 rounded-3xl border border-white/10 bg-gradient-to-b from-surface/50 to-surface backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10"></div>
                        
                        {!showDetailed ? (
                            <div className="animate-fade-in">
                                <h2 className="text-3xl font-bold mb-4 text-white">Need the deep dive?</h2>
                                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                    We believe in radical transparency. Read our complete internal startup playbook.
                                </p>
                                <button
                                    onClick={() => setShowDetailed(true)}
                                    className="btn-brutal btn-brutal-primary px-8 py-4 text-lg inline-flex items-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Access Classified Playbook
                                </button>
                            </div>
                        ) : (
                            <div className="animate-fade-in text-left">
                                <DetailedPlaybook />
                                <div className="mt-16 text-center">
                                    <button
                                        onClick={() => setShowDetailed(false)}
                                        className="px-8 py-3 rounded-lg font-semibold text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition-all"
                                    >
                                        Close File
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
