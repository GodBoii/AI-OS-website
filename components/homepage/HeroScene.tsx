import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const coreY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={ref} className="relative h-[110vh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
      {/* Ambient Depth Background */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="w-[800px] h-[800px] bg-accent-violet/10 rounded-full blur-[150px] absolute top-[-20%] right-[-10%]" />
        <div className="w-[1000px] h-[1000px] bg-accent-cyan/5 rounded-full blur-[150px] absolute bottom-[-30%] left-[-20%]" />
        
        {/* Subtle procedural light rays/flow lines in background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"
              style={{ top: `${20 * i + 10}%` }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear", opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" } }}
            />
          ))}
        </div>
      </motion.div>

      {/* Spatial Execution Core (Centerpiece) */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] pointer-events-none z-0"
        style={{ x: '-50%', y: 'calc(-50% - 50px)', scale: coreScale, translateY: coreY, perspective: 1200 }}
      >
        <motion.div
          animate={{ rotateX: [20, 30, 20], rotateY: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-full h-full relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Core Layers */}
          <div className="absolute w-[300px] h-[300px] border border-white/[0.03] bg-white/[0.01] backdrop-blur-[2px] rounded-full shadow-[0_0_80px_rgba(139,92,246,0.1)]" style={{ transform: 'translateZ(-100px)' }} />
          <div className="absolute w-[400px] h-[400px] border border-accent-cyan/[0.05] bg-accent-cyan/[0.01] rounded-full shadow-[0_0_60px_rgba(34,211,238,0.05)]" style={{ transform: 'translateZ(0px) rotateX(75deg)' }} />
          <div className="absolute w-[200px] h-[200px] border border-accent-violet/[0.08] bg-accent-violet/[0.02] backdrop-blur-[4px] rounded-full" style={{ transform: 'translateZ(100px)' }} />
          
          {/* Core Data Nodes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`node-${i}`}
              className="absolute w-2 h-2 bg-white/40 rounded-full blur-[1px]"
              style={{ 
                transform: `rotate(${i * 60}deg) translateY(-150px) translateZ(0px)`,
                transformOrigin: '0 150px'
              }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-32">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight mb-8 text-white leading-[1.1] relative">
            The AI <span className="text-white/40 mix-blend-plus-lighter">Operating</span><br/>System
          </h1>
          <p className="text-xl md:text-2xl text-white/40 font-light max-w-2xl mx-auto mb-16 tracking-wide leading-relaxed">
            Execution at machine speed. A spatial orchestration engine that builds, deploys, and solves autonomously.
          </p>
          
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/30 to-transparent z-20"
      />
    </section>
  );
}
