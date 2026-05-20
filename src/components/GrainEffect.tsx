import { useEffect, useState } from 'react';

export default function GrainEffect() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 15;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 15;
      setOffset({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      role="presentation"
      className="pointer-events-none fixed -top-[150%] -left-[150%] z-[9999] h-[400%] w-[400%] opacity-[0.035]"
      style={{
        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDylqQzbvDVAdpDaDPH5JH1H3pCWnx1q84DTKLGGb6V5FDmviGiXVtwfdYdQM5Pv6iRKUc4kHVXjzkkQnBFitT7Q9CDgIRh0Vq3VIHdBuBNcWWZzPYS9GgZHw_6MJ4xI1K_rX_ktYHxcRUQiaCvtGEKJJGptE_2BSHyxwWOQJZq1Wg0fguSQUfgi6g0SJvFQU5gcQVqJ78t9bGnkMY-rdLJbzr2HElz9IIciQLI3WwkQhCU10ehRDOjusu1ts9urRhQcGaQ6BiGWkw")`,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.1s ease-out',
        animation: 'grain 8s steps(10) infinite',
      }}
    />
  );
}
