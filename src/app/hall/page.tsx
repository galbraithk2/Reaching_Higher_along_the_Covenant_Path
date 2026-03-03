"use client";

import { useRouter } from "next/navigation";

/* ── Table positions (% of room width / height) ── */

// 4 rows of horizontal tables
const hTables = [
  // Row 1 (top)
  { id: 1, l: 24, t: 8 },
  { id: 2, l: 36, t: 8 },
  { id: 3, l: 48, t: 8 },
  { id: 4, l: 60, t: 8 },
  // Row 2 (upper-middle)
  { id: 5, l: 24, t: 35 },
  { id: 6, l: 36, t: 35 },
  { id: 7, l: 48, t: 35 },
  { id: 8, l: 60, t: 35 },
  // Row 3 (lower-middle — close to Row 2)
  { id: 9, l: 24, t: 48 },
  { id: 10, l: 36, t: 48 },
  { id: 11, l: 48, t: 48 },
  { id: 12, l: 60, t: 48 },
  // Row 4 (bottom)
  { id: 13, l: 24, t: 80 },
  { id: 14, l: 36, t: 80 },
  { id: 15, l: 48, t: 80 },
  { id: 16, l: 60, t: 80 },
];

// Right-column vertical tables
const vTables = [
  { id: 17, l: 78, t: 5 },
  { id: 18, l: 78, t: 37 },
  { id: 19, l: 78, t: 77 },
];

// 5 round tables – to the right of refreshments counter
const rounds = [
  { l: 8, t: 14 },
  { l: 14, t: 14 },
  { l: 8, t: 29 },
  { l: 14, t: 29 },
  { l: 11, t: 44 },
];

export default function HallLayout() {
  const router = useRouter();

  return (
    <div className="hall-page">
      <header className="hall-header">
        <button
          onClick={() => router.push("/")}
          className="hall-back-btn"
          aria-label="Back to event page"
        >
          &#8592; Back to Event
        </button>
        <h1>Cultural Hall</h1>
        <p className="hall-subtitle">
          Saturday, March 21 &middot; Stake Center
        </p>
      </header>

      <div className="hall-container">
        <div className="hall-room" role="img" aria-label="Floor plan of the cultural hall showing numbered table positions">
          {/* Refreshments counter – left wall */}
          <div className="hall-refreshments">
            <span>Refreshments</span>
          </div>

          {/* Round tables */}
          {rounds.map((r, i) => (
            <div
              key={`r${i}`}
              className="hall-round"
              style={{ left: `${r.l}%`, top: `${r.t}%` }}
            />
          ))}

          {/* Side table – bottom left */}
          <div className="hall-side-table" />

          {/* Horizontal tables (1–16) */}
          {hTables.map((t) => (
            <div
              key={t.id}
              className="hall-table hall-table-h"
              style={{ left: `${t.l}%`, top: `${t.t}%` }}
            >
              <span>{t.id}</span>
            </div>
          ))}

          {/* Right column vertical tables (17–19) */}
          {vTables.map((t) => (
            <div
              key={t.id}
              className="hall-table hall-table-v"
              style={{ left: `${t.l}%`, top: `${t.t}%` }}
            >
              <span>{t.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
