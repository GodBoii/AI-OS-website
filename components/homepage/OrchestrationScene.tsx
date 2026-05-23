import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
          className="relative max-w-4xl mx-auto aspect-[16/10] rounded-[2.5rem] border border-white/[0.03] bg-[#050505]/60 backdrop-blur-3xl p-2 flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent-violet/[0.02] to-transparent pointer-events-none z-10" />
          
          <video
            src="/video/landing.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover rounded-[2.2rem] opacity-75"
          />
          {/* Ambient vignette and glow layers to fit premium aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/30 pointer-events-none rounded-[2.5rem] z-10" />
        </motion.div>
      </div>
    </section>
  );
}
