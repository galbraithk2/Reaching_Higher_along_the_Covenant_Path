"use client";

import { useState, useCallback } from "react";
import Hero from "@/components/Hero";
import InviteStrip from "@/components/InviteStrip";
import SectionNav from "@/components/SectionNav";
import ScrollReveal from "@/components/ScrollReveal";
import BoothCard from "@/components/BoothCard";
import ClassCard from "@/components/ClassCard";
import CTASection from "@/components/CTASection";
import FlyerModal from "@/components/FlyerModal";
import DetailModal from "@/components/DetailModal";
import Footer from "@/components/Footer";
import { booths, classes, categories, catColors } from "@/data/content";

type ModalState = {
  isOpen: boolean;
  title: string;
  who: string;
  desc: string;
  color: string;
};

export default function Home() {
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
      <Hero />
      <InviteStrip />
      <SectionNav />

      {categories.map((cat, idx) => (
        <ScrollReveal key={cat.key}>
          <section
            id={cat.key}
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
                  onOpen={openModal}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <section id="classes" className="classes-bg">
          <div className="section-wide">
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

      <CTASection onOpenFlyers={() => setFlyerOpen(true)} />

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
