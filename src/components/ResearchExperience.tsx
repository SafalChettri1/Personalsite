import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Calendar, Building, Sparkles } from 'lucide-react';
import { EXPERIENCES, ACADEMIC_PAPER } from '../constants';

export default function ResearchExperience() {
  const [showPubMeta, setShowPubMeta] = useState(false);

  const transitionConfig = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <section id="research" className="py-32 px-6 md:px-12 bg-[#0d0d0d] border-b border-white/5">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          
          {/* Left Side: Academic / Research Inquiry Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={transitionConfig}
            >
              <h2 className="font-display text-4xl font-normal leading-tight text-white md:text-5xl lg:text-5xl mb-12">
                Academic <span className="italic text-white/55 font-serif">inquiry</span>.
              </h2>
            </motion.div>

            {/* Publication Spot Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...transitionConfig, delay: 0.2 }}
              className="relative overflow-hidden rounded-none border border-white/10 border-l-2 border-l-white bg-[#0a0a0a] p-8 md:p-10 shadow-2xl"
            >
              {/* Highlight Tag */}
              <div className="absolute top-0 right-0 rounded-none bg-white px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-black">
                {ACADEMIC_PAPER.accentTag}
              </div>

              <div className="mb-6 mt-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                <Sparkles className="h-3.5 w-3.5 text-white/60" /> PUBLISHED LITERATURE
              </div>

              <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-white mb-4">
                {ACADEMIC_PAPER.title}
              </h3>

              <p className="font-mono text-xs text-white/60 leading-relaxed mb-6 tracking-wide">
                {ACADEMIC_PAPER.summary}
              </p>

              {/* View publication details simulator replacing alert */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowPubMeta(!showPubMeta)}
                  className="group inline-flex items-center gap-2 border border-white/15 bg-white/5 hover:bg-white hover:text-black hover:border-white px-5 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-all cursor-pointer"
                >
                  {showPubMeta ? 'Hide Logged Info' : 'Read Publication'} 
                  <FileText className="h-3 w-3 transition-transform" />
                </button>

                <AnimatePresence>
                  {showPubMeta && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 border-t border-white/10 pt-4 font-mono text-[10px] text-white/50 leading-relaxed"
                    >
                      <span className="block text-white font-bold mb-1">IEEE ACCESS REGISTRY NOTE:</span>
                      Sudip Mahatara's academic thesis is officially logged on IEEE ACCESS. Contact sudip directly at hello@sm.dev to query specific parameters and technical metrics.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Timeline Professional Journey section */}
          <div id="experience" className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={transitionConfig}
            >
              <h2 className="font-display text-4xl font-normal leading-tight text-white md:text-5xl lg:text-5xl mb-16">
                The <span className="italic text-white/55 font-serif">journey</span>.
              </h2>
            </motion.div>

            {/* Nested timeline track */}
            <div className="space-y-16 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ ...transitionConfig, delay: index * 0.15 }}
                  className="relative pl-10 group"
                >
                  {/* Bullet indicator point */}
                  <div className="absolute left-[5px] top-1.5 h-2 w-2 rounded-none border border-white/30 bg-[#0d0d0d] transition-colors duration-300 group-hover:bg-white group-hover:border-white" />

                  {/* Period tag */}
                  <span className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
                    <Calendar className="h-3 w-3 text-white/40" /> {exp.period}
                  </span>

                  {/* Title and brand parameters */}
                  <h3 className="font-sans text-lg font-bold uppercase tracking-wide text-white mb-2">
                    {exp.role}
                  </h3>
                  
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 mb-4">
                    <Building className="h-3.5 w-3.5 text-white/35" /> {exp.company}
                  </div>

                  <p className="font-mono text-xs leading-relaxed text-white/60 tracking-wide mb-4">
                    {exp.description}
                  </p>

                  {/* Multibullet granular breakdown */}
                  {exp.details && exp.details.length > 0 && (
                    <ul className="space-y-2 border-l border-white/10 pl-4 mt-4 font-mono text-[10px] text-white/40 leading-relaxed">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="relative before:absolute before:-left-4 before:top-2 before:h-[1px] before:w-2 before:bg-white/20">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

