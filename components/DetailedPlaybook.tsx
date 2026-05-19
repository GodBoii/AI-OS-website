import React from 'react';

const DetailedPlaybook = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-white space-y-16 animate-fade-in-up">
            <div className="bg-surface-light/30 backdrop-blur-md border-l-4 border-primary pl-6 py-8 pr-6 rounded-r-2xl border-y border-r border-white/10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[50px] rounded-full pointer-events-none -z-10"></div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Executive Summary</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Aetheria is an ambitious AI-driven personal assistant platform. We are building a modular agent architecture spanning mobile (PWA) and desktop (Electron) clients.
                </p>
                <div className="mt-6 text-sm font-mono space-y-4 border-t border-white/10 pt-6">
                    <p className="flex items-start gap-3">
                        <strong className="bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30 flex-shrink-0 mt-0.5">INSIGHT</strong> 
                        <span className="text-gray-400">Our current codebase serves as a robust proof-of-concept, highlighting innovative features like a sandboxed code execution environment.</span>
                    </p>
                    <p className="flex items-start gap-3">
                        <strong className="bg-accent/20 text-accent px-2 py-0.5 rounded border border-accent/30 flex-shrink-0 mt-0.5">INVESTABILITY</strong> 
                        <span className="text-gray-400">We are aiming for a global launch with a largely open-source stack. The tech stack is flexible and avoids heavy proprietary IP concerns.</span>
                    </p>
                </div>
            </div>

            <section>
                <div className="bg-primary/20 text-primary px-4 py-2 inline-block rounded-xl border border-primary/30 mb-8 shadow-glow-sm">
                    <h3 className="text-xl font-bold tracking-widest uppercase">The Opportunity</h3>
                </div>
                <div className="space-y-6 text-gray-300 text-lg mb-8">
                    <p>
                        Developers and knowledge workers waste <strong className="text-white font-semibold">40%+ of daily time</strong> on repetitive tasks. Context switching between Slack, Jira, and Email drains our focus.
                    </p>
                    <p>
                        The solution is <strong className="text-white font-semibold">Aetheria AI OS</strong>:
                    </p>
                    <ul className="space-y-4 font-mono text-sm border-l-2 border-primary/50 pl-4 ml-2">
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span className="text-gray-400"><strong className="text-gray-200">Personal Productivity Layer:</strong> Mobile-first PWA + Electron desktop for workflow automation.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                            <span className="text-gray-400"><strong className="text-gray-200">Enterprise Orchestration:</strong> Multi-agent deployment, team collaboration, API-first architecture.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            <span className="text-gray-400"><strong className="text-gray-200">India-First Design:</strong> Local language support, offline-first, data residency compliance.</span>
                        </li>
                    </ul>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-center mt-8">
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 hover:bg-surface-light transition-colors relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-400 group-hover:text-primary transition-colors">TAM (Global)</div>
                        <div className="text-4xl font-bold text-white">$8.2B</div>
                    </div>
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 hover:bg-surface-light transition-colors relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-400 group-hover:text-accent transition-colors">SAM (APAC)</div>
                        <div className="text-4xl font-bold text-white">$1.8B</div>
                    </div>
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 hover:bg-surface-light transition-colors relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-400 group-hover:text-emerald-400 transition-colors">SOM (Year 1)</div>
                        <div className="text-4xl font-bold text-white">$22M</div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    Technical Audit
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-surface-light/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                        <h4 className="text-lg font-bold uppercase text-primary mb-4 flex items-center gap-2">
                            Aetheria-Mobile <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full border border-primary/30">PWA</span>
                        </h4>
                        <p className="mb-6 text-gray-400 text-sm">A mobile-first companion app designed as a Progressive Web App (PWA).</p>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex gap-3"><span className="text-primary mt-1">→</span> <div><span className="font-semibold text-white">Architecture:</span> Responsive PWA frontend communicating with Python backend.</div></li>
                            <li className="flex gap-3"><span className="text-primary mt-1">→</span> <div><span className="font-semibold text-white">Integration:</span> Heavy reliance on secure third-party API calls.</div></li>
                            <li className="flex gap-3"><span className="text-primary mt-1">→</span> <div><span className="font-semibold text-white">Status:</span> MVP/Proof-of-Concept. Priority hardening.</div></li>
                        </ul>
                    </div>
                    <div className="bg-surface-light/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                        <h4 className="text-lg font-bold uppercase text-accent mb-4 flex items-center gap-2">
                            AI-OS Desktop <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full border border-accent/30">Native</span>
                        </h4>
                        <p className="mb-6 text-gray-400 text-sm">A comprehensive "Personal AI Operating System" built on Electron.</p>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex gap-3"><span className="text-accent mt-1">→</span> <div><span className="font-semibold text-white">Core Backend:</span> Python 3.10+ Flask server using Agno framework.</div></li>
                            <li className="flex gap-3"><span className="text-accent mt-1">→</span> <div><span className="font-semibold text-white">Frontend:</span> Electron + Node.js for deep OS integration.</div></li>
                            <li className="flex gap-3"><span className="text-accent mt-1">→</span> <div><span className="font-semibold text-white">Security:</span> Stateful Docker Sandbox for code execution.</div></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Launch Blitz (90-Day)
                </h3>
                <div className="overflow-x-auto bg-surface border border-white/10 rounded-2xl shadow-xl">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead className="bg-black/50 border-b border-white/10 text-gray-400 uppercase tracking-widest text-xs">
                            <tr>
                                <th className="py-4 px-6 font-semibold">Channel</th>
                                <th className="py-4 px-6 font-semibold">Cost</th>
                                <th className="py-4 px-6 font-semibold">Expected Signups</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6 font-medium text-white">Developer Communities</td>
                                <td className="py-4 px-6 font-mono text-primary">₹110k</td>
                                <td className="py-4 px-6 font-mono">370–850</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6 font-medium text-white">Content Marketing</td>
                                <td className="py-4 px-6 font-mono text-primary">₹15k</td>
                                <td className="py-4 px-6 font-mono">500–1,200</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6 font-medium text-white">Paid Ads</td>
                                <td className="py-4 px-6 font-mono text-primary">₹150k</td>
                                <td className="py-4 px-6 font-mono">1,350–2,250</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6 font-medium text-white flex items-center gap-2">
                                    Viral / Networks 
                                    <span className="flex h-2 w-2 relative">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                    </span>
                                </td>
                                <td className="py-4 px-6 font-mono text-primary">₹10k</td>
                                <td className="py-4 px-6 font-mono text-emerald-400 font-bold">1,000+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Financials
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-surface border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                        <h4 className="font-semibold uppercase tracking-widest text-xs text-gray-500 mb-4">Conservative</h4>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">M22</div>
                            <div className="text-xs font-mono uppercase text-gray-500 border-t border-white/10 pt-3">Profitability</div>
                        </div>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 shadow-glow flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-[30px] rounded-full pointer-events-none"></div>
                        <h4 className="font-semibold uppercase tracking-widest text-xs text-primary mb-4 flex justify-between items-center">
                            Likely <span className="bg-primary text-black text-[10px] px-2 py-0.5 rounded-full font-bold">TARGET</span>
                        </h4>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">M11</div>
                            <div className="text-xs font-mono uppercase text-primary/70 border-t border-primary/20 pt-3">Profitability</div>
                        </div>
                    </div>
                    <div className="bg-surface border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                        <h4 className="font-semibold uppercase tracking-widest text-xs text-emerald-400 mb-4">Upside</h4>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">M9</div>
                            <div className="text-xs font-mono uppercase text-gray-500 border-t border-white/10 pt-3">Profitability</div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Risk Matrix
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-red-500/10 transition-colors">
                        <div className="absolute top-0 right-0 w-1 bg-red-500 h-full"></div>
                        <h4 className="font-bold text-red-400 mb-3 uppercase tracking-wide">Market Adoption</h4>
                        <p className="font-mono text-sm text-gray-400 mb-4 pb-4 border-b border-white/5"><strong className="text-gray-300">RISK:</strong> Developers stick to Copilot.</p>
                        <p className="font-medium text-sm text-gray-300"><strong className="text-white">MITIGATION:</strong> Niche-first (India), Offline-first.</p>
                    </div>
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-orange-500/10 transition-colors">
                        <div className="absolute top-0 right-0 w-1 bg-orange-500 h-full"></div>
                        <h4 className="font-bold text-orange-400 mb-3 uppercase tracking-wide">LLM Costs</h4>
                        <p className="font-mono text-sm text-gray-400 mb-4 pb-4 border-b border-white/5"><strong className="text-gray-300">RISK:</strong> API costs eat margins.</p>
                        <p className="font-medium text-sm text-gray-300"><strong className="text-white">MITIGATION:</strong> Local Llama 2 fallback.</p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-yellow-500/10 transition-colors md:col-span-2">
                        <div className="absolute top-0 right-0 w-1 bg-yellow-500 h-full"></div>
                        <h4 className="font-bold text-yellow-400 mb-3 uppercase tracking-wide">Data Privacy</h4>
                        <p className="font-mono text-sm text-gray-400 mb-4 pb-4 border-b border-white/5"><strong className="text-gray-300">RISK:</strong> PII Leak in DPDP era.</p>
                        <p className="font-medium text-sm text-gray-300"><strong className="text-white">MITIGATION:</strong> AWS Mumbai residency.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DetailedPlaybook;
