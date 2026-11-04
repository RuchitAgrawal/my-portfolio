import React from 'react';

const INTERNSHIPS = [
  {
    company: 'TheLastQuestion.io',
    badge: 'Singapore · Remote',
    badgeType: 'accent',
    role: 'Full-Stack & Growth Engineering Intern',
    period: 'May – Jul 2026',
    bullets: [
      'Singapore-based AI investigative journalism platform — joined when the platform had ~150 early testers and scaled core architecture to 6,000+ active users across 8 weeks.',
      'Architected full-stack workflows across React, TypeScript, and Python; tuned real-time Firestore synchronization for high-concurrency read throughput and low-latency client updates.',
      'The role I earned through relentless outbound after 40+ summer rejections and the GSoC finalist cut. Worked directly alongside the founder shipping product features under real pressure.',
    ],
    tags: ['React', 'TypeScript', 'Python', 'Firestore', 'Growth Engineering'],
  },
  {
    company: 'SSM InfoTech',
    badge: 'Surat, Gujarat',
    badgeType: 'muted',
    role: 'AI / Machine Learning Engineering Intern',
    period: 'May – Jul 2026',
    bullets: [
      'Built and deployed an intelligent content recommendation engine serving 2,300+ active candidate and talent profiles using FAISS high-dimensional vector search.',
      'Integrated PyTorch embedding models, LangChain agent pipelines, and Gemini API for sub-second semantic retrieval and contextual rationale generation.',
      'Tuned similarity metrics and index clustering to cut candidate recommendation latency while running on cost-efficient cloud compute.',
    ],
    tags: ['FAISS', 'PyTorch', 'LangChain', 'Gemini API', 'Python'],
  },
];

export default function Internships() {
  return (
    <section id="internships" className="rp-section">
      <div className="rp-container">
        
        {/* Section Heading */}
        <div className="reveal" style={{ maxWidth: '58ch', marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}>
          <div className="rp-eyebrow">production experience</div>
          <h2 className="rp-display-lg">Where the code shipped to real users.</h2>
          <p className="rp-subhead" style={{ marginTop: '0.75rem' }}>
            Theory without users is just noise. These are the teams where I wrote code under real deadlines, solved real bottlenecks, and shipped to thousands.
          </p>
        </div>

        {/* Internships 2-Column Grid */}
        <div className="rp-internships">
          {INTERNSHIPS.map((i, idx) => (
            <div
              key={i.company}
              className={`rp-internship reveal reveal-delay-${idx + 1}`}
            >
              <div className="rp-internship__header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="rp-internship__co">{i.company}</span>
                    <span className={`rp-pill ${i.badgeType === 'accent' ? 'rp-pill--accent' : 'rp-pill--muted'}`}>
                      {i.badge}
                    </span>
                  </div>
                  <div className="rp-internship__role">{i.role}</div>
                </div>
                <div className="rp-internship__period">{i.period}</div>
              </div>

              <div className="rp-internship__bullets">
                {i.bullets.map((b) => (
                  <div key={b} className="rp-internship__bullet">
                    {b}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--hairline)' }}>
                {i.tags.map((t) => (
                  <span key={t} className="rp-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

