"use client";

import { useRouter } from "next/navigation";

/* ── Table positions (% of room width / height) ── */

// Horizontal tables: Row 1 at top, Rows 2–3 close together in the middle
const hTables = [
  // Row 1 (top)
  { id: 1, l: 27, t: 12 },
  { id: 2, l: 37.5, t: 12 },
  { id: 3, l: 48, t: 12 },
  { id: 4, l: 58.5, t: 12 },
  // Row 2 (upper-middle)
  { id: 5, l: 27, t: 42 },
  { id: 6, l: 37.5, t: 42 },
  { id: 7, l: 48, t: 42 },
  { id: 8, l: 58.5, t: 42 },
  // Row 3 (lower-middle, close to Row 2)
  { id: 9, l: 27, t: 58 },
  { id: 10, l: 37.5, t: 58 },
  { id: 11, l: 48, t: 58 },
  { id: 12, l: 58.5, t: 58 },
];

// Right-column vertical tables
const vTables = [
  { id: 13, l: 80, t: 9 },
  { id: 14, l: 80, t: 44 },
  { id: 15, l: 80, t: 76 },
];

// Round tables – to the RIGHT of the refreshments counter
const rounds = [
  { l: 9, t: 22 },
  { l: 16, t: 22 },
  { l: 9, t: 36 },
  { l: 16, t: 36 },
  { l: 9, t: 50 },
  { l: 16, t: 50 },
  { l: 12, t: 63 },
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

          {/* Round tables – to the right of refreshments */}
          {rounds.map((r, i) => (
            <div
              key={`r${i}`}
              className="hall-round"
              style={{ left: `${r.l}%`, top: `${r.t}%` }}
            />
          ))}

          {/* Side table – bottom left */}
          <div className="hall-side-table" />

          {/* Numbered horizontal tables (1–12) */}
          {hTables.map((t) => (
            <div
              key={t.id}
              className="hall-table hall-table-h"
              style={{ left: `${t.l}%`, top: `${t.t}%` }}
            >
              <span>{t.id}</span>
            </div>
          ))}

          {/* Numbered vertical tables (13–15) */}
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
