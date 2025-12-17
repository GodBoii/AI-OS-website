import React from 'react';

const DetailedPlaybook = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-black space-y-16 animate-fade-in-up">
            <div className="border-l-4 border-neo-blue pl-6 py-2 bg-gray-100 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                <h2 className="text-4xl font-black uppercase mb-4">Executive Summary</h2>
                <p className="text-xl font-mono leading-relaxed">
                    Aetheria is an ambitious AI-driven personal assistant platform. We are building a modular agent architecture spanning mobile (PWA) and desktop (Electron) clients.
                </p>
                <div className="mt-6 text-sm font-mono space-y-3 border-t-2 border-dashed border-gray-400 pt-4">
                    <p><strong className="bg-neo-blue text-white px-1">INSIGHT</strong> Our current codebase serves as a robust proof-of-concept, highlighting innovative features like a sandboxed code execution environment.</p>
                    <p><strong className="bg-neo-green text-black px-1 border border-black">INVESTABILITY</strong> We are aiming for a global launch with a largely open-source stack. The tech stack is flexible and avoids heavy proprietary IP concerns.</p>
                </div>
            </div>

            <section>
                <div className="bg-black text-white px-4 py-2 inline-block transform -rotate-1 mb-6">
                    <h3 className="text-3xl font-black uppercase">The Opportunity</h3>
                </div>
                <p className="mb-6 font-medium text-lg">
                    Developers and knowledge workers waste <strong>40%+ of daily time</strong> on repetitive tasks. Context switching between Slack, Jira, and Email drains our focus.
                </p>
                <p className="mb-6 font-medium text-lg">
                    The solution is <strong>Aetheria AI OS</strong>:
                </p>
                <ul className="list-square pl-6 space-y-3 mb-8 font-mono border-l-2 border-black ml-2">
                    <li className="pl-2"><strong>Personal Productivity Layer:</strong> Mobile-first PWA + Electron desktop for workflow automation.</li>
                    <li className="pl-2"><strong>Enterprise Orchestration:</strong> Multi-agent deployment, team collaboration, API-first architecture.</li>
                    <li className="pl-2"><strong>India-First Design:</strong> Local language support, offline-first, data residency compliance.</li>
                </ul>
                <div className="grid md:grid-cols-3 gap-6 text-center mt-6">
                    <div className="border-2 border-black p-6 hover:bg-neo-yellow transition-colors cursor-crosshair">
                        <div className="font-black text-xs uppercase tracking-widest mb-2">TAM (Global)</div>
                        <div className="text-4xl font-black">$8.2B</div>
                    </div>
                    <div className="border-2 border-black p-6 hover:bg-neo-pink transition-colors cursor-crosshair">
                        <div className="font-black text-xs uppercase tracking-widest mb-2">SAM (APAC)</div>
                        <div className="text-4xl font-black">$1.8B</div>
                    </div>
                    <div className="border-2 border-black p-6 hover:bg-neo-blue hover:text-white transition-colors cursor-crosshair">
                        <div className="font-black text-xs uppercase tracking-widest mb-2">SOM (Year 1)</div>
                        <div className="text-4xl font-black">$22M</div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-4xl font-black uppercase border-b-4 border-black inline-block mb-8">Technical Audit</h3>
                <div className="space-y-8">
                    <div className="card-brutal">
                        <h4 className="text-2xl font-black uppercase bg-neo-lime inline-block px-2 mb-4">Aetheria-Mobile (PWA)</h4>
                        <p className="mb-4 font-mono">A mobile-first companion app designed as a Progressive Web App (PWA).</p>
                        <ul className="space-y-2 text-sm font-mono">
                            <li className="flex gap-2"><span className="font-bold">→ Architecture:</span> Responsive PWA frontend communicating with Python backend.</li>
                            <li className="flex gap-2"><span className="font-bold">→ Integration:</span> Heavy reliance on secure third-party API calls.</li>
                            <li className="flex gap-2"><span className="font-bold">→ Status:</span> MVP/Proof-of-Concept. Priority hardening.</li>
                        </ul>
                    </div>
                    <div className="card-brutal">
                        <h4 className="text-2xl font-black uppercase bg-neo-pink inline-block px-2 mb-4">AI-OS Desktop</h4>
                        <p className="mb-4 font-mono">A comprehensive "Personal AI Operating System" built on Electron.</p>
                        <ul className="space-y-2 text-sm font-mono">
                            <li className="flex gap-2"><span className="font-bold">→ Core Backend:</span> Python 3.10+ Flask server using Agno framework.</li>
                            <li className="flex gap-2"><span className="font-bold">→ Frontend:</span> Electron + Node.js for deep OS integration.</li>
                            <li className="flex gap-2"><span className="font-bold">→ Security:</span> Stateful Docker Sandbox for code execution.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-4xl font-black uppercase mb-8">Launch Blitz (90-Day)</h3>
                <div className="overflow-x-auto border-4 border-black">
                    <table className="w-full text-left border-collapse font-mono">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="py-4 px-4 uppercase">Channel</th>
                                <th className="py-4 px-4 uppercase border-l-2 border-white">Cost</th>
                                <th className="py-4 px-4 uppercase border-l-2 border-white">Expected Signups</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-bold">
                            <tr className="border-b-2 border-black hover:bg-neo-yellow">
                                <td className="py-4 px-4">Developer Communities</td>
                                <td className="py-4 px-4 border-l-2 border-black">₹110k</td>
                                <td className="py-4 px-4 border-l-2 border-black">370–850</td>
                            </tr>
                            <tr className="border-b-2 border-black hover:bg-neo-yellow">
                                <td className="py-4 px-4">Content Marketing</td>
                                <td className="py-4 px-4 border-l-2 border-black">₹15k</td>
                                <td className="py-4 px-4 border-l-2 border-black">500–1,200</td>
                            </tr>
                            <tr className="border-b-2 border-black hover:bg-neo-yellow">
                                <td className="py-4 px-4">Paid Ads</td>
                                <td className="py-4 px-4 border-l-2 border-black">₹150k</td>
                                <td className="py-4 px-4 border-l-2 border-black">1,350–2,250</td>
                            </tr>
                            <tr className="hover:bg-neo-yellow">
                                <td className="py-4 px-4">Viral / Networks</td>
                                <td className="py-4 px-4 border-l-2 border-black">₹10k</td>
                                <td className="py-4 px-4 border-l-2 border-black">1,000+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h3 className="text-4xl font-black uppercase mb-8">Financials</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="border-4 border-black p-6 bg-gray-100">
                        <h4 className="font-black uppercase mb-2">Conservative</h4>
                        <div className="text-5xl font-black mb-2">M22</div>
                        <div className="text-xs font-mono uppercase border-t-2 border-black pt-2">Profitability</div>
                    </div>
                    <div className="border-4 border-black p-6 bg-neo-lime shadow-brutal">
                        <h4 className="font-black uppercase mb-2">Likely</h4>
                        <div className="text-5xl font-black mb-2">M11</div>
                        <div className="text-xs font-mono uppercase border-t-2 border-black pt-2">Profitability</div>
                    </div>
                    <div className="border-4 border-black p-6 bg-gray-100">
                        <h4 className="font-black uppercase mb-2">Upside</h4>
                        <div className="text-5xl font-black mb-2">M9</div>
                        <div className="text-xs font-mono uppercase border-t-2 border-black pt-2">Profitability</div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-4xl font-black uppercase mb-8">Risk Matrix</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-2 border-red-500 bg-red-50 p-6 shadow-brutal-sm">
                        <h4 className="font-black text-red-600 mb-2 uppercase">Market Adoption</h4>
                        <p className="font-mono text-xs mb-2">RISK: Developers stick to Copilot.</p>
                        <p className="font-bold text-sm">MITIGATION: Niche-first (India), Offline-first.</p>
                    </div>
                    <div className="border-2 border-red-500 bg-red-50 p-6 shadow-brutal-sm">
                        <h4 className="font-black text-red-600 mb-2 uppercase">LLM Costs</h4>
                        <p className="font-mono text-xs mb-2">RISK: API costs eat margins.</p>
                        <p className="font-bold text-sm">MITIGATION: Local Llama 2 fallback.</p>
                    </div>
                    <div className="border-2 border-red-500 bg-red-50 p-6 shadow-brutal-sm">
                        <h4 className="font-black text-red-600 mb-2 uppercase">Data Privacy</h4>
                        <p className="font-mono text-xs mb-2">RISK: PII Leak in DPDP era.</p>
                        <p className="font-bold text-sm">MITIGATION: AWS Mumbai residency.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DetailedPlaybook;
