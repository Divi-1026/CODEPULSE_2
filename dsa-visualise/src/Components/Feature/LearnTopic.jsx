import { Link } from "react-router-dom";
import Header from "../Header";

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
      link:"/Learn_Searching",
      desc: "Searching is used to quickly find elements in data structures. Learn efficient methods like Linear and Binary Search.",
      icon: icons.SearchIcon,
      color: "from-emerald-100 to-emerald-200" // Light green
    },
    {
      title: "Sorting Algorithms",
      link:"/Learn_Selection-Sort",
      desc: "Sort data in a specific order using techniques like Bubble, Merge, or Quick Sort to improve efficiency in searching and analysis.",
      icon: icons.SortIcon,
      color: "from-pink-100 to-pink-200" // Light pink
    },
    {
      title: "Tree Data Structure",
      link:"/Learn_Binary-Search-Tree",
      desc: "Store hierarchical data with fast insert, delete, and search operations. Master types like BST, AVL, and Binary Trees.",
      icon: icons.TreeIcon,
      color: "from-purple-100 to-purple-200" // Light purple
    },
    {
      title: "Graph Algorithms",
      link:"",
      desc: "Unserdstand he concept of Graph here",
      icon: icons.GraphIcon,
      color: "from-amber-100 to-amber-200" // Light orange
    },
    {
      title: "Dynamic Programming",
      link:"Learn_Graph",
      desc: "Coming Soon",
      icon: icons.DPIcon,
      color: "from-red-100 to-red-200" // Light red
    },
    {
      title: "Two Pointer & Sliding Window",
      link:"Learn_Graph",
      desc: "Coming Soon",
      icon: icons.RaceIcon,
      color: "from-fuchsia-100 to-fuchsia-200" // Light fuchsia
    },
    {
      title: "Greedy Algorithms",
      link:"Learn_Graph",
      desc: "Coming Soon",
      icon: icons.GreedyIcon,
      color: "from-violet-100 to-violet-200" // Light violet
    },
    {
      title: "Backtracking",
      link:"Learn_Graph",
      desc: "Coming Soon",
      icon: icons.BacktrackingIcon,
      color: "from-green-100 to-green-200" // Light green
    },
    // {
    //   title: "Mathematical Algorithms",
    //   link:"Learn_Graph",
    //   desc: "Coming Soon",
    //   icon: icons.MathIcon,
    //   color: "from-orange-100 to-orange-200" // Light orange
    // },
  ];
  
  export default function LearnTopic() {
    return (<>
        {/* <Header></Header> */}
      <div className="px-6 py-8 mt-20">
        <h2 className="text-4xl font-bold text-center mb-8 text-blue-900">Learn Algorithms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {topics.map(({ title,link,desc,icon: Icon, color }) => {
            const path = `/${title.toLowerCase().replace(/[^a-z]/g, "-")}`;
            
            return (
              <Link 
                key={title}
                to={link}
                className="group block transition-transform duration-300 hover:scale-105"
              >
                <div className={`h-full bg-gradient-to-br ${color} rounded-xl p-0.5 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="h-full bg-white rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
                    <p className={`text-gray-600 ${desc === "Coming Soon" ? "text-gray-400 italic" : ""}`}>
                      {desc}
                    </p>
                    {desc === "Coming Soon" && (
                      <span className="mt-4 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div></>
    );
  }