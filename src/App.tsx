import { useState } from 'react';
import GrainEffect from './components/GrainEffect';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import ResearchExperience from './components/ResearchExperience';
import Contact from './components/Contact';
import HireModal from './components/HireModal';
import { PORTFOLIO_OWNER } from './constants';

export default function App() {
  const [isHireOpen, setIsHireOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0e0e0e] font-sans text-[#e5e2e1] antialiased selection:bg-[#b3f71e] selection:text-[#131f00]">
      
      {/* Atmosphere Enhancers */}
      <GrainEffect />
      <CustomCursor />

      {/* Structured Layout Navigation */}
      <Navigation onHireClick={() => setIsHireOpen(true)} />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Technology Marquee lists */}
        <TechStack />

        {/* Academic papers research & timeline journey experience */}
        <ResearchExperience />

        {/* Dedicated Interactive Contact System & Form */}
        <Contact />
      </main>

      {/* Footer Section */}
      <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] py-16 px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Copyright identifier */}
          <div className="font-mono text-xs text-[#8c947a]">
            &copy; {new Date().getFullYear()} Sudip Mahatara. Built with precision
            <span className="text-[#b3f71e] animate-pulse">_</span>
          </div>

          
          
          {/* Social Channels listing */}
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-[#8c947a]">
            {PORTFOLIO_OWNER.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#b3f71e] transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Kathmandu Signature label */}
          <div className="font-mono text-xs text-[#8c947a] opacity-80">
            Built with passion in <span className="font-semibold text-white">Kathmandu 🇳🇵</span>
          </div>

        </div>
      </footer>

      {/* Partner Proposition Slide Drawer dialog Modal */}
      <HireModal isOpen={isHireOpen} onClose={() => setIsHireOpen(false)} />

    </div>
  );
}
