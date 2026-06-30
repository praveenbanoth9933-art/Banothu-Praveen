import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  { percent: 0, text: "BOOTING SECURE WORKSPACE" },
  { percent: 20, text: "COMPILING WEBGL MODULES" },
  { percent: 45, text: "MAPPING NEON GRID NODES" },
  { percent: 70, text: "GENERATING VECTOR PARTICLES" },
  { percent: 90, text: "FINALIZING SPATIAL DEPTH" },
  { percent: 100, text: "SYSTEM READY" }
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [activeText, setActiveText] = useState(loadingSteps[0].text);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const start = Date.now();
    const duration = 2800; // Total loading time 2.8s

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(calculatedProgress);

      // Find the text for current progress
      const currentStep = [...loadingSteps]
        .reverse()
        .find(step => calculatedProgress >= step.percent);
      
      if (currentStep) {
        setActiveText(currentStep.text);
      }

      if (calculatedProgress < 100) {
        timer = setTimeout(updateProgress, 30);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Allow exit animation to play
        }, 400);
      }
    };

    timer = setTimeout(updateProgress, 30);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100vh', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#030307] text-white overflow-hidden cyber-grid radial-mask"
        >
          {/* Neon background light hubs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-[120px] animate-pulse" />

          {/* Core loading content */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
            {/* Tech Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-16 h-16 mb-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-xl border border-neon-blue animate-slow-spin" />
              <div className="absolute inset-2 rounded-xl border border-neon-purple/50 animate-slow-spin" style={{ animationDirection: 'reverse' }} />
              <div className="w-4 h-4 bg-neon-blue rounded-sm shadow-[0_0_10px_#00f0ff] animate-pulse" />
            </motion.div>

            {/* Large Progress Number */}
            <div className="overflow-hidden mb-2">
              <motion.h1 
                className="font-display text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress}%
              </motion.h1>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-64 h-[2px] bg-white/5 rounded-full mb-6 overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple shadow-[0_0_8px_#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Tech Subtitle Actions */}
            <div className="h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400"
                >
                  {activeText}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Subtle frame indicators */}
            <div className="absolute -top-32 -left-32 w-64 h-64 border-t border-l border-neon-blue/10 rounded-tl-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 border-b border-r border-neon-purple/10 rounded-br-3xl pointer-events-none" />
          </div>

          {/* Side corner decors */}
          <div className="absolute top-8 left-8 font-mono text-[9px] tracking-widest text-gray-500 hidden md:block">
            SYS_REF_LOC: 3000 // CORE_ACTIVE
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[9px] tracking-widest text-gray-500 hidden md:block">
            PORTFOLIO v2.4.0_STABLE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
