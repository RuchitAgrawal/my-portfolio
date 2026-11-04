const BELIEFS = [
  {
    num: '01',
    tag: 'RELENTLESS',
    quote: '"Giving up has never been in my blood. I genuinely do not know how."',
    story: 'Summer \'26 rejection grind. Over 40 silent rejections and the GSoC finalist cut. Freezing wasn\'t an option — by 8 AM the next morning, I was committing code to Oracle Labs Macaron.',
  },
  {
    num: '02',
    tag: 'NO SHORTCUTS',
    quote: '"Pedigree is just a shortcut. Code is undeniable proof."',
    story: 'I didn\'t start with an IIT or BITS tag. So I let upstream maintainers judge me by diffs. When your pull request gets merged into a 6,500-star build system, nobody asks what college you go to.',
  },
  {
    num: '03',
    tag: 'SHIPPING TRUTH',
    quote: '"Real users break textbook code. Ship early and listen hard."',
    story: 'Scaling TheLastQuestion.io to 6,000+ users in 8 weeks taught me that theoretical architecture breaks under real load. You don\'t know what you\'ve built until a stranger tries to use it.',
  },
  {
    num: '04',
    tag: 'VOICE INTENT',
    quote: '"Voice removes the backspace key. It\'s the fastest bridge from gut to screen."',
    story: 'Building RealityChecker proved that people sanitize their best ideas when typing into a text box. When you speak out loud, the authentic raw intention comes pouring through without the corporate filter.',
  },
  {
    num: '05',
    tag: 'CALIBRATION',
    quote: '"Rejection is not a verdict. It\u2019s just high-resolution calibration."',
    story: 'Every closed door told me exactly which edge of my skill set was dull. You don\'t take it personally — you take the feedback, rebuild the engine, and show up twice as prepared next Monday.',
  },
  {
    num: '06',
    tag: 'ORIGIN SPARK',
    quote: '"The kid on the borrowed PC in 2014 is still the one driving."',
    story: 'Taking turns on the arrow keys playing GTA Vice City on a friend\'s brother\'s computer, wondering how simple text lines became a living universe. That childlike wonder is still why I code past 2 AM.',
  },
]

export default function OperatingPrinciples() {
  return (
    <section id="beliefs" className="rp-section">
      <div className="rp-container">
        
        {/* Section Heading */}
        <div className="reveal" style={{ maxWidth: '54ch', marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}>
          <div className="rp-eyebrow">how I think &amp; operate</div>
          <h2 className="rp-display-lg">Beliefs forged under actual friction.</h2>
          <p className="rp-subhead" style={{ marginTop: '0.75rem' }}>
            Not corporate buzzwords copied from a slide deck. These are the instincts left behind after hundreds of rejections, hard lessons, and merged pull requests.
          </p>
        </div>

        {/* 6 Beliefs Grid — each card cascades individually */}
        <div className="rp-principles">
          {BELIEFS.map((b, i) => (
            <div
              key={b.num}
              className="rp-principle reveal"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="rp-principle__header">
                <span className="rp-principle__num">{b.num}</span>
                <span className="rp-principle__tag">{b.tag}</span>
              </div>
              <div className="rp-principle__quote">{b.quote}</div>
              <div className="rp-principle__origin">
                {b.story}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
