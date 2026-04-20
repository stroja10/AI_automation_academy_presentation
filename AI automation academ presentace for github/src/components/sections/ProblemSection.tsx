import { motion } from 'motion/react';
import { Users, MailWarning, ClockAlert } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    { icon: MailWarning, title: "~200 e-mailů", desc: "denně ve sdílené schránce ZS_provozní" },
    { icon: Users, title: "7 lidí", desc: "čte a třídí stejnou schránku" },
    { icon: ClockAlert, title: "Duplicita", desc: "velké množství propáleného času" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-headline uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Identifikace problému
        </div>
        <h2 className="text-5xl lg:text-7xl font-black font-headline leading-[1] tracking-tighter">
          Kolik času zbytečně <span className="text-red-400">pálíme?</span>
        </h2>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          Představte si proces, kde 7 kvalifikovaných lidí tráví část svého dne čtením stejných e-mailů, jen aby zjistili, kdo to má řešit.
        </p>
      </div>

      <div className="grid gap-6">
        {problems.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="glass-card ghost-border p-6 rounded-2xl flex items-center gap-6 group hover:bg-surface-variant/60 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <p.icon size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-bold font-headline text-on-surface">{p.title}</h3>
              <p className="text-on-surface-variant">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
