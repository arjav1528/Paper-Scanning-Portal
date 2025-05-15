"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigateHome = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsNavigating(true);
    
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950 flex items-center justify-center transition-opacity duration-500 ease-in-out ${isNavigating ? "opacity-0" : "opacity-100"}`}>
      {/* Floating paper animations in background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <svg
              width="60"
              height="70"
              viewBox="0 0 60 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={i % 2 === 0 ? "text-red-300 dark:text-red-700" : "text-gray-400 dark:text-gray-200"}
            >
              <path
                d="M5 0H55L60 10V70H0V10L5 0Z"
                fill="currentColor"
              />
              <path
                d="M10 20H50M10 35H50M10 50H30"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white dark:text-gray-500"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 text-center">
        <div className="mb-8 relative">
          <div className="text-[180px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none">
            404
          </div>
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full"></div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Page Not Found
        </h1>
        
        <div className="max-w-xl mx-auto relative">
          <div className="mb-10">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Oops! Looks like this page got lost in our filing system.
            </p>
            
            <div className="relative w-48 h-48 mx-auto mb-10">
              <div className="absolute inset-4 rounded-full overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                <Image
                  src="/Logo/bits_logo.png"
                  alt="BITS Logo"
                  width={100}
                  height={100}
                  className="opacity-50"
                />
                {/* <div className="absolute w-full h-2 bg-red-500/50 animate-scan"></div> */}
              </div>
            </div>
            
            <button 
              onClick={handleNavigateHome}
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full transition-all shadow-lg inline-block
                ${isNavigating 
                  ? "scale-105 opacity-70 animate-pulse" 
                  : "hover:opacity-90 hover:scale-105"}`}
            >
              {isNavigating ? "Navigating..." : "Return to Home"}
            </button>
          </div>
        </div>
      </div>

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
        @keyframes scan {
          0% {
            top: 0;
          }
          50% {
            top: 100%;
          }
          50.1% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}