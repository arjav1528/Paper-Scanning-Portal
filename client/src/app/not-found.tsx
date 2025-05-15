"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FloatingPapers from "@/components/FloatingPaper";

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
      <FloatingPapers 
        count={15} 
        alternateColors={true} 
      />

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