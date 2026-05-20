import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Terminal, GitPullRequest, Rocket } from 'lucide-react';

const TypingText = ({ texts, delay = 0 }: { texts: string[], delay?: number }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [texts]);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay }}
      className="text-white/70 truncate"
    >
      {texts[index]}
    </motion.div>
  );
};

export default function ExecutionScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const z1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  return (
    <section ref={ref} className="relative py-40 w-full min-h-screen bg-[#020202]" style={{ perspective: 1200 }}>
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-[#020202] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 tracking-tight">
              Execution <span className="text-white/30">Made Real.</span>
            </h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
              Not just concepts. Watch Aetheria read repositories, execute commands, and orchestrate active deployment pipelines in real time.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative transform-style-3d">
          
          {/* Terminal / CLI Panel */}
          <motion.div 
            style={{ y: y1, translateZ: z1 }} 
            className="glass-panel rounded-3xl p-6 flex flex-col h-[400px] border-white/[0.04] bg-[#0a0a0a]/80"
          >
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-accent-violet/70" />
                sys_terminal
              </div>
              <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-accent-violet rounded-full" />
            </div>
            
            <div className="font-mono text-xs space-y-3 flex-1 overflow-hidden relative mask-image-b">
              <div className="text-white/30">{">"} aetheria run agent --task "refactor auth"</div>
              <TypingText 
                texts={[
                  "[SYS] Analyzing dependency tree...",
                  "[SYS] Spawning sub-agent (ID: x7f2)...",
                  "[SYS] Modifying src/lib/auth.ts...",
                  "[SYS] Running localized unit tests..."
                ]} 
              />
              <TypingText 
                texts={[
                  "...",
                  "[INFO] Abstract syntax tree generated.",
                  "[INFO] Refactor constraints verified.",
                  "..."
                ]} 
                delay={1.2}
              />
              <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Code / Git Sync Panel */}
          <motion.div 
            style={{ y: y2, scale: 1.05 }} 
            className="glass-panel rounded-3xl p-6 relative z-10 bg-[#0c0c0c]/90 border-white/[0.08] flex flex-col h-[450px] shadow-[0_0_80px_-15px_rgba(255,255,255,0.05)]"
          >
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest">
                <GitPullRequest className="w-4 h-4 text-white/70" />
                repo_sync
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 font-mono text-xs">
              <div className="bg-white/[0.02] border border-white/[0.03] p-4 rounded-xl">
                <div className="flex justify-between text-white/30 mb-2">
                  <span>src/components/auth/Login.tsx</span>
                  <span className="text-emerald-400/50">+42 -12</span>
                </div>
                <div className="space-y-1">
                  <div className="text-white/20">- const token = localStorage.getItem('t')</div>
                  <div className="text-emerald-400/80">+ const {"{ session }"} = await supabase.auth.getSession()</div>
                </div>
              </div>

              <div className="mt-auto space-y-2">
                 <div className="flex justify-between text-white/40">
                   <span>Committing changes...</span>
                   <span>68%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-white/40 rounded-full"
                     animate={{ width: ['0%', '100%', '0%'] }}
                     transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                   />
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Deployment / Infrastructure Panel */}
          <motion.div 
            style={{ y: y1, translateZ: z1 }} 
            className="glass-panel rounded-3xl p-6 flex flex-col h-[400px] border-white/[0.04] bg-[#0a0a0a]/80"
          >
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest">
                <Rocket className="w-4 h-4 text-accent-cyan/70" />
                edge_deploy
              </div>
              <div className="text-accent-cyan/50 text-[10px]">US-EAST-1</div>
            </div>

            <div className="font-mono text-xs space-y-4 flex-1">
              <div className="space-y-2">
                <div className="text-white/30 flex justify-between">
                  <span>Building static assets</span>
                  <span className="text-emerald-400/70">DONE</span>
                </div>
                <div className="text-white/30 flex justify-between">
                  <span>Optimizing chunks</span>
                  <span className="text-emerald-400/70">DONE</span>
                </div>
                <div className="text-white/60 flex justify-between">
                  <span>Propagating to edge</span>
                  <span className="animate-pulse text-accent-cyan">ACTIVE</span>
                </div>
              </div>

              <div className="mt-8 relative h-24 border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden flex items-end">
                {/* Simulated activity chart */}
                <div className="w-full flex items-end gap-1 px-2 h-full py-2 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="flex-1 bg-accent-cyan/40 rounded-t-sm"
                      animate={{ height: [`${Math.random() * 40 + 10}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 40 + 10}%`] }}
                      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
