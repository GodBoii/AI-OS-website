import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Layers, ShieldCheck, Cpu } from 'lucide-react';

export default function WorkspaceScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smoother scaling and rotation for a luxurious boot-up feel
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 1], [30, 0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, -50]);

  return (
    <section ref={ref} className="relative py-40 w-full min-h-[120vh] bg-[#020202] overflow-hidden" style={{ perspective: 1500 }}>
      {/* Background ambient lighting connecting from previous section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050505] to-black pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 tracking-tight">
              A Spatial <span className="text-white/30">Operating System.</span>
            </h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto tracking-wide">
              Your entire workflow connected in a single, immersive environment. Fluidly move between code, deployment, and active agent states.
            </p>
          </motion.div>
        </div>

        <motion.div 
          style={{ rotateX, scale, opacity, y, transformStyle: "preserve-3d" }}
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl"
        >
          {/* Main Workspace Window */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-[#080808]/90 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-white/[0.01]">
              <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-red-500/80 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-yellow-500/80 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-green-500/80 transition-colors" />
              <div className="mx-auto px-6 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/40 font-mono tracking-widest flex items-center gap-2">
                 <Cpu className="w-3 h-3 text-white/30" />
                 AETHERIA.LOCAL / WORKSPACE
              </div>
            </div>
            
            <div className="flex-1 relative overflow-hidden bg-[#050505]">
              <img 
                src="/home-page.png" 
                alt="Aetheria Workspace Command Center" 
                className="w-full h-full object-cover object-top opacity-90 transition-opacity duration-500 hover:opacity-100"
              />
              {/* Subtle gradient overlay to blend the screenshot into the dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating UI Elements (Spatial Z-Depth) */}
          <motion.div 
            style={{ translateZ: 80, x: 40, y: -20 }}
            className="absolute -right-16 top-1/4 w-64 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-white/90">System Secure</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">All active nodes and container boundaries are operating within normal parameters.</p>
          </motion.div>

          <motion.div 
            style={{ translateZ: 120, x: -50, y: 30 }}
            className="absolute -left-12 bottom-1/4 w-72 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
             <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-accent-cyan" />
              <span className="text-sm font-medium text-white/90">Deployment Pipeline</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/30 font-mono mt-2">
              <span>SYNCING</span>
              <span>EDGE_NET</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
