import {
  Code,
  Terminal,
  Cloud,
  Cpu,
  Layers,
  Database,
  Server,
  Box,
  GitFork,
  CheckCircle2
} from 'lucide-react';
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../constants';

const iconsMap: Record<string, any> = {
  Code,
  Terminal,
  Cloud,
  Cpu,
  Play: Layers,
  Database,
  Server,
  Container: Box,
  Layers,
  GitBranch: GitFork,
};

export default function TechStack() {
  const getIcon = (iconName: string) => {
    const IconCmp = iconsMap[iconName] || CheckCircle2;
    return <IconCmp className="h-4.5 w-4.5 text-white/60 opacity-80" />;
  };

  return (
    <section className="relative overflow-hidden py-16 bg-[#080808] border-y border-white/10">
      {/* Dynamic continuous marquee - Row 1 */}
      <div className="relative flex overflow-x-hidden py-2">
        <div className="animate-marquee flex gap-8 whitespace-nowrap">
          {/* Row 1 Content Block */}
          {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-3 rounded-none border border-white/10 bg-[#0d0d0d] px-5 py-3 shadow-none"
            >
              {getIcon(item.icon)}
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic continuous reverse marquee - Row 2 */}
      <div className="relative flex overflow-x-hidden py-2 mt-4">
        <div className="animate-marquee-reverse flex gap-8 whitespace-nowrap">
          {/* Row 2 Content Block - moves reverse */}
          {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-3 rounded-none border border-white/10 bg-[#0d0d0d] px-5 py-3 shadow-none"
            >
              {getIcon(item.icon)}
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

