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
        <div className="flyer-drag-handle" />
        <button className="flyer-close" onClick={onClose} aria-label="Close">
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
              Copied!
            </div>
          </div>
          <div className="flyer-card">
            <div className="flyer-card-icon">📱</div>
            <h3 className="flyer-card-title">QR Code</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/CovenantPath_QRCode.png"
              alt="QR Code for Covenant Path event"
              className="flyer-qr-img"
            />
            <a
              href="/images/CovenantPath_QRCode.png"
              download="CovenantPath_QRCode.png"
              className="flyer-btn"
            >
              Download QR Code
            </a>
          </div>
        </div>
        <div className="flyer-divider">
          <span>Printable Flyers</span>
        </div>
        <div className="flyer-grid">
          <div className="flyer-thumb-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ReachingHigher_Flyer1.png"
              alt="Reaching Higher flyer"
              className="flyer-thumb-img"
            />
            <a
              href="/images/ReachingHigher_Flyer1.png"
              download="ReachingHigher_Flyer1.png"
              className="flyer-btn flyer-btn-outline"
            >
              Download Flyer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
