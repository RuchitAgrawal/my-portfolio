import { useEffect, useRef, useState } from 'react'
import { playToggleSound } from '../utils/audioEffects'

const CHARS = ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'

function renderAscii(img, canvas) {
  const displayW = canvas.clientWidth || 340
  const imgAspect = img.naturalWidth / img.naturalHeight
  const displayH = Math.round(displayW / imgAspect)
  const fontSize = 8
  const charW = fontSize * 0.60

  const cols = Math.floor(displayW / charW)
  const rows = Math.floor(displayH / fontSize)

  const offCanvas = document.createElement('canvas')
  offCanvas.width = cols
  offCanvas.height = rows
  const offCtx = offCanvas.getContext('2d')
  offCtx.drawImage(img, 0, 0, cols, rows)
  const imgData = offCtx.getImageData(0, 0, cols, rows).data

  canvas.width  = Math.round(cols * charW)
  canvas.height = Math.round(rows * fontSize)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#010102'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = `${fontSize}px "JetBrains Mono", monospace`
  ctx.textBaseline = 'top'

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = (y * cols + x) * 4
      const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx+1] + 0.114 * imgData[idx+2]
      const ch = CHARS[Math.floor((lum / 255) * (CHARS.length - 1))]
      const n = lum / 255
      ctx.fillStyle = n > 0.6
        ? '#7fff00'
        : n > 0.35
        ? 'rgba(127,255,0,0.72)'
        : n > 0.12
        ? 'rgba(127,255,0,0.38)'
        : 'rgba(127,255,0,0.12)'
      ctx.fillText(ch, x * charW, y * fontSize)
    }
  }
}

export default function AsciiPortrait() {
  const canvasRef = useRef(null)
  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/assets/ruchit.jpg'
    img.onload = () => {
      renderAscii(img, canvas)
      // Re-render on resize
      const obs = new ResizeObserver(() => renderAscii(img, canvas))
      obs.observe(canvas.parentElement)
      return () => obs.disconnect()
    }
  }, [])

  return (
    <section id="origin" className="rp-section">
      <div className="rp-container">
        <div className="rp-portrait-section">

          {/* Left: The face toggle */}
          <div className="reveal">
            <div
              className={`rp-portrait-frame ${toggled ? 'toggled' : ''}`}
              onClick={() => {
                playToggleSound()
                setToggled(t => !t)
              }}
              title="click to reveal the human behind the code"
            >
              <div className="rp-portrait-ascii">
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="rp-portrait-photo">
                <img src="/assets/ruchit.jpg" alt="Ruchit Agrawal" />
              </div>
              <div className="rp-portrait-badge">
                <span>{toggled ? 'HUMAN VIEW' : '01 BINARY MATRIX'}</span>
                <span style={{ color: 'var(--ink-subtle)' }}>click to toggle</span>
              </div>
            </div>
          </div>

          {/* Right: Origin story */}
          <div className="rp-portrait-info">
            <div className="reveal">
              <div className="rp-eyebrow">where it started</div>
              <div className="rp-origin-quote">
                A borrowed PC in 2014<br />
                and a question that<br />
                never went away.
              </div>
            </div>

            <p className="reveal reveal-delay-1" style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.75, maxWidth: '44ch' }}>
              2014. A dusty Windows PC at my friend's place — actually his older brother's.
              My brother and I took turns on the arrow keys playing GTA Vice City until
              nobody was watching the clock.
              <br /><br />
              I wasn't the kid with a huge friend circle. Still not, honestly.
              The computer was the one place where pedigree didn't matter. Type the right
              logic and the machine listened — didn't care which school you went to.
              That felt fair in a way most things didn't.
            </p>

            <div className="rp-stats reveal reveal-delay-2">
              {[
                { num: 'CLASS OF \'27', label: 'Final-Year B.Tech CSE\nPDEU, Gujarat' },
                { num: '4391',         label: 'GATE CSE 2026\nTop 2% / 200,000+' },
                { num: '6,000+',       label: 'Users shipped live\nTheLastQuestion.io (Singapore)' },
                { num: '6.5k★',        label: 'Meson Build System\nUpstream PR merged' },
              ].map((s) => (
                <div key={s.num} className="rp-stat">
                  <div className="rp-stat__num">{s.num}</div>
                  <div className="rp-stat__label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
