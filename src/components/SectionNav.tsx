"use client";

import { useState, useEffect, useCallback } from "react";

const navItems = [
  { id: "temple", label: "Temple & Family History", short: "Temple" },
  { id: "missionary", label: "Missionary Work", short: "Missionary" },
  { id: "rising", label: "Rising Generation", short: "Rising Gen" },
  { id: "selfreliance", label: "Self-Reliance", short: "Self-Reliance" },
  { id: "classes", label: "Mini Classes", short: "Classes" },
];

export default function SectionNav() {
  const [active, setActive] = useState("");
  const [stuck, setStuck] = useState(false);

  const handleScroll = useCallback(() => {
    const nav = document.getElementById("section-nav");
    if (!nav) return;

    // Check if nav is stuck (scrolled past its natural position)
    const navRect = nav.getBoundingClientRect();
    setStuck(navRect.top <= 0);

    // Determine which section is in view
    const offset = nav.offsetHeight + 16;
    let current = "";
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset + 80) {
          current = item.id;
        }
      }
    }
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById("section-nav");
    const navHeight = nav ? nav.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      id="section-nav"
      className={`section-nav${stuck ? " section-nav--stuck" : ""}`}
      aria-label="Jump to section"
    >
      <div className="section-nav-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`section-nav-btn${active === item.id ? " section-nav-btn--active" : ""}`}
            onClick={() => scrollTo(item.id)}
            type="button"
          >
            <span className="section-nav-full">{item.label}</span>
            <span className="section-nav-short">{item.short}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
