"use client";

import { useRouter } from "next/navigation";

/* ── Table positions (% of room width / height) ── */

// Horizontal tables: 3 rows × 4 columns
const hTables = [
  // Row 1 (top)
  { id: 1, l: 24, t: 13 },
  { id: 2, l: 35.5, t: 13 },
  { id: 3, l: 47, t: 13 },
  { id: 4, l: 58.5, t: 13 },
  // Row 2 (middle)
  { id: 5, l: 24, t: 44 },
  { id: 6, l: 35.5, t: 44 },
  { id: 7, l: 47, t: 44 },
  { id: 8, l: 58.5, t: 44 },
  // Row 3 (bottom)
  { id: 9, l: 24, t: 74 },
  { id: 10, l: 35.5, t: 74 },
  { id: 11, l: 47, t: 74 },
  { id: 12, l: 58.5, t: 74 },
];

// Right-column vertical tables
const vTables = [
  { id: 13, l: 78, t: 10 },
  { id: 14, l: 78, t: 41 },
  { id: 15, l: 78, t: 71 },
];

// Round (snack / seating) tables – left area
const rounds = [
  { l: 4, t: 39 },
  { l: 12, t: 39 },
  { l: 4, t: 50 },
  { l: 12, t: 50 },
  { l: 4, t: 61 },
  { l: 12, t: 61 },
  { l: 8, t: 72 },
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
        <h1>Hall Layout</h1>
        <p className="hall-subtitle">
          Saturday, March 21 &middot; Stake Center
        </p>
      </header>

      <div className="hall-container">
        <div className="hall-room" role="img" aria-label="Floor plan of the stake center hall showing numbered table positions">
          {/* Refreshments counter – top left */}
          <div className="hall-refreshments">
            <span>Refreshments</span>
          </div>

          {/* Round tables – left area */}
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
