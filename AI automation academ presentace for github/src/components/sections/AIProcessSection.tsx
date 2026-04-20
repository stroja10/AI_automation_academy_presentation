import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Bot, Layout, Code2, Paintbrush, FileText, Sparkles, MessageSquare } from 'lucide-react';

const terminalLines = [
  { type: 'comment', text: '# 1. Design koncept v innogy barvách', delay: 0.3 },
  { type: 'command', text: '❯ google-stitch --theme "dark, pink/magenta akcenty"', delay: 0.8 },
  { type: 'output', text: '  → Wireframe & barevný systém ✔', delay: 1.6 },
  { type: 'blank', text: '', delay: 2.0 },
  { type: 'comment', text: '# 2. PRD → struktura 6 slidů, 15 min', delay: 2.2 },
  { type: 'command', text: '❯ claude --task "Vytvoř PRD pro závěrečnou prezentaci AIAA25"', delay: 2.7 },
  { type: 'output', text: '  → Product Requirements Document ✔', delay: 3.5 },
  { type: 'blank', text: '', delay: 3.8 },
  { type: 'comment', text: '# 3. Vibe coding — React app v AI Studiu', delay: 4.0 },
  { type: 'command', text: '❯ gemini-ai-studio --framework react --style tailwind', delay: 4.5 },
  { type: 'output', text: '  → HeroSection.tsx, ProblemSection.tsx, SolutionSection.tsx ✔', delay: 5.3 },
  { type: 'output', text: '  → ROISection.tsx, AIProcessSection.tsx, TimelineBar.tsx ✔', delay: 5.8 },
  { type: 'blank', text: '', delay: 6.1 },
  { type: 'comment', text: '# 4. Komponenty & animace přes Claude', delay: 6.3 },
  { type: 'command', text: '❯ claude --task "Outlook + Power Automate animace pro live demo"', delay: 6.8 },
  { type: 'output', text: '  → live_demo_slide3_microsoft.html (20 KB) ✔', delay: 7.6 },
  { type: 'command', text: '❯ claude --task "Clippy time-check avatary: 5min, 10min, 14:50"', delay: 8.1 },
  { type: 'output', text: '  → clippy_5min.html, clippy_10min.html, clippy_14min50.html ✔', delay: 8.9 },
  { type: 'command', text: '❯ claude --task "ROI kalkulačka s hover tooltips"', delay: 9.4 },
  { type: 'output', text: '  → ROISection.tsx — 211 dní, 632 Kč/hod, neprůstřelné ✔', delay: 10.2 },
  { type: 'blank', text: '', delay: 10.5 },
  { type: 'comment', text: '# 5. Finální sestavení', delay: 10.7 },
  { type: 'command', text: '❯ npm run build && deploy', delay: 11.2 },
  { type: 'success', text: '  ✔ Build successful. Prezentace ready. 0 řádků kódu ručně.', delay: 12.0 },
];

export default function AIProcessSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Terminal — left */}
      <div className="order-2 lg:order-1 glass-card ghost-border rounded-2xl p-6 font-mono text-sm overflow-hidden relative h-[480px] flex flex-col">
        <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-on-surface-variant text-xs">making-of-this-presentation.sh</span>
        </div>
        
        <div ref={terminalRef} className="space-y-1.5 flex-1 overflow-y-auto pr-2 scrollbar-thin scroll-smooth pb-8 relative z-10">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={
                line.type === 'comment' ? 'text-slate-400/80 text-xs mt-2' :
                line.type === 'command' ? 'text-[#00aae1] font-semibold' :
                line.type === 'success' ? 'text-green-400 font-bold mt-1' :
                line.type === 'blank' ? 'h-2' :
                'text-slate-300'
              }
            >
              {line.text}
            </motion.div>
          ))}
          {visibleLines < terminalLines.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-[#00aae1] inline-block mt-1.5"
            >
              ▊
            </motion.span>
          )}
        </div>
        
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00aae1]/10 blur-[50px] rounded-full"></div>
      </div>

      {/* Content — right */}
      <div className="order-1 lg:order-2 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-headline uppercase tracking-widest">
          <Bot size={16} />
          End-to-End AI
        </div>
        <h2 className="text-5xl lg:text-7xl font-black font-headline leading-[1] tracking-tighter">
          Jak jsem to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">postavil</span>
        </h2>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          Celá tato prezentace — design, kód, animace, ROI výpočty — vznikla ve spolupráci s AI. Člověk řídí, AI staví.
          Zlatý věk tvůrců.
        </p>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="glass-card ghost-border p-4 rounded-xl">
            <Paintbrush className="text-primary mb-2" size={24} />
            <div className="font-bold">Google Stitch</div>
            <div className="text-sm text-on-surface-variant">Design systém & wireframe</div>
          </div>
          <div className="glass-card ghost-border p-4 rounded-xl">
            <FileText className="text-primary mb-2" size={24} />
            <div className="font-bold">Blueprint → Claude</div>
            <div className="text-sm text-on-surface-variant">Požadavky & struktura</div>
          </div>
          <div className="glass-card ghost-border p-4 rounded-xl">
            <Code2 className="text-primary mb-2" size={24} />
            <div className="font-bold">Gemini AI Studio</div>
            <div className="text-sm text-on-surface-variant">Vibe coding — React app</div>
          </div>
          <div className="glass-card ghost-border p-4 rounded-xl">
            <MessageSquare className="text-primary mb-2" size={24} />
            <div className="font-bold">Claude</div>
            <div className="text-sm text-on-surface-variant">Animace, ROI, Clippy avatary</div>
          </div>
        </div>
      </div>
    </div>
  );
}
