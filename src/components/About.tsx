import { motion } from 'motion/react';
import { MapPin, Award, Terminal } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../constants';

export default function About() {
  const scrollTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-[#0d0d0d] border-b border-white/5">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Side: Developer Sophisticated Portrait Display Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={scrollTransition}
            className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-none"
          >
            <div className="group relative aspect-[4/5] overflow-hidden rounded-none bg-[#111111] border border-white/10">
              <img
                src={PORTFOLIO_OWNER.profileImage}
                alt="Sophisticated editorial portrait of Sudip Mahatara"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-102 group-hover:grayscale-0"
              />
              {/* Image dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
            </div>

            {/* Float Badge: "Currently Building" */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -bottom-6 -right-4 rounded-none border border-white/10 bg-[#111111]/95 p-4 px-6 shadow-2xl backdrop-blur-md md:-right-6 border-l-2 border-l-white"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  Currently Engineering Offline SDKs
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Professional Context, Education & Core Metrics */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={scrollTransition}
            >
              <h2 className="font-display text-4xl font-normal leading-tight text-white md:text-5xl lg:text-5xl mb-8">
                Engineering with <span className="italic text-white/55 font-serif">purpose</span>.
              </h2>
            </motion.div>

            {/* Card Content with precise negative space and glass borders - Editorial Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ ...scrollTransition, delay: 0.1 }}
              className="rounded-none border border-white/10 bg-[#080808]/90 p-8 shadow-2xl backdrop-blur-2xl md:p-12"
            >
              <p className="font-mono text-xs leading-relaxed text-white/70 tracking-wide md:text-sm mb-10">
                Based in Kathmandu, I bridge the gap between complex secure backend architectures and extremely fluid, motion-driven frontend interfaces. With an academic background in Information Management (BIM) paired with robust practical experience, I build resilient production-ready platforms.
              </p>

              <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
                
                {/* Education Pillar */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 border border-white/10 bg-white/5 p-1.5 text-white">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
                      Education
                    </h4>
                    <p className="font-sans text-xs font-semibold text-white tracking-wide">
                      {PORTFOLIO_OWNER.degree}
                    </p>
                    <span className="font-mono text-[10px] text-white/50 block mt-0.5">
                      Tribhuvan University
                    </span>
                  </div>
                </div>

                {/* Experience & Context */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 border border-white/10 bg-white/5 p-1.5 text-white">
                    <Terminal className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
                      Experience
                    </h4>
                    <p className="font-sans text-xs font-semibold text-white tracking-wide">
                      {PORTFOLIO_OWNER.experiencePeriod}
                    </p>
                    <span className="font-mono text-[10px] text-white/50 block mt-0.5">
                      On-Device AI &amp; Sync Ledgers
                    </span>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="flex items-start gap-3 col-span-1 sm:col-span-2">
                  <div className="mt-1 border border-white/10 bg-white/5 p-1.5 text-white">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
                      Headquarters
                    </h4>
                    <p className="font-sans text-xs font-semibold text-white tracking-wide">
                      {PORTFOLIO_OWNER.location}
                    </p>
                    <span className="font-mono text-[10px] text-white/50 block mt-0.5">
                      Available for international travel &amp; remote sync
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

