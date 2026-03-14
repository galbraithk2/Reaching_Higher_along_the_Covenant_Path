import { BASE_PATH } from "@/lib/basePath";

interface HiddenRevisionProps {
  onClose: () => void;
}

export default function HiddenRevision({ onClose }: HiddenRevisionProps) {
  return (
    <>
      <button
        className="hidden-revision-close"
        onClick={onClose}
        aria-label="Close preview"
      >
        ✕
      </button>

      {/* Hero */}
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-img"
          src={`${BASE_PATH}/images/hero.jpg`}
          alt="Jesus Christ painting by Harry Anderson"
          loading="eager"
          decoding="async"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Reaching Higher: The Covenant Path</h1>
          <div className="hero-subtitle">
            &ldquo;Covenants are God&rsquo;s promise that as we reach for Him,
            <br />
            He will reach for us!&rdquo;
          </div>
        </div>
      </section>

      {/* Invite date + gold line */}
      <div className="hidden-revision-strip">
        <p className="invite-date">
          Saturday, March 21 &middot; 8:45 &ndash; 11:00 am &middot; Stake
          Center
        </p>
      </div>
    </>
  );
}
