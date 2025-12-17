import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import DetailedPlaybook from '../components/DetailedPlaybook';

export default function Playbook() {
    const [showDetailed, setShowDetailed] = useState(false);
    return (
        <Layout>
            <Head>
                <title>THE PLAYBOOK // Aetheria</title>
                <meta name="description" content="Our roadmap, financial projections, and master plan for Aetheria AI." />
            </Head>

            <div className="bg-neo-bg text-black font-sans pb-24">
                <div className="max-w-5xl mx-auto px-6 py-20">
                    {/* Header Section */}
                    <header className="mb-24 text-center border-b-4 border-black pb-12">
                        <div className="inline-block bg-neo-pink border-2 border-black px-4 py-1 font-mono font-bold text-sm mb-6 transform rotate-2">
                            BUILDING IN PUBLIC
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                            The Playbook
                        </h1>
                        <p className="text-xl md:text-2xl font-mono max-w-3xl mx-auto leading-relaxed border-l-4 border-black pl-6 text-left">
                            We are building the operating system for the agentic future. <br className="hidden md:block" />
                            Here is our roadmap, our numbers, and our vision. Unfiltered.
                        </p>
                    </header>

                    {/* Section 1: The Mission */}
                    <section className="mb-32">
                        <div className="flex items-start mb-8 border-b-2 border-black pb-2">
                            <span className="text-6xl font-black mr-4 text-stroke-black text-transparent" style={{ webkitTextStroke: '2px black' }}>01</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase mt-2">The Mission</h2>
                        </div>
                        <div className="text-xl leading-relaxed space-y-6 max-w-4xl">
                            <p>
                                Knowledge workers in India waste over <strong className="bg-neo-yellow px-1 border border-black">40% of their daily time</strong> on repetitive tasks.
                                We are drowning in context switching.
                            </p>
                            <p>
                                Existing solutions are static.
                                <strong> Aetheria AI</strong> is different. We are building an <em>active</em> Agent Operating System.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                <div className="card-brutal bg-white hover:bg-neo-lime">
                                    <h3 className="font-bold uppercase mb-2">Offline-First</h3>
                                    <p className="font-mono text-sm">Built for the real world commute.</p>
                                </div>
                                <div className="card-brutal bg-white hover:bg-neo-lime">
                                    <h3 className="font-bold uppercase mb-2">Action-Oriented</h3>
                                    <p className="font-mono text-sm">Executes code. Manages files.</p>
                                </div>
                                <div className="card-brutal bg-white hover:bg-neo-lime">
                                    <h3 className="font-bold uppercase mb-2">India-Native</h3>
                                    <p className="font-mono text-sm">Localized & Compliant.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: The Roadmap */}
                    <section className="mb-32">
                        <div className="flex items-start mb-8 border-b-2 border-black pb-2">
                            <span className="text-6xl font-black mr-4 text-stroke-black text-transparent" style={{ webkitTextStroke: '2px black' }}>02</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase mt-2">The Roadmap</h2>
                        </div>

                        <div className="border-4 border-black p-2 bg-white shadow-brutal mb-12 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
                            <div className="relative overflow-hidden border-2 border-dashed border-gray-300">
                                <img
                                    src="/roadmap.png"
                                    alt="Aetheria AI 6-Month Product Roadmap"
                                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <p className="text-center text-sm font-mono mt-4 pb-2 border-t-2 border-black pt-2 uppercase font-bold">From MVP to Enterprise Scale in 6 Months</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="card-brutal bg-neo-blue text-white">
                                <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-white pb-2">Phase 1: Mobile MVP</h3>
                                <p className="font-mono text-sm leading-relaxed">
                                    Focus: Voice-to-Action. <br />
                                    Integrations: <strong>Gmail, Google Calendar, Slack</strong>.<br />
                                    Goal: Hands-free digital life.
                                </p>
                            </div>
                            <div className="card-brutal bg-black text-white">
                                <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-white pb-2">Phase 2: Enterprise OS</h3>
                                <p className="font-mono text-sm leading-relaxed">
                                    Focus: Team Scale.<br />
                                    Features: Multi-agent orchestration.<br />
                                    Goal: Productivity multiplier.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Financial Transparency */}
                    <section className="mb-32">
                        <div className="flex items-start mb-8 border-b-2 border-black pb-2">
                            <span className="text-6xl font-black mr-4 text-stroke-black text-transparent" style={{ webkitTextStroke: '2px black' }}>03</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase mt-2">Financials</h2>
                        </div>

                        <div className="prose prose-lg max-w-none mb-8 font-mono">
                            <p>
                                Targeting pre-seed: <strong className="bg-black text-white px-2">₹50L</strong>.
                            </p>
                        </div>

                        <div className="border-4 border-black p-2 bg-white shadow-brutal mb-12">
                            <img
                                src="/financial-projection.png"
                                alt="Financial Projections"
                                className="w-full h-auto grayscale hover:grayscale-0 transition-all"
                            />
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 border-4 border-black bg-neo-lime">
                                <div className="text-5xl font-black mb-1">M11</div>
                                <div className="text-sm font-bold uppercase tracking-widest border-t-2 border-black pt-2">Profitability</div>
                            </div>
                            <div className="p-6 border-4 border-black bg-white">
                                <div className="text-5xl font-black mb-1">5.3x</div>
                                <div className="text-sm font-bold uppercase tracking-widest border-t-2 border-black pt-2">LTV : CAC</div>
                            </div>
                            <div className="p-6 border-4 border-black bg-white">
                                <div className="text-5xl font-black mb-1">40%</div>
                                <div className="text-sm font-bold uppercase tracking-widest border-t-2 border-black pt-2">Day 30 Retention</div>
                            </div>
                        </div>
                    </section>

                    {/* Detailed Playbook Toggle */}
                    <div className="text-center py-12 px-6 border-t-4 border-black bg-gray-100">
                        {!showDetailed ? (
                            <div className="animate-fade-in-up">
                                <h2 className="text-4xl font-black uppercase mb-6">Need the deep dive?</h2>
                                <p className="font-mono mb-8 max-w-2xl mx-auto">
                                    We believe in radical transparency. Read our complete internal startup playbook.
                                </p>
                                <button
                                    onClick={() => setShowDetailed(true)}
                                    className="btn-brutal bg-black text-white hover:bg-neo-blue text-xl px-12 py-4 shadow-brutal"
                                >
                                    ACCESS CLASSIFIED PLAYBOOK
                                </button>
                            </div>
                        ) : (
                            <div className="animate-fade-in-up">
                                <DetailedPlaybook />
                                <div className="mt-16">
                                    <button
                                        onClick={() => setShowDetailed(false)}
                                        className="btn-brutal bg-red-500 text-white hover:bg-red-600"
                                    >
                                        CLOSE FILE
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
