import { ExternalLink } from 'lucide-react'

function GithubIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* -------- Inline SVG Illustrations -------- */

function IllustrationRealityChecker() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Monitor frame */}
      <rect x="15" y="15" width="110" height="72" rx="6" fill="#141418" stroke="#23252a" strokeWidth="1.5"/>
      <rect x="20" y="20" width="100" height="60" rx="3" fill="#09090b"/>
      {/* Scan line animation */}
      <rect x="20" y="30" width="100" height="1.5" fill="rgba(127,255,0,0.25)">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,46;0,0" dur="2.8s" repeatCount="indefinite"/>
      </rect>
      {/* Resume lines */}
      <rect x="28" y="28" width="55" height="4" rx="2" fill="#2e3038"/>
      <rect x="28" y="36" width="40" height="3" rx="1.5" fill="#1c1c22"/>
      <rect x="28" y="43" width="48" height="3" rx="1.5" fill="#1c1c22"/>
      <rect x="28" y="50" width="36" height="3" rx="1.5" fill="#1c1c22"/>
      {/* Check badge */}
      <circle cx="108" cy="35" r="10" fill="rgba(127,255,0,0.12)" stroke="rgba(127,255,0,0.35)" strokeWidth="1.5"/>
      <path d="M103 35l3 3 6-6" stroke="#7fff00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Stand */}
      <rect x="60" y="87" width="20" height="4" rx="2" fill="#141418" stroke="#23252a" strokeWidth="1"/>
      <rect x="50" y="91" width="40" height="3" rx="1.5" fill="#23252a"/>
      {/* Users badge */}
      <rect x="28" y="64" width="62" height="10" rx="3" fill="rgba(127,255,0,0.08)" stroke="rgba(127,255,0,0.2)" strokeWidth="1"/>
      <text x="59" y="72" textAnchor="middle" fill="#7fff00" fontSize="5.5" fontFamily="'JetBrains Mono', monospace">500+ USERS LIVE</text>
    </svg>
  )
}

function IllustrationPanchayat() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Pipeline nodes */}
      <circle cx="20" cy="55" r="10" fill="#141418" stroke="#23252a" strokeWidth="1.5"/>
      <text x="20" y="58" textAnchor="middle" fill="#8a8f98" fontSize="6" fontFamily="'JetBrains Mono', monospace">Sky</text>
      
      <circle cx="55" cy="55" r="10" fill="#141418" stroke="#23252a" strokeWidth="1.5"/>
      <text x="55" y="58" textAnchor="middle" fill="#8a8f98" fontSize="5" fontFamily="'JetBrains Mono', monospace">Spark</text>
      
      <circle cx="90" cy="55" r="10" fill="#141418" stroke="#23252a" strokeWidth="1.5"/>
      <text x="90" y="58" textAnchor="middle" fill="#8a8f98" fontSize="5.5" fontFamily="'JetBrains Mono', monospace">API</text>
      
      <circle cx="123" cy="55" r="10" fill="rgba(127,255,0,0.1)" stroke="rgba(127,255,0,0.4)" strokeWidth="1.5"/>
      <text x="123" y="58" textAnchor="middle" fill="#7fff00" fontSize="4.5" fontFamily="'JetBrains Mono', monospace">Sync</text>

      {/* Flowing dots on pipes */}
      <line x1="30" y1="55" x2="45" y2="55" stroke="#2e3038" strokeWidth="2" strokeDasharray="3 3"/>
      <circle cx="35" cy="55" r="2.5" fill="#7fff00" opacity="0.8">
        <animateTransform attributeName="transform" type="translate" values="0,0;12,0;0,0" dur="1.4s" repeatCount="indefinite"/>
      </circle>
      
      <line x1="65" y1="55" x2="80" y2="55" stroke="#2e3038" strokeWidth="2" strokeDasharray="3 3"/>
      <circle cx="70" cy="55" r="2.5" fill="#7fff00" opacity="0.8">
        <animateTransform attributeName="transform" type="translate" values="0,0;12,0;0,0" dur="1.4s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      
      <line x1="100" y1="55" x2="113" y2="55" stroke="#2e3038" strokeWidth="2" strokeDasharray="3 3"/>
      <circle cx="105" cy="55" r="2.5" fill="#7fff00" opacity="0.8">
        <animateTransform attributeName="transform" type="translate" values="0,0;10,0;0,0" dur="1.4s" begin="0.6s" repeatCount="indefinite"/>
      </circle>

      {/* Stats */}
      <rect x="10" y="78" width="54" height="14" rx="4" fill="#0d0d10" stroke="#23252a" strokeWidth="1"/>
      <text x="37" y="88" textAnchor="middle" fill="#7fff00" fontSize="5" fontFamily="'JetBrains Mono', monospace">2000 posts/min</text>
      <rect x="74" y="78" width="56" height="14" rx="4" fill="#0d0d10" stroke="#23252a" strokeWidth="1"/>
      <text x="102" y="88" textAnchor="middle" fill="#d0d6e0" fontSize="5" fontFamily="'JetBrains Mono', monospace">7ms latency</text>
      
      {/* Title */}
      <text x="70" y="24" textAnchor="middle" fill="#62666d" fontSize="7" fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5">BLUESKY FIREHOSE</text>
    </svg>
  )
}

function IllustrationSecureGen() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Shield */}
      <path d="M70 12 L95 24 L95 52 Q95 72 70 82 Q45 72 45 52 L45 24 Z" fill="#141418" stroke="#23252a" strokeWidth="1.5"/>
      {/* Inner shield glow */}
      <path d="M70 18 L89 28 L89 52 Q89 68 70 76 Q51 68 51 52 L51 28 Z" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" strokeWidth="1"/>
      {/* Threat vector */}
      <circle cx="70" cy="47" r="8" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5">
        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="70" y="51" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="'JetBrains Mono', monospace">⚠</text>
      {/* Stats below */}
      <rect x="10" y="88" width="55" height="13" rx="3" fill="#0d0d10" stroke="#23252a"/>
      <text x="37.5" y="97.5" textAnchor="middle" fill="#d0d6e0" fontSize="4.8" fontFamily="'JetBrains Mono', monospace">139 SCENARIOS</text>
      <rect x="73" y="88" width="58" height="13" rx="3" fill="#0d0d10" stroke="#23252a"/>
      <text x="102" y="97.5" textAnchor="middle" fill="#f87171" fontSize="4.8" fontFamily="'JetBrains Mono', monospace">MITRE + OWASP</text>
      {/* LLM label */}
      <text x="70" y="8" textAnchor="middle" fill="#62666d" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5">LLM RED-TEAMING</text>
    </svg>
  )
}

function IllustrationGamePlanner() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Controller body */}
      <rect x="25" y="32" width="90" height="52" rx="20" fill="#141418" stroke="#23252a" strokeWidth="1.5"/>
      {/* D-pad */}
      <rect x="40" y="50" width="6" height="16" rx="2" fill="#2e3038"/>
      <rect x="35" y="55" width="16" height="6" rx="2" fill="#2e3038"/>
      {/* Buttons */}
      <circle cx="95" cy="51" r="3.5" fill="rgba(127,255,0,0.15)" stroke="rgba(127,255,0,0.5)" strokeWidth="1.2"/>
      <circle cx="104" cy="56" r="3.5" fill="#24242e" stroke="#2e3038" strokeWidth="1.2"/>
      <circle cx="95" cy="61" r="3.5" fill="#24242e" stroke="#2e3038" strokeWidth="1.2"/>
      <circle cx="86" cy="56" r="3.5" fill="#24242e" stroke="#2e3038" strokeWidth="1.2"/>
      {/* AI chip */}
      <rect x="58" y="50" width="24" height="16" rx="4" fill="#09090b" stroke="rgba(127,255,0,0.3)" strokeWidth="1"/>
      <text x="70" y="61" textAnchor="middle" fill="#7fff00" fontSize="5.5" fontFamily="'JetBrains Mono', monospace">AI</text>
      {/* Thumbsticks */}
      <circle cx="48" cy="70" r="6" fill="#0d0d10" stroke="#2e3038" strokeWidth="1.2"/>
      <circle cx="92" cy="70" r="6" fill="#0d0d10" stroke="#2e3038" strokeWidth="1.2"/>
      {/* Label */}
      <text x="70" y="16" textAnchor="middle" fill="#62666d" fontSize="7" fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5">GAME DISCOVERY</text>
      {/* Tech tags */}
      <text x="38" y="98" textAnchor="middle" fill="#8a8f98" fontSize="4.8" fontFamily="'JetBrains Mono', monospace">FAISS · GEMINI</text>
      <text x="100" y="98" textAnchor="middle" fill="#8a8f98" fontSize="4.8" fontFamily="'JetBrains Mono', monospace">PyTorch Vector</text>
    </svg>
  )
}

const PROJECTS = [
  {
    title: 'RealityChecker',
    live: 'realitychecker.vercel.app',
    liveUrl: 'https://realitychecker.vercel.app',
    githubUrl: 'https://github.com/RuchitAgrawal/realitychecker',
    desc: 'AI resume calibration tool serving 500+ real job-seekers. Analyzes actual recruiter heuristics, spots ghosting traps, and keeps the candidate\'s authentic voice intact — without turning into a generic corporate template.',
    tags: ['React', 'TypeScript', 'Redux', 'PostgreSQL', 'Gemini API'],
    illustration: <IllustrationRealityChecker />,
    isLive: true,
  },
  {
    title: 'Panchayat',
    live: null,
    liveUrl: null,
    githubUrl: 'https://github.com/RuchitAgrawal/panchayat',
    desc: 'Distributed real-time analytics engine over the Bluesky social firehose. Handles 2,000+ posts per minute with sub-10ms tail latency using PySpark, Redis and FastAPI WebSockets. Built for true firehose throughput.',
    tags: ['PySpark', 'FastAPI', 'Docker', 'WebSocket', 'Redis'],
    illustration: <IllustrationPanchayat />,
    isLive: false,
  },
  {
    title: 'Secure-Gen',
    live: null,
    liveUrl: null,
    githubUrl: 'https://github.com/RuchitAgrawal/Secure-Gen',
    desc: 'Adversarial red-teaming harness for LLM deployments. 139 automated exploit vectors mapped to MITRE ATLAS and OWASP Top 10 LLM risks. Built to discover jailbreaks and pipeline leakage before malicious actors do.',
    tags: ['Python', 'LLM Security', 'MITRE ATLAS', 'OWASP'],
    illustration: <IllustrationSecureGen />,
    isLive: false,
  },
  {
    title: 'GamePlanner',
    live: null,
    liveUrl: null,
    githubUrl: 'https://github.com/RuchitAgrawal/GamePlanner',
    desc: 'Semantic game recommendation engine. Built high-dimensional embeddings with PyTorch and indexed with FAISS vector search, paired with Gemini API for contextual explanations. Discovers hidden gems by gameplay vibes.',
    tags: ['PyTorch', 'FAISS', 'Gemini API', 'Python', 'Semantic Search'],
    illustration: <IllustrationGamePlanner />,
    isLive: false,
  },
]

export default function ProjectsDeck() {
  return (
    <section id="work" className="rp-section">
      <div className="rp-container">
        
        {/* Section Heading */}
        <div className="reveal" style={{ maxWidth: '54ch', marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}>
          <div className="rp-eyebrow">independent builds</div>
          <h2 className="rp-display-lg">Projects built from genuine obsession.</h2>
          <p className="rp-subhead" style={{ marginTop: '0.75rem' }}>
            Real users. Real scale. Not classroom tutorials. Each one started because something felt broken and I had to fix it.
          </p>
        </div>

        {/* 4-Project Grid */}
        <div className="rp-projects-grid">
          {PROJECTS.map((p, idx) => (
            <div
              key={p.title}
              className={`rp-project-card reveal reveal-delay-${(idx % 4) + 1}`}
            >
              <div className="rp-project-card__visual">
                {p.illustration}
                <div className="rp-project-card__visual-bar" />
              </div>

              <div className="rp-project-card__body">
                <div className="rp-project-card__title">
                  <span>{p.title}</span>
                  {p.isLive && (
                    <span className="rp-pill rp-pill--accent">● LIVE</span>
                  )}
                </div>
                <p className="rp-project-card__desc">{p.desc}</p>
                <div className="rp-project-card__tags">
                  {p.tags.map((t) => (
                    <span key={t} className="rp-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="rp-project-card__links">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink size={12} /> {p.live}
                  </a>
                )}
                <a href={p.githubUrl} target="_blank" rel="noreferrer">
                  <GithubIcon size={12} /> Source
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
