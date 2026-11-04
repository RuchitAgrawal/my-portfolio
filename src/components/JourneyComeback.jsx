export default function JourneyComeback() {
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
        <div className="rp-journey-cards reveal reveal-delay-1">
          {/* Step 1 */}
          <div className="rp-journey-card">
            <div className="rp-journey-num">01</div>
            <div>
              <h3>
                The Target &amp; The Shortlist
                <span className="rp-pill rp-pill--muted">FINALIST</span>
              </h3>
              <p style={{ marginTop: '0.6rem' }}>
                I spent months dissecting open-source codebases for Google Summer of Code. Drafted detailed architecture proposals, submitted early patches, and fought my way to the finalist shortlist with a live technical interview. I put everything on the table.
              </p>
            </div>
            <div className="rp-journey-footer">Status: Reached Finalist Round ✓</div>
          </div>

          {/* Step 2 */}
          <div className="rp-journey-card rp-journey-card--danger">
            <div className="rp-journey-num">02</div>
            <div>
              <h3>
                The Cut
                <span className="rp-pill rp-pill--danger">FAILED</span>
              </h3>
              <p style={{ marginTop: '0.6rem' }}>
                The accepted list went live. My name wasn't on it. Coming right on top of weeks of silent inbox ghosting and 40+ internship rejections during that summer search, it felt like sprinting straight into a concrete wall.
              </p>
            </div>
            <div className="rp-journey-footer">Lesson: Rejection isn't a verdict. It's high-resolution calibration.</div>
          </div>

          {/* Step 3 */}
          <div className="rp-journey-card rp-journey-card--win">
            <div className="rp-journey-num">03</div>
            <div>
              <h3>
                The Next Morning
                <span className="rp-pill rp-pill--accent">RELENTLESS</span>
              </h3>
              <p style={{ marginTop: '0.6rem' }}>
                At 8 AM the next morning, I opened VS Code. If organizations wouldn't hire me through the front door, I would push code they couldn't ignore. Submitted PRs to <strong style={{ color: 'var(--ink)' }}>Oracle Labs Macaron</strong> and the <strong style={{ color: 'var(--ink)' }}>Meson Build System (6,500★)</strong>. Both merged. Then landed a Singapore remote AI startup role at TheLastQuestion.io, shipping features to 6,000+ active users.
              </p>
            </div>
            <div className="rp-journey-footer">Outcome: "Giving up has never been in my blood."</div>
          </div>
        </div>

      </div>
    </section>
  )
}
