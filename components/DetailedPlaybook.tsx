
import React from 'react';

const DetailedPlaybook = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-gray-300 space-y-12 animate-fade-in-up">
            <div className="border-l-4 border-blue-500 pl-6 py-2 bg-gray-800/50 rounded-r-lg">
                <h2 className="text-3xl font-bold text-white mb-2">Executive Summary</h2>
                <p className="text-lg italic text-gray-400">
                    Aetheria is an ambitious AI-driven personal assistant platform. We are building a modular agent architecture spanning mobile (PWA) and desktop (Electron) clients.
                </p>
                <div className="mt-4 text-sm text-gray-400 space-y-2">
                    <p><strong className="text-blue-400">Key Insights:</strong> Our current codebase serves as a robust proof-of-concept, highlighting innovative features like a sandboxed code execution environment, long-term memory via Supabase, and a modular sub-agent system.</p>
                    <p><strong className="text-green-400">Investability:</strong> We are aiming for a global launch with a largely open-source stack (low licensing costs). The tech stack is flexible, avoiding heavy proprietary IP concerns but requiring focus on integration and UI/UX differentiation.</p>
                </div>
            </div>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">The Opportunity</h3>
                <p className="mb-4">
                    Developers and knowledge workers waste <strong>40%+ of daily time</strong> on repetitive tasks. Context switching between Slack, Jira, and Email drains our focus.
                </p>
                <p className="mb-4">
                    The solution is <strong>Aetheria AI OS</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
                    <li><strong>Personal Productivity Layer:</strong> Mobile-first PWA + Electron desktop for workflow automation.</li>
                    <li><strong>Enterprise Orchestration:</strong> Multi-agent deployment, team collaboration, API-first architecture.</li>
                    <li><strong>India-First Design:</strong> Local language support, offline-first, data residency compliance.</li>
                </ul>
                <div className="grid md:grid-cols-3 gap-4 text-center mt-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-blue-400 font-bold">TAM (Global)</div>
                        <div className="text-2xl text-white font-bold">$8.2B</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-blue-400 font-bold">SAM (APAC)</div>
                        <div className="text-2xl text-white font-bold">$1.8B</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-blue-400 font-bold">SOM (Year 1)</div>
                        <div className="text-2xl text-white font-bold">$22M</div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Technical Audit</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-2">Aetheria-ai-Mobile (PWA)</h4>
                        <p className="mb-2">A mobile-first companion app designed as a Progressive Web App (PWA) for on-the-go productivity.</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-400">
                            <li><strong>Architecture:</strong> Responsive PWA frontend (likely React/Next.js) communicating with a Python backend.</li>
                            <li><strong>Integration:</strong> Heavy reliance on secure third-party API calls (Google, etc.) and Supabase for auth/storage.</li>
                            <li><strong>Status:</strong> MVP/Proof-of-Concept. Priority is hardening security and polishing the offline-first UX.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-purple-300 mb-2">AI-OS Desktop</h4>
                        <p className="mb-2">A comprehensive "Personal AI Operating System" built on Electron.</p>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-400">
                            <li><strong>Core Backend:</strong> Python 3.10+ Flask server using the open-source <strong>Agno</strong> agent framework.</li>
                            <li><strong>Frontend:</strong> Electron + Node.js for deep OS integration (Files, Clipboard) and IPC via WebSockets.</li>
                            <li><strong>Security:</strong> Stateful Docker Sandbox for isolating code execution and modular agent architecture.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Strategic Recommendations</h3>
                <div className="bg-gray-800/40 p-6 rounded-lg text-gray-300 space-y-4">
                    <p>
                        <strong>Narrow Scope:</strong> To achieve initial traction, we are focusing on a vertical core use-case (developer task automation) rather than a broad "do-everything" assistant.
                    </p>
                    <p>
                        <strong>MVP & Validation:</strong> Our immediate goal is to validate core user flow and retention via the MVP. We will prioritize low-cost channels (developer communities) for launch.
                    </p>
                    <p>
                        <strong>Compliance:</strong> All operations are structured to be India-compliant (Pvt Ltd, formal IP agreements) to ensure fundability.
                    </p>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Market Strategy (90-Day Launch Blitz)</h3>
                <p className="mb-6">Target: 5,000 Signups in 90 Days.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-700 text-gray-400">
                                <th className="py-2 px-3">Channel</th>
                                <th className="py-2 px-3">Cost</th>
                                <th className="py-2 px-3">Expected Signups</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-gray-800">
                                <td className="py-2 px-3 font-medium text-white">Developer Communities</td>
                                <td className="py-2 px-3">₹110k</td>
                                <td className="py-2 px-3">370–850</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-2 px-3 font-medium text-white">Content Marketing</td>
                                <td className="py-2 px-3">₹15k</td>
                                <td className="py-2 px-3">500–1,200</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="py-2 px-3 font-medium text-white">Paid Ads</td>
                                <td className="py-2 px-3">₹150k</td>
                                <td className="py-2 px-3">1,350–2,250</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 font-medium text-white">Viral / Networks</td>
                                <td className="py-2 px-3">₹10k</td>
                                <td className="py-2 px-3">1,000+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Financial Projections</h3>
                <p className="mb-4">We operate with three scenarios. We are prepared for the worst but building for the upside.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/40 p-4 rounded border border-gray-700">
                        <h4 className="font-bold text-gray-300 mb-2">Conservative</h4>
                        <div className="text-3xl font-bold text-white mb-1">Month 22</div>
                        <div className="text-xs uppercase text-gray-500">Path to Profitability</div>
                        <div className="mt-4 text-sm text-gray-400">
                            Assumes 60% hit rate on targets. 1.2k paying users by M12.
                        </div>
                    </div>
                    <div className="bg-gray-800/60 p-4 rounded border border-blue-500/30">
                        <h4 className="font-bold text-blue-300 mb-2">Likely</h4>
                        <div className="text-3xl font-bold text-white mb-1">Month 11</div>
                        <div className="text-xs uppercase text-gray-500">Path to Profitability</div>
                        <div className="mt-4 text-sm text-gray-400">
                            Assumes 80% hit rate. 4.2k MRR by M12.
                        </div>
                    </div>
                    <div className="bg-gray-800/40 p-4 rounded border border-gray-700">
                        <h4 className="font-bold text-gray-300 mb-2">Upside</h4>
                        <div className="text-3xl font-bold text-white mb-1">Month 9</div>
                        <div className="text-xs uppercase text-gray-500">Path to Profitability</div>
                        <div className="mt-4 text-sm text-gray-400">
                            Viral growth. 8.5k MRR by M12.
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Team & Hiring</h3>
                <p className="mb-4">Our hiring roadmap is aggressive yet calculated.</p>
                <ul className="space-y-4">
                    <li className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <div className="font-bold text-white">Phase 1 (Weeks 1-4)</div>
                            <div className="text-sm text-gray-400">CTO, Backend Engineer (Contract)</div>
                        </div>
                        <div className="text-right text-sm text-gray-500">₹45L Burn</div>
                    </li>
                    <li className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <div className="font-bold text-white">Phase 2 (Weeks 5-12)</div>
                            <div className="text-sm text-gray-400">Mobile Eng, ML Eng, DevOps, PM</div>
                        </div>
                        <div className="text-right text-sm text-gray-500">₹55L Burn</div>
                    </li>
                    <li className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <div className="font-bold text-white">Phase 3 (Month 6+)</div>
                            <div className="text-sm text-gray-400">Security Lead, Growth, Design</div>
                        </div>
                        <div className="text-right text-sm text-gray-500">₹80L Burn</div>
                    </li>
                </ul>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Risk & Mitigation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-red-500/30 bg-red-900/10 p-4 rounded-lg">
                        <h4 className="font-bold text-red-300 mb-2">Market Adoption</h4>
                        <p className="text-sm text-gray-400">Risk: Developers stick to GitHub Copilot.</p>
                        <p className="text-sm text-white mt-1">Mitigation: Niche-first (India), Offline-first feature separation.</p>
                    </div>
                    <div className="border border-red-500/30 bg-red-900/10 p-4 rounded-lg">
                        <h4 className="font-bold text-red-300 mb-2">LLM Costs</h4>
                        <p className="text-sm text-gray-400">Risk: API costs eat margins.</p>
                        <p className="text-sm text-white mt-1">Mitigation: Local Llama 2 fallback, caching, aggressive optimization.</p>
                    </div>
                    <div className="border border-red-500/30 bg-red-900/10 p-4 rounded-lg">
                        <h4 className="font-bold text-red-300 mb-2">Data Privacy</h4>
                        <p className="text-sm text-gray-400">Risk: PII Leak in DPDP era.</p>
                        <p className="text-sm text-white mt-1">Mitigation: AWS Mumbai residency, End-to-End Encryption, Semgrep audits.</p>
                    </div>
                    <div className="border border-red-500/30 bg-red-900/10 p-4 rounded-lg">
                        <h4 className="font-bold text-red-300 mb-2">Big Tech Entry</h4>
                        <p className="text-sm text-gray-400">Risk: Google/Microsoft launch competitor.</p>
                        <p className="text-sm text-white mt-1">Mitigation: Velocity. Hit 50k MAU fast. Build deep local integrations they ignore.</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Legal & Compliance</h3>
                <div className="bg-gray-800 p-6 rounded-lg text-sm text-gray-300 space-y-2">
                    <p><strong>Entity:</strong> Private Limited (Pvt Ltd) for VC readiness.</p>
                    <p><strong>Documents:</strong> Founders' Agreement, IP Assignment, DPDP Privacy Policy.</p>
                    <p><strong>Compliance:</strong> GST Registration, strict DPDP adherence (Consent Managers, Data Localization).</p>
                </div>
            </section>

            <div className="text-center py-8 text-gray-500 border-t border-gray-800 mt-12">
                <p>End of Internal Playbook v1.0</p>
            </div>
        </div>
    );
};

export default DetailedPlaybook;
