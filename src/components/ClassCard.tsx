"use client";

import type { ClassItem } from "@/data/content";

type Props = {
  classItem: ClassItem;
  onOpen: (title: string, who: string, desc: string, color: string) => void;
};

export default function ClassCard({ classItem, onOpen }: Props) {
  const c = classItem;

  const handleClick = () => {
    if (c.useSharedModal) {
      onOpen(c.title, c.who, c.desc, "var(--selfreliance)");
    } else {
      onOpen(
        c.title,
        `${c.who} · ${c.schedule} · ${c.location}`,
        c.desc,
        "var(--green)"
      );
    }
  };

  return (
    <div
      className="class-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <h4 dangerouslySetInnerHTML={{ __html: c.title }} />
      {c.subtitle ? (
        <div className="class-subtitle">{c.subtitle}</div>
      ) : (
        <div className="meta">
          {c.schedule} · {c.location}
        </div>
      )}
      <div className="learn-more">Learn more →</div>
    </div>
  );
}
