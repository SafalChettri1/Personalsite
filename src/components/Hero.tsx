import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../constants';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const wordChipVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, delay: 0.6 },
    },
  };

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] flex-col justify-center px-6 py-20 md:px-12 bg-[#080808] border-b border-white/10">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
        >
          {/* Vertical Editorial Sidebar on Desktop */}
          <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-between border-r border-white/10 py-10 pr-6">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 font-mono rotate-180 [writing-mode:vertical-rl] whitespace-nowrap">
              ESTABLISHED 2022
            </span>
            <div className="w-[1px] bg-white/15 flex-grow my-8" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 font-mono rotate-180 [writing-mode:vertical-rl] whitespace-nowrap">
              KATHMANDU / HIGH LATENCY OPS
            </span>
          </div>

          {/* Main Content Pane */}
          <div className="lg:col-span-11 lg:pl-12 flex flex-col justify-center">
            
            {/* Meta Category Section */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 font-mono">
                CREATIVE REPOSITORY
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/70 font-mono">
                VERSION 2.6
              </span>
            </motion.div>

            {/* Title with extreme Editorial Contrast */}
            <h1 className="font-display text-[10vw] font-black uppercase leading-[0.85] text-white sm:text-[8vw] md:text-[7.5vw] lg:text-[6.5vw] tracking-tighter">
              <motion.span variants={itemVariants} className="block">
                I Build <span className="font-serif italic lowercase font-normal text-white/70">things</span>
              </motion.span>
              <motion.span 
                variants={itemVariants} 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40 mt-1"
              >
                For Web &amp; Mobile
              </motion.span>
            </h1>

            {/* Sub-description and Tagged Chips */}
            <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-center">
              <motion.p
                variants={itemVariants}
                className="font-mono text-xs leading-relaxed text-white/60 tracking-wider md:text-sm lg:max-w-xl"
              >
                {PORTFOLIO_OWNER.subtitle}
              </motion.p>

              {/* Muted Editorial tags */}
              <motion.div
                variants={wordChipVariants}
                className="flex flex-wrap gap-2.5 self-start lg:self-auto"
              >
                {['Kotlin', 'AI Agents', 'Flutter', 'React'].map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-[#121212] px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Button Option */}
            <motion.div variants={itemVariants} className="mt-14">
              <a
                href="#work"
                className="group inline-flex items-center gap-4 border border-white/20 bg-transparent hover:border-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white"
              >
                Discover My Portfolio
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sleek radial focus background */}
      <div className="absolute right-10 bottom-10 -z-10 h-72 w-72 rounded-full bg-white/[0.02] opacity-50 blur-[100px]" />
    </section>
  );
}

