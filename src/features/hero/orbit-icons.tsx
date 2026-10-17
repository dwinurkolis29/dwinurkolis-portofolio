/** Simple hand-drawn tech glyphs (24×24, currentColor) that orbit the hero rings. */

function AndroidGlyph() {
  return (
    <>
      <path d="M5 15a7 7 0 0 1 14 0z" fill="currentColor" />
      <path d="M8 9.5 6 6.5M16 9.5l2-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9.5" cy="12.6" r="0.9" fill="var(--surface)" />
      <circle cx="14.5" cy="12.6" r="0.9" fill="var(--surface)" />
    </>
  );
}

function KotlinGlyph() {
  return <path d="M5 5h14l-7 7 7 7H5z" fill="currentColor" />;
}

function FlutterGlyph() {
  return (
    <>
      <path d="M14 4h4l-9 9-2-2z" fill="currentColor" />
      <path d="M14 12h4l-5 5 5 5h-4l-5-5z" fill="currentColor" />
    </>
  );
}

function PythonGlyph() {
  return (
    <>
      <path
        d="M12 3c-3 0-4 1.2-4 3v2h4.5v1H6c-2 0-3 1.4-3 4s1 4 3 4h2v-2.5c0-1.7 1.3-3 3-3h4c1.4 0 2.5-1.1 2.5-2.5V6c0-1.8-1.5-3-5.5-3z"
        fill="currentColor"
      />
      <path
        d="M12 21c3 0 4-1.2 4-3v-2h-4.5v-1H18c2 0 3-1.4 3-4s-1-4-3-4h-2v2.5c0 1.7-1.3 3-3 3H9c-1.4 0-2.5 1.1-2.5 2.5V18c0 1.8 1.5 3 5.5 3z"
        fill="currentColor"
        opacity="0.55"
      />
      <circle cx="10" cy="5.5" r="0.9" fill="var(--surface)" />
      <circle cx="14" cy="18.5" r="0.9" fill="var(--surface)" />
    </>
  );
}

function FirebaseGlyph() {
  return (
    <>
      <path d="M5 18 8 3l4 7z" fill="currentColor" opacity="0.6" />
      <path d="M5 18 15 4l4 14-7 3z" fill="currentColor" />
    </>
  );
}

const icons = [
  { name: "Android", Glyph: AndroidGlyph, tone: "text-accent" },
  { name: "Kotlin", Glyph: KotlinGlyph, tone: "text-accent-2" },
  { name: "Flutter", Glyph: FlutterGlyph, tone: "text-accent-2" },
  { name: "Python", Glyph: PythonGlyph, tone: "text-accent" },
  { name: "Firebase", Glyph: FirebaseGlyph, tone: "text-foreground" },
];

/** The outer hero ring, carrying the icons evenly spaced on its edge. Decorative. */
export function OrbitIcons() {
  return (
    <div className="orbit pointer-events-none absolute h-80 w-80 rounded-full border border-accent/15 sm:h-96 sm:w-96">
      {icons.map(({ name, Glyph, tone }, i) => {
        const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
        return (
          <span
            key={name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(50 + 50 * Math.cos(angle)).toFixed(2)}%`,
              top: `${(50 + 50 * Math.sin(angle)).toFixed(2)}%`,
            }}
          >
            <span
              className={`orbit-upright flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface shadow-lg shadow-black/40 ${tone}`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <Glyph />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
