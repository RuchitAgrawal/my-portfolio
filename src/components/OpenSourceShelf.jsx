import { Star, ShieldCheck, Cpu, Network } from 'lucide-react'

const REPOS = [
  {
    icon: <ShieldCheck size={17} style={{ color: 'var(--accent)' }} />,
    name: 'oracle/macaron',
    desc: 'Supply-chain security tool for automated build analysis & software provenance',
    stars: '191★',
    prs: ['PR #1379', 'PR #1403'],
    url: 'https://github.com/oracle/macaron',
  },
  {
    icon: <Cpu size={17} style={{ color: 'var(--accent)' }} />,
    name: 'mesonbuild/meson',
    desc: 'High-speed build system used by GNOME, systemd, GLib, and Linux core tooling',
    stars: '6,500★',
    prs: ['PR #15641'],
    url: 'https://github.com/mesonbuild/meson',
  },
  {
    icon: <Network size={17} style={{ color: 'var(--accent)' }} />,
    name: 'aregtech/areg-sdk',
    desc: 'Interface-centric distributed multi-cast communication engine & IPC framework',
    stars: '345★',
    prs: ['PR #690'],
    url: 'https://github.com/aregtech/areg-sdk',
  },
]

export default function OpenSourceShelf() {
  return (
    <section id="oss" className="rp-section">
      <div className="rp-container">
        
        {/* Section Heading */}
        <div className="reveal" style={{ maxWidth: '54ch', marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}>
          <div className="rp-eyebrow">open source credibility</div>
          <h2 className="rp-display-lg">Upstream code. Reviewed and merged.</h2>
          <p className="rp-subhead" style={{ marginTop: '0.75rem' }}>
            I didn't have an elite tier-1 brand on my student ID. So I let global maintainers do the vetting.
          </p>
        </div>

        {/* OSS List Grid */}
        <div className="rp-oss-grid reveal reveal-delay-1">
          {REPOS.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="rp-oss-row"
            >
              <div className="rp-oss-row__icon">{r.icon}</div>
              <div className="rp-oss-row__meta">
                <div className="rp-oss-row__name">{r.name}</div>
                <div className="rp-oss-row__desc">{r.desc}</div>
              </div>
              <div className="rp-oss-row__stars">
                <Star size={12} fill="var(--ink-subtle)" strokeWidth={0} />
                <span>{r.stars}</span>
              </div>
              <div className="rp-oss-row__prs">
                {r.prs.map((pr) => (
                  <span key={pr} className="rp-pill rp-pill--accent">
                    {pr} ✓
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
