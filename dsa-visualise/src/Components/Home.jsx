import { useState } from "react";
import CardItem from "./CardItem";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";

const icons = {
  SearchIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#03AC13">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  SortIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#FC46AA">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  ),
  TreeIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#9867C5">
      <circle cx="12" cy="5" r="2" strokeWidth="2" />
      <circle cx="6" cy="12" r="2" strokeWidth="2" />
      <circle cx="18" cy="12" r="2" strokeWidth="2" />
      <circle cx="6" cy="19" r="2" strokeWidth="2" />
      <circle cx="18" cy="19" r="2" strokeWidth="2" />
      <line x1="12" y1="7" x2="6" y2="10" strokeWidth="2" />
      <line x1="12" y1="7" x2="18" y2="10" strokeWidth="2" />
      <line x1="6" y1="14" x2="6" y2="17" strokeWidth="2" />
      <line x1="18" y1="14" x2="18" y2="17" strokeWidth="2" />
    </svg>
  ),
  GraphIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#FA8128">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  DPIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#D0312D">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  RaceIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#FC46AA">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  GreedyIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#9867C5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  BacktrackingIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#03AC13">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
    </svg>
  ),
  MathIcon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="#FA8128">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
};

const topics = [
  {
    title: "Searching",
    desc: "Searching is used to quickly find elements in data structures. Learn efficient methods like Linear and Binary Search.",
    icon: icons.SearchIcon,
  },
  {
    title: "Sorting Algorithms",
    desc: "Sort data in a specific order using techniques like Bubble, Merge, or Quick Sort to improve efficiency in searching and analysis.",
    icon: icons.SortIcon,
  },
  {
    title: "Tree Data Structure",
    desc: "Store hierarchical data with fast insert, delete, and search operations. Master types like BST, AVL, and Binary Trees.",
    icon: icons.TreeIcon,
  },
  {
    title: "Graph Algorithms",
    desc: "Coming Soon",
    icon: icons.GraphIcon,
  },
  {
    title: "Dynamic Programming",
    desc: "Coming Soon",
    icon: icons.DPIcon,
  },
  {
    title: "Two Pointer & Sliding Window",
    desc: "Coming Soon",
    icon: icons.RaceIcon,
  },
  {
    title: "Greedy Algorithms",
    desc: "Coming Soon",
    icon: icons.GreedyIcon,
  },
  {
    title: "Backtracking",
    desc: "Coming Soon",
    icon: icons.BacktrackingIcon,
  },
  {
    title: "Mathematical Algorithms",
    desc: "Coming Soon",
    icon: icons.MathIcon,
  },
];

export default function Home() {
  const [show, setshow] = useState(true);
  return (
    <>
      <Header onExplore={() => setshow(false)} />
             <div className="md:mt-48 sm:mt-56 px-6">
                   {show && (
                    
                       <div className="font-sans relative p-6 md:p-10 rounded-2xl mb-10 shadow-md border border-[#d6cbd3] bg-gradient-to-r from-[#ecf2f4] via-[#f9f9f9] to-[#e7eef0] overflow-hidden">
                        <div className="twinkling-stars absolute inset-0 z-0 pointer-events-none opacity-5"></div>
                          <div className="relative z-10 text-center space-y-5">
                             <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-blue-700">
                                 Welcome to CodePulse
                            </h1>
                      <p className="text-xl font-semibold italic text-sky-500">
                                Feel the heartbeat of Visualise DSA.</p>
              <p className="text-base sm:text-lg leading-relaxed text-black max-w-3xl mx-auto">
                Struggling with complex DSA concepts? <span className="text-blue-800 font-semibold">CodePulse</span> turns tough algorithms into easy-to-understand visuals.
                <br />
                Whether it’s <span className="text-green-700 font-semibold">Searching, Sorting, or Tree Structures</span>, we help you learn by seeing how each algorithm works step-by-step.
                <br />
                Perfect for <span className="text-green-900 font-semibold">students, interview prep</span>, or anyone aiming to master <span className="text-[#607f89] font-semibold">Data Structures & Algorithms</span>.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map(({ title, desc, icon: Icon }, idx) => {
            const path = "/" + title.toLowerCase().replace(/[^a-z]/g, "-");
            return (
              <CardItem key={idx}>
                <Link to={path}>
                  <div
className="h-52 w-full bg-gradient-to-br from-[#9e92ec] via-[#d7d3f1] to-[#9e92ec] rounded-xl flex flex-col items-center justify-center text-center
px-4 py-5 border-3 border-blue-800
ring-2 ring-green-400 ring-offset-2 ring-offset-blue-200
shadow-[0_0_16px_rgba(96,165,250,0.4)]
transition-transform duration-300 ease-in-out
hover:scale-105 hover:shadow-[0_0_30px_rgba(96,165,250,0.6)]"

                    style={{
                      
                      boxShadow: "0 0 0 transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(122, 95, 160, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 0 transparent";
                    }}
                  >
                    <div className="mb-3 scale-100 group-hover:scale-105 transition-transform duration-300">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900/90 group-hover:text-[#38306b] transition">
                      {title}
                    </h3>
                    <p className={`text-[15px] mt-1 leading-snug ${desc === "Coming Soon" ? "text-[#728f8f] italic" : "text-[#3e4e5e]"}`}>
                      {desc}
                    </p>
                  </div>
                </Link>
              </CardItem>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}



