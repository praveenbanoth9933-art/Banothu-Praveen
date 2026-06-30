import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, User, Award, ArrowUpRight } from 'lucide-react';
import GlassCard from './GlassCard';
import { Project } from '../types';

const projectsList: Project[] = [
  {
    id: 'p1',
    title: 'Orbital Cybernetics',
    category: 'WebGL',
    description: 'An immersive 3D global telemetry dashboard constructed using WebGL custom shaders and real-time database feeds.',
    tags: ['Three.js', 'ShaderMaterial', 'TypeScript', 'D3'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', // Beautiful liquid art
    client: 'Orion Tech Systems',
    year: '2026',
    link: '#',
    role: 'Lead Creative Developer',
    challenge: 'The client required a dashboard that displays complex geospatial data stream nodes in 3D, keeping rendering latency under 12ms even on legacy mobile hardware.',
    solution: 'Engineered a custom instanced buffer mesh setup in Three.js, moving all calculation loads to vertex and fragment shader structures, yielding a stable 60fps across all viewport devices.'
  },
  {
    id: 'p2',
    title: 'Synthetic Minds Studio',
    category: 'Design',
    description: 'Comprehensive brand experience, 3D web mockups, and high-contrast typography mapping for an elite futuristic AI consultancy.',
    tags: ['Brand Strategy', 'Figma', 'Spline 3D', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop', // Glowing abstract glass shapes
    client: 'Synthetic Minds LLC',
    year: '2026',
    link: '#',
    role: 'Principal Art Director',
    challenge: 'Establishing a cohesive spatial art direction that communicates advanced intelligence without falling into typical, generic AI tropes.',
    solution: 'Designed a high-contrast black and cyan color-grid system paired with custom physical glass-morphism mockups and customized geometric glyph sets.'
  },
  {
    id: 'p3',
    title: 'Aether Convolution',
    category: 'Spatial',
    description: 'An interactive virtual real-estate showcase utilizing browser-native physics engine and volumetric coordinate mapping.',
    tags: ['Three.js', 'Rapier Physics', 'React', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', // Glowing modern house facade
    client: 'Aether Capital',
    year: '2025',
    link: '#',
    role: 'Lead Spatial Engineer',
    challenge: 'Rendering architectural models of ultra-luxury estates in high fidelity inside the browser while supporting dynamic interactive lighting controls.',
    solution: 'Implemented real-time lightmapping baked via Blender, connected directly to canvas coordinate matrices, allowing users to toggle times of day seamlessly.'
  },
  {
    id: 'p4',
    title: 'Nexus Protocol',
    category: 'WebGL',
    description: 'A Web3 digital assets marketplace landing page equipped with custom gravitational particles reacting to mouse cursor dynamics.',
    tags: ['Three.js', 'GLSL Shaders', 'Tailwind', 'Motion'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop', // Hyper cyber abstract mesh
    client: 'Nexus Foundation',
    year: '2026',
    link: '#',
    role: 'WebGL Developer',
    challenge: 'Creating a highly addictive landing experience that translates user mouse movements into magnetic gravity wells for thousands of floating particles.',
    solution: 'Constructed custom particle vector acceleration layers in raw GLSL, running fully parallelized computations directly on the browser GPU.'
  }
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = filter === 'All'
    ? projectsList
    : projectsList.filter(proj => proj.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 bg-transparent">
      {/* Lights background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00ffd8]" />
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Selected Works</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              SPATIAL SOLUTIONS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-neon-cyan">
                SHOWCASE
              </span>
            </h2>
          </div>

          {/* Filter Controllers */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 glass-panel p-1.5 rounded-xl border border-white/[0.04]">
            {['All', 'WebGL', 'Design', 'Spatial'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-all duration-300 focus:outline-none ${
                  filter === cat
                    ? 'bg-neon-blue text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard
                  glowColor={project.category === 'WebGL' ? 'blue' : project.category === 'Design' ? 'purple' : 'cyan'}
                  className="group flex flex-col p-0 overflow-hidden h-full border border-white/[0.04]"
                  onClick={() => setActiveModalProject(project)}
                >
                  {/* Aspect-Ratio Mockup Box */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050510]">
                    {/* Glowing grid line underneath image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70" />
                    
                    <img 
                      src={project.image} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                    />

                    {/* Category Label Tag overlay */}
                    <span className="absolute top-4 left-4 z-20 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-neon-blue">
                      {project.category}
                    </span>

                    {/* Quick Expand Button Hover */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-xs">
                      <div className="px-5 py-3 rounded-xl bg-black/80 border border-neon-blue/30 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        View Case Study
                        <ArrowUpRight className="w-3.5 h-3.5 text-neon-blue" />
                      </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display text-2xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className="font-mono text-[11px] text-gray-500">
                          {project.year}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Tag bubbles */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04] mt-auto">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="font-mono text-[8px] uppercase tracking-widest text-gray-400 px-2 py-1 rounded bg-white/[0.02] border border-white/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Case Study Details Fullscreen Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-6 bg-[#030307]/90 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl glass-panel-heavy rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_30px_rgba(0,240,255,0.1)]"
              onClick={e => e.stopPropagation()}
            >
              {/* Image banner inside Modal */}
              <div className="relative h-64 md:h-96 w-full bg-[#050510]">
                <img 
                  src={activeModalProject.image} 
                  alt={activeModalProject.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090915] via-[#090915]/30 to-transparent" />
                
                {/* Close Button top-right */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/75 border border-white/10 text-white hover:text-neon-blue focus:outline-none cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left labels overlay */}
                <div className="absolute bottom-6 left-6 md:left-8 z-10">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neon-blue bg-black/75 px-3 py-1.5 rounded border border-neon-blue/30 mb-2.5 inline-block">
                    {activeModalProject.category}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white">
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>

              {/* Grid content */}
              <div className="p-6 md:p-10 bg-[#090915] grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-300">
                {/* Specs sidebar (1/3 width) */}
                <div className="space-y-6 md:border-r border-white/[0.04] md:pr-8">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">
                      <User className="w-3.5 h-3.5 text-neon-blue" /> Client
                    </div>
                    <p className="text-white font-medium">{activeModalProject.client}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neon-purple" /> Timeline
                    </div>
                    <p className="text-white font-medium">{activeModalProject.year}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">
                      <Award className="w-3.5 h-3.5 text-neon-cyan" /> Our Role
                    </div>
                    <p className="text-white font-medium">{activeModalProject.role}</p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.04]">
                    <a
                      href={activeModalProject.link}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded bg-neon-blue/10 border border-neon-blue/30 hover:border-neon-blue hover:bg-neon-blue/20 text-white font-mono text-xs uppercase tracking-widest transition-colors w-full justify-center shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                    >
                      Launch Live App <ExternalLink className="w-3.5 h-3.5 text-neon-blue" />
                    </a>
                  </div>
                </div>

                {/* Summary narrative (2/3 width) */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
                      The Challenge
                    </h4>
                    <p className="font-light leading-relaxed text-gray-300">
                      {activeModalProject.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
                      Our Solution
                    </h4>
                    <p className="font-light leading-relaxed text-gray-300">
                      {activeModalProject.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                      Technologies Applied
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalProject.tags.map(tag => (
                        <span 
                          key={tag}
                          className="font-mono text-[9px] uppercase tracking-widest text-neon-blue px-3 py-1.5 rounded bg-neon-blue/5 border border-neon-blue/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
