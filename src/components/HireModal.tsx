import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ChevronRight, CornerDownRight } from 'lucide-react';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireModal({ isOpen, onClose }: HireModalProps) {
  const [role, setRole] = useState('Lead Mobile Engineer');
  const [tier, setTier] = useState('Project-based Sprint');
  const [budget, setBudget] = useState('$5k - $15k');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    'Lead Mobile Engineer',
    'AI Integration Architect',
    'Fullstack Web Developer',
    'Technical Consult / BIM Advisor'
  ];

  const classifications = [
    'Project-based Sprint',
    'Full-time Contract Core',
    'Secure Technical Consultation'
  ];

  const budgets = [
    '< $5,000 Scale',
    '$5,000 - $15,000 Sprint',
    '> $15,000 Enterprise Core'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setLoading(true);

    // Latency simulator
    setTimeout(() => {
      const storedHires = JSON.parse(localStorage.getItem('portfolio_hires') || '[]');
      storedHires.push({
        id: `hire-${Date.now()}`,
        name,
        email,
        role,
        tier,
        budget,
        note,
        date: new Date().toISOString()
      });
      localStorage.setItem('portfolio_hires', JSON.stringify(storedHires));

      setLoading(false);
      setSuccess(true);
      
      // Clear
      setName('');
      setEmail('');
      setNote('');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/85 backdrop-blur-md"
          />

          {/* Drawer container body */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl rounded-none border border-white/10 bg-[#0d0d0d] p-8 md:p-10 shadow-2xl z-10 my-8"
          >
            {/* Header section with X */}
            <div className="flex items-start justify-between mb-8 border-b border-white/10 pb-5">
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                  PARTNER PROPOSITION
                </span>
                <h3 className="font-sans text-2xl font-black uppercase tracking-tight text-white mt-1">
                  Co-Pilot Proposal
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-none border border-white/10 bg-black p-2 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                aria-label="Close propositional prompt"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="hire-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Select Role parameters */}
                  <div>
                    <span className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                      PROPOSED COLLABORATION FIELD
                    </span>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {roles.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`flex items-center gap-2 rounded-none border p-3.5 font-mono text-[9px] font-bold uppercase tracking-wider text-left transition-all cursor-pointer ${
                            role === r
                              ? 'border-white bg-[#161616] text-white'
                              : 'border-white/10 bg-black/40 text-white/50 hover:border-white/20'
                          }`}
                        >
                          <CornerDownRight className="h-3.5 w-3.5 text-white/50 shrink-0" />
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project contract classification */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <span className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                        ENGAGEMENT TRACK
                      </span>
                      <select
                        value={tier}
                        onChange={(e) => setTier(e.target.value)}
                        className="w-full rounded-none border border-white/10 bg-black/40 p-3.5 font-mono text-xs text-white focus:outline-none focus:border-white"
                      >
                        {classifications.map((cl) => (
                          <option key={cl} value={cl}>
                            {cl}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                        TARGET RESOURCE BUDGET
                      </span>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-none border border-white/10 bg-black/40 p-3.5 font-mono text-xs text-white focus:outline-none focus:border-white"
                      >
                        {budgets.map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Contact Parameters */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <span className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                        YOUR IDENTITY
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Lead Recruiter, Founder etc."
                        className="w-full rounded-none border border-white/10 bg-black/40 px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-white placeholder-white/20"
                      />
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                        REACHBACK ENDPOINT (EMAIL)
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@enterprise.com"
                        className="w-full rounded-none border border-white/10 bg-black/40 px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-white placeholder-white/20"
                      />
                    </div>
                  </div>

                  {/* Quick message input */}
                  <div>
                    <span className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                      PROPOSITION SYNOPSIS (OPTIONAL)
                    </span>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Outline target pipeline, core dates, or specific secure deployment requirements..."
                      className="w-full rounded-none border border-white/10 bg-black/40 px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-white placeholder-white/20 resize-none"
                    />
                  </div>

                  {/* Action dispatch trigger */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-none border border-white/20 bg-white hover:bg-gray-100 text-black py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] transition-transform disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Transmitting Proposition...' : 'Initiate Secure Callback Proposal'} <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="hire-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="mx-auto h-12 w-12 rounded-none border border-white/20 bg-white/5 flex items-center justify-center text-white shadow-lg">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xl font-bold uppercase text-white tracking-wide mb-2">
                      Handshake Registered
                    </h4>
                    <p className="font-mono text-xs text-white/50 leading-relaxed max-w-sm mx-auto tracking-wide">
                      Your partner proposition has been safely compiled and stored within localized localCache records. Sudip will contact you directly to formulate contract scopes.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      onClose();
                    }}
                    className="rounded-none border border-white/20 bg-white hover:bg-gray-100 text-black px-8 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] transition-transform cursor-pointer"
                  >
                    Close Overlay
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
