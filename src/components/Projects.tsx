import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, X, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Mobile', 'AI / ML', 'Fullstack'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-b border-white/5">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Title Heading */}
        <div className="mb-20 flex flex-col justify-between items-start gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">
              SELECTED WORKS
            </p>
            <h2 className="font-display text-4xl font-normal leading-tight text-white md:text-5xl lg:text-5xl">
              Digital <span className="italic text-white/55 font-serif">manifestations</span>.
            </h2>
          </div>
          <div className="flex flex-wrap gap-1 rounded-none border border-white/10 bg-[#121212] p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-none px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Framer Motion Layout Animate */}
        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="interactive-card group flex flex-col overflow-hidden rounded-none border border-white/10 bg-[#0d0d0d] shadow-2xl hover:border-white/20 transition-all cursor-pointer"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[#111]">
                  <img
                    src={project.image}
                    alt={`${project.title} display screenshot`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 ease-out group-hover:scale-102 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  {/* Backdrop Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-transparent opacity-90" />
                  
                  {/* Top-right category marker */}
                  <span className="absolute top-4 right-4 rounded-none bg-black/90 border border-white/10 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white">
                    {project.category}
                  </span>
                </div>

                {/* Content Box */}
                <div className="flex flex-1 flex-col p-8">
                  {/* Tag Listing */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-none border border-white/5 bg-[#141414] px-2.5 py-1 font-mono text-[9px] font-semibold text-white/60 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="font-mono text-[11px] text-white/50 leading-relaxed mb-6 line-clamp-3 tracking-wide">
                    {project.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
                    {/* View project overview details modal button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group/btn inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white hover:text-white/80 transition-colors"
                    >
                      Insights
                      <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    {/* External repository & action links */}
                    <div className="flex items-center gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors"
                          aria-label={`View live application for ${project.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Project Specs Insights Dialog Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#000000]/85 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-none border border-white/10 bg-[#0d0d0d] shadow-2xl z-10"
              >
                {/* Header Picture banner */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />
                  
                  {/* Close floating button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 rounded-none border border-white/10 bg-black/80 p-2 text-white hover:bg-black transition-colors"
                    aria-label="Close project specifications drawer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Info and tech parameters grid */}
                <div className="p-8 md:p-10">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 block">
                    PROJECT TECHNICAL SPECIFICATION
                  </span>
                  <h3 className="font-sans text-2xl font-black uppercase tracking-tight text-white mt-1 mb-4">
                    {selectedProject.title}
                  </h3>

                  <p className="font-mono text-xs leading-relaxed text-white/60 tracking-wide mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4 rounded-none bg-black/50 p-6 border border-white/5">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-white tracking-[0.2em] font-bold">
                      <Sparkles className="h-3.5 w-3.5" /> Technical Status Log
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="block text-white/40 mb-0.5 tracking-wider uppercase text-[8px]">Primary Dev Stack:</span>
                        <span className="text-white font-semibold text-[10px] tracking-wide">{selectedProject.tags.join(', ')}</span>
                      </div>
                      <div>
                        <span className="block text-white/40 mb-0.5 tracking-wider uppercase text-[8px]">Deployment Status:</span>
                        <span className="text-white font-semibold text-[10px] tracking-wide">Secured Isolated Sandbox</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 border border-white/20 bg-white text-black py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors"
                      >
                        Live Demo <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 border border-white/10 bg-transparent py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white/5 transition-all"
                      >
                        Source Repo <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

