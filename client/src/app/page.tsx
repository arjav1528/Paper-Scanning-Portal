"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950">
      {/* Floating paper animations in background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
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
            >
              <path
                d="M5 0H55L60 10V70H0V10L5 0Z"
                fill="currentColor"
                className="text-gray-400 dark:text-gray-200"
              />
              <path
                d="M10 20H50M10 35H50M10 50H30"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300 dark:text-gray-500"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <header className="flex flex-col items-center mb-16">
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute inset-0 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
              <Image
                src="/Logo/bits_logo.png"
                alt="BITS Logo"
                width={64}
                height={64}
                priority
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ExamEase Portal
          </h1>
          <p className="mt-6 text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl">
            Streamline the assessment process with our comprehensive exam management system. 
            Upload, grade, and view results - all in one integrated platform.
          </p>
        </header>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: "📝",
              title: "For Professors",
              description: "Upload student answer sheets securely and manage course assessments effortlessly."
            },
            {
              icon: "✓",
              title: "For Assistants",
              description: "Access, grade and provide feedback on student submissions in one organized interface."
            },
            {
              icon: "📊",
              title: "For Students",
              description: "View your grades and feedback for mid-term and final exams across all courses."
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 text-lg max-w-lg">
                Streamline your exam workflow and enhance your assessment experience with our digital solution.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg">
                Sign in with your BITSMail
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>


        {/* Testimonial */}
        
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
            top: 100%;
          }
          100% {
            top: 0;
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}