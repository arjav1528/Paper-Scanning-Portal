"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Starfield from "react-starfield";

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
      {/* Background Starfield */}
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />

      <div className="absolute z-10 container mx-auto px-4 py-12 text-center">
        <div className="mb-8 relative">
          <div className="text-[180px] font-extrabold font-space-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none">
            404
          </div>
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full"></div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold font-outfit mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          Page Not Found
        </h1>
        
        <div className="max-w-xl mx-auto relative">
          <div className="mb-10">
            <p className="text-xl font-inter text-gray-600 dark:text-gray-300 mb-8">
              Oops! Looks like this page got lost in our filing system.
            </p>

            <button
              onClick={handleNavigateHome}
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold font-outfit rounded-full transition-all shadow-lg inline-block
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
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Space+Mono:wght@400;700&family=Inter:wght@400;500&display=swap');
        
        :root {
          --font-outfit: 'Outfit', sans-serif;
          --font-space-mono: 'Space Mono', monospace;
          --font-inter: 'Inter', sans-serif;
        }
        
        body {
          font-family: var(--font-inter);
        }
        
        .font-outfit {
          font-family: var(--font-outfit);
        }
        
        .font-space-mono {
          font-family: var(--font-space-mono);
        }
        
        .font-inter {
          font-family: var(--font-inter);
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