import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeCanvas from './components/ThreeCanvas';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // SEO Optimization & Title setup
  useEffect(() => {
    document.title = "NEOX Studio // Premium 3D Spatial Interfaces & WebGL Agency";
    
    // Set meta descriptions dynamically for search bots
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "NEOX is an elite digital design agency engineering next-generation 3D spatial interfaces, bespoke high-fidelity UI/UX, and WebGL architectures.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "NEOX is an elite digital design agency engineering next-generation 3D spatial interfaces, bespoke high-fidelity UI/UX, and WebGL architectures.";
      document.head.appendChild(meta);
    }
  }, []);

  const handleExploreClick = () => {
    const target = document.getElementById('projects');
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const offsetPos = targetRect - bodyRect - offset;
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const target = document.getElementById('contact');
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const offsetPos = targetRect - bodyRect - offset;
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-dark-bg text-white selection:bg-neon-blue/20 overflow-x-hidden">
      
      {/* Immersive UI Scanning Lines */}
      <div className="scanning-lines" />
      
      {/* 1. Global Interactive Three.js 3D Background */}
      <ThreeCanvas />

      {/* 2. Fullscreen Loading Progress Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* 3. Main Application Layout (Fades in once loading finishes) */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="relative z-10 w-full min-h-screen bg-transparent cyber-grid"
          >
            {/* Header Sticky Navbar */}
            <Navbar />

            {/* Layout Main Sections */}
            <main className="w-full">
              <HeroSection 
                onExploreClick={handleExploreClick} 
                onContactClick={handleContactClick} 
              />
              <ServicesSection />
              <ProjectsSection />
              <AboutSection />
              <ContactSection />
            </main>

            {/* Polished Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
