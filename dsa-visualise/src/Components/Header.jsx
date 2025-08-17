import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaHome, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function Header({ onExplore }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const profileRef = useRef(null);

  const searchRoutes = {
    // Sorting
    "bubble sort": "/Bubble-Sort",
    "merge sort": "/Merge-Sort",
    "insertion sort": "/Insertion-Sort",
    "selection sort": "/Selection-Sort",
    "quick sort": "/Quick-Sort",
    "heap sort": "/Heap-Sort",

    // Searching
    "linear search": "/Linear_Search",
    "binary search": "/Binary_Search",
    "jump search": "/Jump_Search",
    "interpolation search": "/Interpolation_Search",

    // Trees
    "avl tree": "/AVL-Tree",
    "binary search tree": "/Binary-Search-Tree",
    "bst": "/Binary-Search-Tree",
    "tree traversal": "/Tree-Traversal",
    "red black tree": "/Red-Black-Tree",
    "trie": "/Trie",

    // Graph
    "dfs": "/DFS-Traversal",
    "bfs": "/BFS-Traversal",
    "dijkstra": "/Dijkstra",
    "kruskal": "/Kruskal",
    "prim": "/Prim",
    "topological sort": "/Topological-Sort",

    // Mathematical
    "euclidean": "/mathematical-algorithms",
    "gcd": "/mathematical-algorithms",
    "sieve": "/Sieve",
    "modular exponentiation": "/Modular-Exponentiation",

    // Misc
    "searching": "/searching",
    "sorting": "/sorting-algorithms",
    "dp": "/dynamic-programming",
    "dynamic programming": "/dynamic-programming",
    "greedy": "/greedy-algorithms",
    "backtracking": "/backtracking",
    "tree": "/tree-data-structure",
    "graph": "/graph-algorithms"
  };

  const features = [
    {
      name: "Interactive Visualizations",
      description: "Step-by-step animations of algorithms",
      icon: "👁️",
      path: "/Visualization"
    },
    {
      name: "Code Execution",
      description: "Run and visualize your own code",
      icon: "💻",
      path: "/features/code-execution"
    },
    {
      name: "Algorithm Comparison",
      description: "Compare performance side-by-side",
      icon: "⚖️",
      path: "/features/comparison"
    },
    {
      name: "Understand Topic",
      description: "Practice common interview questions",
      icon: "📝",
      path: "/Learn"
    }
  ];

  const aboutItems = [
    {
      name: "Our Mission",
      description: "Learn about our vision for DSA education",
      icon: "🎯",
      path: "/about/mission"
    },
    {
      name: "Team",
      description: "Meet the creators behind CodePulse",
      icon: "👥",
      path: "/about/team"
    },
    {
      name: "Contact Us",
      description: "Get in touch with our team",
      icon: "📩",
      path: "ContactUs"
    }
  ];

  const profileItems = [
    {
      name: "My Account",
      description: "View and edit your profile",
      icon: "👤",
      path: "/profile"
    },
    {
      name: "Settings",
      description: "Customize your experience",
      icon: "⚙️",
      path: "/settings"
    },
    {
      name: "Sign Out",
      description: "Securely log out of your account",
      icon: "🚪",
      path: "/auth",
      action: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
      }
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setShowFeatures(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setShowAbout(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = Object.keys(searchRoutes)
      .filter(key => key.includes(searchQuery.toLowerCase()))
      .sort((a, b) => a.length - b.length)
      .slice(0, 5);

    setFilteredSuggestions(filtered);
  }, [searchQuery]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    const matched = Object.keys(searchRoutes).find(key =>
      query.includes(key)
    );

    if (matched) {
      navigate(searchRoutes[matched]);
      setSearchQuery("");
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(searchRoutes[suggestion]);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Branding */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CODEPULSE
              </span>
              <span className="ml-2 text-sm font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                BETA
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-6 relative" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search algorithms (e.g. 'Bubble Sort', 'DFS')..."
                className="block w-full pl-10 pr-3 py-3 text-base border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="cursor-pointer select-none relative py-3 pl-4 pr-9 hover:bg-indigo-50 text-gray-900"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block font-medium">
                        {suggestion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showSuggestions && searchQuery && filteredSuggestions.length === 0 && (
              <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none">
                <div className="cursor-default select-none relative py-3 pl-4 pr-9 text-gray-500">
                  No algorithms found for "{searchQuery}"
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {/* Features Dropdown */}
            <div className="relative" ref={featuresRef}>
              <button
                onClick={() => {
                  setShowFeatures(!showFeatures);
                  setShowAbout(false);
                  setShowProfile(false);
                }}
                className="inline-flex items-center px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
              >
                Features
                <FaChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFeatures ? 'transform rotate-180' : ''}`} />
              </button>

              {showFeatures && (
                <div className="absolute z-10 mt-2 w-64 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-2">
                    {features.map((feature, index) => (
                      <Link
                        key={index}
                        to={feature.path}
                        className="group flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => setShowFeatures(false)}
                      >
                        <span className="mr-3 text-lg">{feature.icon}</span>
                        <div>
                          <p className="font-medium">{feature.name}</p>
                          <p className="text-sm text-gray-500">{feature.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => {
                  setShowAbout(!showAbout);
                  setShowFeatures(false);
                  setShowProfile(false);
                }}
                className="inline-flex items-center px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
              >
                About
                <FaChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAbout ? 'transform rotate-180' : ''}`} />
              </button>

              {showAbout && (
                <div className="absolute z-10 mt-2 w-64 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-2">
                    {aboutItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="group flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => setShowAbout(false)}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition"
            >
              <FaHome className="mr-2 h-5 w-5" />
              Home
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowFeatures(false);
                  setShowAbout(false);
                }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
              >
                <FaUserCircle className="h-6 w-6" />
              </button>

              {showProfile && (
                <div className="absolute z-10 right-0 mt-2 w-64 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">Signed in as</p>
                      <p className="text-sm text-gray-500 truncate">user@example.com</p>
                    </div>
                    {profileItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="group flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => {
                          setShowProfile(false);
                          if (item.action) item.action();
                        }}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}