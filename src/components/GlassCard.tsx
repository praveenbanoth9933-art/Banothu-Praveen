import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'cyan' | 'pink' | 'none';
  hoverEffect?: boolean;
  onClick?: () => void;
  id?: string;
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'blue',
  hoverEffect = true,
  onClick,
  id
}: GlassCardProps) {
  
  // Custom neon glows based on color selection
  const glowStyles = {
    blue: 'hover:border-neon-blue/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]',
    purple: 'hover:border-neon-purple/40 hover:shadow-[0_0_20px_rgba(157,0,255,0.15)]',
    cyan: 'hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,255,216,0.15)]',
    pink: 'hover:border-neon-pink/40 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)]',
    none: ''
  };

  const activeGlow = glowStyles[glowColor];

  return (
    <motion.div
      id={id}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
      className={`
        glass-panel 
        rounded-2xl 
        p-6 
        relative 
        overflow-hidden 
        border border-white/[0.04] 
        transition-all duration-400 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${hoverEffect ? activeGlow : ''}
        ${className}
      `}
    >
      {/* Decorative subtle neon gradient top bar */}
      {glowColor !== 'none' && (
        <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent opacity-40 transition-opacity duration-500
          ${glowColor === 'blue' ? 'via-neon-blue' : ''}
          ${glowColor === 'purple' ? 'via-neon-purple' : ''}
          ${glowColor === 'cyan' ? 'via-neon-cyan' : ''}
          ${glowColor === 'pink' ? 'via-neon-pink' : ''}
        `} />
      )}

      {/* Decorative corner light glow */}
      {glowColor !== 'none' && (
        <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full filter blur-[40px] opacity-10 transition-opacity duration-500 group-hover:opacity-20
          ${glowColor === 'blue' ? 'bg-neon-blue' : ''}
          ${glowColor === 'purple' ? 'bg-neon-purple' : ''}
          ${glowColor === 'cyan' ? 'bg-neon-cyan' : ''}
          ${glowColor === 'pink' ? 'bg-neon-pink' : ''}
        `} />
      )}

      {children}
    </motion.div>
  );
}
