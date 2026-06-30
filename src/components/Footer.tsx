import { ArrowUp, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.04] bg-[#05050f]/80 backdrop-blur-md py-12 px-6 md:px-12 mt-20 z-10 overflow-hidden">
      
      {/* Background ambient accent */}
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-neon-purple/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Branding block */}
          <div className="md:col-span-1.5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-neon-blue rounded flex items-center justify-center transform rotate-45">
                <span className="font-display text-[9px] text-neon-blue font-bold">N</span>
              </div>
              <span className="font-display font-black tracking-widest text-white text-md">NEO<span className="text-neon-blue">X</span></span>
            </div>
            <p className="text-xs text-gray-500 font-light leading-relaxed max-w-sm">
              Engineering the next generation of 3D virtual spatial web applications and immersive digital brand designs. Guided by aesthetic precision and WebGL acceleration.
            </p>
          </div>

          {/* Column 2: Service shortcuts */}
          <div>
            <h4 className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-4">
              Our Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#services" className="hover:text-neon-blue transition-colors">3D Spatial Interfaces</a></li>
              <li><a href="#services" className="hover:text-neon-purple transition-colors">High-Fidelity UI/UX</a></li>
              <li><a href="#services" className="hover:text-neon-cyan transition-colors">Cyberbrand Identity</a></li>
              <li><a href="#services" className="hover:text-neon-blue transition-colors">Interactive 3D Canvases</a></li>
            </ul>
          </div>

          {/* Column 3: Corporate links */}
          <div>
            <h4 className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#projects" className="hover:text-neon-blue transition-colors">Selected Projects</a></li>
              <li><a href="#about" className="hover:text-neon-purple transition-colors">About Our Squad</a></li>
              <li><a href="#contact" className="hover:text-neon-cyan transition-colors">Communications Link</a></li>
              <li><span className="text-gray-700 cursor-not-allowed">Terms of Service [N/A]</span></li>
            </ul>
          </div>

          {/* Column 4: Back to Top & HQ info */}
          <div className="flex flex-col justify-between items-start md:items-end col-span-1">
            <button
              onClick={scrollToTop}
              className="px-4 py-2.5 rounded bg-white/[0.02] border border-white/5 hover:border-neon-blue hover:text-neon-blue transition-all duration-300 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 cursor-pointer group shadow-[0_0_10px_rgba(0,240,255,0.05)] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              UPWARD BOUND
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-neon-blue" />
            </button>
            <div className="text-left md:text-right font-mono text-[9px] text-gray-600 space-y-1 mt-6">
              <p>SYS_STABLE // 100% LAT_SECURE</p>
              <p>SAN FRANCISCO, CA // REMOTE</p>
            </div>
          </div>

        </div>

        {/* Core copyright footer strip */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-gray-600 gap-4">
          <div className="flex items-center gap-4">
            <span>&copy; {currentYear} NEOX DIGITAL LABS INC. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Tech badges */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-neon-blue transition-colors cursor-help">
              <Terminal className="w-3.5 h-3.5 text-neon-blue" /> GLSL_v3.0_OK
            </span>
            <span className="flex items-center gap-1.5 hover:text-neon-purple transition-colors cursor-help">
              <Cpu className="w-3.5 h-3.5 text-neon-purple" /> THREE_RENDER_ON
            </span>
            <span className="flex items-center gap-1.5 hover:text-neon-cyan transition-colors">
              <ShieldAlert className="w-3.5 h-3.5 text-neon-cyan" /> COMPLIANCE_OK
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
