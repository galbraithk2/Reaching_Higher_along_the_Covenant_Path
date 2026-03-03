"use client";

import { useState, useCallback } from "react";
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

// Right-column vertical tables
const vTables = [
  { id: 17, l: 78, t: 5 },
  { id: 18, l: 78, t: 37 },
  { id: 19, l: 78, t: 77 },
];

// 5 round tables – moved lower, left area
const rounds = [
  { l: 7, t: 25 },
  { l: 14, t: 25 },
  { l: 5, t: 38 },
  { l: 12, t: 38 },
  { l: 9, t: 51 },
];

// Flatten all booths into a list with category info
type BoothEntry = {
  id: number;
  title: string;
  who: string;
  category: CategoryKey;
};

const allBooths: BoothEntry[] = [];
let boothId = 1;
for (const cat of ["temple", "missionary", "rising", "selfreliance"] as CategoryKey[]) {
  for (const b of booths[cat]) {
    allBooths.push({
      id: boothId++,
      title: b.title.replace(/<[^>]*>/g, ""), // strip HTML tags for display
      who: b.who,
      category: cat,
    });
  }
}

const allTables = [...hTables, ...vTables];

// Category color map for inline styles
const catColorMap: Record<CategoryKey, { bg: string; border: string; text: string }> = {
  temple: { bg: "#EEF2FF", border: "#6366F1", text: "#6366F1" },
  missionary: { bg: "#ECFDF5", border: "#059669", text: "#059669" },
  rising: { bg: "#FFFBEB", border: "#F59E0B", text: "#92400E" },
  selfreliance: { bg: "#FFF1F2", border: "#E11D48", text: "#E11D48" },
};

export default function HallLayout() {
  const router = useRouter();

  // Track which table IDs are "taken" (clicked)
  const [takenTables, setTakenTables] = useState<Set<number>>(new Set());
  // Track which booth IDs are "assigned" (clicked)
  const [assignedBooths, setAssignedBooths] = useState<Set<number>>(new Set());
  // Track table→booth and booth→table mappings
  const [tableToBoothMap, setTableToBoothMap] = useState<Map<number, number>>(new Map());
  const [boothToTableMap, setBoothToTableMap] = useState<Map<number, number>>(new Map());
  // Currently selected (active) table awaiting a booth click
  const [activeTable, setActiveTable] = useState<number | null>(null);

  const handleTableClick = useCallback((tableId: number) => {
    // If this table is already taken, deselect it
    if (takenTables.has(tableId)) {
      setTakenTables((prev) => {
        const next = new Set(prev);
        next.delete(tableId);
        return next;
      });
      // Find and unassign the booth linked to this table
      const linkedBooth = tableToBoothMap.get(tableId);
      if (linkedBooth !== undefined) {
        setAssignedBooths((prev) => {
          const next = new Set(prev);
          next.delete(linkedBooth);
          return next;
        });
        setBoothToTableMap((prev) => {
          const next = new Map(prev);
          next.delete(linkedBooth);
          return next;
        });
        setTableToBoothMap((prev) => {
          const next = new Map(prev);
          next.delete(tableId);
          return next;
        });
      }
      // If this was the active selection, clear it
      if (activeTable === tableId) {
        setActiveTable(null);
      }
      return;
    }

    // Select this table as active (waiting for booth click)
    setActiveTable(tableId);
    setTakenTables((prev) => new Set(prev).add(tableId));
  }, [takenTables, tableToBoothMap, activeTable]);

  const handleBoothClick = useCallback((boothId: number) => {
    // If booth is already assigned, deselect it
    if (assignedBooths.has(boothId)) {
      const linkedTable = boothToTableMap.get(boothId);
      setAssignedBooths((prev) => {
        const next = new Set(prev);
        next.delete(boothId);
        return next;
      });
      if (linkedTable !== undefined) {
        setTakenTables((prev) => {
          const next = new Set(prev);
          next.delete(linkedTable);
          return next;
        });
        setTableToBoothMap((prev) => {
          const next = new Map(prev);
          next.delete(linkedTable);
          return next;
        });
      }
      setBoothToTableMap((prev) => {
        const next = new Map(prev);
        next.delete(boothId);
        return next;
      });
      if (activeTable === linkedTable) {
        setActiveTable(null);
      }
      return;
    }

    // If no table is actively selected, do nothing
    if (activeTable === null) return;

    // Assign this booth to the active table
    setAssignedBooths((prev) => new Set(prev).add(boothId));
    setTableToBoothMap((prev) => new Map(prev).set(activeTable, boothId));
    setBoothToTableMap((prev) => new Map(prev).set(boothId, activeTable));
    setActiveTable(null);
  }, [assignedBooths, boothToTableMap, activeTable]);

  const handleReset = useCallback(() => {
    setTakenTables(new Set());
    setAssignedBooths(new Set());
    setTableToBoothMap(new Map());
    setBoothToTableMap(new Map());
    setActiveTable(null);
  }, []);

  const assignedCount = assignedBooths.size;
  const totalBooths = allBooths.length;

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
        <p className="hall-instructions">
          {activeTable !== null
            ? `Table ${activeTable} selected — now click a booth card below to assign it`
            : "Click a table number, then click a booth card to assign it. Click again to deselect."}
        </p>
        <div className="hall-progress">
          {assignedCount} of {totalBooths} booths assigned
          {assignedCount > 0 && (
            <button onClick={handleReset} className="hall-reset-btn">
              Reset All
            </button>
          )}
        </div>
      </header>

      <div className="hall-container">
        <div className="hall-room" role="img" aria-label="Floor plan of the cultural hall showing numbered table positions">
          {/* Refreshments counter – left wall, centered beside round tables */}
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
          {hTables.map((t) => {
            const isTaken = takenTables.has(t.id);
            const isActive = activeTable === t.id;
            return (
              <div
                key={t.id}
                className={`hall-table hall-table-h${isTaken ? " hall-table--taken" : ""}${isActive ? " hall-table--active" : ""}`}
                style={{ left: `${t.l}%`, top: `${t.t}%`, cursor: "pointer" }}
                onClick={() => handleTableClick(t.id)}
                role="button"
                tabIndex={0}
                aria-label={`Table ${t.id}${isTaken ? " (taken)" : ""}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTableClick(t.id); }}
              >
                <span>{t.id}</span>
              </div>
            );
          })}

          {/* Right column vertical tables (17–19) */}
          {vTables.map((t) => {
            const isTaken = takenTables.has(t.id);
            const isActive = activeTable === t.id;
            return (
              <div
                key={t.id}
                className={`hall-table hall-table-v${isTaken ? " hall-table--taken" : ""}${isActive ? " hall-table--active" : ""}`}
                style={{ left: `${t.l}%`, top: `${t.t}%`, cursor: "pointer" }}
                onClick={() => handleTableClick(t.id)}
                role="button"
                tabIndex={0}
                aria-label={`Table ${t.id}${isTaken ? " (taken)" : ""}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTableClick(t.id); }}
              >
                <span>{t.id}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booth cards outside the hall */}
      <section className="hall-booths-section">
        <h2 className="hall-booths-title">Booths</h2>
        <div className="hall-booths-grid">
          {allBooths.map((booth) => {
            const colors = catColorMap[booth.category];
            const isAssigned = assignedBooths.has(booth.id);
            const tableNum = boothToTableMap.get(booth.id);
            return (
              <div
                key={booth.id}
                className={`hall-booth-card${isAssigned ? " hall-booth-card--assigned" : ""}${activeTable !== null && !isAssigned ? " hall-booth-card--selectable" : ""}`}
                style={{
                  borderColor: isAssigned ? "#b91c1c" : colors.border,
                  background: isAssigned ? "#fde2e2" : colors.bg,
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
                    style={{
                      background: isAssigned ? "#b91c1c" : colors.border,
                    }}
                  >
                    {catLabels[booth.category]}
                  </span>
                  {isAssigned && tableNum !== undefined && (
                    <span className="hall-booth-card-table-num">
                      Table {tableNum}
                    </span>
                  )}
                </div>
                <h3
                  className="hall-booth-card-title"
                  style={{ color: isAssigned ? "#991b1b" : colors.text }}
                >
                  {booth.title}
                </h3>
                <p className="hall-booth-card-who">{booth.who}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
