export default function JourneyComeback() {
  const CARDS = [
    {
      num: '01',
      title: 'The Target & The Shortlist',
      pill: { label: 'FINALIST', cls: 'rp-pill--muted' },
      body: 'I spent months dissecting open-source codebases for Google Summer of Code. Drafted detailed architecture proposals, submitted early patches, and fought my way to the finalist shortlist with a live technical interview. I put everything on the table.',
      footer: 'Status: Reached Finalist Round ✓',
      cardCls: '',
    },
    {
      num: '02',
      title: 'The Cut',
      pill: { label: 'FAILED', cls: 'rp-pill--danger' },
      body: 'The accepted list went live. My name wasn\'t on it. Coming right on top of weeks of silent inbox ghosting and 40+ internship rejections during that summer search, it felt like sprinting straight into a concrete wall.',
      footer: 'Lesson: Rejection isn\'t a verdict. It\'s high-resolution calibration.',
      cardCls: 'rp-journey-card--danger',
    },
    {
      num: '03',
      title: 'The Next Morning',
      pill: { label: 'RELENTLESS', cls: 'rp-pill--accent' },
      body: (<>At 8 AM the next morning, I opened VS Code. If organizations wouldn't hire me through the front door, I would push code they couldn't ignore. Submitted PRs to <strong style={{ color: 'var(--ink)' }}>Oracle Labs Macaron</strong> and the <strong style={{ color: 'var(--ink)' }}>Meson Build System (6,500★)</strong>. Both merged. Then landed a Singapore remote AI startup role at TheLastQuestion.io, shipping features to 6,000+ active users.</>),
      footer: 'Outcome: "Giving up has never been in my blood."',
      cardCls: 'rp-journey-card--win',
    },
  ]

  return (
    <section id="comeback" className="rp-section">
      <div className="rp-container">
        
        {/* Section Heading */}
        <div className="reveal" style={{ maxWidth: '54ch', marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}>
          <div className="rp-eyebrow">the turning point</div>
          <h2 className="rp-display-lg">
            The GSoC interview,<br />the rejection, and the morning after.
          </h2>
          <p className="rp-subhead" style={{ marginTop: '0.75rem' }}>
            Wispr asked for the mistakes we learned from and the chances we took. This was mine.
          </p>
        </div>

        {/* 3-Step Journey Ladder */}
        <div className="rp-journey-cards">
          {CARDS.map((card, i) => (
            <div
              key={card.num}
              className={`rp-journey-card reveal ${card.cardCls}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="rp-journey-num">{card.num}</div>
              <div>
                <h3>
                  {card.title}
                  <span className={`rp-pill ${card.pill.cls}`}>{card.pill.label}</span>
                </h3>
                <p style={{ marginTop: '0.6rem' }}>{card.body}</p>
              </div>
              <div className="rp-journey-footer">{card.footer}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
