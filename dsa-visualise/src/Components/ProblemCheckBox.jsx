import { useEffect, useState } from "react";
import axios from "../axios";

function CompletionCheckbox({ problemTitle }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMarkedStatus = async () => {
      try {
        const res = await axios.get('/api/progress/marked', { withCredentials: true });
        const isMarked = res.data.markedProblems?.some(
          p => p === problemTitle || p.problemId === problemTitle || p.title === problemTitle
        );
        if(!isMarked)setIsChecked(true) // Correctly set based on actual marked status
      } catch (err) {
        console.error("Fetch error:", err);
        setIsChecked(false); // Default to unchecked on error
      }
    };
    fetchMarkedStatus();
  }, [problemTitle]);

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/api/progress/toggle-title/${problemTitle}`,
        {},
        { withCredentials: true }
      );
      setIsChecked(res.data.marked); // Update state from backend response
    } catch (err) {
      console.error("Toggle error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={isLoading}
        className={`
          w-5 h-5 rounded border-2
          ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:ring-2 focus:ring-blue-200
          transition-colors duration-150
        `}
      />
      <span className="text-base font-medium text-gray-800">
        Learn {problemTitle}, <span className="text-blue-700">Mark as Complete</span>
      </span>
    </label>
  );
}

export default CompletionCheckbox;