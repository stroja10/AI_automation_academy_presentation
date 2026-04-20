import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 h-[70vh]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/10 border border-secondary/20 text-secondary text-sm font-headline uppercase tracking-widest"
      >
        <Sparkles size={16} />
        Závěrečná prezentace
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl lg:text-7xl font-black font-headline text-on-surface leading-[1.1] tracking-tighter max-w-5xl"
      >
        AI-Provozní pošťák <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
          automatizovaná kategorizace emailů
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl lg:text-2xl text-on-surface-variant max-w-2xl font-light"
      >
        Od manuální rutiny k inteligentní automatizaci. Jak lze šetřit desítky hodin ve sdílené schránce ZS_provozní.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full flex justify-end mt-8 md:mt-16"
      >
        <div className="glass-card ghost-border px-6 py-4 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <p className="text-on-surface font-headline font-bold text-lg tracking-wide">Ondřej Strojek</p>
            <p className="text-primary text-sm font-body">IT specialist - AI & Automation</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg shadow-[0_0_15px_rgba(200,30,130,0.2)]">
            OS
          </div>
        </div>
      </motion.div>
    </div>
  );
}
