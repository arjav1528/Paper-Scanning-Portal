"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import Starfield from "react-starfield";

export default function NotAuthorized() {
  const router = useRouter();
  const { signOut } = useClerk();
  const [isNavigating, setIsNavigating] = useState(false);
  

  const handleSignOut = async () => {
    setIsNavigating(true);
    
    setTimeout(() => {
      signOut(() => router.push("/"));
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
      

      <div className="relative z-10 container mx-auto px-4 py-12 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
          <div className="mb-6">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src="/Logo/bits_logo.png"
                alt="BITS Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Not Authorized
            </h1>
            <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Your current account doesn't have permission to access this page or resource.
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
            >
              Sign Out
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}