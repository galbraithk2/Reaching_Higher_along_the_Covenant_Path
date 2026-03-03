"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { booths, catLabels, type CategoryKey } from "@/data/content";

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

// Right-column vertical tables (closer together)
const vTables = [
  { id: 17, l: 81, t: 5 },
  { id: 18, l: 81, t: 35 },
  { id: 19, l: 81, t: 65 },
];

// 5 round tables – moved lower, left area (shifted right to clear Refreshment banner)
const rounds = [
  { l: 9, t: 25 },
  { l: 16, t: 25 },
  { l: 7, t: 38 },
  { l: 14, t: 38 },
  { l: 11, t: 51 },
];

// Flatten all booths into a list with category info
type BoothEntry = {
  id: number;
  title: string;
  who: string;
  category: CategoryKey;
};

const allBooths: BoothEntry[] = [];
let _boothId = 1;
for (const cat of ["temple", "missionary", "rising", "selfreliance"] as CategoryKey[]) {
  for (const b of booths[cat]) {
    allBooths.push({
      id: _boothId++,
      title: b.title.replace(/<[^>]*>/g, ""), // strip HTML tags for display
      who: b.who,
      category: cat,
    });
  }
}

// Booth lookup by ID
const boothById = new Map(allBooths.map((b) => [b.id, b]));

// Category color map — unassigned, assigned (card), and table variants
const catColorMap: Record<CategoryKey, {
  bg: string; border: string; text: string;
  assignedBg: string; assignedBorder: string; assignedText: string;
  tableBg: string; tableBorder: string; tableText: string;
  badgeBg: string; tableNumBg: string; tableNumText: string;
}> = {
  temple: {
    bg: "#EEF2FF", border: "#6366F1", text: "#6366F1",
    assignedBg: "#C7D2FE", assignedBorder: "#4338CA", assignedText: "#312E81",
    tableBg: "#DDD6FE", tableBorder: "#6366F1", tableText: "#3730A3",
    badgeBg: "#4338CA",
    tableNumBg: "#E0E7FF", tableNumText: "#3730A3",
  },
  missionary: {
    bg: "#ECFDF5", border: "#059669", text: "#059669",
    assignedBg: "#A7F3D0", assignedBorder: "#047857", assignedText: "#064E3B",
    tableBg: "#D1FAE5", tableBorder: "#059669", tableText: "#065F46",
    badgeBg: "#047857",
    tableNumBg: "#ECFDF5", tableNumText: "#065F46",
  },
  rising: {
    bg: "#FFFBEB", border: "#F59E0B", text: "#92400E",
    assignedBg: "#FDE68A", assignedBorder: "#B45309", assignedText: "#78350F",
    tableBg: "#FEF3C7", tableBorder: "#D97706", tableText: "#92400E",
    badgeBg: "#B45309",
    tableNumBg: "#FEF3C7", tableNumText: "#92400E",
  },
  selfreliance: {
    bg: "#FFF1F2", border: "#E11D48", text: "#E11D48",
    assignedBg: "#FECDD3", assignedBorder: "#BE123C", assignedText: "#881337",
    tableBg: "#FFE4E6", tableBorder: "#E11D48", tableText: "#9F1239",
    badgeBg: "#BE123C",
    tableNumBg: "#FFE4E6", tableNumText: "#9F1239",
  },
};

// Power outlet positions (% of room width/height) — placed along walls
const powerOutlets = [
  { l: 22, t: 1.5, label: "Near Table 1" },          // top wall, above & left of table 1
  { l: 67, t: 1.5, label: "Near Table 4" },           // top wall, above & right of table 4
  { l: 93, t: 1.5, label: "Near Table 17" },          // top wall, halfway between T17 and right wall
  { l: 22, t: 95, label: "Near Table 13" },           // bottom wall, directly below T1 plug, just left of T13
  { l: 46.5, t: 95, label: "Between Tables 14–15" }, // bottom wall, centered in gap between T14 & T15
  { l: 93, t: 95, label: "Near Table 19" },           // bottom wall, aligned below T17 plug
];

// localStorage key for persistent assignments
const STORAGE_KEY = "hall-assignments";

export default function HallLayout() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Source of truth: table → booth mapping (persisted to localStorage)
  const [tableToBoothMap, setTableToBoothMap] = useState<Map<number, number>>(new Map());
  // Currently selected table awaiting a booth click
  const [activeTable, setActiveTable] = useState<number | null>(null);

  // Password modal state
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwValue, setPwValue] = useState("");

  // Derived: booth → table reverse lookup
  const boothToTableMap = useMemo(
    () => new Map(Array.from(tableToBoothMap.entries()).map(([t, b]) => [b, t])),
    [tableToBoothMap],
  );

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const entries: [number, number][] = JSON.parse(saved);
        setTableToBoothMap(new Map(entries));
      }
    } catch { /* ignore corrupt data */ }
    setIsLoaded(true);
  }, []);

  // Persist whenever assignments change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(tableToBoothMap.entries())),
      );
    }
  }, [tableToBoothMap, isLoaded]);

  /* ── Handlers ── */

  const handleTableClick = useCallback((tableId: number) => {
    // Already assigned → un-assign
    if (tableToBoothMap.has(tableId)) {
      setTableToBoothMap((prev) => {
        const next = new Map(prev);
        next.delete(tableId);
        return next;
      });
      if (activeTable === tableId) setActiveTable(null);
      return;
    }
    // Already active → deselect
    if (activeTable === tableId) {
      setActiveTable(null);
      return;
    }
    // Select this table
    setActiveTable(tableId);
  }, [tableToBoothMap, activeTable]);

  const handleBoothClick = useCallback((bid: number) => {
    // Already assigned → un-assign
    const linkedTable = boothToTableMap.get(bid);
    if (linkedTable !== undefined) {
      setTableToBoothMap((prev) => {
        const next = new Map(prev);
        next.delete(linkedTable);
        return next;
      });
      if (activeTable === linkedTable) setActiveTable(null);
      return;
    }
    // No table selected → ignore
    if (activeTable === null) return;
    // Assign booth to the active table
    setTableToBoothMap((prev) => new Map(prev).set(activeTable, bid));
    setActiveTable(null);
  }, [boothToTableMap, activeTable]);

  // Secret reset: double-click the word "Stake"
  const handleStakeDoubleClick = useCallback(() => {
    setPwValue("");
    setShowPwModal(true);
  }, []);

  const handlePwSubmit = useCallback(() => {
    if (pwValue === "fun") {
      setTableToBoothMap(new Map());
      setActiveTable(null);
      localStorage.removeItem(STORAGE_KEY);
    }
    setShowPwModal(false);
    setPwValue("");
  }, [pwValue]);

  /* ── Helpers ── */

  const getCategoryForTable = (tableId: number): CategoryKey | null => {
    const bid = tableToBoothMap.get(tableId);
    if (bid === undefined) return null;
    return boothById.get(bid)?.category ?? null;
  };

  const getTableStyle = (tableId: number, l: number, t: number): React.CSSProperties => {
    const isAssigned = tableToBoothMap.has(tableId);
    const isActive = activeTable === tableId && !isAssigned;
    const cat = getCategoryForTable(tableId);
    const colors = cat ? catColorMap[cat] : null;

    const style: React.CSSProperties = { left: `${l}%`, top: `${t}%`, cursor: "pointer" };

    if (isAssigned && colors) {
      style.background = colors.tableBg;
      style.borderColor = colors.tableBorder;
    } else if (isActive) {
      style.background = "#e0f2fe";
      style.borderColor = "#0284c7";
    }

    return style;
  };

  const assignedCount = tableToBoothMap.size;
  const totalBooths = allBooths.length;

  /* ── Render ── */

  // Render a table element (shared between hTables and vTables)
  const renderTable = (t: { id: number; l: number; t: number }, orientation: "h" | "v") => {
    const isAssigned = tableToBoothMap.has(t.id);
    const isActive = activeTable === t.id && !isAssigned;
    const cat = getCategoryForTable(t.id);

    return (
      <div
        key={t.id}
        className={`hall-table hall-table-${orientation}${isAssigned ? " hall-table--assigned" : ""}${isActive ? " hall-table--active" : ""}`}
        style={getTableStyle(t.id, t.l, t.t)}
        onClick={() => handleTableClick(t.id)}
        role="button"
        tabIndex={0}
        aria-label={`Table ${t.id}${isAssigned ? " (assigned)" : ""}`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTableClick(t.id); }}
      >
        <span style={isAssigned && cat ? { color: catColorMap[cat].tableText } : undefined}>
          {t.id}
        </span>
      </div>
    );
  };

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
          Saturday, March 21 &middot;{" "}
          <span onDoubleClick={handleStakeDoubleClick} style={{ cursor: "text" }}>
            Stake
          </span>{" "}
          Center
        </p>
        <p className="hall-instructions">
          {activeTable !== null
            ? `Table ${activeTable} selected — now click a booth card below to assign it`
            : "Click a table number, then click a booth card to assign it. Click again to deselect."}
        </p>
        <div className="hall-progress">
          {assignedCount} of {totalBooths} booths assigned
        </div>
      </header>

      <div className="hall-container">
        <div className="hall-room" role="img" aria-label="Floor plan of the cultural hall showing numbered table positions">
          {/* Refreshments counter */}
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

          {/* Side table */}
          <div className="hall-side-table" />

          {/* Horizontal tables (1–16) */}
          {hTables.map((t) => renderTable(t, "h"))}

          {/* Right column vertical tables (17–19) */}
          {vTables.map((t) => renderTable(t, "v"))}

          {/* Power outlet indicators */}
          {powerOutlets.map((p, i) => (
            <div
              key={`pwr${i}`}
              className="hall-power-outlet"
              style={{ left: `${p.l}%`, top: `${p.t}%` }}
              title={p.label}
              aria-label={`Power outlet: ${p.label}`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="100%" height="100%">
                <path d="M7 2v4H5v3a5 5 0 004 4.9V17H7v2h6v-2h-2v-3.1A5 5 0 0015 9V6h-2V2h-2v4h-2V2H7z" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Password modal */}
      {showPwModal && (
        <div className="hall-pw-backdrop" onClick={() => { setShowPwModal(false); setPwValue(""); }}>
          <div className="hall-pw-modal" onClick={(e) => e.stopPropagation()}>
            <p className="hall-pw-label">Enter password:</p>
            <input
              type="password"
              className="hall-pw-input"
              value={pwValue}
              onChange={(e) => setPwValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handlePwSubmit(); if (e.key === "Escape") { setShowPwModal(false); setPwValue(""); } }}
              autoFocus
              autoComplete="off"
            />
            <div className="hall-pw-actions">
              <button className="hall-pw-btn hall-pw-cancel" onClick={() => { setShowPwModal(false); setPwValue(""); }}>Cancel</button>
              <button className="hall-pw-btn hall-pw-ok" onClick={handlePwSubmit}>OK</button>
            </div>
          </div>
        </div>
      )}

      {/* Booth cards */}
      <section className="hall-booths-section">
        <h2 className="hall-booths-title">Booths</h2>
        <div className="hall-booths-grid">
          {allBooths.map((booth) => {
            const colors = catColorMap[booth.category];
            const isAssigned = boothToTableMap.has(booth.id);
            const tableNum = boothToTableMap.get(booth.id);
            return (
              <div
                key={booth.id}
                className={`hall-booth-card${isAssigned ? " hall-booth-card--assigned" : ""}${activeTable !== null && !isAssigned ? " hall-booth-card--selectable" : ""}`}
                style={{
                  borderColor: isAssigned ? colors.assignedBorder : colors.border,
                  background: isAssigned ? colors.assignedBg : colors.bg,
                }}
                onClick={() => handleBoothClick(booth.id)}
                role="button"
                tabIndex={0}
                aria-label={`${booth.title}${isAssigned ? `, assigned to table ${tableNum}` : ""}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleBoothClick(booth.id); }}
              >
                <div className="hall-booth-card-top">
                  <span
                    className="hall-booth-card-cat"
                    style={{ background: isAssigned ? colors.badgeBg : colors.border }}
                  >
                    {catLabels[booth.category]}
                  </span>
                  {isAssigned && tableNum !== undefined && (
                    <span
                      className="hall-booth-card-table-num"
                      style={{ background: colors.tableNumBg, color: colors.tableNumText }}
                    >
                      Table {tableNum}
                    </span>
                  )}
                </div>
                <h3
                  className="hall-booth-card-title"
                  style={{ color: isAssigned ? colors.assignedText : colors.text }}
                >
                  {booth.title}
                </h3>
                <p
                  className="hall-booth-card-who"
                  style={isAssigned ? { color: colors.assignedText } : undefined}
                >
                  {booth.who}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
