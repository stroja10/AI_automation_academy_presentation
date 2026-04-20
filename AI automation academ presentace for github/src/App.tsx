import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Components
import TimelineBar from './components/TimelineBar';
import AvatarPopup from './components/AvatarPopup';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import AIProcessSection from './components/sections/AIProcessSection';
import ROISection from './components/sections/ROISection';
import AIShowSection from './components/sections/AIShowSection';

const SECTIONS = [
  { id: 'intro', component: HeroSection },
  { id: 'problem', component: ProblemSection },
  { id: 'solution', component: SolutionSection },
  { id: 'roi', component: ROISection },
  { id: 'process', component: AIProcessSection },
  { id: 'show', component: AIShowSection },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const TOTAL_TIME = 15 * 60; // 15 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && elapsedTime < TOTAL_TIME) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, elapsedTime]);

  const handleNext = () => {
    setCurrentSection(c => (c < SECTIONS.length - 1 ? c + 1 : c));
  };

  const handlePrev = () => {
    setCurrentSection(c => (c > 0 ? c - 1 : c));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowUp') {
        // Skrytá zkratka pro testování: přidá 1 minutu
        setElapsedTime(prev => Math.min(prev + 60, TOTAL_TIME));
      } else if (e.key === 'ArrowDown') {
        // Skrytá zkratka pro testování: ubere 1 minutu
        setElapsedTime(prev => Math.max(prev - 60, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, TOTAL_TIME]);

  const CurrentComponent = SECTIONS[currentSection].component;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body overflow-hidden selection:bg-secondary/30 relative">
      <TimelineBar elapsedTime={elapsedTime} totalTime={TOTAL_TIME} />
      
      {/* Background Ambient Glows */}
      <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-[600px] h-[600px] bg-primary-container/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>

      <main className="pt-24 pb-32 px-8 min-h-screen flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <AvatarPopup elapsedTime={elapsedTime} />

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 w-fit rounded-full flex gap-8 items-center px-6 py-3 bg-[#181c22]/40 backdrop-blur-xl border border-[#31353c]/30 z-50 drop-shadow-[0_0_15px_rgba(200,30,130,0.3)]">
        <button onClick={handlePrev} disabled={currentSection === 0} className="text-[#dfe2eb]/30 hover:scale-110 hover:text-[#00aae1] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-500">
          <ChevronLeft size={24} />
        </button>
        
        <button onClick={() => setIsPlaying(!isPlaying)} className="text-[#ffafd0] scale-125 transition-all duration-500 hover:scale-150">
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>

        <button onClick={handleNext} disabled={currentSection === SECTIONS.length - 1} className="text-[#dfe2eb]/30 hover:scale-110 hover:text-[#00aae1] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-500">
          <ChevronRight size={24} />
        </button>
      </nav>
    </div>
  );
}
