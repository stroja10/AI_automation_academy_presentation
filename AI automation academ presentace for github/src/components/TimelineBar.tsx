import { motion } from 'motion/react';
import { BrainCircuit } from 'lucide-react';

export default function TimelineBar({ elapsedTime, totalTime }: { elapsedTime: number, totalTime: number }) {
  const progress = (elapsedTime / totalTime) * 100;
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="fixed top-0 w-full border-b border-[#31353c]/20 bg-[#10141a]/60 backdrop-blur-2xl z-50 flex flex-col">
      <div className="h-1.5 w-full bg-[#31353c]/50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#d9268f] to-[#ff47a4]"
          style={{ width: `${progress}%` }}
          layout
        />
      </div>
      <div className="flex justify-between items-center px-8 h-15 py-4">
        <div className="flex items-center gap-3">
          <span className="text-primary"><BrainCircuit /></span>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container font-headline tracking-tight">
            innogy AI & Automation Academy
          </h1>
        </div>
        <div className="text-primary font-headline font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          {formatTime(elapsedTime)} / 15:00
        </div>
      </div>
    </header>
  );
}
