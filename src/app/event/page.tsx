"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/basePath";
import BoothCard from "@/components/BoothCard";
import ClassCard from "@/components/ClassCard";
import CTASection from "@/components/CTASection";
import DetailModal from "@/components/DetailModal";
import FlyerModal from "@/components/FlyerModal";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SectionNav from "@/components/SectionNav";
import { booths, classes, categories, catColors } from "@/data/content";

type ModalState = {
  isOpen: boolean;
  title: string;
  who: string;
  desc: string;
  color: string;
};

export default function Home() {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: "",
    who: "",
    desc: "",
    color: "",
  });
  const [flyerOpen, setFlyerOpen] = useState(false);

  const openModal = useCallback(
    (title: string, who: string, desc: string, color: string) => {
      setModal({ isOpen: true, title, who, desc, color });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <>
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
        <p className="hr-highlights">
          8 Mini-Classes &middot; 19 Booths &middot; Children&rsquo;s Activities &middot; All ages &middot; All stages &middot; Everyone invited
        </p>
      </div>

      <SectionNav idPrefix="hr-" scrollContainerId="hr-scroll" navId="hr-section-nav" />

      {/* Conference Day Map */}
      <section id="hr-map" className="section-wide section-alt">
        <div className="category-header">
          <h2>🧭 Conference Day Map</h2>
        </div>
        <div className="conf-map-scroll-wrap">
          <div className="conf-map-crop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/images/MapAndClasses.png`}
              alt="Booth and mini-class location map"
              className="conf-map-img"
            />
          </div>
        </div>
      </section>

      {/* Mini Classes — shown right after the map */}
      <ScrollReveal>
        <section id="hr-classes">
          <div className="section-wide classes-bg">
            <div className="category-header">
              <h2>📚 Mini Classes</h2>
              <p>Short workshops on topics that matter</p>
            </div>
            <div className="class-grid">
              {classes.map((classItem, i) => (
                <ClassCard key={i} classItem={classItem} onOpen={openModal} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Booth sections — Self-Reliance is last */}
      {categories.map((cat, idx) => (
        <ScrollReveal key={cat.key}>
          <section
            id={`hr-${cat.key}`}
            className={`section-wide${idx % 2 === 0 ? " section-alt" : ""}`}
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
                  onOpen={openModal}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      ))}

      <CTASection
        onOpenFlyers={() => setFlyerOpen(true)}
        onSecretTrigger={() => router.push("/")}
      />

      <Footer />

      <FlyerModal isOpen={flyerOpen} onClose={() => setFlyerOpen(false)} />
      <DetailModal
        isOpen={modal.isOpen}
        title={modal.title}
        who={modal.who}
        desc={modal.desc}
        color={modal.color}
        onClose={closeModal}
      />
    </>
  );
}
