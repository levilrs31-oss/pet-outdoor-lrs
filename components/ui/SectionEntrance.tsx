/* components/ui/SectionEntrance.tsx */
"use client";

import { useEffect, useRef, useState } from "react";

interface SectionEntranceProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionEntrance({
  children,
  className = "",
  delay = 0,
}: SectionEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[400ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}