import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeProvider";
import HomeSlider from "./HomeSlider";

export default function Home() {
  const { theme } = useTheme();
  const [show, setshow] = useState(true);

  const features = [
    {
      title: "Interactive Visualizations",
      desc: "Control algorithm execution with play/pause/step buttons",
      icon: "👁️",
      btnColor: "blue",
      action: "Try Bubble Sort",
      link: "/Visualization"
    },
    {
      title: "Dry Run Your Code",
      desc: "Write and visualize your own implementations",
      icon: "💻",
      btnColor: "green",
      action: "Try here",
      link: "/dryrun"
    },
    {
      title: "Smart Compiler",
      desc: "Write, run, and debug your code seamlessly",
      icon: "⚡",
      btnColor: "purple",
      action: "Open Compiler",
      link: "/code_run"
    },
    {
      title: "Learn Concepts",
      desc: "Learn every topic in detail with examples",
      icon: "📚",
      btnColor: "orange",
      action: "Learn Topics",
      link: "/Learn"
    },
    {
      title: "Progress Tracking",
      desc: "Detailed analytics and personalized recommendations",
      icon: "📊",
      btnColor: "indigo",
      action: "View Dashboard",
      link: "/dashboard"
    },
    {
      title: "DSA Problems",
      desc: "Practice the probles and boost your confidence",
      icon: "🧩",
      btnColor: "teal",
      action: "Solve Problems",
      link: "/problem-list"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="pt-20 mt-4  px-4 sm:px-6">
        <div className="max-w-8xl">
          <div className={`relative p-6 md:p-8 lg:p-12 rounded-2xl mb-8 border overflow-hidden ${
            theme === "light" 
              ? "bg-gradient-to-br from-gray-50 to-white border-gray-200" 
              : "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700"
          }`}>
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden z-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full filter blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 dark:bg-indigo-900 rounded-full filter blur-3xl opacity-20"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                <div>
                  <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                    theme === "dark" 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700"
                  }`}>
                    Welcome to CodePulse
                  </h1>
                  <p className={`text-xl sm:text-2xl font-semibold mt-4 ${
                    theme === "dark" ? "text-teal-200" : "text-sky-600"
                  }`}>
                    Feel the heartbeat of Visualize DSA
                  </p>
                </div>

                <p className={`text-lg leading-relaxed ${
                  theme === "light" ? "text-gray-700" : "text-gray-200"
                }`}>
                  <span className={`font-semibold ${
                    theme === "light" ? "text-blue-600" : "text-sky-300"
                  }`}>
                    CodePulse
                  </span>{" "}
                  makes DSA easy with interactive visualizations of{" "}
                  <span className={`font-semibold ${
                    theme === "light" ? "text-green-600" : "text-green-300"
                  }`}>
                    Searching, Sorting, and Tree Structures
                  </span>
                  , perfect for students mastering algorithms.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link
                    to="/Visualization"
                    className={`px-6 py-3 sm:px-8 sm:py-3 font-bold rounded-lg shadow-lg transition-all hover:scale-105 ${
                      theme === "light"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                        : "bg-gradient-to-r from-sky-400 to-blue-500 text-gray-900 hover:from-sky-300 hover:to-blue-400"
                    }`}
                  >
                    Try It Now →
                  </Link>

                  <Link
                    to="/problem-list"
                    className={`px-6 py-3 font-bold rounded-lg border-2 transition-all ${
                      theme === "light"
                        ? "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                        : "border-sky-400 text-sky-300 hover:bg-gray-800"
                    }`}
                  >
                    Solve Problems
                  </Link>
                </div>
              </div>
              
              {/* Visualization Chart */}
              <div className="lg:w-1/2 flex justify-center w-full max-w-md mx-auto lg:mx-0">
                <div className={`relative w-full h-64 sm:h-72 lg:h-80 p-4 rounded-xl shadow-lg border ${
                  theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-600"
                }`}>
                  <div className="flex items-end justify-center h-full gap-1.5 sm:gap-2">
                    {[30, 80, 45, 60, 25, 90, 50, 75].map((height, index) => (
                      <div 
                        key={index}
                        className={`flex-1 rounded-t-lg transition-all duration-500 ease-in-out ${
                          theme === "light" 
                            ? "bg-gradient-to-t from-blue-500 to-indigo-600" 
                            : "bg-gradient-to-t from-sky-400 to-cyan-500"
                        }`}
                        style={{ 
                          height: `${height}%`,
                          animation: `pulse ${Math.random() * 2 + 1}s infinite alternate`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Gateway Section */}
      <div className={`py-12 mx-4 rounded-2xl ${
        theme === "light" 
          ? "bg-gradient-to-br from-gray-100 to-gray-200" 
          : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}>
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Challenge
            </span>{" "}
            Yourself?
          </h2>

          <p className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}>
            Dive into our curated collection of{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">500+ DSA problems</span>{" "}
            with interactive solutions and visual explanations.
          </p>

          <Link
            to="/problem-list"
            className={`inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-lg font-bold rounded-xl transition-all hover:scale-105 shadow-lg ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:from-blue-500 hover:to-indigo-600"
            }`}
          >
            <span>Solve Problems</span>
            <svg className="w-5 h-5 ml-2 sm:ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 mx-4 my-8 rounded-2xl ${
        theme === "light" ? "bg-gray-100" : "bg-gray-800"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}>
              Powerful Learning Features
            </h2>
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}>
              Designed to help you{" "}
              <span className={`font-medium ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}>
                grasp complex concepts
              </span>{" "}
              through interactive visualization
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className={`group relative p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                  theme === "light"
                    ? "bg-white border-gray-200 hover:shadow-lg hover:border-blue-300"
                    : "bg-gray-700 border-gray-600 hover:shadow-lg hover:border-blue-500"
                }`}
              >
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    theme === "light" 
                      ? `bg-${feature.btnColor}-100` 
                      : `bg-${feature.btnColor}-900/30`
                  }`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`mb-4 ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}>
                    {feature.desc}
                  </p>
                  <div className={`flex items-center font-medium ${
                    theme === "light" 
                      ? `text-${feature.btnColor}-600` 
                      : `text-${feature.btnColor}-400`
                  }`}>
                    <span>{feature.action}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className={` ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
        <div className="max-w-8xl   sm:px-6">
          <div className={`rounded-2xl p-6 sm:p-8 ${
            theme === "light" 
              ? "bg-gray-50 border border-gray-200" 
              : "bg-gray-800 border border-gray-700"
          }`}>
            <HomeSlider />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { 
            opacity: 0.8; 
            transform: translateY(0px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(-8px); 
          }
        }
        
        /* Ensure bars have proper animation */
        .flex-1 {
          min-width: 8%;
          max-width: 12%;
        }
        
        @media (max-width: 640px) {
          .flex-1 {
            min-width: 6%;
            max-width: 10%;
          }
        }
      `}</style>
    </>
  );
}