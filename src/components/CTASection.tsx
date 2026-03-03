"use client";

import { useRef, useCallback } from "react";
import { BASE_PATH } from "@/lib/basePath";

type Props = {
  onOpenFlyers: () => void;
};

export default function CTASection({ onOpenFlyers }: Props) {
  const tapRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = useCallback(() => {
    tapRef.current += 1;
    if (tapRef.current >= 2) {
      tapRef.current = 0;
      if (timerRef.current) clearTimeout(timerRef.current);
      window.location.href = `${BASE_PATH}/hall`;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      tapRef.current = 0;
    }, 600);
  }, []);

  return (
    <section className="cta-section">
      <div className="cta-inner">
        <p className="cta-date">
          Saturday, March 21 &middot; 8:45 &ndash; 11:00 am &middot;{" "}
          <span
            onClick={handleTap}
            role="text"
            style={{
              cursor: "default",
              WebkitUserSelect: "none",
              userSelect: "none",
              touchAction: "manipulation",
            }}
          >
            Stake
          </span>{" "}
          Center
        </p>
        <p className="cta-message">
          Whether you&rsquo;re chasing toddlers, starting a career, raising
          teenagers, enjoying retirement, or somewhere in between — please join
          us!
        </p>
        <button className="cta-btn" onClick={onOpenFlyers}>
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Download Flyers &amp; Links
        </button>
      </div>
    </section>
  );
}
