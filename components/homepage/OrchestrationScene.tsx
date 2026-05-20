import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Network, BrainCircuit, Activity, Terminal, Code2 } from 'lucide-react';

export default function OrchestrationScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-40 w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      {/* Deep atmospheric lighting instead of grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,rgba(2,2,2,1)_70%)]" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 tracking-tight">
              Silent <span className="text-white/30">Orchestration.</span>
            </h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto tracking-wide">
              Complex problems demand collaboration. Observe specialized agents distributing tasks and sharing context seamlessly.
            </p>
          </motion.div>
        </div>

        <motion.div 
          style={{ scale, opacity }}
          className="relative max-w-4xl mx-auto aspect-[16/10] rounded-[2.5rem] border border-white/[0.03] bg-[#050505]/60 backdrop-blur-3xl p-8 flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent-violet/[0.02] to-transparent pointer-events-none" />
          
          <div className="w-full max-w-3xl relative h-full flex items-center justify-center">
            
            {/* Center Node: The Orchestrator */}
            <motion.div 
              animate={{ 
                boxShadow: ['0 0 0 0 rgba(255,255,255,0.02)', '0 0 60px 10px rgba(255,255,255,0.05)', '0 0 0 0 rgba(255,255,255,0.02)'],
                borderColor: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center z-20"
            >
              <Network className="w-10 h-10 text-white/70" strokeWidth={1} />
            </motion.div>

            {/* Orbiting Sub-Agents */}
            <div className="absolute left-[15%] top-[25%]">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/[0.05] flex items-center justify-center relative">
                 <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 0 }} className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.15)]" />
                 <BrainCircuit className="w-6 h-6 text-white/50" strokeWidth={1.5} />
              </div>
              <div className="text-[10px] text-white/30 font-mono text-center mt-3 tracking-widest">LOGIC_NODE</div>
            </div>

            <div className="absolute right-[15%] top-[20%]">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/[0.05] flex items-center justify-center relative">
                 <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.15)]" />
                 <Code2 className="w-6 h-6 text-white/50" strokeWidth={1.5} />
              </div>
              <div className="text-[10px] text-white/30 font-mono text-center mt-3 tracking-widest">CODE_GEN</div>
            </div>

            <div className="absolute left-[25%] bottom-[15%]">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/[0.05] flex items-center justify-center relative">
                 <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(52,211,153,0.15)]" />
                 <Activity className="w-6 h-6 text-white/50" strokeWidth={1.5} />
              </div>
              <div className="text-[10px] text-white/30 font-mono text-center mt-3 tracking-widest">VERIFY</div>
            </div>

            <div className="absolute right-[25%] bottom-[25%]">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/[0.05] flex items-center justify-center relative">
                 <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 3 }} className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(250,204,21,0.15)]" />
                 <Terminal className="w-6 h-6 text-white/50" strokeWidth={1.5} />
              </div>
              <div className="text-[10px] text-white/30 font-mono text-center mt-3 tracking-widest">EXECUTE</div>
            </div>

            {/* Glowing Orchestration Flow Lines */}
            <svg className="w-full h-full absolute inset-0 -z-10 pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
               {/* Line 1: Center to Logic */}
               <path id="path1" d="M 400 250 Q 250 180 160 170" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
               <motion.circle r="3" fill="#8b5cf6" style={{ filter: 'blur(1px)' }}>
                 <animateMotion dur="3s" repeatCount="indefinite" path="M 400 250 Q 250 180 160 170" />
               </motion.circle>

               {/* Line 2: Center to Code */}
               <path d="M 400 250 Q 550 150 640 140" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
               <motion.circle r="3" fill="#22d3ee" style={{ filter: 'blur(1px)' }}>
                 <animateMotion dur="4s" repeatCount="indefinite" path="M 400 250 Q 550 150 640 140" />
               </motion.circle>

               {/* Line 3: Center to Verify */}
               <path d="M 400 250 Q 300 350 240 380" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
               <motion.circle r="3" fill="#34d399" style={{ filter: 'blur(1px)' }}>
                 <animateMotion dur="2.5s" repeatCount="indefinite" path="M 400 250 Q 300 350 240 380" />
               </motion.circle>
               
               {/* Line 4: Center to Execute */}
               <path d="M 400 250 Q 500 300 560 330" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
               <motion.circle r="3" fill="#facc15" style={{ filter: 'blur(1px)' }}>
                 <animateMotion dur="3.5s" repeatCount="indefinite" path="M 400 250 Q 500 300 560 330" />
               </motion.circle>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
