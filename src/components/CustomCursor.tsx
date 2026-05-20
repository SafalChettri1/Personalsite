import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const rawOuterXSpring = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.6 });
  const rawOuterYSpring = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.6 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    const onMouseEnterInteractive = () => setIsHovered(true);
    const onMouseLeaveInteractive = () => setIsHovered(false);

    const updateInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], .interactive-card, input, textarea');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    // Run initially and set up an observer for dynamically changing DOM elements
    updateInteractiveListeners();

    const observer = new MutationObserver(updateInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      observer.disconnect();
      const interactives = document.querySelectorAll('a, button, [role="button"], .interactive-card, input, textarea');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10001] hidden h-2.5 w-2.5 rounded-full bg-[#BAFF29] mix-blend-difference md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Outer Glow Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] hidden rounded-full border border-[rgba(186,255,41,0.4)] md:block"
        style={{
          x: rawOuterXSpring,
          y: rawOuterYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
        }}
        animate={{
          borderColor: isHovered ? 'rgba(186,255,41,0.85)' : 'rgba(186,255,41,0.3)',
          backgroundColor: isHovered ? 'rgba(186,255,41,0.08)' : 'rgba(186,255,41,0)',
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      />
    </>
  );
}
