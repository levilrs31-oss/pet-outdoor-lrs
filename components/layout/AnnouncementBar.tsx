/* components/layout/AnnouncementBar.tsx */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  href?: string;
}

const messages: Message[] = [
  { id: 1, text: "Free shipping on orders over $75" },
  { id: 2, text: "Free returns — 30-day fit guarantee" },
  { id: 3, text: "New: Rotary Buckle Collection — Shop Now →", href: "/shop" },
];

interface AnnouncementBarProps {
  visible: boolean;
  onClose: () => void;
}

export default function AnnouncementBar({ visible, onClose }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const advance = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
      setFading(false);
    }, 150);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(advance, 4000);
    return () => clearInterval(id);
  }, [visible, advance]);

  if (!visible) return null;

  const msg = messages[index];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-brand flex items-center justify-center px-10">
      <div
        className="transition-opacity duration-150"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {msg.href ? (
          <Link
            href={msg.href}
            className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/90 hover:text-white transition-colors duration-200"
          >
            {msg.text}
          </Link>
        ) : (
          <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/90">
            {msg.text}
          </span>
        )}
      </div>
      <button
        onClick={onClose}
        aria-label="Close announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}