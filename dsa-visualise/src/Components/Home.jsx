import { useState } from "react";
import CardItem from "./CardItem";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeProvider";
import HomeSlider from "./HomeSlider";

export default function Home() {
  const { theme, Toggletheme } = useTheme();
  const [show, setshow] = useState(true);
  
  return (
    <>
      <Header onExplore={() => setshow(false)} />
     
      {/* Hero Section */}
      <div className="sm:mt-22 md:mt-22 md:px-0">
        <div className="max-w-8xl mx-auto p-1">
          <div className={`relative p-6 md:p-12 rounded-2xl mb-10 shadow-lg border border-gray-200 overflow-hidden ${theme==="light"?"bg-gradient-to-br from-gray-50 to-white":"bg-gradient-to-br from-[#1a1a1e] to-[#3e3e45]"}`}>
            <div className="absolute inset-0 overflow-hidden z-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 text-left space-y-6 py-2">
                <p className={`text-lg md:text-xl leading-relaxed ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
                  <span className={`font-semibold ${theme === "light" ? "text-blue-800" : "text-sky-200"}`}>
                    CodePulse
                  </span>{" "}
                  makes DSA easy with visualizations of{" "}
                  <span className={`font-semibold ${theme === "light" ? "text-green-700" : "text-green-300"}`}>
                    Searching, Sorting, and Tree Structures
                  </span>
                  , perfect for{" "}
                  <span className={`font-semibold ${theme === "light" ? "text-green-900" : "text-green-400"}`}>
                    students
                  </span>{" "}
                  mastering{" "}
                  <span className={`font-semibold ${theme === "light" ? "text-[#607f89]" : "text-[#9ecfd6]"}`}>
                    algorithms
                  </span>
                  .
                </p>
 
                <div>
                  <h1 className={`text-5xl md:text-5xl font-bold text-transparent bg-clip-text ${theme=="dark" ? "bg-red-100" : "bg-gradient-to-r from-blue-600 to-indigo-700"}`}>
                    Welcome to CodePulse
                  </h1>
                  <p className={`text-2xl md:text-3xl font-semibold italic mt-2 ${theme=="dark"? "text-teal-200" : "text-sky-600"}`}>
                    Feel the heartbeat of Visualize DSA
                  </p>
                </div>

                <div className="pt-4 flex gap-4">
                  <Link
                    to="/Visualization"
                    className={`px-8 py-3 font-bold rounded-lg shadow-lg transition-all transform hover:scale-105
                      ${theme === "light"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                        : "bg-gradient-to-r from-sky-300 to-blue-600 text-gray-100 hover:from-sky-400 hover:to-blue-600"}`}
                  >
                    Try It Now →
                  </Link>

                  <Link
                    to="/problems"
                    className={`px-6 py-3 font-bold rounded-lg border-2 transition-all
                      ${theme === "light"
                        ? "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                        : "border-sky-400 text-sky-300 hover:bg-gray-800"}`}
                  >
                    Solve Problems
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <div className={`relative w-full max-w-md h-75 p-4 rounded-xl shadow-xl border border-gray-200 ${theme=="light"?"bg-white":"bg-gray-700 border-black"}`}>
                  <div className="flex items-end h-full gap-1.5">
                    {[30, 80, 45, 60, 25, 90, 50, 75].map((height, index) => (
                      <div 
                        key={index}
                        className={`flex-1 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-md transition-all duration-500 ease-in-out ${theme==="light"?"bg-gradient-to-t from-blue-500 to-indigo-600":"bg-gradient-to-t from-sky-300 to-cyan-400"}`}
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
      <div className={`py-10 rounded-2xl ml-2 pb-6 mr-2 ${theme === "light" ? "bg-gradient-to-br from-gray-100 to-gray-200" : "bg-gradient-to-br from-blue-900 to-indigo-900"}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          {/* Heading */}
          <h2 className={`text-4xl md:text-4xl font-bold mb-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Challenge</span> Yourself?
          </h2>

          {/* Description */}
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Dive into our curated collection of <span className="font-semibold">500+ DSA problems</span> with interactive solutions and visual explanations.
          </p>

          {/* CTA Button */}
          <Link
            to="/problem-list"
            className={`inline-flex items-center px-8 py-4 text-lg font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-400 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl"
            }`}
          >
            <span className="text-xl">Solve Problems</span>
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 mt-10 mr-1 ml-2 rounded-2xl ${theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#2a2a2c] text-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
              Powerful Learning Features
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Designed to help you{" "}
              <span className={`font-medium ${theme === "light" ? "text-indigo-600" : "text-indigo-400"}`}>
                grasp complex concepts
              </span>{" "}
              through interactive visualization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Visualizations",
                desc: "Control algorithm execution with play/pause/step buttons",
                icon: "👁️",
                colorLight: "from-blue-50 to-indigo-50",
                colorDark: "from-gray-700 to-gray-800",
                btnColor: "indigo",
                action: "Try Bubble Sort",
                link: "/Visualization"
              },
              {
                title: "Live Code Editor",
                desc: "Write and visualize your own implementations",
                icon: "💻",
                colorLight: "from-green-50 to-emerald-50",
                colorDark: "from-gray-700 to-gray-800",
                btnColor: "green",
                action: "Try JavaScript",
                link: "/dryrun"
              },
              {
                title: "Compiler",
                desc: "Write, run, and debug your code seamlessly",
                icon: "⚡",
                colorLight: "from-cyan-50 to-blue-50",
                colorDark: "from-gray-700 to-gray-800",
                btnColor: "cyan",
                action: "Open Compiler",
                link: "/code_run"
              },
              {
                title: "Understand Topics",
                desc: "Learn every topic in detail",
                icon: "📝",
                colorLight: "from-amber-50 to-orange-50",
                colorDark: "from-gray-700 to-gray-800",
                btnColor: "amber",
                action: "Learn Topics",
                link: "/Learn"
              },
              {
                title: "Progress Tracking",
                desc: "Detailed analytics and recommendations",
                icon: "📊",
                colorLight: "from-pink-50 to-rose-50",
                colorDark: "from-gray-600 to-gray-800",
                btnColor: "pink",
                action: "View Dashboard",
                link: "/dashboard"
              },
              {
                title: "DSA Problems",
                desc: "Practice with curated problem sets",
                icon: "🧩",
                colorLight: "from-purple-50 to-violet-50",
                colorDark: "from-gray-700 to-gray-800",
                btnColor: "purple",
                action: "Solve Problems",
                link: "/problem-list"
              }
            ].map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className={`group relative p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1
                  ${theme === "light"
                    ? `bg-white border border-gray-200`
                    : `bg-gray-800 border border-gray-700`
                  }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${theme === "light" ? feature.colorLight : feature.colorDark} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} 
                ></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${theme === "light" ? `bg-${feature.btnColor}-100` : `bg-${feature.btnColor}-900`}`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}>{feature.title}</h3>
                  <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>{feature.desc}</p>
                  <div className={`mt-4 flex items-center font-medium ${theme === "light" ? `text-${feature.btnColor}-600` : `text-${feature.btnColor}-400`}`}>
                    <span>{feature.action}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Home Slider Section */}
      <div className={`py-16 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
        <div className="max-w-8xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
              What Our Users Say
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Discover how CodePulse is helping students master DSA concepts
            </p>
          </div>
          
          {/* Slider Container with Better Styling */}
          <div className={`rounded-2xl p-8 ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-gray-800 border border-gray-700"}`}>
            <HomeSlider />
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      {/* <div className={`py-16 ${theme === "light" ? "bg-gradient-to-br from-blue-50 to-indigo-50" : "bg-gradient-to-br from-blue-900 to-indigo-900"}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            Start Your DSA Journey Today
          </h2>
          <p className={`text-xl mb-8 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Join thousands of students who have mastered Data Structures and Algorithms with CodePulse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className={`px-8 py-4 text-lg font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
              }`}
            >
              Get Started Free
            </Link>
            <Link
              to="/Visualization"
              className={`px-8 py-4 text-lg font-bold rounded-xl border-2 transition-all ${
                theme === "light"
                  ? "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  : "border-sky-400 text-sky-300 hover:bg-gray-800"
              }`}
            >
              Explore Features
            </Link>
          </div>
        </div>
      </div> */}

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.8; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(-5px); }
        }
      `}</style>
      
      {/* <Footer/> */}
    </>
  );
}