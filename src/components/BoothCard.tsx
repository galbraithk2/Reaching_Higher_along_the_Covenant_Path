"use client";

import type { Booth, CategoryKey } from "@/data/content";

type Props = {
  booth: Booth;
  cat: CategoryKey;
  onOpen: (title: string, who: string, desc: string, color: string) => void;
  color: string;
};

export default function BoothCard({ booth, cat, onOpen, color }: Props) {
  return (
    <div
      className="booth-card"
      data-cat={cat}
      onClick={() => onOpen(booth.title, booth.who, booth.desc, color)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(booth.title, booth.who, booth.desc, color);
        }
      }}
    >
      <h3>{booth.title}</h3>
      <div className="preview">{booth.subtitle || booth.who}</div>
      <div className="learn-more">Learn more →</div>
    </div>
  );
}
