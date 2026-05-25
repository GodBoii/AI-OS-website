import SEO from '../components/SEO';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { DownloadCloud } from 'lucide-react';
import { FaWindows, FaLinux, FaAndroid } from 'react-icons/fa6';

export default function DownloadPage() {
  return (
    <Layout>
      <SEO 
        title="Download Aetheria AI | Cross-Platform Agent OS"
        description="Get the Aetheria AI native client for Android, iOS, macOS, and Windows. Run specialized agents locally and orchestrate workflows at machine speed."
        schemaType="SoftwareApplication"
      />

      <div className="container mx-auto px-4 max-w-6xl py-20" style={{ perspective: 1200 }}>
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="w-16 h-16 mx-auto bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <DownloadCloud className="w-8 h-8 text-white/80" />
            </div>
            <h1 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">
              Download <span className="text-white/30">Aetheria.</span>
            </h1>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
              Select your target environment and download the application to begin orchestrating autonomous workflows locally.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
          {/* Windows Download */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 10, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ scale: 1.02, rotateX: 5, y: -5 }}
            className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center border-white/[0.05] bg-[#0a0a0a]/90 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00a4ef]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 w-full flex flex-col items-center flex-1">
              <FaWindows className="w-16 h-16 text-[#00a4ef]/80 mb-8 group-hover:text-[#00a4ef] transition-colors" />
              <h3 className="text-2xl font-medium text-white mb-3">Windows</h3>
              <p className="text-white/40 font-light mb-12 text-sm tracking-wide">Windows 10 and 11 (64-bit)</p>
              <a 
                href="https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.24/Aetheria.AI.Setup.1.2.24.exe" 
                className="mt-auto w-full px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-white/80 font-medium tracking-wide hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-3 group-hover:shadow-[0_0_20px_rgba(0,164,239,0.2)]"
              >
                <DownloadCloud className="w-4 h-4 text-white/50" />
                Download .exe
              </a>
            </div>
          </motion.div>

          {/* Android Download */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 10, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.02, rotateX: 5, y: -5 }}
            className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center border-white/[0.05] bg-[#0a0a0a]/90 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#3ddc84]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 w-full flex flex-col items-center flex-1">
              <FaAndroid className="w-16 h-16 text-[#3ddc84]/80 mb-8 group-hover:text-[#3ddc84] transition-colors" />
              <h3 className="text-2xl font-medium text-white mb-3">Android</h3>
              <p className="text-white/40 font-light mb-12 text-sm tracking-wide">Android 8.0 and higher (.apk)</p>
              <a 
                href="https://github.com/GodBoii/AI-OS-website/releases/download/v0.0.1/Aetheria.apk" 
                className="mt-auto w-full px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-white/80 font-medium tracking-wide hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-3 group-hover:shadow-[0_0_20px_rgba(61,220,132,0.2)]"
              >
                <DownloadCloud className="w-4 h-4 text-white/50" />
                Download .apk
              </a>
            </div>
          </motion.div>

          {/* Linux Download */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 10, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ scale: 1.02, rotateX: 5, y: -5 }}
            className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center border-white/[0.05] bg-[#0a0a0a]/90 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 w-full flex flex-col items-center flex-1">
              <FaLinux className="w-16 h-16 text-white/60 mb-8 group-hover:text-white transition-colors" />
              <h3 className="text-2xl font-medium text-white mb-3">Linux</h3>
              <p className="text-white/40 font-light mb-12 text-sm tracking-wide">Debian, Ubuntu (.deb)</p>
              <a 
                href="https://github.com/GodBoii/AI-OS-website/releases" 
                className="mt-auto w-full px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-white/80 font-medium tracking-wide hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-3 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <DownloadCloud className="w-4 h-4 text-white/50" />
                Download .deb
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
