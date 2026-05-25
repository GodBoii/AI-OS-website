import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

function SeamlessVideo({ src, className, maxOpacity = 0.7 }: { src: string; className?: string; maxOpacity?: number }) {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2) return;

    // Set initial opacities
    v1.style.opacity = String(maxOpacity);
    v2.style.opacity = '0';

    // Start playing video 1
    v1.play().catch(() => {});

    let activeVideo = 1;
    let fadeInitiated = false;
    const fadeDuration = 0.8; // seconds to crossfade

    const handleTimeUpdate = () => {
      const active = activeVideo === 1 ? v1 : v2;
      const inactive = activeVideo === 1 ? v2 : v1;

      const duration = active.duration;
      const currentTime = active.currentTime;

      if (!duration || isNaN(duration)) return;

      const timeLeft = duration - currentTime;

      // Start pre-playing the inactive video when active video is near end
      if (timeLeft <= fadeDuration && !fadeInitiated) {
        fadeInitiated = true;
        inactive.currentTime = 0;
        inactive.play().catch(() => {});
      }

      // Perform crossfade
      if (timeLeft <= fadeDuration) {
        const progress = (fadeDuration - timeLeft) / fadeDuration;
        const boundedProgress = Math.min(Math.max(progress, 0), 1);
        active.style.opacity = String(maxOpacity * (1 - boundedProgress));
        inactive.style.opacity = String(maxOpacity * boundedProgress);
      }
    };

    const handleEnded = () => {
      const active = activeVideo === 1 ? v1 : v2;
      const inactive = activeVideo === 1 ? v2 : v1;

      // Stop and reset the ended video
      active.pause();
      active.currentTime = 0;
      active.style.opacity = '0';

      // Make sure the now-active video is at max opacity
      inactive.style.opacity = String(maxOpacity);

      // Switch active index
      activeVideo = activeVideo === 1 ? 2 : 1;
      fadeInitiated = false;
    };

    v1.addEventListener('timeupdate', handleTimeUpdate);
    v1.addEventListener('ended', handleEnded);
    v2.addEventListener('timeupdate', handleTimeUpdate);
    v2.addEventListener('ended', handleEnded);

    return () => {
      v1.removeEventListener('timeupdate', handleTimeUpdate);
      v1.removeEventListener('ended', handleEnded);
      v2.removeEventListener('timeupdate', handleTimeUpdate);
      v2.removeEventListener('ended', handleEnded);
    };
  }, [src, maxOpacity]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef1}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`${className} absolute inset-0 transition-opacity duration-100`}
      />
      <video
        ref={videoRef2}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`${className} absolute inset-0 transition-opacity duration-100`}
      />
    </div>
  );
}

export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative h-[110vh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
      {/* Ambient Depth Background with Video */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y, opacity }}
      >
        {/* Background Video with seamless loop */}
        <SeamlessVideo 
          src="/landing.mp4" 
          className="absolute inset-0 w-full h-full object-cover" 
          maxOpacity={0.7} 
        />

        {/* Ambient Glows to tint the scene */}
        <div className="w-[800px] h-[800px] bg-accent-violet/10 rounded-full blur-[150px] absolute top-[-20%] right-[-10%]" />
        <div className="w-[1000px] h-[1000px] bg-accent-cyan/5 rounded-full blur-[150px] absolute bottom-[-30%] left-[-20%]" />
        
        {/* Dark Vignette Overlays to blend the video and ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/40 to-[#020202]" />
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
