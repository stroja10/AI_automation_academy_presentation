import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AvatarPopup({ elapsedTime }: { elapsedTime: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<'5m' | '10m' | '14m' | null>(null);

  useEffect(() => {
    // Show at 5 mins (300s), 10 mins (600s), 14 mins 50s (890s)
    if (elapsedTime === 300) {
      setVariant('5m');
      setIsVisible(true);
    } else if (elapsedTime === 600) {
      setVariant('10m');
      setIsVisible(true);
    } else if (elapsedTime === 890) {
      setVariant('14m');
      setIsVisible(true);
    }
  }, [elapsedTime]);

  useEffect(() => {
    if (isVisible) {
      // Disappear after 8 seconds (10s for the finale)
      const duration = variant === '14m' ? 10000 : 8000;
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, variant]);

  const renderContent = () => {
    switch (variant) {
      case '5m':
        return (
          <>
            <style dangerouslySetInnerHTML={{ __html: `
              .clippy-bubble {
                position: relative;
                background: #1a1a2e;
                border: 2px solid #ec4899;
                border-radius: 16px;
                padding: 16px 22px;
                max-width: 320px;
                margin-bottom: 12px;
                opacity: 0;
                transform: scale(0.7);
                animation: clippyPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards;
                box-shadow: 0 0 20px rgba(236, 72, 153, 0.3), 0 8px 32px rgba(0,0,0,0.4);
              }
              .clippy-bubble::after { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #ec4899; }
              .clippy-bubble::before { content: ''; position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%); border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #1a1a2e; z-index: 1; }
              @keyframes clippyPopIn { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
              .clippy-wrapper { position: relative; width: 120px; height: 160px; animation: clippyIdle 2s ease-in-out infinite 1s; }
              @keyframes clippyIdle { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-4px) rotate(1deg); } 75% { transform: translateY(-2px) rotate(-1deg); } }
              .clippy-body { position: relative; width: 100%; height: 100%; }
              .eye-lid { animation: clippyBlink 4s ease-in-out infinite; }
              @keyframes clippyBlink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.05); } }
              .clippy-eyebrow { animation: clippyEyebrowRaise 3s ease-in-out infinite 1.5s; }
              @keyframes clippyEyebrowRaise { 0%, 80%, 100% { transform: translateY(0); } 85%, 95% { transform: translateY(-3px); } }
              .clippy-hand { transform-origin: 65px 95px; animation: clippyWave 1.5s ease-in-out 1s 3; }
              @keyframes clippyWave { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(10deg); } }
              .clippy-glow { position: absolute; top: 50%; left: 50%; width: 140px; height: 140px; transform: translate(-50%, -50%); background: radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%); border-radius: 50%; animation: clippyPulse 2s ease-in-out infinite; }
              @keyframes clippyPulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; } }
              .clippy-sparkle { position: absolute; width: 6px; height: 6px; background: #ec4899; border-radius: 50%; opacity: 0; }
              .clippy-sparkle:nth-child(1) { top: 10px; left: 20px; animation: clippySparkleAnim 2s ease-in-out infinite 1.3s; }
              .clippy-sparkle:nth-child(2) { top: 30px; right: 10px; animation: clippySparkleAnim 2s ease-in-out infinite 1.7s; }
              .clippy-sparkle:nth-child(3) { bottom: 40px; left: 10px; animation: clippySparkleAnim 2s ease-in-out infinite 2.1s; }
              @keyframes clippySparkleAnim { 0%, 100% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1.5); } }
            `}} />
            <div className="clippy-bubble">
              <div className="text-[11px] font-bold text-primary uppercase tracking-[1.5px] mb-1.5">⏱ Time check</div>
              <div className="text-[16px] font-semibold text-[#f0f0f0] leading-[1.4]">Máš 5 minut za sebou, tak si pohni!</div>
            </div>
            <div className="clippy-wrapper">
              <div className="clippy-glow"></div>
              <div className="clippy-sparkle"></div>
              <div className="clippy-sparkle"></div>
              <div className="clippy-sparkle"></div>

              <svg viewBox="0 0 130 170" xmlns="http://www.w3.org/2000/svg" className="clippy-body">
                <defs>
                  <linearGradient id="clipGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#e8e8e8', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#a0a0a0', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#be185d', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="shadow5">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
                  </filter>
                </defs>

                <path d="M 45 150 L 45 45 Q 45 15 65 15 Q 85 15 85 45 L 85 130 Q 85 150 65 150 Q 55 150 50 145" fill="none" stroke="url(#clipGrad5)" strokeWidth="8" strokeLinecap="round" filter="url(#shadow5)"/>
                <path d="M 55 135 L 55 55 Q 55 35 65 35 Q 75 35 75 55 L 75 120 Q 75 130 65 130" fill="none" stroke="url(#clipGrad5)" strokeWidth="6" strokeLinecap="round" filter="url(#shadow5)"/>
                <path d="M 45 150 L 45 130" fill="none" stroke="url(#pinkGrad)" strokeWidth="8" strokeLinecap="round"/>

                <ellipse cx="58" cy="62" rx="9" ry="11" fill="white" stroke="#888" strokeWidth="1"/>
                <ellipse cx="76" cy="62" rx="9" ry="11" fill="white" stroke="#888" strokeWidth="1"/>

                <g className="eye-lid">
                  <ellipse cx="60" cy="64" rx="4" ry="5" fill="#1a1a2e"/>
                  <ellipse cx="74" cy="64" rx="4" ry="5" fill="#1a1a2e"/>
                  <circle cx="62" cy="62" r="1.5" fill="white"/>
                  <circle cx="76" cy="62" r="1.5" fill="white"/>
                </g>

                <g className="clippy-eyebrow">
                  <path d="M 50 52 Q 58 47 66 52" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M 68 52 Q 76 47 84 52" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                </g>

                <path d="M 58 78 Q 67 86 76 78" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"/>

                <g className="clippy-hand">
                  <path d="M 45 90 Q 25 85 20 70" fill="none" stroke="url(#clipGrad5)" strokeWidth="5" strokeLinecap="round" filter="url(#shadow5)"/>
                  <circle cx="19" cy="68" r="5" fill="url(#clipGrad5)" filter="url(#shadow5)"/>
                  <path d="M 16 63 L 14 58" fill="none" stroke="url(#clipGrad5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 19 62 L 18 56" fill="none" stroke="url(#clipGrad5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 22 63 L 22 57" fill="none" stroke="url(#clipGrad5)" strokeWidth="2.5" strokeLinecap="round"/>
                </g>

                <polygon points="60,85 67,90 60,95" fill="url(#pinkGrad)" opacity="0.9"/>
                <polygon points="74,85 67,90 74,95" fill="url(#pinkGrad)" opacity="0.9"/>
                <circle cx="67" cy="90" r="2.5" fill="#be185d"/>
              </svg>
            </div>
          </>
        );
      case '10m':
        return (
          <>
            <style dangerouslySetInnerHTML={{ __html: `
              .clippy-bubble-worried {
                position: relative;
                background: #1a1a2e;
                border: 2px solid #f97316;
                border-radius: 16px;
                padding: 16px 22px;
                max-width: 340px;
                margin-bottom: 12px;
                opacity: 0;
                transform: scale(0.7);
                animation: clippyPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards, bubbleShake 0.4s ease-in-out 1.5s 3;
                box-shadow: 0 0 25px rgba(249, 115, 22, 0.4), 0 8px 32px rgba(0,0,0,0.4);
              }
              .clippy-bubble-worried::after { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #f97316; }
              .clippy-bubble-worried::before { content: ''; position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%); border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #1a1a2e; z-index: 1; }
              @keyframes clippyPopIn { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
              @keyframes bubbleShake { 0%, 100% { transform: translateX(0) rotate(0deg); } 20% { transform: translateX(-4px) rotate(-1deg); } 40% { transform: translateX(4px) rotate(1deg); } 60% { transform: translateX(-3px) rotate(-0.5deg); } 80% { transform: translateX(3px) rotate(0.5deg); } }
              
              .clippy-wrapper-worried { position: relative; width: 120px; height: 160px; animation: nervousIdle 0.8s ease-in-out infinite 1s; }
              @keyframes nervousIdle { 0%, 100% { transform: translateY(0) rotate(0deg); } 15% { transform: translateY(-5px) rotate(2deg); } 30% { transform: translateY(-2px) rotate(-1.5deg); } 50% { transform: translateY(-6px) rotate(1deg); } 70% { transform: translateY(-1px) rotate(-2deg); } 85% { transform: translateY(-4px) rotate(1.5deg); } }
              
              .eye-lid-worried { animation: blinkWorried 2s ease-in-out infinite; }
              @keyframes blinkWorried { 0%, 85%, 100% { transform: scaleY(1); } 88% { transform: scaleY(0.05); } 92% { transform: scaleY(1); } 95% { transform: scaleY(0.05); } }
              
              .eyebrow-worried { animation: eyebrowWorry 1.5s ease-in-out infinite 1.5s; }
              @keyframes eyebrowWorry { 0%, 100% { transform: translateY(0) rotate(0deg); } 30% { transform: translateY(-4px) rotate(-3deg); } 70% { transform: translateY(-4px) rotate(-3deg); } }
              
              .clippy-sweat { opacity: 0; animation: sweatDrop 1.8s ease-in infinite 1.5s; }
              @keyframes sweatDrop { 0% { opacity: 0; transform: translateY(0); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(18px); } }
              
              .clippy-hand-left-panic { transform-origin: 45px 90px; animation: panicLeft 0.6s ease-in-out infinite 1.2s; }
              .clippy-hand-right-panic { transform-origin: 85px 90px; animation: panicRight 0.6s ease-in-out infinite 1.2s; }
              @keyframes panicLeft { 0%, 100% { transform: rotate(0deg); } 30% { transform: rotate(-20deg); } 60% { transform: rotate(-5deg); } }
              @keyframes panicRight { 0%, 100% { transform: rotate(0deg); } 30% { transform: rotate(20deg); } 60% { transform: rotate(5deg); } }
              
              .clippy-glow-warn { position: absolute; top: 50%; left: 50%; width: 150px; height: 150px; transform: translate(-50%, -50%); background: radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%); border-radius: 50%; animation: pulseWarn 1s ease-in-out infinite; }
              @keyframes pulseWarn { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; } }
              
              .clippy-exclamation { position: absolute; font-size: 22px; font-weight: 900; color: #f97316; opacity: 0; }
              .clippy-exclamation:nth-child(1) { top: -5px; left: 5px; animation: excPop 1.2s ease-in-out infinite 1.6s; }
              .clippy-exclamation:nth-child(2) { top: -10px; right: 5px; animation: excPop 1.2s ease-in-out infinite 2.0s; }
              .clippy-exclamation:nth-child(3) { top: 5px; right: -8px; animation: excPop 1.2s ease-in-out infinite 2.4s; }
              @keyframes excPop { 0%, 100% { opacity: 0; transform: scale(0) translateY(0); } 30% { opacity: 1; transform: scale(1.3) translateY(-5px); } 60% { opacity: 1; transform: scale(1) translateY(-8px); } 90% { opacity: 0; transform: scale(0.8) translateY(-15px); } }
            `}} />
            <div className="clippy-bubble-worried">
              <div className="text-[11px] font-bold text-[#f97316] uppercase tracking-[1.5px] mb-1.5 animate-[labelBlink_1s_ease-in-out_infinite_1.5s]">⚠️ Time check</div>
              <div className="text-[16px] font-semibold text-[#f0f0f0] leading-[1.4]"><span className="text-[#f97316] font-bold">10 minut</span> v trapu a ty jsi pořád ještě tady??!</div>
            </div>

            <div className="clippy-wrapper-worried">
              <div className="clippy-glow-warn"></div>
              <div className="clippy-exclamation">!</div>
              <div className="clippy-exclamation">!</div>
              <div className="clippy-exclamation">!</div>

              <svg viewBox="0 0 130 170" xmlns="http://www.w3.org/2000/svg" className="clippy-body">
                <defs>
                  <linearGradient id="clipGrad10" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#e8e8e8', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#a0a0a0', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="shadow10">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
                  </filter>
                </defs>

                <path d="M 45 150 L 45 45 Q 45 15 65 15 Q 85 15 85 45 L 85 130 Q 85 150 65 150 Q 55 150 50 145" fill="none" stroke="url(#clipGrad10)" strokeWidth="8" strokeLinecap="round" filter="url(#shadow10)"/>
                <path d="M 55 135 L 55 55 Q 55 35 65 35 Q 75 35 75 55 L 75 120 Q 75 130 65 130" fill="none" stroke="url(#clipGrad10)" strokeWidth="6" strokeLinecap="round" filter="url(#shadow10)"/>
                <path d="M 45 150 L 45 125" fill="none" stroke="url(#orangeGrad)" strokeWidth="8" strokeLinecap="round"/>

                <ellipse cx="58" cy="60" rx="10" ry="13" fill="white" stroke="#888" strokeWidth="1"/>
                <ellipse cx="76" cy="60" rx="10" ry="13" fill="white" stroke="#888" strokeWidth="1"/>

                <g className="eye-lid-worried">
                  <ellipse cx="60" cy="62" rx="4.5" ry="5.5" fill="#1a1a2e"/>
                  <ellipse cx="74" cy="62" rx="4.5" ry="5.5" fill="#1a1a2e"/>
                  <circle cx="62" cy="60" r="1.5" fill="white"/>
                  <circle cx="76" cy="60" r="1.5" fill="white"/>
                </g>

                <g className="eyebrow-worried">
                  <path d="M 49 48 Q 56 42 65 50" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 69 50 Q 78 42 85 48" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"/>
                </g>

                <ellipse cx="67" cy="82" rx="7" ry="6" fill="#333" stroke="#555" strokeWidth="1.5"/>
                <ellipse cx="67" cy="80" rx="5" ry="2" fill="#1a1a2e" opacity="0.3"/>

                <g className="clippy-sweat">
                  <path d="M 88 50 Q 91 55 88 60 Q 85 55 88 50" fill="#60a5fa" opacity="0.8"/>
                </g>
                <g className="clippy-sweat" style={{ animationDelay: '2.4s' }}>
                  <path d="M 44 48 Q 47 53 44 58 Q 41 53 44 48" fill="#60a5fa" opacity="0.8"/>
                </g>

                <g className="clippy-hand-left-panic">
                  <path d="M 45 90 Q 22 80 15 62" fill="none" stroke="url(#clipGrad10)" strokeWidth="5" strokeLinecap="round" filter="url(#shadow10)"/>
                  <circle cx="14" cy="60" r="5" fill="url(#clipGrad10)" filter="url(#shadow10)"/>
                  <path d="M 11 55 L 9 49" fill="none" stroke="url(#clipGrad10)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 14 54 L 13 47" fill="none" stroke="url(#clipGrad10)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 17 55 L 17 48" fill="none" stroke="url(#clipGrad10)" strokeWidth="2.5" strokeLinecap="round"/>
                </g>

                <g className="clippy-hand-right-panic">
                  <path d="M 85 90 Q 108 80 115 62" fill="none" stroke="url(#clipGrad10)" strokeWidth="5" strokeLinecap="round" filter="url(#shadow10)"/>
                  <circle cx="116" cy="60" r="5" fill="url(#clipGrad10)" filter="url(#shadow10)"/>
                  <path d="M 113 55 L 113 48" fill="none" stroke="url(#clipGrad10)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 116 54 L 117 47" fill="none" stroke="url(#clipGrad10)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 119 55 L 121 49" fill="none" stroke="url(#clipGrad10)" strokeWidth="2.5" strokeLinecap="round"/>
                </g>

                <polygon points="60,88 67,93 60,98" fill="url(#orangeGrad)" opacity="0.9"/>
                <polygon points="74,88 67,93 74,98" fill="url(#orangeGrad)" opacity="0.9"/>
                <circle cx="67" cy="93" r="2.5" fill="#ea580c"/>
              </svg>
            </div>
          </>
        );
      case '14m':
        return (
          <>
            <style dangerouslySetInnerHTML={{ __html: `
              .clippy-bubble-happy {
                position: relative;
                background: #1a1a2e;
                border: 3px solid #22c55e;
                border-radius: 18px;
                padding: 18px 24px;
                max-width: 360px;
                margin-bottom: 12px;
                opacity: 0;
                transform: scale(0.7);
                animation: popInHappy 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards;
                box-shadow: 0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.15), 0 8px 32px rgba(0,0,0,0.4);
              }
              .clippy-bubble-happy::after { content: ''; position: absolute; bottom: -11px; left: 50%; transform: translateX(-50%); border-left: 13px solid transparent; border-right: 13px solid transparent; border-top: 13px solid #22c55e; }
              .clippy-bubble-happy::before { content: ''; position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%); border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #1a1a2e; z-index: 1; }
              @keyframes popInHappy { 0% { opacity: 0; transform: scale(0.5) rotate(-5deg); } 60% { transform: scale(1.1) rotate(2deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
              
              .clippy-wrapper-happy { position: relative; width: 120px; height: 160px; animation: happyBounce 0.7s ease-in-out infinite 1s; }
              @keyframes happyBounce { 0%, 100% { transform: translateY(0) rotate(0deg) scale(1); } 30% { transform: translateY(-18px) rotate(3deg) scale(1.05); } 50% { transform: translateY(-20px) rotate(-2deg) scale(1.05); } 70% { transform: translateY(-10px) rotate(2deg) scale(1.02); } }
              
              .eye-happy-blink { animation: happyEyes 2s ease-in-out infinite 1.5s; }
              @keyframes happyEyes { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.85); } }
              
              .clippy-hand-left-victory { transform-origin: 45px 90px; animation: victoryLeft 0.8s ease-in-out infinite 1s; }
              .clippy-hand-right-victory { transform-origin: 85px 90px; animation: victoryRight 0.8s ease-in-out infinite 1s; }
              @keyframes victoryLeft { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(-25deg); } }
              @keyframes victoryRight { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(25deg); } }
              
              .clippy-glow-happy { position: absolute; top: 50%; left: 50%; width: 160px; height: 160px; transform: translate(-50%, -50%); background: radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%); border-radius: 50%; animation: glowPulseHappy 1s ease-in-out infinite; }
              @keyframes glowPulseHappy { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; } 50% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; } }
              
              .clippy-star { position: absolute; font-size: 18px; opacity: 0; }
              .clippy-star:nth-child(1) { top: -10px; left: 0; animation: starPop 1s ease-in-out infinite 1.3s; }
              .clippy-star:nth-child(2) { top: -15px; right: 0; animation: starPop 1s ease-in-out infinite 1.6s; }
              .clippy-star:nth-child(3) { top: 20px; left: -15px; animation: starPop 1s ease-in-out infinite 1.9s; }
              .clippy-star:nth-child(4) { top: 15px; right: -15px; animation: starPop 1s ease-in-out infinite 2.2s; }
              .clippy-star:nth-child(5) { top: -5px; left: 50%; animation: starPop 1s ease-in-out infinite 2.5s; }
              @keyframes starPop { 0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); } 30% { opacity: 1; transform: scale(1.3) rotate(30deg); } 60% { opacity: 1; transform: scale(1) rotate(60deg); } 90% { opacity: 0; transform: scale(0.5) rotate(90deg) translateY(-10px); } }

              .party-hat { position: absolute; top: -8px; left: 50%; transform: translateX(-50%); opacity: 0; animation: hatPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s forwards; z-index: 10; }
              @keyframes hatPop { 0% { opacity: 0; transform: translateX(-50%) scale(0) rotate(-30deg); } 100% { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); } }

              .confetti-container { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9998; overflow: hidden; }
              .confetti { position: absolute; top: -20px; width: 10px; height: 10px; opacity: 0; animation: confettiFall linear forwards; }
              @keyframes confettiFall { 0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); } 80% { opacity: 1; } 100% { opacity: 0; transform: translateY(100vh) rotate(720deg) scale(0.5); } }
            `}} />
            
            <div className="confetti-container">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="confetti" style={{
                  left: `${(i % 20) * 5}%`,
                  background: ['#22c55e', '#ec4899', '#f97316', '#3b82f6', '#eab308', '#a855f7'][i % 6],
                  width: `${6 + (i % 6)}px`,
                  height: `${6 + (i % 8)}px`,
                  borderRadius: i % 3 === 0 ? '50%' : '2px',
                  animationDelay: `${0.7 + (i % 12) * 0.1}s`,
                  animationDuration: `${2.4 + (i % 10) * 0.1}s`
                }}></div>
              ))}
            </div>

            <div className="clippy-bubble-happy">
              <div className="text-[12px] font-[800] text-[#22c55e] uppercase tracking-[2px] mb-1.5 animate-[labelPulse_0.6s_ease-in-out_infinite_1.2s]">🎉 Hotovo!</div>
              <div className="text-[18px] font-bold text-[#f0f0f0] leading-[1.4]"><span className="text-[#22c55e] font-[800] text-[20px]">Hurááááá</span> máme to za sebou!</div>
            </div>

            <div className="clippy-wrapper-happy">
              <div className="clippy-glow-happy"></div>
              <div className="clippy-star">⭐</div>
              <div className="clippy-star">🌟</div>
              <div className="clippy-star">✨</div>
              <div className="clippy-star">⭐</div>
              <div className="clippy-star">🎊</div>

              <div className="party-hat">
                <svg width="50" height="45" viewBox="0 0 50 45" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="25,0 5,40 45,40" fill="url(#hatGrad)" stroke="#16a34a" strokeWidth="1.5"/>
                  <circle cx="25" cy="0" r="4" fill="#eab308"/>
                  <circle cx="25" cy="0" r="2" fill="#fde047"/>
                  <line x1="12" y1="28" x2="38" y2="28" stroke="#ec4899" strokeWidth="2.5" strokeDasharray="3 3"/>
                  <line x1="8" y1="35" x2="42" y2="35" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 3"/>
                  <ellipse cx="25" cy="41" rx="22" ry="4" fill="#22c55e" opacity="0.6"/>
                  <defs>
                    <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#22c55e' }}/>
                      <stop offset="50%" style={{ stopColor: '#16a34a' }}/>
                      <stop offset="100%" style={{ stopColor: '#22c55e' }}/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <svg viewBox="0 0 130 170" xmlns="http://www.w3.org/2000/svg" className="clippy-body">
                <defs>
                  <linearGradient id="clipGrad14" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#e8e8e8', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#a0a0a0', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="shadow14">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
                  </filter>
                </defs>

                <path d="M 45 150 L 45 45 Q 45 15 65 15 Q 85 15 85 45 L 85 130 Q 85 150 65 150 Q 55 150 50 145" fill="none" stroke="url(#clipGrad14)" strokeWidth="8" strokeLinecap="round" filter="url(#shadow14)"/>
                <path d="M 55 135 L 55 55 Q 55 35 65 35 Q 75 35 75 55 L 75 120 Q 75 130 65 130" fill="none" stroke="url(#clipGrad14)" strokeWidth="6" strokeLinecap="round" filter="url(#shadow14)"/>
                <path d="M 45 150 L 45 120" fill="none" stroke="url(#greenGrad)" strokeWidth="8" strokeLinecap="round"/>

                <g className="eye-happy-blink">
                  <path d="M 50 63 Q 58 55 66 63" fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 68 63 Q 76 55 84 63" fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round"/>
                </g>

                <ellipse cx="52" cy="72" rx="6" ry="3.5" fill="#ec4899" opacity="0.35"/>
                <ellipse cx="82" cy="72" rx="6" ry="3.5" fill="#ec4899" opacity="0.35"/>

                <path d="M 55 78 Q 67 95 79 78" fill="#333" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M 58 78 Q 67 72 76 78" fill="#1a1a2e" opacity="0.3"/>
                <ellipse cx="67" cy="88" rx="5" ry="4" fill="#e85d75" opacity="0.7"/>

                <g className="clippy-hand-left-victory">
                  <path d="M 45 90 Q 18 75 12 55" fill="none" stroke="url(#clipGrad14)" strokeWidth="5" strokeLinecap="round" filter="url(#shadow14)"/>
                  <circle cx="11" cy="53" r="5" fill="url(#clipGrad14)" filter="url(#shadow14)"/>
                  <path d="M 8 48 L 5 38" fill="none" stroke="url(#clipGrad14)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 12 47 L 13 37" fill="none" stroke="url(#clipGrad14)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 15 50 L 16 45" fill="none" stroke="url(#clipGrad14)" strokeWidth="2.5" strokeLinecap="round"/>
                </g>

                <g className="clippy-hand-right-victory">
                  <path d="M 85 90 Q 112 75 118 55" fill="none" stroke="url(#clipGrad14)" strokeWidth="5" strokeLinecap="round" filter="url(#shadow14)"/>
                  <circle cx="119" cy="53" r="5" fill="url(#clipGrad14)" filter="url(#shadow14)"/>
                  <path d="M 116 48 L 117 37" fill="none" stroke="url(#clipGrad14)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 120 47 L 123 38" fill="none" stroke="url(#clipGrad14)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 114 50 L 113 45" fill="none" stroke="url(#clipGrad14)" strokeWidth="2.5" strokeLinecap="round"/>
                </g>

                <polygon points="60,88 67,93 60,98" fill="url(#greenGrad)" opacity="0.9"/>
                <polygon points="74,88 67,93 74,98" fill="url(#greenGrad)" opacity="0.9"/>
                <circle cx="67" cy="93" r="3" fill="#16a34a"/>
                <circle cx="67" cy="93" r="1.5" fill="#eab308"/>
              </svg>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 400, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 400, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed bottom-[90px] right-[40px] z-[9999] flex flex-col items-center"
        >
          {renderContent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}



