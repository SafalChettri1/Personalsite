import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onHireClick: () => void;
}

export default function Navigation({ onHireClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Work', href: '#work' },
    { label: 'Research', href: '#research' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-[#080808]/95 py-4 shadow-2xl backdrop-blur-xl'
          : 'border-transparent bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo and Meta Label */}
        <a
          href="#"
          className="flex flex-col group"
        >
          <span className="font-sans text-xl font-black tracking-tighter text-white group-hover:text-white/80 transition-colors">
            Sudip Mahatara
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 font-mono">
            Mobile & AI Engineer
          </span>
        </a>

        {/* Desktop Navigation Link Menu */}
        <div className="hidden items-center gap-10 md:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <button
            id="nav-hire-me"
            onClick={onHireClick}
            className="flex items-center gap-2 border border-white/20 bg-transparent hover:border-white hover:bg-white hover:text-black hover:scale-102 active:scale-98 transition-all px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white cursor-pointer"
          >
            Hire Me <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-1"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-b border-white/10 bg-[#0a0a0a] md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onHireClick();
                }}
                className="w-full border border-white/20 bg-transparent py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:border-white transition-colors"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

