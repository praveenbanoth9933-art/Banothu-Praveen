import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Mail, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import GlassCard from './GlassCard';
import { ContactFormInput } from '../types';

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '3D Portfolio Concept',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Client validation checks
    if (!form.name.trim()) {
      setStatus('error');
      setErrorMsg('Please specify your name or moniker.');
      return;
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid communications email.');
      return;
    }
    if (!form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please enter your project coordinates or query message.');
      return;
    }

    setStatus('sending');

    // Simulate high-end server dispatch latency
    setTimeout(() => {
      setStatus('success');
      
      // Spray beautiful custom neon colors confetti
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00f0ff', '#00ffd8', '#9d00ff']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00f0ff', '#00ffd8', '#9d00ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();

      // Clear form
      setForm({
        name: '',
        email: '',
        subject: '3D Portfolio Concept',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background neon lights */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00ffd8]" />
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Connect With Us</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            INITIATE SYSTEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan text-neon-blue">
              COMMUNICATIONS
            </span>
          </h2>
        </div>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Metadata Sidebar (2/5 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard glowColor="blue" className="p-8 border border-white/[0.04]">
              <span className="font-mono text-[10px] text-neon-blue uppercase tracking-widest block mb-4">
                [AGENCY_HQ]
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-6">Let's build something beautiful.</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                Ready to take your digital products to the absolute limits of standard spatial designs? Contact our creative dev squad to scope custom concept maps.
              </p>

              {/* Info segments */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neon-blue shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">Spatial Coordinates</h4>
                    <p className="text-sm text-gray-300 mt-1">Hyderabad, Telangana, India</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neon-purple shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">Secure Transmission</h4>
                    <a href="mailto:hello@neoxstudio.io" className="text-sm text-white hover:text-neon-blue transition-colors mt-1 block">
                      hello@neoxstudio.io
                    </a>
                  </div>
                </div>
              </div>

              {/* Secure footer lines */}
              <div className="pt-8 border-t border-white/[0.04] mt-8 flex items-center justify-between font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                <span>ENCRYPT_TYPE: SSL_TLS_v1.3</span>
                <span className="flex items-center gap-1 text-neon-blue">
                  SECURE LINK <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </GlassCard>
          </div>

          {/* Form Box (3/5 columns) */}
          <div className="lg:col-span-3">
            <GlassCard glowColor="cyan" className="p-8 md:p-10 border border-white/[0.04]">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-neon-cyan mb-6 shadow-[0_0_15px_rgba(0,255,216,0.3)] rounded-full" />
                    <h3 className="font-display text-2xl font-bold text-white mb-3">Transmission Confirmed</h3>
                    <p className="text-gray-400 text-sm font-light max-w-sm leading-relaxed mb-6">
                      Your spatial project vectors have successfully passed through our communications array. A creative squad engineer will touch base shortly.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded bg-neon-cyan/15 border border-neon-cyan/40 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-neon-cyan/25 cursor-pointer transition-colors"
                    >
                      Transmit New Wave
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                          Sender Name / Moniker *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Kaelen Vance"
                          disabled={status === 'sending'}
                          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] text-sm transition-all font-light"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                          Transmission Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. kaelen@synthetic.ai"
                          disabled={status === 'sending'}
                          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] text-sm transition-all font-light"
                        />
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                        Core Subject Area
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. 3D Spatial Portfolio Concept"
                        disabled={status === 'sending'}
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] text-sm transition-all font-light"
                      />
                    </div>

                    {/* Message body input */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                        Project Coordinates / Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Detail your timeline requirements, project budget index, and WebGL elements desired..."
                        disabled={status === 'sending'}
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] text-sm transition-all font-light resize-none leading-relaxed"
                      />
                    </div>

                    {/* Error diagnostics banner */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-950/20 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    {/* Submit dispatcher */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-4 text-center font-mono text-xs uppercase tracking-widest text-black bg-neon-cyan font-semibold rounded-xl cursor-pointer hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(0,255,216,0.3)] hover:shadow-[0_0_25px_rgba(0,255,216,0.5)] flex items-center justify-center gap-2"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-[2px] border-black/30 border-t-black animate-spin" />
                          DISPATCHING ENCRYPTED WAVE...
                        </>
                      ) : (
                        <>
                          DISPATCH COMMUNICATOR
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
}
