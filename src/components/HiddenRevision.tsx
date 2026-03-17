"use client";

import { BASE_PATH } from "@/lib/basePath";
import BoothCard from "@/components/BoothCard";
import ClassCard from "@/components/ClassCard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { booths, classes, categories, catColors } from "@/data/content";

const miniClasses = [
  { title: "President Edwin Wells", detail: "Every 20 min", room: "Chapel" },
  { title: "President Kristin Galbraith · Teaching within the Home", detail: "Every 20 min", room: "High Council Room" },
  { title: "A Safety and Technology Plan Discussion", detail: "Hourly", room: "Relief Society Room" },
  { title: "Use AI to Bring Your Ancestors to Life", detail: "Every 20 minutes", room: "Young Women's Room" },
  { title: "Did I Remember Everything? Organizing Vital Documents", detail: "Every 20 min", room: "Room 9" },
  { title: "Family History Q&A", detail: "Open all morning", room: "Rooms 6 & 7" },
  { title: "The Teton Dam Disaster", detail: "Every 20 minutes", room: "Priesthood Room" },
  { title: "Job Search, Résumé Tips & Networking Strategies", detail: "Open all morning", room: "Rooms 9" },
];

interface HiddenRevisionProps {
  onClose: () => void;
  onOpen: (title: string, who: string, desc: string, color: string) => void;
  onOpenFlyers: () => void;
}

export default function HiddenRevision({ onClose, onOpen, onOpenFlyers }: HiddenRevisionProps) {
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

      {/* Mini-Classes as text */}
      <section className="hr-mini-classes">
        <div className="hr-mini-classes-inner">
          <h2 className="hr-mini-classes-heading">Mini-Classes</h2>
          <ul className="hr-mini-classes-list">
            {miniClasses.map((c, i) => (
              <li key={i}>
                <span className="hr-checkbox">&#9633;</span>
                <span>{c.title} ({c.detail} &middot; <span className="hr-room">{c.room}</span>)</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Map image — cropped to show only the floor plan */}
      <div className="hr-map-wrap">
        <div className="hr-map-inner">
          <div className="hr-map-crop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/images/MapAndClasses.png`}
              alt="Booth and mini-class location map"
              className="hr-map-img"
            />
          </div>
        </div>
      </div>

      {/* ── Replicated landing page content below the map ── */}

      {categories.map((cat, idx) => (
        <ScrollReveal key={cat.key}>
          <section
            id={`hr-${cat.key}`}
            className={`section-wide${idx % 2 !== 0 ? " section-alt" : ""}`}
          >
            <div className="category-header">
              <h2>{cat.emoji} {cat.label}</h2>
              <p>{cat.quote}</p>
            </div>
            <div className="booth-grid">
              {booths[cat.key].map((booth, i) => (
                <BoothCard
                  key={i}
                  booth={booth}
                  cat={cat.key}
                  color={catColors[cat.key]}
                  onOpen={onOpen}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <section id="hr-classes" className="classes-bg">
          <div className="section-wide">
            <div className="category-header">
              <h2>📚 Mini Classes</h2>
              <p>Short workshops on topics that matter</p>
            </div>
            <div className="class-grid">
              {classes.map((classItem, i) => (
                <ClassCard key={i} classItem={classItem} onOpen={onOpen} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <CTASection onOpenFlyers={onOpenFlyers} />

      <Footer />
    </>
  );
}
