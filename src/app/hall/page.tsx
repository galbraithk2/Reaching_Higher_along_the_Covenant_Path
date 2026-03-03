"use client";

import { useRouter } from "next/navigation";

/* ── Table positions (% of room width / height) ── */

// 4 rows of horizontal tables
const hTables = [
  // Row 1 (top)
  { id: 1, l: 29, t: 10 },
  { id: 2, l: 39.5, t: 10 },
  { id: 3, l: 50, t: 10 },
  { id: 4, l: 60.5, t: 10 },
  // Row 2 (upper-middle)
  { id: 5, l: 29, t: 36 },
  { id: 6, l: 39.5, t: 36 },
  { id: 7, l: 50, t: 36 },
  { id: 8, l: 60.5, t: 36 },
  // Row 3 (lower-middle, close to Row 2)
  { id: 9, l: 29, t: 52 },
  { id: 10, l: 39.5, t: 52 },
  { id: 11, l: 50, t: 52 },
  { id: 12, l: 60.5, t: 52 },
  // Row 4 (bottom)
  { id: 16, l: 29, t: 82 },
  { id: 17, l: 39.5, t: 82 },
  { id: 18, l: 50, t: 82 },
  { id: 19, l: 60.5, t: 82 },
];

// Right-column vertical tables
const vTables = [
  { id: 13, l: 80, t: 7 },
  { id: 14, l: 80, t: 39 },
  { id: 15, l: 80, t: 78 },
];

// Round tables – to the right of refreshments
const rounds = [
  { l: 8, t: 18 },
  { l: 14, t: 18 },
  { l: 8, t: 33 },
  { l: 14, t: 33 },
  { l: 8, t: 48 },
  { l: 14, t: 48 },
  { l: 11, t: 62 },
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

          {/* Round tables – between refreshments and left column */}
          {rounds.map((r, i) => (
            <div
              key={`r${i}`}
              className="hall-round"
              style={{ left: `${r.l}%`, top: `${r.t}%` }}
            />
          ))}

          {/* Side table – bottom left */}
          <div className="hall-side-table" />

          {/* Numbered horizontal tables (1–12, 16–19) */}
          {hTables.map((t) => (
            <div
              key={t.id}
              className="hall-table hall-table-h"
              style={{ left: `${t.l}%`, top: `${t.t}%` }}
            >
              <span>{t.id}</span>
            </div>
          ))}

          {/* Right column vertical tables (13–15) */}
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

        {/* Entry label below the room */}
        <p className="hall-entry-label">&#8593; Entry</p>
      </div>
    </div>
  );
}
