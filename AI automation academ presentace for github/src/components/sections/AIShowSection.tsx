import React from 'react';

const projects = [
  {
    name: 'Provozní pošťák',
    subtitle: 'AI kategorizace e-mailů',
    description: 'Power Automate + AI Builder třídí ~200 e-mailů denně do 22 kategorií. 6 lidí ušetřeno od čtení všeho.',
    tech: 'Power Automate + AI Builder',
    color: '#ec4899',
    emoji: '📬',
    // Můžete přidat cestu k obrázku/videu takto:
    media: '/screenshots/postman.png',
  },
  {
    name: 'Chronos',
    subtitle: 'Time Tracker',
    description: 'Měření času na procesech. Plán vs realita, variance, export CSV/Markdown. Sdílím kolegům před automatizací.',
    tech: 'Gemini AI Studio',
    color: '#3b82f6',
    emoji: '⏱',
    media: '/screenshots/chronos.png',
  },
  {
    name: 'Trip-Docs',
    subtitle: 'AI účtenkový skener',
    description: 'Nafoť účtenku → AI rozpozná náklad → uloží PDF pro SAP. Konec skenování lístků.',
    tech: 'Gemini AI Studio + Gemini API',
    color: '#22c55e',
    emoji: '🧾',
    media: '/screenshots/tripdocs.png',
  },
  {
    name: 'ROI Calculator',
    subtitle: 'Automation Business Case',
    description: 'Kalkulačka návratnosti automatizace. Vyplň vstupy — FTE, čas i finance se přepočtou.',
    tech: 'ChatGPT + Netlify',
    color: '#a855f7',
    emoji: '📊',
    media: '/screenshots/roi.png',
  },
  {
    name: 'Ultrabalaton Planner',
    subtitle: '200 km Race Strategy',
    description: 'Štafeta kolem Balatonu — úseky dle GPX, převýšení, preference terénu, predikce. 4 týmy innogy.',
    tech: 'Gemini AI Studio',
    color: '#06b6d4',
    emoji: '🏃',
    media: '/screenshots/ultrabalaton.png',
  },
  {
    name: 'GPTs & Copilot Agenti',
    subtitle: 'Osobní AI asistenti',
    description: 'Dotazker, Konference Expert, M365 AI Architect — RAG přes SharePoint governance.',
    tech: 'ChatGPT GPTs + Copilot Studio',
    color: '#ec4899',
    emoji: '🤖',
    media: '/screenshots/gpts.png',
  },
  {
    name: 'Futnet Pro',
    subtitle: 'Competition Planner',
    description: 'Losování týmů na nohejbale, výsledky, standings. Algoritmus hlídá unikátní páry. Multiplayer.',
    tech: 'Gemini AI Studio + Cloud Run',
    color: '#f97316',
    emoji: '🏐',
    media: '/screenshots/futnet.png',
  },
];

function ProjectCard({ p }: { p: typeof projects[0] }) {
  const bgGradient = `linear-gradient(135deg, ${p.color}14 0%, rgba(255,255,255,0.02) 100%)`;
  const borderCol = `${p.color}25`; 
  
  const leftBg = `linear-gradient(135deg, ${p.color}1A 0%, ${p.color}0D 100%)`;
  const leftBorderCol = `${p.color}26`;

  return (
    <div
      className="rounded-xl flex flex-col gap-3 p-4 relative overflow-hidden"
      style={{
        background: bgGradient,
        border: `1px solid ${borderCol}`,
      }}
    >
      <div className="flex items-start gap-4 relative z-10">
        {/* Ikona/Nahled */}
        <div
          className="h-20 w-20 min-w-[80px] rounded-xl flex flex-col items-center justify-center relative overflow-hidden group shrink-0 shadow-sm"
          style={{
            background: leftBg,
            border: `1px solid ${leftBorderCol}`,
          }}
        >
          {p.media ? (
            <img
              src={p.media}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                if (e.target && (e.target as HTMLImageElement).nextElementSibling) {
                  ((e.target as HTMLImageElement).nextElementSibling as HTMLElement).style.opacity = '1';
                }
              }}
            />
          ) : null}
          
          <div 
            className="relative z-10 flex flex-col items-center transition-opacity"
            style={{ opacity: p.media ? 0 : 1 }}
          >
            <div className="text-4xl">{p.emoji}</div>
          </div>
        </div>

        {/* Hlavicka karty */}
        <div className="flex-1 min-w-0 pr-1 text-left">
           <div className="text-[12px] font-bold uppercase tracking-widest mb-1 truncate" style={{ color: p.color }}>
             {p.subtitle}
           </div>
           <div className="text-[20px] font-black text-[#dfe2eb] leading-tight truncate">
             {p.name}
           </div>
           <div className="inline-flex mt-2 items-center gap-1.5 text-[11px] text-[#dfe2eb]/70 bg-black/20 px-2.5 py-[3px] rounded-md font-medium whitespace-nowrap">
             <span>⚡</span> {p.tech}
           </div>
        </div>
      </div>

      {/* Popis */}
      <p className="text-[15px] text-[#a68993] leading-relaxed line-clamp-3 relative z-10 overflow-hidden text-ellipsis text-left">
        {p.description}
      </p>
    </div>
  );
}

export default function AIShowSection() {
  return (
    <div className="flex flex-col h-full w-full bg-[#0f1117] p-6 lg:p-12 overflow-hidden relative" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
      
      {/* Nahoře (fixní hlavička) */}
      <div className="relative z-20 text-center mb-6 shrink-0">
        <h2 className="text-4xl lg:text-[48px] font-black font-headline leading-[1.1] tracking-tighter mb-2 text-[#dfe2eb]">
          AI není nástroj.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Je to způsob práce.
          </span>
        </h2>
        <p className="text-[16px] text-[#a68993] font-medium mb-6">
          Příklady mých aplikací a automatizací z praxe
        </p>

        {/* Děkuji za pozornost & Vizitka (Mimo grid) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-white/5 border border-white/10 shadow-sm">
            <span className="text-3xl">💬</span>
            <div className="text-left">
              <h3 className="text-[#dfe2eb] font-bold text-base tracking-wide">Děkuji za pozornost</h3>
              <p className="text-[#a68993] text-sm">Prostor pro vaše dotazy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-white/5 border border-white/10 shadow-sm">
            <div className="text-left">
              <p className="text-[#dfe2eb] font-bold text-base tracking-wide">Ondřej Strojek</p>
              <p className="text-[#a68993] text-[11px] uppercase tracking-wider mt-0.5">IT specialist – AI & Automation · innogy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Uprostřed (Bento Grid na celou obrazovku bez scrollování) */}
      <div className="flex-1 w-full max-w-[1240px] mx-auto min-h-0 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-3 gap-4 h-full">
          
          {/* 7 Projektů */}
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}

          {/* Karta 8: "...a mnoho dalších" (vyplní zbytek řádku) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-xl flex flex-col justify-center items-center text-center p-4 relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, rgba(236,72,153,0.05) 0%, rgba(168,85,247,0.05) 100%)',
                 border: '1px dashed rgba(236,72,153,0.2)',
               }}>
            <div className="text-4xl mb-2">✨</div>
            <div className="text-2xl font-black text-[#dfe2eb] mb-3">...a mnoho dalších</div>
            <p className="text-[16px] text-[#a68993] leading-relaxed line-clamp-3">
              Power Automate flows, Copilot Studio agenti, NotebookLM podcasty, AI portál/katalog, interní školení...
            </p>
            <p className="text-[12px] text-[#a68993]/50 mt-4 font-medium uppercase tracking-widest">
              Na ukázku všeho není čas
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
