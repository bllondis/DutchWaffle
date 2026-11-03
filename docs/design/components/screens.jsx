// screens.jsx — all five screens for the Dutch app

const C = window.DUTCH_CONTENT;

// ────────────────────────────────────────────────────────────
// 1. HOME — level picker + continue card
// ────────────────────────────────────────────────────────────
function HomeScreen({ tweaks, onOpen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Header */}
      <div style={{ padding: '8px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {tweaks.mascot && <Stroopwafel size={32} />}
          <div>
            <div className="t-meta">Goedemorgen</div>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>Sander</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="chip chip-caramel">
            <Icon.Flame /> 12
          </span>
          <button className="ibtn"><Icon.Bell /></button>
        </div>
      </div>

      <div className="screen-scroll" style={{ paddingTop: 24 }}>
        {/* Continue card */}
        <div
          onClick={() => onOpen && onOpen('intro')}
          style={{
            border: '1px solid var(--line)',
            borderRadius: 22,
            padding: 18,
            background: 'linear-gradient(140deg, rgba(110,199,169,0.16) 0%, var(--surface) 65%)',
            cursor: 'pointer',
          }}
        >
          <div className="t-eyebrow" style={{ color: 'var(--accent)' }}>Verder gaan</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em', marginTop: 6, lineHeight: 1.2 }}>
            Je mening<br/>nuanceren
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <div className="progress" style={{ flex: 1 }}><i style={{ width: '38%' }}/></div>
            <span className="t-meta">3/8</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span className="t-meta"><Icon.Clock style={{ verticalAlign: '-3px', marginRight: 4 }}/>9 min</span>
            <span style={{ width: 3, height: 3, borderRadius: 99, background: 'var(--fg-mute)' }}/>
            <span className="t-meta">B1+</span>
            <div style={{ flex: 1 }}/>
            <span className="ibtn" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', border: 'none' }}>
              <Icon.ArrowRight />
            </span>
          </div>
        </div>

        {/* Levels */}
        <div className="t-eyebrow" style={{ marginTop: 28, marginBottom: 12, paddingLeft: 4 }}>Jouw niveau</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {C.levels.map(lv => {
            const pct = Math.round((lv.completed / lv.lessons) * 100);
            const active = lv.id === 'b1plus';
            return (
              <div key={lv.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 14, borderRadius: 18,
                background: active ? 'rgba(110,199,169,0.06)' : 'var(--surface)',
                border: '1px solid ' + (active ? 'rgba(110,199,169,0.28)' : 'var(--line)'),
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: active ? 'var(--accent)' : 'var(--surface-2)',
                  color: active ? 'var(--accent-ink)' : 'var(--fg-dim)',
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.02em',
                  flexShrink: 0,
                }}>{lv.code}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{lv.name}</span>
                    <span className="t-meta" style={{ fontSize: 11 }}>{lv.tagline}</span>
                  </div>
                  <div className="progress" style={{ marginTop: 8, background: 'var(--line)' }}>
                    <i style={{ width: pct + '%' }}/>
                  </div>
                </div>
                <span className="t-meta" style={{ fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>
                  {lv.completed}/{lv.lessons}
                </span>
              </div>
            );
          })}
        </div>

        {/* Themes — explore */}
        <div className="t-eyebrow" style={{ marginTop: 28, marginBottom: 12, paddingLeft: 4 }}>Thema's</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {C.themes.slice(0, 4).map(t => (
            <div key={t.id} className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{t.name}</div>
              <div className="t-meta" style={{ marginTop: 4, fontSize: 11 }}>{t.en}</div>
            </div>
          ))}
        </div>
      </div>

      {/* tab bar */}
      <TabBar active="home" />
    </div>
  );
}

function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', i: <Icon.Home />, label: 'Home' },
    { id: 'cards', i: <Icon.Cards />, label: 'Leren' },
    { id: 'flag', i: <Icon.Flag />, label: 'Doel' },
    { id: 'me', i: <Icon.Settings />, label: 'Mij' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around',
      padding: '10px 16px 22px',
      borderTop: '1px solid var(--line)',
      background: 'var(--bg)',
      flexShrink: 0,
    }}>
      {tabs.map(t => (
        <div key={t.id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          color: active === t.id ? 'var(--accent)' : 'var(--fg-mute)',
        }}>
          {t.i}
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.02em' }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 2. LESSON INTRO — theme card with phrase preview
// ────────────────────────────────────────────────────────────
function IntroScreen({ tweaks, onOpen }) {
  const lesson = C.lesson;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="ibtn" onClick={() => onOpen && onOpen('home')}><Icon.Back /></button>
        <span className="t-eyebrow">Les 3 van 8</span>
        <button className="ibtn"><Icon.Bookmark /></button>
      </div>

      <div className="screen-scroll" style={{ paddingTop: 16 }}>
        {/* Hero card */}
        <div style={{
          position: 'relative',
          borderRadius: 26,
          padding: '28px 22px',
          background: 'linear-gradient(160deg, #2A3F39 0%, #182523 65%, #11181A 100%)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
          minHeight: 280,
        }}>
          <div className="ring-bg" />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="chip chip-accent">{lesson.level}</span>
              <span className="chip">Mening</span>
            </div>
            {tweaks.mascot && (
              <div style={{ position: 'absolute', top: -8, right: -10 }}>
                <Stroopwafel size={72} mood="focus" />
              </div>
            )}
            <div>
              <div className="t-eyebrow" style={{ color: 'var(--caramel-2)' }}>Thema · Je mening geven</div>
              <div style={{
                fontSize: 32, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
                marginTop: 6, textWrap: 'balance', maxWidth: 240,
              }}>
                {lesson.title}
              </div>
              <div className="t-body" style={{ marginTop: 8, maxWidth: 250 }}>
                {lesson.subtitle}. Leer hoe je in het Nederlands genuanceerd je mening geeft.
              </div>
            </div>
          </div>

          {/* metadata strip */}
          <div style={{
            position: 'relative', display: 'flex', gap: 16, marginTop: 24, paddingTop: 18,
            borderTop: '1px solid var(--line)',
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{lesson.minutes}m</div>
              <div className="t-meta">Tijd</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{lesson.phrases.length}</div>
              <div className="t-meta">Zinnen</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{lesson.new_words}</div>
              <div className="t-meta">Nieuw</div>
            </div>
          </div>
        </div>

        {/* phrase preview list */}
        <div className="t-eyebrow" style={{ marginTop: 24, marginBottom: 12, paddingLeft: 4 }}>Wat ga je leren</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lesson.phrases.slice(0, 4).map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderRadius: 14,
              background: 'var(--surface)', border: '1px solid var(--line)',
            }}>
              <span style={{
                fontSize: 11, fontFamily: 'ui-monospace, monospace',
                color: 'var(--fg-mute)', width: 18,
              }}>{String(i+1).padStart(2,'0')}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.nl}</div>
                <div className="t-meta" style={{ fontSize: 11, marginTop: 2 }}>{p.en}</div>
              </div>
            </div>
          ))}
          <div className="t-meta" style={{ paddingLeft: 14, marginTop: 4 }}>
            +{lesson.phrases.length - 4} meer
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 20px 22px', flexShrink: 0 }}>
        <button className="btn btn-primary btn-block" onClick={() => onOpen && onOpen(tweaks.cardMetaphor === 'flip' ? 'flash-flip' : 'flash-stack')}>
          Begin de les <Icon.ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 3a. FLASHCARD — STACK variant
// ────────────────────────────────────────────────────────────
function FlashStack({ tweaks, onOpen }) {
  const lesson = C.lesson;
  const [idx, setIdx] = React.useState(0);
  const [revealed, setRevealed] = React.useState(false);
  const total = lesson.phrases.length;
  const cur = lesson.phrases[idx];
  const nxt = lesson.phrases[(idx + 1) % total];
  const after = lesson.phrases[(idx + 2) % total];

  const next = () => {
    setRevealed(false);
    setIdx(i => Math.min(i + 1, total - 1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* header */}
      <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="ibtn" onClick={() => onOpen && onOpen('intro')}><Icon.Close /></button>
        <div className="progress" style={{ flex: 1 }}>
          <i style={{ width: ((idx+1) / total * 100) + '%' }}/>
        </div>
        <span className="t-meta mono" style={{ fontSize: 11 }}>{idx+1}/{total}</span>
      </div>

      {/* stack area */}
      <div style={{ flex: 1, padding: '24px 20px', position: 'relative' }}>
        <div className="fc-stack">
          {/* back card */}
          <div className="fc back">
            <div className="t-eyebrow">{after.en}</div>
          </div>
          {/* mid card */}
          <div className="fc mid">
            <div className="t-eyebrow">{nxt.en}</div>
            <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.7 }}>{nxt.nl}</div>
          </div>
          {/* front card */}
          <div className="fc front" onClick={() => setRevealed(true)}>
            {/* top */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="chip chip-accent">Dutch</span>
              <button className="ibtn" onClick={(e) => e.stopPropagation()}>
                <Icon.SpeakerLoud />
              </button>
            </div>
            {/* phrase */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="t-phrase">{cur.nl}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--fg-mute)' }}>{cur.ipa}</div>
              {revealed && (
                <>
                  <div style={{ height: 1, background: 'var(--line)', margin: '6px 0' }}/>
                  <div className="t-eyebrow">English</div>
                  <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--fg)', lineHeight: 1.3 }}>
                    {cur.en}
                  </div>
                  <div style={{
                    marginTop: 10, padding: 12, borderRadius: 12,
                    background: 'var(--bg-2)', border: '1px solid var(--line)',
                  }}>
                    <div className="t-meta" style={{ fontSize: 10, marginBottom: 4 }}>VOORBEELD</div>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.35 }}>{cur.example.nl}</div>
                    <div className="t-meta" style={{ marginTop: 4, fontStyle: 'italic' }}>{cur.example.en}</div>
                  </div>
                </>
              )}
            </div>
            {/* footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {!revealed ? (
                <span className="t-meta" style={{ fontSize: 11 }}>Tik om te onthullen</span>
              ) : (
                <span className="dots">
                  {lesson.phrases.map((_,i) => <i key={i} className={i <= idx ? 'on' : ''}/>)}
                </span>
              )}
              <span className="chip">{cur.en.length < 20 ? 'kort' : 'idioom'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* actions */}
      <div style={{ padding: '0 20px 22px', display: 'flex', gap: 10, flexShrink: 0 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={next}>
          Lastig
        </button>
        <button className="btn btn-primary" style={{ flex: 1.4 }} onClick={() => idx < total - 1 ? next() : onOpen && onOpen('quiz')}>
          {idx < total - 1 ? 'Ken ik' : 'Quiz starten'} <Icon.ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 3b. FLASHCARD — FLIP variant
// ────────────────────────────────────────────────────────────
function FlashFlip({ tweaks, onOpen }) {
  const lesson = C.lesson;
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const total = lesson.phrases.length;
  const cur = lesson.phrases[idx];

  const next = () => { setFlipped(false); setIdx(i => Math.min(i + 1, total - 1)); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="ibtn" onClick={() => onOpen && onOpen('intro')}><Icon.Close /></button>
        <div className="progress" style={{ flex: 1 }}>
          <i style={{ width: ((idx+1) / total * 100) + '%' }}/>
        </div>
        <span className="t-meta mono" style={{ fontSize: 11 }}>{idx+1}/{total}</span>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
        <div className={"fc-flip" + (flipped ? ' flipped' : '')} onClick={() => setFlipped(f => !f)}>
          <div className="fc-flip-inner">
            {/* FRONT */}
            <div className="fc-face">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="chip chip-accent">NL</span>
                <button className="ibtn" onClick={(e) => e.stopPropagation()}><Icon.SpeakerLoud /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                {tweaks.mascot && <Stroopwafel size={36} mood="neutral" />}
                <div className="t-phrase">{cur.nl}</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--fg-mute)' }}>{cur.ipa}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="t-meta" style={{ fontSize: 11 }}>
                  <Icon.Rotate style={{ verticalAlign: '-3px', marginRight: 4 }}/>
                  Tik om te draaien
                </span>
                <span className="dots">
                  {lesson.phrases.map((_,i) => <i key={i} className={i === idx ? 'on' : ''}/>)}
                </span>
              </div>
            </div>
            {/* BACK */}
            <div className="fc-face back">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="chip">EN</span>
                <span className="t-meta">{idx+1}/{total}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="t-eyebrow">Betekenis</div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {cur.en}
                </div>
                <div className="t-body" style={{ fontSize: 13 }}>{cur.note}</div>
                <div style={{
                  marginTop: 6, padding: 12, borderRadius: 12,
                  background: 'var(--bg-2)', border: '1px solid var(--line)',
                }}>
                  <div className="t-meta" style={{ fontSize: 10, marginBottom: 4 }}>VOORBEELD</div>
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.35 }}>{cur.example.nl}</div>
                  <div className="t-meta" style={{ marginTop: 4, fontStyle: 'italic' }}>{cur.example.en}</div>
                </div>
              </div>
              <span className="t-meta" style={{ fontSize: 11 }}>Tik om terug te draaien</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 22px', display: 'flex', gap: 10, flexShrink: 0 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={next}>Lastig</button>
        <button className="btn btn-primary" style={{ flex: 1.4 }} onClick={() => idx < total - 1 ? next() : onOpen && onOpen('quiz')}>
          {idx < total - 1 ? 'Ken ik' : 'Quiz starten'} <Icon.ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 4. MULTIPLE CHOICE QUIZ
// ────────────────────────────────────────────────────────────
function QuizScreen({ tweaks, onOpen }) {
  const lesson = C.lesson;
  // build question: "Daar zit wat in" -> pick correct EN
  const correctIdx = 7; // "Daar zit wat in"
  const target = lesson.phrases[correctIdx];
  const options = [
    { en: target.en, correct: true },
    { en: 'I disagree completely', correct: false },
    { en: 'It depends on the situation', correct: false },
    { en: 'That’s not the case', correct: false },
  ];

  const [picked, setPicked] = React.useState(null);
  const showFeedback = picked !== null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="ibtn" onClick={() => onOpen && onOpen('flash-stack')}><Icon.Close /></button>
        <div className="progress" style={{ flex: 1 }}>
          <i style={{ width: '62%' }}/>
        </div>
        <span className="chip chip-caramel" style={{ height: 26 }}>
          <Icon.Flame /> 12
        </span>
      </div>

      <div className="screen-scroll" style={{ paddingTop: 24 }}>
        <div className="t-eyebrow" style={{ color: 'var(--caramel-2)' }}>Vraag 5 / 8</div>
        <div style={{
          fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em',
          lineHeight: 1.2, marginTop: 8, textWrap: 'balance',
        }}>
          Wat betekent deze uitdrukking?
        </div>

        {/* prompt phrase */}
        <div style={{
          marginTop: 18, padding: 18, borderRadius: 18,
          background: 'var(--surface-2)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {tweaks.mascot && <Stroopwafel size={40} mood="focus" />}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em' }}>{target.nl}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>{target.ipa}</div>
          </div>
          <button className="ibtn"><Icon.Speaker /></button>
        </div>

        {/* options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
          {options.map((o, i) => {
            let cls = 'mc-opt';
            if (showFeedback) {
              if (o.correct) cls += ' correct';
              else if (i === picked) cls += ' wrong';
            } else if (picked === i) cls += ' selected';
            const letter = ['A','B','C','D'][i];
            return (
              <div key={i} className={cls} onClick={() => !showFeedback && setPicked(i)}>
                <span className="bullet">
                  {showFeedback && o.correct ? <Icon.Check /> : letter}
                </span>
                <span style={{ flex: 1 }}>{o.en}</span>
              </div>
            );
          })}
        </div>

        {showFeedback && (
          <div style={{
            marginTop: 16, padding: 14, borderRadius: 14,
            background: 'rgba(110,199,169,0.08)',
            border: '1px solid rgba(110,199,169,0.25)',
          }}>
            <div className="t-eyebrow" style={{ color: 'var(--accent)' }}>Goed zo!</div>
            <div className="t-body" style={{ fontSize: 13, marginTop: 4 }}>
              <strong style={{ color: 'var(--fg)' }}>{target.nl}</strong> — {target.note}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 20px 22px', flexShrink: 0 }}>
        <button
          className="btn btn-primary btn-block"
          disabled={picked === null}
          style={{ opacity: picked === null ? 0.45 : 1 }}
          onClick={() => onOpen && onOpen('complete')}
        >
          {showFeedback ? 'Volgende' : 'Controleren'} <Icon.ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 5. LESSON COMPLETE
// ────────────────────────────────────────────────────────────
function CompleteScreen({ tweaks, onOpen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative' }}>
      <div style={{ padding: '8px 16px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="ibtn" onClick={() => onOpen && onOpen('home')}><Icon.Close /></button>
      </div>

      <div className="screen-scroll" style={{ alignItems: 'stretch', paddingTop: 12 }}>
        {/* hero */}
        <div style={{ position: 'relative', textAlign: 'center', paddingTop: 16 }}>
          <div className="burst" style={{ left: '50%', top: -30, transform: 'translateX(-50%)' }}/>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {tweaks.mascot ? (
              <div style={{ position: 'relative' }}>
                <Stroopwafel size={104} mood="happy" />
                {/* sparkles */}
                <span style={{ position: 'absolute', top: -2, right: -8, color: 'var(--caramel-2)' }}><Icon.Sparkle /></span>
                <span style={{ position: 'absolute', bottom: 0, left: -10, color: 'var(--accent)' }}><Icon.Sparkle width="14" height="14"/></span>
              </div>
            ) : (
              <div style={{
                width: 104, height: 104, borderRadius: 99,
                background: 'rgba(110,199,169,0.15)',
                border: '1px solid rgba(110,199,169,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <Icon.Check width="42" height="42" />
              </div>
            )}
          </div>

          <div className="t-eyebrow" style={{ marginTop: 22, color: 'var(--accent)' }}>Les voltooid</div>
          <div style={{
            fontSize: 34, fontWeight: 600, letterSpacing: '-0.025em',
            lineHeight: 1.05, marginTop: 6, textWrap: 'balance',
          }}>
            Lekker bezig,<br/>Sander!
          </div>
          <div className="t-body" style={{ marginTop: 8, fontSize: 14, padding: '0 16px' }}>
            Je hebt 8 nieuwe uitdrukkingen geleerd over <em style={{ color: 'var(--caramel-2)', fontStyle: 'normal' }}>je mening nuanceren</em>.
          </div>
        </div>

        {/* stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8, marginTop: 28,
        }}>
          <div className="stat-tile">
            <div className="v">8</div>
            <div className="l">Zinnen</div>
          </div>
          <div className="stat-tile" style={{ background: 'rgba(110,199,169,0.06)', borderColor: 'rgba(110,199,169,0.25)' }}>
            <div className="v" style={{ color: 'var(--accent)' }}>87%</div>
            <div className="l">Score</div>
          </div>
          <div className="stat-tile" style={{ background: 'rgba(217,165,94,0.06)', borderColor: 'rgba(217,165,94,0.25)' }}>
            <div className="v" style={{ color: 'var(--caramel-2)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon.Flame /> 12
            </div>
            <div className="l">Streak</div>
          </div>
        </div>

        {/* phrases learned */}
        <div className="t-eyebrow" style={{ marginTop: 28, marginBottom: 10, paddingLeft: 4 }}>Vandaag geleerd</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {C.lesson.phrases.slice(0, 4).map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 12,
              background: 'var(--surface)', border: '1px solid var(--line)',
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: 99,
                background: 'var(--accent)', color: 'var(--accent-ink)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon.Check width="12" height="12"/>
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{p.nl}</span>
              <span className="t-meta" style={{ fontSize: 11 }}>{p.en}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 20px 22px', display: 'flex', gap: 10, flexShrink: 0 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => onOpen && onOpen('home')}>Klaar</button>
        <button className="btn btn-primary" style={{ flex: 1.4 }} onClick={() => onOpen && onOpen('intro')}>
          Volgende les <Icon.ArrowRight />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, IntroScreen, FlashStack, FlashFlip, QuizScreen, CompleteScreen });
