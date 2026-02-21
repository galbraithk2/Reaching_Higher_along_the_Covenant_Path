"use client";

import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  who: string;
  desc: string;
  color: string;
  onClose: () => void;
};

export default function DetailModal({
  isOpen,
  title,
  who,
  desc,
  color,
  onClose,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal-backdrop${isOpen ? " active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-color-bar" style={{ background: color }} />
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-body">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
          <div className="modal-who">{who}</div>
          <div
            className="modal-desc"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
      </div>
    </div>
  );
}
