export default function Hero() {
  return (
    <section className="hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-img"
        src="/images/hero.jpg"
        alt="Jesus Christ painting by Harry Anderson"
        loading="eager"
        decoding="async"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Reaching Higher: The Covenant Path</h1>
        <div className="hero-subtitle">
          &ldquo;Covenants are God&rsquo;s promise that as we reach for Him, He
          will reach for us!&rdquo;
        </div>
      </div>
    </section>
  );
}
