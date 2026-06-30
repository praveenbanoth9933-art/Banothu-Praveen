import { Layers, Compass, Code, Eye, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import GlassCard from './GlassCard';
import { Service } from '../types';

const servicesList: Service[] = [
  {
    id: 's1',
    title: '3D Spatial Interfaces',
    iconName: 'layers',
    description: 'We develop bespoke WebGL, Three.js, and WebGPU architectures that transform static pages into rich, immersive 3D digital worlds.',
    features: ['Custom shader development', 'Real-time camera physics', 'Interactive mesh configurators'],
    glowColor: 'blue'
  },
  {
    id: 's2',
    title: 'High-Fidelity UI/UX',
    iconName: 'code',
    description: 'Engineering super responsive, high-fidelity user interfaces grounded in rigorous typographic pairings and micro-interactions.',
    features: ['Custom motion transitions', 'Fluid design system setups', 'Sleek glassmorphism standards'],
    glowColor: 'purple'
  },
  {
    id: 's3',
    title: 'Cyberbrand Identity',
    iconName: 'eye',
    description: 'We design premium, neon-accented, high-end cyberbrand visuals that evoke a sense of future innovation and engineering precision.',
    features: ['Futuristic logo concepts', 'Dynamic color system mapping', 'Polished typography assets'],
    glowColor: 'cyan'
  },
  {
    id: 's4',
    title: 'Interactive 3D Canvases',
    iconName: 'compass',
    description: 'Constructing performant, interactive canvas dashboards, custom GIS systems, and responsive data visualizers.',
    features: ['Three.js database rendering', 'Responsive 3D charts', 'Mouse-guided physical cameras'],
    glowColor: 'cyan'
  }
];

export default function ServicesSection() {
  
  const getIcon = (name: string, color: string) => {
    const iconProps = { className: `w-7 h-7 ${color}` };
    switch (name) {
      case 'layers': return <Layers {...iconProps} />;
      case 'code': return <Code {...iconProps} />;
      case 'eye': return <Eye {...iconProps} />;
      case 'compass': return <Compass {...iconProps} />;
      default: return <Layers {...iconProps} />;
    }
  };

  const getGlowColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'text-neon-blue';
      case 'purple': return 'text-neon-purple';
      case 'cyan': return 'text-neon-cyan';
      default: return 'text-neon-blue';
    }
  };

  return (
    <section id="services" className="relative py-24 px-6 md:px-12 bg-transparent">
      {/* Background neon lights */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neon-blue/3 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-neon-purple/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_#00f0ff]" />
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Our Capabilities</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              CORE METRIC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan text-neon-blue">
                SPECIALIZATION
              </span>
            </h2>
          </div>
          <p className="text-gray-400 font-light max-w-sm mt-4 md:mt-0 leading-relaxed text-sm">
            We bridge the gap between creative artistry and advanced WebGL computation to create memorable interfaces that boost credibility and conversions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard 
                glowColor={service.glowColor}
                className="group h-full flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Title block */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:border-neon-blue/30 transition-all duration-300">
                      {getIcon(service.iconName, getGlowColorClass(service.glowColor))}
                    </div>
                    <span className="font-mono text-[10px] text-gray-500 tracking-widest">
                      [0{index + 1}_SPEC]
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Features & Action Footer */}
                <div className="border-t border-white/[0.04] pt-6 mt-auto">
                  <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className={`w-1 h-1 rounded-full ${
                          service.glowColor === 'blue' ? 'bg-neon-blue' :
                          service.glowColor === 'purple' ? 'bg-neon-purple' : 'bg-neon-cyan'
                        }`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neon-blue group-hover:text-white transition-colors duration-300 cursor-pointer">
                    Request Integration
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
