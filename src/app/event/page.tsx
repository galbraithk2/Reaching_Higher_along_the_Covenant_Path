"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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
      <button
        onClick={() => router.push("/")}
        aria-label="Close and return to main page"
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 9999,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          fontSize: "22px",
          lineHeight: 1,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>

      <Hero />
      <InviteStrip />
      <SectionNav />

      {categories.map((cat, idx) => (
        <ScrollReveal key={cat.key}>
          <section
            id={cat.key}
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

      <ScrollReveal>
        <section id="classes">
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

      <CTASection
        onOpenFlyers={() => setFlyerOpen(true)}
        disableStakeNav={true}
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
