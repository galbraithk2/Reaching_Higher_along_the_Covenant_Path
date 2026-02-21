"use client";

import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FlyerModal({ isOpen, onClose }: Props) {
  const confirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const copyLink = () => {
    const url = "https://tinyurl.com/covenantpath2026";
    const showConfirm = () => {
      if (confirmRef.current) {
        confirmRef.current.classList.add("show");
        setTimeout(() => confirmRef.current?.classList.remove("show"), 2000);
      }
    };

    navigator.clipboard.writeText(url).then(showConfirm).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showConfirm();
    });
  };

  return (
    <div
      className={`flyer-backdrop${isOpen ? " active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flyer-page">
        <button className="flyer-close" onClick={onClose}>
          &times;
        </button>
        <div className="flyer-header">
          <h2 className="flyer-title">Help Spread the Word</h2>
          <p className="flyer-subtitle">
            Share this event with family, friends, and neighbors in your ward.
          </p>
        </div>
        <div className="flyer-top-row">
          <div className="flyer-card">
            <div className="flyer-card-icon">🔗</div>
            <h3 className="flyer-card-title">Share the Link</h3>
            <div className="flyer-url-display">
              tinyurl.com/covenantpath2026
            </div>
            <button className="flyer-btn" onClick={copyLink}>
              Copy Link
            </button>
            <div className="flyer-copy-confirm" ref={confirmRef}>
              ✓ Copied!
            </div>
          </div>
        </div>
        <div className="flyer-divider">
          <span>Printable Flyers</span>
        </div>
        <div className="flyer-grid">{/* Flyer thumbnails can go here */}</div>
      </div>
    </div>
  );
}
