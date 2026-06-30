import { Github, Linkedin, Twitter, Target, Heart, Award } from 'lucide-react';
import { motion } from 'motion/react';
import GlassCard from './GlassCard';
import { TeamMember } from '../types';
// @ts-ignore
import praveenPortrait from '../assets/images/regenerated_image_1782839548104.jpg';

const teamMembers: TeamMember[] = [
  {
    name: 'Banothu Praveen',
    role: 'Creative Director & WebGL Architect',
    image: praveenPortrait,
    bio: 'Dedicated to pushing the physical limits of standard browser render pipelines with customized vertex shaders and custom mathematical formulas.',
    twitter: '#',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'AI BOT',
    role: 'Lead UI Designer & Motion Engineer',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', // Tech abstract avatar
    bio: 'Specializing in hyper-responsive layout design, rigorous typography choices, and physics-based React animation frameworks.',
    twitter: '#',
    linkedin: '#',
    github: '#'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background Neon Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_#9d00ff]" />
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">About The Agency</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            THE PHILOSOPHY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink text-neon-purple">
              OF DIGITAL CRAFT
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Bento Box 1: Core Narrative (Takes 2 columns on large) */}
          <GlassCard 
            glowColor="purple"
            className="lg:col-span-2 flex flex-col justify-between p-8 border border-white/[0.04]"
          >
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] text-neon-purple tracking-widest uppercase mb-4 block">[01_MISSION]</span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-6 leading-tight">
                We believe that every digital landing page should evoke an emotional and visceral response.
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-6 text-sm">
                In a web cluttered with generic templated layouts, we design bespoke interactive modules that blend flawless design with advanced WebGL engineering. Our platforms do not just supply text—they tell stories, model interactions, and build premium brand credibility.
              </p>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                We optimize every asset down to the byte. By bypassing bloated libraries and generating custom GLSL shaders, we deliver ultra-high fidelity graphics that load in fractions of a second.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/[0.04]">
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-neon-purple shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-white font-medium text-xs uppercase tracking-wide">Aesthetic Precision</h4>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">Sticking strictly to grids, typography scales, and unified neon tones.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-neon-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-white font-medium text-xs uppercase tracking-wide">Emotional Depth</h4>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">Using physics-based cameras and parallax to build physical depth.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-white font-medium text-xs uppercase tracking-wide">Performance First</h4>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed mt-1">Aiming for 99+ scores on Lighthouse diagnostics and fast page paints.</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Bento Box 2: Premium Metrics & Stats (1 column) */}
          <GlassCard 
            glowColor="blue"
            className="flex flex-col justify-between p-8 border border-white/[0.04]"
          >
            <div>
              <span className="font-mono text-[10px] text-neon-blue tracking-widest uppercase mb-4 block">[02_METRICS]</span>
              <h3 className="font-display text-xl font-semibold text-white mb-8">Performance Indices</h3>
            </div>

            <div className="space-y-8 my-auto">
              <div>
                <div className="flex items-end justify-between mb-1.5">
                  <span className="font-display text-5xl font-black text-white leading-none tracking-tight">99.9%</span>
                  <span className="font-mono text-[9px] text-neon-blue uppercase tracking-widest mb-1">LIGHTHOUSE</span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[99.9%] bg-neon-blue shadow-[0_0_8px_#00f0ff]" />
                </div>
              </div>

              <div>
                <div className="flex items-end justify-between mb-1.5">
                  <span className="font-display text-5xl font-black text-white leading-none tracking-tight">15+</span>
                  <span className="font-mono text-[9px] text-neon-cyan uppercase tracking-widest mb-1">CUSTOM MODULES</span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-neon-cyan shadow-[0_0_8px_#00ffd8]" />
                </div>
              </div>

              <div>
                <div className="flex items-end justify-between mb-1.5">
                  <span className="font-display text-5xl font-black text-white leading-none tracking-tight">100%</span>
                  <span className="font-mono text-[9px] text-neon-purple uppercase tracking-widest mb-1">TRUST INDEX</span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-neon-purple shadow-[0_0_8px_#9d00ff]" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.04] mt-6">
              <p className="text-[11px] text-gray-500 font-mono leading-relaxed uppercase tracking-wider">
                Checked & Audited by Core Performance Observers // EST. 2026
              </p>
            </div>
          </GlassCard>

        </div>

        {/* Bento Sub-row: Elite Team Members */}
        <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.25em] mb-6 block text-center">
          MEET THE DIGITAL ARCHITECTS
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <GlassCard
                glowColor={idx === 0 ? 'purple' : 'cyan'}
                className="group p-6 border border-white/[0.04] flex flex-col sm:flex-row gap-6 items-start h-full"
              >
                {/* Profile Image Circle with neon border */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0 mx-auto sm:mx-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Narrative Details */}
                <div className="flex flex-col justify-between flex-grow text-center sm:text-left h-full">
                  <div>
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block mb-1">
                      [ENGINEER_0{idx + 1}]
                    </span>
                    <h4 className="font-display text-lg font-bold text-white mb-1 group-hover:text-neon-blue transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="font-mono text-[10px] text-neon-cyan mb-4">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social links capsules */}
                  <div className="flex items-center justify-center sm:justify-start gap-3 border-t border-white/[0.04] pt-4 mt-auto">
                    <a 
                      href={member.twitter} 
                      className="p-1.5 rounded bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_8px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href={member.linkedin} 
                      className="p-1.5 rounded bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_8px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href={member.github} 
                      className="p-1.5 rounded bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_8px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
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
