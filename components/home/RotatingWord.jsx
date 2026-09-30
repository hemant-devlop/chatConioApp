"use client";

import { useEffect, useState } from "react";

export default function RotatingWord({ words, interval = 2200, className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Reserve space for the longest word so rotating text never shifts the layout
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    <span className="relative inline-grid align-bottom">
      <span key={index} className={`col-start-1 row-start-1 animate-bubble-in ${className}`}>
        {words[index]}
      </span>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
    </span>
  );
}