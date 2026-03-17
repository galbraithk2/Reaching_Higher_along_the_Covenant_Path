"use client";

import { useState, useEffect, useCallback } from "react";

const navItems = [
  { id: "temple", label: "Temple & Family History", short: "Temple" },
  { id: "missionary", label: "Missionary Work", short: "Missionary" },
  { id: "rising", label: "Rising Generation", short: "Rising Gen" },
  { id: "selfreliance", label: "Self-Reliance", short: "Self-Reliance" },
  { id: "classes", label: "Mini Classes", short: "Classes" },
];

interface SectionNavProps {
  idPrefix?: string;
  /** ID of the scrollable container (when nav lives outside it as a fixed overlay) */
  scrollContainerId?: string;
  /** Override the nav element's id (avoids duplicate ids when two navs are in DOM) */
  navId?: string;
}

export default function SectionNav({
  idPrefix = "",
  scrollContainerId,
  navId = "section-nav",
}: SectionNavProps) {
  const [active, setActive] = useState("");
  const [stuck, setStuck] = useState(false);

  const getContainer = useCallback((): HTMLElement | null => {
    if (scrollContainerId) return document.getElementById(scrollContainerId);
    return null;
  }, [scrollContainerId]);

  const handleScroll = useCallback(() => {
    const nav = document.getElementById(navId);
    if (!nav) return;

    const container = getContainer();
    if (container) {
      setStuck(container.scrollTop > 0);
    } else {
      setStuck(nav.getBoundingClientRect().top <= 0);
    }

    const offset = nav.offsetHeight + 16;
    let current = "";
    for (const item of navItems) {
      const el = document.getElementById(idPrefix + item.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset + 80) current = item.id;
      }
    }
    setActive(current);
  }, [idPrefix, navId, getContainer]);

  useEffect(() => {
    const container = getContainer();
    const target: EventTarget = container ?? window;
    target.addEventListener("scroll", handleScroll, { passive: true } as AddEventListenerOptions);
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [handleScroll, getContainer]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(idPrefix + id);
    if (!el) return;
    const nav = document.getElementById(navId);
    const navHeight = nav ? nav.offsetHeight : 0;
    const container = getContainer();
    if (container) {
      const y = el.getBoundingClientRect().top + container.scrollTop - navHeight - 8;
      container.scrollTo({ top: y, behavior: "smooth" });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      id={navId}
      className={`section-nav${stuck ? " section-nav--stuck" : ""}`}
      aria-label="Jump to section"
    >
      <div className="section-nav-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`section-nav-btn${active === item.id ? " section-nav-btn--active" : ""}`}
            data-cat={item.id}
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
