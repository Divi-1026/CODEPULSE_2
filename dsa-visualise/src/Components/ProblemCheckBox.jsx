import { useEffect, useState } from "react";
import axios from "../axios";

function CompletionCheckbox({ problemTitle }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMarkedStatus = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/progress/marked', { withCredentials: true });
        const markedProblems = res.data.markedProblems || [];
        
        const isMarked = markedProblems.some(p => {
          if (typeof p === 'string') {
            return p === problemTitle;
          } else if (p && typeof p === 'object') {
            return p.problemId === problemTitle || p.title === problemTitle;
          }
          return false;
        });
        
        setIsChecked(isMarked);
      } catch (err) {
        console.error("Fetch error:", err);
        setIsChecked(false);
      }
    };
    fetchMarkedStatus();
  }, [problemTitle]);

  const handleToggle = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const previousState = isChecked;
      setIsChecked(!previousState);
      
      const res = await axios.post(
        `http://localhost:5000/api/progress/toggle-title/${encodeURIComponent(problemTitle)}`,
        {},
        { withCredentials: true }
      );
      
      if (res.data.hasOwnProperty('marked')) {
        setIsChecked(res.data.marked);
      }
    } catch (err) {
      console.error("Toggle error:", err);
      setIsChecked(prev => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          disabled={isLoading}
          className="sr-only" // Hide default checkbox
        />
        <div className={`
          w-6 h-6 rounded-lg border-2 flex items-center justify-center
          transition-all duration-300 ease-out
          ${isChecked 
            ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-200 scale-105' 
            : 'bg-white border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50'
          }
          ${isLoading 
            ? 'opacity-60 cursor-not-allowed animate-pulse' 
            : 'cursor-pointer group-hover:scale-105'
          }
          ${isChecked && !isLoading ? 'animate-bounce-once' : ''}
        `}>
          {isChecked && (
            <svg 
              className="w-4 h-4 text-white transform transition-all duration-200 ease-out"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ 
                strokeDasharray: 24,
                strokeDashoffset: isChecked ? 0 : 24,
                transition: 'stroke-dashoffset 0.3s ease-out'
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <span className="text-base font-medium text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
        Learn {problemTitle},{" "}
        <span className={`
          font-semibold transition-colors duration-200
          ${isChecked 
            ? 'text-green-600 group-hover:text-green-700' 
            : 'text-blue-600 group-hover:text-blue-700'
          }
        `}>
          {isChecked ? 'Completed ✓' : 'Mark as Complete'}
        </span>
      </span>
    </label>
  );
}

export default CompletionCheckbox;