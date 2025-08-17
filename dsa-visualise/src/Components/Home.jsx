import { useState } from "react";
import CardItem from "./CardItem";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Home() {
  const [show, setshow] = useState(true);
  return (
    <>
      <Header onExplore={() => setshow(false)} />
     
      {/* Hero Section */}
      <div className="sm:mt-22 md:mt-22 md:px-0">
        <div className="max-w-8xl mx-auto p-1">
          <div className="relative p-6 md:p-12 rounded-2xl mb-10 shadow-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            <div className="absolute inset-0 overflow-hidden z-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 text-left space-y-6 py-2">
                <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                  <span className="text-blue-800 font-semibold">CodePulse</span> makes DSA easy with visualizations of <span className="text-green-700 font-semibold">Searching, Sorting, and Tree Structures</span>, perfect for <span className="text-green-900 font-semibold">students</span> mastering <span className="text-[#607f89] font-semibold">algorithms</span>.
                </p>   
                <div>
                  <h1 className="text-5xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                    Welcome to CodePulse
                  </h1>
                  <p className="text-2xl md:text-3xl font-semibold italic text-sky-600 mt-2">
                    Feel the heartbeat of Visualize DSA
                  </p>
                </div>
                
                <div className="pt-4 flex gap-4">
                  <Link to="/Visualization" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">
                    Try It Now →
                  </Link>
                  <Link to="/demos" className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-all">
                    View Demos
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md h-75 bg-white p-4 rounded-xl shadow-xl border border-gray-200">
                  <div className="flex items-end h-full gap-1.5">
                    {[30, 80, 45, 60, 25, 90, 50, 75].map((height, index) => (
                      <div 
                        key={index}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-md transition-all duration-500 ease-in-out"
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

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Powerful Learning Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed to help you <span className="text-indigo-600 font-medium">grasp complex concepts</span> through interactive visualization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Visualizations",
                desc: "Control algorithm execution with play/pause/step buttons",
                icon: "👁️",
                color: "from-blue-50 to-indigo-50",
                btnColor: "indigo",
                action: "Try Bubble Sort",
                link: "/Visualization"
              },
              {
                title: "Live Code Editor",
                desc: "Write and visualize your own implementations",
                icon: "💻",
                color: "from-green-50 to-emerald-50",
                btnColor: "green",
                action: "Try JavaScript",
                link: "/dryrun"
              },
              {
                title: "Algorithm Comparison",
                desc: "Run two algorithms side-by-side",
                icon: "⚖️",
                color: "from-purple-50 to-fuchsia-50",
                btnColor: "purple",
                action: "Compare Sorts",
                link: "/compare"
              },
              {
                title: "Understand Topics",
                desc: "Learn every topic in detail",
                icon: "📝",
                color: "from-amber-50 to-orange-50",
                btnColor: "black",
                action: "Learn Topics",
                link: "/Learn"
              },
              {
                title: "Custom Inputs",
                desc: "Upload datasets or create test cases",
                icon: "🔢",
                color: "from-cyan-50 to-blue-50",
                btnColor: "cyan",
                action: "Upload CSV",
                link: "/custom-inputs"
              },
              {
                title: "Progress Tracking",
                desc: "Detailed analytics and recommendations",
                icon: "📊",
                color: "from-pink-50 to-rose-50",
                btnColor: "pink",
                action: "View Dashboard",
                link: "/dashboard"
              }
            ].map((feature, index) => (
              <Link to={feature.link} key={index} className="group relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`}></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-${feature.btnColor}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                  <div className={`mt-4 flex items-center text-${feature.btnColor}-600 font-medium`}>
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

      {/* Popular Algorithms Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Explore Popular Algorithms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Quick Sort", complexity: "O(n log n)", path: "/quick-sort", color: "from-purple-500 to-indigo-600" },
              { name: "Dijkstra's", complexity: "O(V + E log V)", path: "/dijkstra", color: "from-green-500 to-emerald-600" },
              { name: "BFS Traversal", complexity: "O(V + E)", path: "/bfs", color: "from-blue-500 to-cyan-600" }
            ].map((algo, index) => (
              <Link key={index} to={algo.path} className={`bg-gradient-to-r ${algo.color} rounded-xl p-0.5 shadow-lg hover:shadow-xl transition`}>
                <div className="bg-white rounded-lg p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800">{algo.name}</h3>
                  <p className="text-gray-600 mt-2">Time Complexity: {algo.complexity}</p>
                  <div className="mt-4 flex-1 flex items-end">
                    <div className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
                      Visualize →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.8; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(-5px); }
        }
      `}</style>
      
      <Footer />
    </>
  );
}