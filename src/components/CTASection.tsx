"use client";

import { useRef, useCallback } from "react";
import { BASE_PATH } from "@/lib/basePath";

type Props = {
  onOpenFlyers: () => void;
  onSecretTrigger?: () => void;
  disableStakeNav?: boolean;
};

export default function CTASection({ onOpenFlyers, onSecretTrigger, disableStakeNav }: Props) {
  const makeTapHandler = useCallback((action: () => void) => {
    let count = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    return () => {
      count += 1;
      if (count >= 2) {
        count = 0;
        if (timer) clearTimeout(timer);
        action();
        return;
      }
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => { count = 0; }, 600);
    };
  }, []);

  const handleStake = useCallback(
    makeTapHandler(() => { window.location.href = `${BASE_PATH}/hall`; }),
    [makeTapHandler]
  );

  const handlePlease = useCallback(
    makeTapHandler(() => { onSecretTrigger?.(); }),
    [makeTapHandler, onSecretTrigger]
  );

  return (
    <section className="cta-section">
      <div className="cta-inner">
        <p className="cta-date">
          Saturday, March 21 &middot; 8:45 &ndash; 11:00 am &middot;{" "}
          {disableStakeNav ? (
            <span>Stake</span>
          ) : (
            <span
              onClick={handleStake}
              role="text"
              style={{
                cursor: "default",
                WebkitUserSelect: "none",
                userSelect: "none",
                touchAction: "manipulation",
              }}
            >
              Stake
            </span>
          )}{" "}
          Center
        </p>
        <p className="cta-message">
          Whether you&rsquo;re chasing toddlers, starting a career, raising
          teenagers, enjoying retirement, or somewhere in between —{" "}
          <span
            onClick={handlePlease}
            style={{ cursor: "default", userSelect: "none", touchAction: "manipulation" }}
          >
            please
          </span>{" "}
          join us!
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
