import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/audioEngine';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    setIsAudioPlaying(audioEngine.isPlaying());
  }, []);

  const toggleAudio = () => {
    if (audioEngine.isPlaying()) {
      audioEngine.stop();
      setIsAudioPlaying(false);
    } else {
      audioEngine.start();
      setIsAudioPlaying(true);
    }
  };

  useEffect(() => {
    // 1. Scroll styling transition
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Active Section Highlighting based on scroll intersection
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Match central view focus
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navLinks.forEach(link => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 glass-panel-heavy shadow-[0_4px_30px_rgba(0,0,0,0.8),_0_0_15px_rgba(0,240,255,0.05)] border-b border-white/[0.06]' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-neon-blue rounded-lg transform rotate-45 transition-transform duration-500 group-hover:rotate-90 group-hover:border-neon-cyan" />
              <span className="font-display font-black text-xs text-neon-blue group-hover:text-neon-cyan">N</span>
            </div>
            <span className="font-display font-bold text-lg tracking-widest text-white group-hover:text-neon-blue transition-colors duration-300">
              NEO<span className="text-neon-blue">X</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-2 font-mono text-xs uppercase tracking-widest cursor-pointer focus:outline-none transition-colors duration-300 ${
                  activeSection === link.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_8px_#00f0ff]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Audio controller + Let's Talk CTA button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAudio}
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-white bg-white/[0.02] border border-white/10 rounded-lg cursor-pointer hover:bg-white/[0.06] hover:border-neon-blue transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] group focus:outline-none"
              aria-label="Toggle ambient background sound"
            >
              <div className="flex items-end gap-[3px] h-3.5 w-5">
                <span className={`w-[2.5px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-1' : 'h-1.5 bg-gray-600'}`} />
                <span className={`w-[2.5px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-2' : 'h-2 bg-gray-600'}`} />
                <span className={`w-[2.5px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-3' : 'h-1 bg-gray-600'}`} />
                <span className={`w-[2.5px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-4' : 'h-2.5 bg-gray-600'}`} />
              </div>
              <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors duration-300">
                {isAudioPlaying ? 'AMBIENT_ON' : 'AMBIENT_OFF'}
              </span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="relative inline-flex items-center gap-1.5 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white bg-neon-blue/10 border border-neon-blue/30 rounded-lg cursor-pointer hover:bg-neon-blue/20 hover:border-neon-blue transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.25)] group focus:outline-none"
            >
              Let's Talk
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neon-blue" />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Sound Toggle */}
            <button
              onClick={toggleAudio}
              className="relative p-2.5 rounded-lg border border-white/10 hover:border-neon-blue/40 bg-white/5 text-white flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Toggle ambient background sound"
            >
              <div className="flex items-end gap-[2px] h-3.5 w-4.5">
                <span className={`w-[2px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-1' : 'h-1 bg-gray-600'}`} />
                <span className={`w-[2px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-2' : 'h-1.5 bg-gray-600'}`} />
                <span className={`w-[2px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-3' : 'h-0.5 bg-gray-600'}`} />
                <span className={`w-[2px] rounded-full bg-neon-blue transition-all duration-300 ${isAudioPlaying ? 'animate-sound-bar-4' : 'h-2 bg-gray-600'}`} />
              </div>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6 text-neon-blue" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-900 pt-24 px-6 pb-8 bg-[#030307]/95 backdrop-blur-2xl flex flex-col justify-between md:hidden border-b border-white/[0.05]"
          >
            {/* Nav links stack */}
            <div className="flex flex-col gap-6 pt-8">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center justify-between py-3 border-b border-white/[0.03] text-left focus:outline-none"
                >
                  <span className={`font-display text-2xl font-semibold tracking-tight ${
                    activeSection === link.id ? 'text-neon-blue' : 'text-gray-300'
                  }`}>
                    {link.label}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    activeSection === link.id ? 'bg-neon-blue shadow-[0_0_8px_#00f0ff]' : 'bg-transparent'
                  }`} />
                </motion.button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-4 text-center font-mono text-sm uppercase tracking-widest bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:outline-none cursor-pointer"
              >
                Start a Project
              </button>
              <div className="text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                NEOX STUDIO &copy; 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
