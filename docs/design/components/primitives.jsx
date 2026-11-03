// primitives.jsx — shared bits: Stroopwafel mascot, icons, phone frame

// ============================================================
// Stroopwafel mascot — flat SVG (caramel, waffle grid, simple face)
// ============================================================
function Stroopwafel({ size = 48, mood = 'neutral', style = {} }) {
  const S = size;
  // grid lines
  const lines = [];
  const gridCount = 7;
  for (let i = 1; i < gridCount; i++) {
    const t = (i / gridCount);
    lines.push(<line key={`v${i}`} x1={t * 100} y1={2} x2={t * 100} y2={98} stroke="rgba(60,30,5,0.32)" strokeWidth="1.2" />);
    lines.push(<line key={`h${i}`} x1={2} y1={t * 100} x2={98} y2={t * 100} stroke="rgba(60,30,5,0.32)" strokeWidth="1.2" />);
  }

  const eye = (cx) => <circle cx={cx} cy="54" r="2.6" fill="#2A1607" />;
  const smile = (
    <path d={
      mood === 'happy' ? 'M42 64 Q50 72 58 64' :
      mood === 'focus' ? 'M44 66 Q50 68 56 66' :
      'M44 66 Q50 69 56 66'
    } stroke="#2A1607" strokeWidth="2.2" fill="none" strokeLinecap="round" />
  );

  return (
    <svg viewBox="0 0 100 100" width={S} height={S} style={style}>
      <defs>
        <clipPath id="wafel-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
        <radialGradient id="wafel-body" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#F0C37C"/>
          <stop offset="60%" stopColor="#D9A55E"/>
          <stop offset="100%" stopColor="#A87333"/>
        </radialGradient>
      </defs>
      {/* body */}
      <circle cx="50" cy="50" r="48" fill="url(#wafel-body)" />
      {/* waffle grid clipped to circle */}
      <g clipPath="url(#wafel-clip)">{lines}</g>
      {/* outer rim */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#8B5A24" strokeWidth="1.6" />
      {/* subtle highlight */}
      <ellipse cx="36" cy="32" rx="18" ry="8" fill="rgba(255,255,255,0.18)" />
      {/* face */}
      {eye(42)}
      {eye(58)}
      {smile}
      {/* blush */}
      <circle cx="34" cy="62" r="3" fill="rgba(200,80,60,0.25)" />
      <circle cx="66" cy="62" r="3" fill="rgba(200,80,60,0.25)" />
    </svg>
  );
}

// ============================================================
// Icons — minimal lucide-style glyphs inline
// ============================================================
const Icon = {
  Back: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  ),
  Close: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  Bell: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>
    </svg>
  ),
  Speaker: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  ),
  SpeakerLoud: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  ),
  Flame: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  Check: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  Star: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
    </svg>
  ),
  ArrowRight: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  ArrowUpRight: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 17L17 7M7 7h10v10"/>
    </svg>
  ),
  Home: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  Cards: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="14" height="16" rx="2"/>
      <path d="M7 2l13 3-3 13"/>
    </svg>
  ),
  Flag: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 22V4M4 4h14l-3 5 3 5H4"/>
    </svg>
  ),
  Settings: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Bookmark: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Sparkle: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2L13.8 9.2 21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8z"/>
    </svg>
  ),
  Book: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Clock: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  Rotate: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 2v6h6M21 12A9 9 0 0 0 6 5.3L3 8M21 22v-6h-6M3 12a9 9 0 0 0 15 6.7l3-2.7"/>
    </svg>
  ),
};

// ============================================================
// Phone frame — custom minimal (dark-first)
// ============================================================
function PhoneFrame({ children, time = '9:41', dark: _dark }) {
  return (
    <div className="phone grain">
      <div className="phone-screen">
        <div className="notch" />
        <div className="status-bar">
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
          <div className="icons">
            {/* signal */}
            <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="0.7" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx="0.7" fill="currentColor"/><rect x="10" y="2.8" width="3" height="9.2" rx="0.7" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="0.7" fill="currentColor" opacity="0.4"/></svg>
            {/* wifi */}
            <svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2.5a9 9 0 0 1 6 2.3l1.4-1.4A11 11 0 0 0 0 3.4L1.4 4.8A9 9 0 0 1 8 2.5z" fill="currentColor"/><path d="M8 6.2a5 5 0 0 1 3.5 1.4l1.4-1.4a7 7 0 0 0-9.8 0l1.4 1.4A5 5 0 0 1 8 6.2z" fill="currentColor"/><circle cx="8" cy="9.8" r="1.3" fill="currentColor"/></svg>
            {/* battery */}
            <svg width="26" height="13" viewBox="0 0 26 13"><rect x="0.6" y="0.6" width="22" height="11.8" rx="3" stroke="currentColor" fill="none" strokeOpacity="0.5"/><rect x="2" y="2" width="19" height="9" rx="1.6" fill="currentColor"/><rect x="23.5" y="4.5" width="1.8" height="4" rx="0.8" fill="currentColor" opacity="0.5"/></svg>
          </div>
        </div>
        {children}
        <div className="home-ind" />
      </div>
    </div>
  );
}

// ============================================================
// Screen shell — labeled card in canvas grid
// ============================================================
function ScreenSlot({ num, label, children }) {
  return (
    <div className="screen-slot">
      <div className="screen-label">
        <span className="num">{num}</span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

Object.assign(window, { Stroopwafel, Icon, PhoneFrame, ScreenSlot });
