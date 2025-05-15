"use client";
import { useEffect, useState } from "react";

type PaperProps = {
  count?: number;
  paperColor?: string;
  lineColor?: string;
  alternateColors?: boolean;
};

export default function FloatingPapers({
  count = 10,
  paperColor = "text-gray-400 dark:text-gray-200",
  lineColor = "text-gray-300 dark:text-gray-500",
  alternateColors = false,
}: PaperProps) {
  const [papers, setPapers] = useState<Array<{
    left: string;
    top: string;
    duration: string;
    delay: string;
    rotation: string;
    color: string;
    lineColor: string;
  }>>([]);

  useEffect(() => {
    const newPapers = [...Array(count)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 15}s`,
      delay: `${Math.random() * 5}s`,
      rotation: `rotate(${Math.random() * 360}deg)`,
      color: alternateColors && i % 2 === 0 
        ? "text-red-300 dark:text-red-700" 
        : paperColor,
      lineColor: lineColor,
    }));
    setPapers(newPapers);
  }, [count, paperColor, lineColor, alternateColors]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {papers.map((paper, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: paper.left,
            top: paper.top,
            animationDuration: paper.duration,
            animationDelay: paper.delay,
            opacity: 0.3,
            transform: paper.rotation,
          }}
        >
          <svg
            width="60"
            height="70"
            viewBox="0 0 60 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={paper.color}
          >
            <path
              d="M5 0H55L60 10V70H0V10L5 0Z"
              fill="currentColor"
            />
            <path
              d="M10 20H50M10 35H50M10 50H30"
              stroke="currentColor"
              strokeWidth="2"
              className={paper.lineColor}
            />
          </svg>
        </div>
      ))}

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}