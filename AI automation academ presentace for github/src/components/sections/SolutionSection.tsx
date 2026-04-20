import { motion } from 'motion/react';
import { CheckCircle2, Eye, FolderTree, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function SolutionSection() {
  const simulationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!simulationRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const scale = Math.min(width / 960, height / 540);
        const demoEl = simulationRef.current?.querySelector('.ms-demo') as HTMLElement;
        if (demoEl) {
          // Center the scaled element since its transform-origin is top-left
          const scaledWidth = 960 * scale;
          const scaledHeight = 540 * scale;
          const leftOffset = (width - scaledWidth) / 2;
          const topOffset = (height - scaledHeight) / 2;

          demoEl.style.transform = `translate(${leftOffset}px, ${topOffset}px) scale(${scale})`;
        }
      }
    });
    resizeObserver.observe(simulationRef.current);

    const folders = [
      { name: 'Ext.KC', count: 847 },
      { name: 'voicebot', count: 412 },
      { name: 'Reporting', count: 623 },
      { name: 'Emailová fronta', count: 1284 },
      { name: 'kampaně', count: 356 },
      { name: 'mimofiremní', count: 189 },
      { name: 'směny', count: 534 },
      { name: 'ostatní', count: 198 },
    ];

    const emails = [
      {
        from: 'M. Nováková',
        time: '9:47',
        subject: 'Směna 3/4 Milan V.',
        preview: 'prosím o výměnu Milanové přesčasové směny z 3.4. 9-17...',
        keywords: ['směna', 'výměna', '3.4.', 'přesčas'],
        category: 'směny',
        confidence: 96,
        low: false,
      },
      {
        from: 'P. Svoboda',
        time: '9:52',
        subject: 'E-mailové bloky v AT',
        preview: 'V AT jsem Vám naplánoval e-mailové bloky, prosím o zapojení...',
        keywords: ['AT', 'e-mailové bloky', 'zapojení'],
        category: 'Emailová fronta',
        confidence: 93,
        low: false,
      },
      {
        from: 'Provoz Dialer',
        time: '9:58',
        subject: 'Dialer - druhá kampaň',
        preview: 'spustil se dialer - druhá kampaň, kontakty z kampaně...',
        keywords: ['dialer', 'kampaň', 'kontakty', 'zákazník'],
        category: 'kampaně',
        confidence: 89,
        low: false,
      },
      {
        from: 'externi@partner.cz',
        time: '10:03',
        subject: 'Dotaz ohledně spolupráce',
        preview: 'Dobrý den, rád bych se zeptal na možnosti spolupráce...',
        keywords: ['dotaz', 'spolupráce'],
        category: 'ostatní',
        confidence: 64,
        low: true,
      },
    ];

    let isRunning = true;

    function renderFolders() {
      if (!simulationRef.current) return;
      const el = simulationRef.current.querySelector('#folders-list');
      if (!el) return;
      el.innerHTML = folders.map(f => `
        <div class="folder" data-name="${f.name}">
          <div class="folder-icon-box"></div>
          <div class="folder-name">${f.name}</div>
          <div class="folder-count">${f.count}</div>
        </div>
      `).join('') + '<div class="folder-more">+ 14 dalších kategorií</div>';
    }

    function renderEmails(list: typeof emails) {
      if (!simulationRef.current) return;
      const el = simulationRef.current.querySelector('#email-list');
      if (!el) return;
      el.innerHTML = list.map((e, i) => `
        <div class="email unread" data-idx="${i}">
          <div class="email-sender">
            <div class="email-from unread">${e.from}</div>
            <div class="email-time">${e.time}</div>
          </div>
          <div class="email-subject">${e.subject}</div>
          <div class="email-preview">${e.preview}</div>
        </div>
      `).join('');
    }

    function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

    function setPhase(n: number) {
      if (!simulationRef.current) return;
      for (let i = 0; i < 4; i++) {
        const dot = simulationRef.current.querySelector('#dot-' + i);
        if (dot) dot.classList.toggle('active', i === n);
      }
    }

    function setStepState(n: number, state: 'idle' | 'active' | 'done') {
      if (!simulationRef.current) return;
      const step = simulationRef.current.querySelector('#step-' + n);
      const status = simulationRef.current.querySelector('#status-' + n);
      if (!step || !status) return;
      step.classList.remove('active', 'done');
      if (state === 'active') {
        step.classList.add('active');
        status.textContent = 'Running';
      } else if (state === 'done') {
        step.classList.add('done');
        status.textContent = 'Succeeded';
      } else {
        status.textContent = '—';
      }
      if (n > 1) {
        const arrow = simulationRef.current.querySelector('#arrow-' + (n - 1));
        if (arrow) {
          arrow.classList.remove('active', 'done');
          if (state === 'active') arrow.classList.add('active');
          if (state === 'done') arrow.classList.add('done');
        }
      }
    }

    function resetSteps() {
      for (let i = 1; i <= 4; i++) setStepState(i, 'idle');
      if (!simulationRef.current) return;
      const s1 = simulationRef.current.querySelector('#status-1');
      if (s1) s1.textContent = 'Ready';
    }

    async function processEmail(email: typeof emails[0], emailIdx: number) {
      if (!isRunning || !simulationRef.current) return;
      setPhase(0);
      setStepState(1, 'active');
      const emailEl = simulationRef.current.querySelector(`.email[data-idx="${emailIdx}"]`);
      if (emailEl) emailEl.classList.add('active');
      await sleep(700);
      if (!isRunning) return;
      setStepState(1, 'done');

      setPhase(1);
      setStepState(2, 'active');
      await sleep(600);
      if (!isRunning) return;
      setStepState(2, 'done');

      setPhase(2);
      setStepState(3, 'active');

      const resultEl = simulationRef.current.querySelector('#ai-result');
      const catEl = simulationRef.current.querySelector('#result-cat');
      const confEl = simulationRef.current.querySelector('#result-conf');
      const kwEl = simulationRef.current.querySelector('#keywords');
      
      if (resultEl && catEl && confEl && kwEl) {
        catEl.textContent = '...';
        confEl.textContent = 'analyzuji';
        confEl.classList.remove('low');
        kwEl.innerHTML = email.keywords.map(k => `<span class="kw">${k}</span>`).join('');
        resultEl.classList.add('shown');

        const kwNodes = simulationRef.current.querySelectorAll('#keywords .kw');
        for (const k of Array.from(kwNodes) as HTMLElement[]) {
          await sleep(180);
          if (!isRunning) return;
          k.classList.add('shown');
        }
        await sleep(400);
        if (!isRunning) return;

        catEl.textContent = email.category;
        confEl.textContent = email.low
          ? `conf ${email.confidence}% — low`
          : `conf ${email.confidence}%`;
        confEl.classList.toggle('low', email.low);
      }
      setStepState(3, 'done');

      await sleep(900);
      if (!isRunning) return;

      setPhase(3);
      setStepState(4, 'active');
      const targetFolder = simulationRef.current.querySelector(`.folder[data-name="${email.category}"]`);
      if (targetFolder) targetFolder.classList.add('target');
      await sleep(500);
      if (!isRunning) return;
      if (emailEl) emailEl.classList.add('leaving');
      await sleep(400);
      if (!isRunning) return;

      if (targetFolder) {
        const countEl = targetFolder.querySelector('.folder-count');
        if (countEl) {
          const current = parseInt(countEl.textContent || '0', 10);
          countEl.textContent = (current + 1).toString();
          countEl.classList.add('bump');
          await sleep(350);
          if (!isRunning) return;
          countEl.classList.remove('bump');
        }
      }
      setStepState(4, 'done');
      await sleep(700);
      if (!isRunning) return;

      if (targetFolder) targetFolder.classList.remove('target');
      if (resultEl) resultEl.classList.remove('shown');
      if (emailEl) emailEl.classList.remove('active', 'leaving');
      await sleep(400);
      if (!isRunning) return;
      resetSteps();
    }

    async function runLoop() {
      while (isRunning) {
        renderFolders();
        renderEmails(emails.slice(0, 3));
        resetSteps();
        await sleep(600);
        if (!isRunning) break;
        for (let i = 0; i < 3; i++) {
          if (!isRunning) break;
          await processEmail(emails[i], i);
        }
        if (!isRunning) break;
        renderEmails([emails[3]]);
        await sleep(400);
        if (!isRunning) break;
        await processEmail(emails[3], 0);
        await sleep(1000);
      }
    }

    // Start the loop
    setTimeout(() => {
      if (isRunning) runLoop();
    }, 500);

    return () => {
      isRunning = false;
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column */}
      <div className="lg:col-span-5 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary/20 text-secondary text-xs font-headline uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            AI Řešení & Automatizace
          </div>
          <h2 className="text-5xl lg:text-7xl font-black font-headline text-on-surface leading-[0.9] tracking-tighter">
            AI to <span className="text-secondary">řeší</span> za nás
          </h2>
        </div>
        
        <div className="space-y-8">
          <div className="glass-card ghost-border p-8 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <h3 className="text-secondary font-headline font-bold text-xl mb-4 flex items-center gap-3">
              <Zap size={24} />
              Power Automate + AI
            </h3>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Kombinujeme sílu orchestrace procesů s inteligentním porozuměním obsahu. Výsledkem je ekosystém, který nevyžaduje manuální zásah.
            </p>
          </div>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <span className="text-on-surface font-bold block text-lg">Automatické třídění</span>
                <span className="text-on-surface-variant">E-maily jsou okamžitě zařazeny dle kontextu.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <Eye size={16} />
              </div>
              <div>
                <span className="text-on-surface font-bold block text-lg">Jeden „hlídající“ pracovník</span>
                <span className="text-on-surface-variant">Člověk už netřídí, pouze dohlíží na výjimky.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Video Placeholder */}
        <div className="glass-card ghost-border rounded-xl overflow-hidden group transition-all duration-500 md:col-span-2 w-full aspect-video flex items-center justify-center relative">
          <div ref={simulationRef} className="w-full h-full relative" dangerouslySetInnerHTML={{ __html: `
<style>
  .ms-demo * { box-sizing: border-box; margin: 0; padding: 0; }
  .ms-demo {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #faf9f8;
    color: #323130;
    border-radius: 8px;
    width: 960px;
    height: 540px;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: top left;
    overflow: hidden;
  }

  /* Top title bar (Outlook style) */
  .ms-topbar {
    background: #0078d4;
    color: white;
    padding: 6px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    height: 36px;
  }
  .ms-topbar-left {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }
  .ms-topbar-icon {
    width: 18px; height: 18px;
    background: white;
    border-radius: 2px;
    position: relative;
  }
  .ms-topbar-icon::after {
    content: 'O';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: #0078d4;
    font-size: 12px;
    font-weight: 700;
  }
  .phase-indicator {
    display: flex;
    gap: 5px;
  }
  .phase-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transition: background 0.3s;
  }
  .phase-dot.active { background: white; }

  /* Main stage */
  .ms-stage {
    display: grid;
    grid-template-columns: 1fr 1.2fr 0.8fr;
    height: calc(100% - 66px);
  }

  /* ============ OUTLOOK PANEL (left) ============ */
  .outlook-panel {
    background: #faf9f8;
    border-right: 1px solid #edebe9;
    display: flex;
    flex-direction: column;
  }
  .outlook-header {
    padding: 10px 14px;
    border-bottom: 1px solid #edebe9;
    background: #ffffff;
  }
  .outlook-title {
    font-size: 11px;
    color: #605e5c;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .outlook-mailbox {
    font-size: 13px;
    color: #323130;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .mailbox-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #107c10;
  }
  .email-list {
    flex: 1;
    overflow: hidden;
    padding: 6px 0;
  }
  .email {
    padding: 10px 14px;
    border-bottom: 1px solid #f3f2f1;
    transition: all 0.4s ease;
    background: white;
    position: relative;
  }
  .email::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: transparent;
    transition: background 0.3s;
  }
  .email.unread::before { background: #0078d4; }
  .email.active {
    background: #e7f1fa;
  }
  .email.active::before { background: #ec4899; }
  .email.leaving {
    opacity: 0;
    transform: translateX(-30px);
  }
  .email-sender {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
  }
  .email-from {
    font-size: 13px;
    font-weight: 600;
    color: #0078d4;
  }
  .email-from.unread { color: #0078d4; }
  .email-time {
    font-size: 11px;
    color: #605e5c;
  }
  .email-subject {
    font-size: 13px;
    color: #201f1e;
    font-weight: 500;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .email-preview {
    font-size: 12px;
    color: #605e5c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ============ POWER AUTOMATE PANEL (center) ============ */
  .pa-panel {
    background: #f3f2f1;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-right: 1px solid #edebe9;
  }
  .pa-header {
    font-size: 11px;
    color: #605e5c;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 600;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .pa-logo {
    width: 16px; height: 16px;
    background: #742774;
    border-radius: 3px;
    position: relative;
  }
  .pa-logo::after {
    content: '';
    position: absolute;
    top: 3px; left: 4px;
    width: 8px; height: 10px;
    background: white;
    clip-path: polygon(0 0, 70% 0, 30% 50%, 100% 50%, 30% 100%, 0 60%);
  }
  .pa-flow-name {
    font-size: 14px;
    color: #201f1e;
    font-weight: 600;
    margin-bottom: 8px;
  }

  /* Flow steps vertical */
  .flow-steps {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
  }
  .flow-step {
    background: white;
    border: 1px solid #d2d0ce;
    border-radius: 4px;
    padding: 6px 12px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    color: #323130;
    transition: all 0.3s ease;
    position: relative;
  }
  .flow-step.active {
    border-color: #742774;
    box-shadow: 0 0 0 2px rgba(116, 39, 116, 0.2);
    background: #faf5fa;
  }
  .flow-step.done {
    border-color: #107c10;
  }
  .flow-arrow {
    width: 2px;
    height: 10px;
    background: #d2d0ce;
    position: relative;
  }
  .flow-arrow.active { background: #742774; }
  .flow-arrow.done { background: #107c10; }
  .flow-step-icon {
    width: 20px; height: 20px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: white;
    font-weight: 700;
    flex-shrink: 0;
  }
  .icon-outlook { background: #0078d4; }
  .icon-html { background: #5c2d91; }
  .icon-ai { background: #742774; }
  .icon-switch { background: #ca5010; }
  .flow-step-name {
    flex: 1;
    font-weight: 500;
  }
  .flow-step-status {
    font-size: 9px;
    color: #605e5c;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    min-width: 45px;
    text-align: right;
  }
  .flow-step.active .flow-step-status { color: #742774; font-weight: 600; }
  .flow-step.done .flow-step-status { color: #107c10; font-weight: 600; }

  /* AI result bubble */
  .ai-result {
    background: white;
    border: 2px solid #742774;
    border-radius: 6px;
    padding: 6px 12px;
    margin-top: 6px;
    width: 100%;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.4s ease;
  }
  .ai-result.shown {
    opacity: 1;
    transform: translateY(0);
  }
  .ai-result-title {
    font-size: 9px;
    color: #742774;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ai-badge {
    background: #742774;
    color: white;
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 8px;
    font-weight: 700;
  }
  .ai-result-cat {
    font-size: 14px;
    color: #201f1e;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .ai-result-conf {
    font-size: 10px;
    color: #107c10;
    font-weight: 600;
  }
  .ai-result-conf.low { color: #ca5010; }
  .ai-keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
  }
  .kw {
    background: #f3eaf3;
    color: #742774;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 9px;
    font-weight: 500;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.3s ease;
  }
  .kw.shown { opacity: 1; transform: translateY(0); }

  /* ============ FOLDERS PANEL (right) ============ */
  .folders-panel {
    background: #ffffff;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .folders-header {
    padding: 10px 14px;
    border-bottom: 1px solid #edebe9;
    background: #faf9f8;
  }
  .folders-title {
    font-size: 11px;
    color: #605e5c;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .folders-sub {
    font-size: 13px;
    color: #323130;
    font-weight: 600;
  }
  .folders-list {
    flex: 1;
    overflow: hidden;
    padding: 4px 6px;
  }
  .folder {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 12px;
    color: #323130;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    margin-bottom: 2px;
  }
  .folder.target {
    background: #fef0f7;
    border-color: #ec4899;
  }
  .folder-icon-box {
    width: 14px; height: 11px;
    background: #ffb900;
    border-radius: 1px 2px 2px 2px;
    position: relative;
    flex-shrink: 0;
  }
  .folder-icon-box::before {
    content: '';
    position: absolute;
    top: -2px; left: 1px;
    width: 6px; height: 2px;
    background: #ffb900;
    border-radius: 1px 1px 0 0;
  }
  .folder.target .folder-icon-box { background: #ec4899; }
  .folder.target .folder-icon-box::before { background: #ec4899; }
  .folder-name {
    flex: 1;
    font-weight: 500;
  }
  .folder-count {
    font-size: 11px;
    color: #605e5c;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    transition: all 0.3s ease;
  }
  .folder.target .folder-count { color: #ec4899; }
  .folder-count.bump {
    transform: scale(1.4);
    color: #107c10 !important;
  }
  .folder-more {
    padding: 4px 8px;
    font-size: 10px;
    color: #a19f9d;
    font-style: italic;
  }

  /* Status bar bottom */
  .status-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: #201f1e;
    color: #d2d0ce;
    padding: 6px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    height: 30px;
  }
  .status-left { display: flex; gap: 16px; }
  .status-item { display: flex; align-items: center; gap: 6px; }
  .status-light {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #107c10;
    animation: blink 1.5s infinite;
  }
  @keyframes blink {
    0%, 70% { opacity: 1; }
    85% { opacity: 0.3; }
  }
</style>

<div class="ms-demo">
  <div class="ms-topbar">
    <div class="ms-topbar-left">
      <div class="ms-topbar-icon"></div>
      <span>Outlook — ZS_provozní</span>
    </div>
    <div class="phase-indicator">
      <div class="phase-dot" id="dot-0"></div>
      <div class="phase-dot" id="dot-1"></div>
      <div class="phase-dot" id="dot-2"></div>
      <div class="phase-dot" id="dot-3"></div>
    </div>
  </div>

  <div class="ms-stage">
    <!-- OUTLOOK -->
    <div class="outlook-panel">
      <div class="outlook-header">
        <div class="outlook-title">Sdílená schránka</div>
        <div class="outlook-mailbox">
          <span class="mailbox-dot"></span>
          ZS_provozní
        </div>
      </div>
      <div class="email-list" id="email-list"></div>
    </div>

    <!-- POWER AUTOMATE -->
    <div class="pa-panel">
      <div class="pa-header">
        <span class="pa-logo"></span>
        Power Automate
      </div>
      <div class="pa-flow-name">Kategorizace @_v3</div>

      <div class="flow-steps">
        <div class="flow-step" id="step-1">
          <div class="flow-step-icon icon-outlook">O</div>
          <div class="flow-step-name">New email</div>
          <div class="flow-step-status" id="status-1">Ready</div>
        </div>
        <div class="flow-arrow" id="arrow-1"></div>
        <div class="flow-step" id="step-2">
          <div class="flow-step-icon icon-html">H</div>
          <div class="flow-step-name">Html to text</div>
          <div class="flow-step-status" id="status-2">—</div>
        </div>
        <div class="flow-arrow" id="arrow-2"></div>
        <div class="flow-step" id="step-3">
          <div class="flow-step-icon icon-ai">AI</div>
          <div class="flow-step-name">AI Builder</div>
          <div class="flow-step-status" id="status-3">—</div>
        </div>
        <div class="flow-arrow" id="arrow-3"></div>
        <div class="flow-step" id="step-4">
          <div class="flow-step-icon icon-switch">SW</div>
          <div class="flow-step-name">Switch</div>
          <div class="flow-step-status" id="status-4">—</div>
        </div>
      </div>

      <div class="ai-result" id="ai-result">
        <div class="ai-result-title">
          <span class="ai-badge">AI Builder</span>
          Výsledek
        </div>
        <div class="ai-result-cat" id="result-cat">—</div>
        <div class="ai-result-conf" id="result-conf">—</div>
        <div class="ai-keywords" id="keywords"></div>
      </div>
    </div>

    <!-- FOLDERS -->
    <div class="folders-panel">
      <div class="folders-header">
        <div class="folders-title">Složky</div>
        <div class="folders-sub">22 kategorií</div>
      </div>
      <div class="folders-list" id="folders-list"></div>
    </div>
  </div>

  <div class="status-bar">
    <div class="status-left">
      <div class="status-item">
        <span class="status-light"></span>
        <span>Flow aktivní</span>
      </div>
      <div class="status-item">
        <span>Runs: 1 247 dnes</span>
      </div>
    </div>
    <div>~90 % auto</div>
  </div>
</div>
          `}} />
        </div>

        {/* Small Cards */}
        <div className="glass-card ghost-border p-6 rounded-xl flex flex-col justify-between hover:bg-surface-variant/60 transition-colors">
          <FolderTree className="text-secondary mb-4" size={40} />
          <div>
            <div className="text-on-surface font-bold text-lg leading-tight">Struktura složek</div>
            <div className="text-on-surface-variant text-sm mt-2">Plně organizované úložiště bez lidské chyby.</div>
          </div>
        </div>
        
        <div className="bg-secondary-container rounded-xl p-6 flex flex-col justify-between shadow-2xl shadow-secondary/10 group cursor-pointer">
          <div className="flex justify-between items-start">
            <Zap className="text-on-secondary-container" size={40} fill="currentColor" />
          </div>
          <div>
            <div className="text-on-secondary-container font-black font-headline text-4xl mb-1">90.0%</div>
            <div className="text-on-secondary-container/80 text-xs font-headline uppercase tracking-widest font-bold">Přesnost kategorizace</div>
          </div>
        </div>
      </div>
    </div>
  );
}
