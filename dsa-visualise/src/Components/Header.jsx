import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa"; 
export default function Header({ onExplore }) {
  
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md border-b bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 py-5">
  
      {/* Branding */}
      <div className="text-center md:text-left w-full md:w-auto">
        <h2
          className="text-5xl font-bold text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(to right, #1e3a8a 0%, #60a5fa 5%, #1e3a8a 20%)",
            backgroundSize: "200% auto",
            backgroundPosition: "0",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shineText 3s linear infinite",
          }}
        >
          CODEPULSE
        </h2>
        <p className="mt-2 font-semibold text-base md:text-lg italic text-cyan-800 hover:text-cyan-600 transition-colors">
          Feel the heartbeat of Visualise DSA
        </p>
        <style>
          {`
            @keyframes shineText {
              0% { background-position: 0; }
              60% { background-position: 180px; }
              100% { background-position: 180px; }
            }
          `}
        </style>
      </div>
  
      {/* Right Side: Search, Explore, Home, Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-9 w-full md:w-auto justify-end">
        
        {/* Search + Explore */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search algorithms..."
            className="w-full sm:w-60 h-11 px-4 bg-white text-[#333548] border border-[#b7adc8] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#480e4d] transition"
          />
          <button
            onClick={onExplore}
            className="h-11 text-white text-lg font-semibold rounded-md border-2 border-blue-600 ring-2 ring-blue-400/40
              bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
              hover:from-blue-700 hover:via-blue-700 hover:to-blue-700
              hover:shadow-md hover:shadow-[#320935] transition duration-200 px-4"
          >
            &lt;/&gt; Explore Algorithms &lt;/&gt;
          </button>
        </div>
  
        {/* Home + Logout */}
        <div className="flex flex-row items-center gap-2">
          <Link
            to="/"
            className="h-10 px-4 py-1 text-m border-2 border-cyan-200 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-900 transition"
          >
            Home
          </Link>
          
          {/* <button
            onClick={handleLogout}
            className="h-10 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button> */}
          <Link
  to="/profile" // or whatever your user page route is
  className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full hover:bg-blue-700 transition"
  title="User Profile"
>
  <FaUserCircle className="text-3xl" />
</Link>
        </div>
      </div>
    </div>
  </header>
  
  );
}
