import { ArrowDown, Zap, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function HeroSection({ onExploreClick, onContactClick }: HeroSectionProps) {
  
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8 // Start after loading screen completes
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden"
    >
      {/* Background glowing hubs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full filter blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/10 w-[300px] h-[300px] bg-neon-purple/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-5xl"
        >
          {/* Subtle Cyber Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8 hover:border-neon-blue/30 transition-all duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
            </span>
            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-[0.25em]">
              WebGL // SPATIAL DESIGN STUDIO
            </span>
          </motion.div>

          {/* Master Display Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white mb-8"
          >
            SHAPING NEXT-GEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple filter drop-shadow-[0_0_30px_rgba(0,240,255,0.2)] animate-pulse" style={{ animationDuration: '6s' }}>
              DIGITAL DIMENSIONS
            </span>
          </motion.h1>

          {/* Descriptive Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-12"
          >
            We are a hyper-focused, elite design agency engineering highly interactive 3D web applications, bespoke digital assets, and high-end portfolios optimized for maximum visual impact.
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 font-mono text-xs uppercase tracking-widest text-black bg-neon-blue rounded-xl font-medium cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:bg-[#00ffd8] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Creations
            </button>
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-8 py-4 font-mono text-xs uppercase tracking-widest text-white glass-panel border border-white/10 rounded-xl cursor-pointer hover:border-neon-purple hover:bg-neon-purple/10 hover:shadow-[0_0_20px_rgba(157,0,255,0.2)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Request a Concept
            </button>
          </motion.div>

          {/* Micro-Features Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/[0.04] w-full max-w-3xl"
          >
            <div className="flex flex-col items-center">
              <Zap className="w-5 h-5 text-neon-blue mb-2.5" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Ultra Performance</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-neon-cyan mb-2.5" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Bespoke Design</span>
            </div>
            <div className="flex flex-col items-center">
              <Cpu className="w-5 h-5 text-neon-purple mb-2.5" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Interactive 3D</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-6 flex flex-col items-center cursor-pointer group"
          onClick={() => {
            const nextSec = document.getElementById('services');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-neon-blue transition-colors duration-300 mb-2">
            Scroll To Explore
          </span>
          <div className="w-5 h-8 rounded-full border border-gray-600 flex justify-center p-1 group-hover:border-neon-blue transition-colors duration-300">
            <motion.div 
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1 h-2 bg-neon-blue rounded-full shadow-[0_0_5px_#00f0ff]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
