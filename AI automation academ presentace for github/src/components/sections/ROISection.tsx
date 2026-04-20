import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingDown, Clock, Zap, DollarSign, Users, Timer, ArrowRight, CheckCircle } from 'lucide-react';

const chartData = [
  { name: 'PŘED AI', hours: 176, color: '#584049' },
  { name: 'PO AI', hours: 18, color: '#22c55e' },
];

function CalcTooltip({ children, lines }: { children: React.ReactNode; lines: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div 
      className="relative cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-72">
          <div 
            className="rounded-lg p-4 text-left shadow-2xl"
            style={{ 
              backgroundColor: '#1e2028', 
              border: '1px solid rgba(34,197,94,0.3)',
              boxShadow: '0 0 20px rgba(34,197,94,0.15), 0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">Jak jsem počítal:</div>
            {lines.map((line, i) => {
              const isBold = line.startsWith('=');
              const text = isBold ? line.slice(1).trim() : line;
              return (
                <div 
                  key={i} 
                  className={`text-xs leading-relaxed ${isBold ? 'font-bold text-green-400 border-t border-green-500/20 pt-1.5 mt-1.5' : 'text-on-surface-variant'}`}
                >
                  {text}
                </div>
              );
            })}
          </div>
          <div className="w-3 h-3 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"
               style={{ backgroundColor: '#1e2028', border: '1px solid rgba(34,197,94,0.3)', borderTop: 'none', borderLeft: 'none' }} />
        </div>
      )}
    </div>
  );
}

export default function ROISection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-headline uppercase tracking-widest">
          <TrendingDown size={16} />
          Business Dopad
        </div>
        <h2 className="text-5xl lg:text-7xl font-black font-headline leading-[1] tracking-tighter">
          Návratnost <span className="text-green-400">investice</span>
        </h2>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          Z 7 lidí, kteří ručně četli každý e-mail, čte teď všechno jen 1 supervizor. Zbytek týmu vidí pouze svou složku.
        </p>
        
        {/* 3 killer stat boxes with hover tooltips */}
        <div className="grid grid-cols-3 gap-3">
          <CalcTooltip lines={[
            'Efektivní fond: 211 dní/rok',
            '6 lidí × 200 mailů × 0,5 min = 10 h/den',
            'PO AI: 6 × 20 mailů × 0,5 min = 1 h/den',
            'Úspora: 9 h/den × 211 dní',
            '= 1 899 h / rok',
          ]}>
            <div className="glass-card ghost-border rounded-xl p-4 text-center transition-all hover:border-green-500/30">
              <div className="text-green-400 mb-1 flex justify-center"><Clock size={16} /></div>
              <div className="text-3xl font-black font-headline text-on-surface">1 899 h</div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">Ušetřeno / rok</div>
            </div>
          </CalcTooltip>

          <CalcTooltip lines={[
            'Hodinová sazba: 632 Kč/hod',
            '(1 000 000 Kč ÷ 1 582,5 h/rok)',
            '1 899 h × 632 Kč',
            '= 1 200 168 Kč / rok',
          ]}>
            <div className="glass-card ghost-border rounded-xl p-4 text-center transition-all hover:border-green-500/30">
              <div className="text-green-400 mb-1 flex justify-center"><DollarSign size={16} /></div>
              <div className="text-3xl font-black font-headline text-on-surface">1,2 M</div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">CZK úspora / rok</div>
            </div>
          </CalcTooltip>

          <CalcTooltip lines={[
            'Efektivní fond: 1 582,5 h/rok',
            '(252 dní − 25 dovolená − 5 sick − 11 svátky)',
            '1 899 h ÷ 1 582,5 h',
            '= 1,20 FTE',
          ]}>
            <div className="glass-card ghost-border rounded-xl p-4 text-center transition-all hover:border-green-500/30">
              <div className="text-green-400 mb-1 flex justify-center"><Users size={16} /></div>
              <div className="text-3xl font-black font-headline text-on-surface">1,20</div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">FTE uvolněno</div>
            </div>
          </CalcTooltip>
        </div>
      </div>

      {/* Chart */}
      <div className="lg:col-span-7 glass-card ghost-border rounded-2xl p-8 h-[400px] relative">
        <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
          <Clock className="text-primary" />
          Zbytečné člověkohodiny / měsíc
          <span className="ml-auto text-sm text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full">
            −90 %
          </span>
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#a68993" tick={{ fill: '#dfe2eb', fontFamily: 'Space Grotesk', fontWeight: 600 }} />
            <YAxis stroke="#a68993" tick={{ fill: '#a68993' }} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ 
                backgroundColor: '#1e2028', 
                border: '1px solid #584049', 
                borderRadius: '8px', 
                color: '#dfe2eb',
                fontSize: '14px',
                fontFamily: 'Space Grotesk',
              }}
              itemStyle={{ color: '#dfe2eb', fontWeight: 600 }}
              labelStyle={{ color: '#a68993', fontWeight: 700, marginBottom: '4px' }}
              formatter={(value) => [`${value} h`, 'Člověkohodiny']}
            />
            <Bar dataKey="hours" radius={[8, 8, 0, 0]} animationDuration={2000}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* BOTTOM ROW — full width, 3 cards */}
      <div className="lg:col-span-12 grid grid-cols-3 gap-4">
        
        {/* Náklady */}
        <div className="glass-card ghost-border rounded-xl p-5">
          <div className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <DollarSign size={14} />
            Náklady
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-on-surface-variant">Implementace</span>
              <span className="font-bold text-on-surface">10 000 Kč <span className="text-xs text-on-surface-variant/50">(moje hodiny)</span></span>
            </div>
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-on-surface-variant">Provoz AI Builder</span>
              <span className="font-bold text-on-surface">~400 Kč/měs <span className="text-xs text-on-surface-variant/50">(nyní zdarma)</span></span>
            </div>
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-on-surface-variant">Roční provozní</span>
              <span className="font-bold text-on-surface">4 800 Kč</span>
            </div>
          </div>
        </div>

        {/* Kvalitativní přínosy */}
        <div className="glass-card ghost-border rounded-xl p-5">
          <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle size={14} />
            Kvalitativní přínosy
          </div>
          <div className="space-y-3">
            {['Konec duplicitní práce', 'E-mail ve složce do sekundy', 'Nová kategorie = úprava promptu', 'Lepší employee experience'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-on-surface">
                <ArrowRight size={12} className="text-green-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ROI */}
        <CalcTooltip lines={[
          'Roční úspora: 1 200 168 Kč',
          'Implementace: 10 000 Kč (jednorázově)',
          'Provoz: 400 Kč × 12 = 4 800 Kč/rok',
          'Celkové náklady: 14 800 Kč',
          '(1 200 168 − 14 800) ÷ 14 800 × 100',
          '= ROI 8 009 %',
          '',
          'Návratnost: 14 800 ÷ (1 200 168 ÷ 211)',
          '= 2,6 dne ≈ ~5 pracovních dní',
        ]}>
          <div className="rounded-xl p-5 flex flex-col justify-center items-center text-center gap-2 transition-all hover:border-green-500/30 cursor-help"
               style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.02) 100%)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <div className="text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} />
              ROI
            </div>
            <div className="text-5xl font-black font-headline text-green-400 leading-none">
              8 009 %
            </div>
            <div className="w-10 h-0.5 bg-green-500/30 rounded" />
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <Timer size={14} />
              Návratnost: <span className="font-extrabold text-on-surface text-base">~5 dní</span>
            </div>
            <div className="text-xs text-on-surface-variant/50">
              Čistá měsíční úspora: 98 781 Kč
            </div>
          </div>
        </CalcTooltip>
      </div>
    </div>
  );
}
