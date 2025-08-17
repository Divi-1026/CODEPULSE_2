import { useState } from "react";
import Nav from "../NavBarSide/nav";
import Header from "../Header";
import CompletionCheckbox from "../ProblemCheckBox";

function ArrayCard({ value, index, isCurrent, isFound }) {
  const baseClasses = "flex flex-col items-center justify-center w-16 h-16 text-lg font-bold border-2 rounded-xl transition-all duration-300 shadow-lg";
  const dynamicClasses = isFound
    ? "bg-gradient-to-br from-green-300 to-green-500 ring-2 ring-green-800 text-white animate-glow-found"
    : isCurrent
    ? "bg-gradient-to-br from-blue-800 to-blue-800 ring-2 ring-blue-600 text-white animate-glow-current"
    : "bg-gradient-to-bl from-blue-800 via-sky-500 to-blue-800 ring-1 ring-[#4b721e] text-white shadow-[0_0_10px_2px_rgba(75,114,30,0.5)]";

  return (
    <>
      <style>
        {`
          @keyframes glowCurrent {
            0%, 100% {
              box-shadow: 0 0 12px rgba(96,165,250,0.8), 0 0 20px rgba(96,165,250,0.4);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 25px rgba(96,165,250,1), 0 0 30px rgba(96,165,250,0.6);
              transform: scale(1.05);
            }
          }
          @keyframes glowFound {
            0%, 100% {
              box-shadow: 0 0 12px rgba(34,197,94,0.8), 0 0 20px rgba(34,197,94,0.4);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 25px rgba(34,197,94,1), 0 0 30px rgba(34,197,94,0.6);
              transform: scale(1.05);
            }
          }
          .animate-glow-current {
            animation: glowCurrent 1.8s ease-in-out infinite;
          }
          .animate-glow-found {
            animation: glowFound 1.6s ease-in-out infinite;
          }
        `}
      </style>
      <div className={`${baseClasses} ${dynamicClasses}`}>
        <span className="text-2xl text-white">{value}</span>
        <span className="mt-1 text-xs opacity-60 text-blue-200">Index: {index}</span>
      </div>
    </>
  );
}

export default function LinearSearchComponent() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [messages, setMessages] = useState([]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    resetSearch();
  };

  const handleCustomArraySubmit = () => {
    const newArray = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    setArray(newArray);
    resetSearch();
  };

  const resetSearch = () => {
    setCurrentIndex(null);
    setFoundIndex(null);
    setMessages([]);
  };

  const addMessage = (text, type) => {
    const newMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [newMessage, ...prev].slice(0, 10));
  };

  const handleLinearSearch = async () => {
    const targetValue = parseInt(target.trim(), 10);
    if (isNaN(targetValue)) {
      addMessage("Please enter a valid number to search", "error");
      return;
    }

    resetSearch();
    addMessage(`Starting search for ${targetValue}...`, "info");

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      addMessage(`Checking index ${i} (value: ${array[i]})`, "searching");
      await new Promise((res) => setTimeout(res, 1000 - speed * 9.5));

      if (array[i] === targetValue) {
        setFoundIndex(i);
        setCurrentIndex(null);
        addMessage(`Found ${targetValue} at index ${i}!`, "success");
        return;
      }
    }

    setCurrentIndex(null);
    addMessage(`${targetValue} not found in the array`, "error");
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-4 mt-48 md:mt-36">
        <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
          <Nav />
        </div>
        
        <div className="col-span-4 min-h-screen w-full bg-[#f8fafc] text-gray-900 px-10 py-6 rounded-lg">
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.4s ease-out;
            }
          `}</style>
          
          <div className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
            Linear Search Visualizer
          </div>

          {/* Controls Section */}
          <div className="flex flex-wrap items-center gap-4 mb-8 bg-gradient-to-br from-[#d7d3f1] to-[#e7ecfc] w-full p-5 border border-slate-300 md:h-28 shadow-lg">
            <label className="flex items-center gap-2">
              <strong>Size:</strong>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Math.max(5, Math.min(20, +e.target.value)))}
                className="w-16 px-2 py-1 rounded font-semibold bg-white text-sky-700 border border-slate-400"
              />
            </label>

            <label className="flex items-center gap-2">
              <strong>Speed: {speed}%</strong>
              <input
                type="range"
                min="10"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
                className="w-32"
              />
            </label>

            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="px-4 py-2 font-medium text-white rounded-lg bg-gradient-to-r from-blue-800 to-blue-900 hover:brightness-110 shadow-md"
            >
              {showCustomInput ? "Hide Custom Input" : "Enter Custom Array"}
            </button>

            <button
              onClick={generateRandomArray}
              className="px-4 py-2 font-medium bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 hover:brightness-110 text-white rounded-lg shadow-md flex items-center gap-2"
            >
              🔄 Generate Random Array
            </button>
          </div>

          {showCustomInput && (
            <div className="mb-6">
              <p className="mb-2 text-lg font-semibold text-slate-700">Enter array values (comma separated):</p>
              <input
                type="text"
                placeholder="e.g. 10, 5, 22, 1, 7"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full text-black px-4 py-2 rounded-lg border border-purple-500 bg-purple-100 text-lg"
              />
              <button
                onClick={handleCustomArraySubmit}
                className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 hover:text-white rounded-lg shadow-lg text-lg"
              >
                Submit
              </button>
            </div>
          )}

          {array.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Search element"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-[200px] px-6 py-2 text-lg font-medium text-black rounded border border-slate-400 bg-slate-200"
                />
                <button
                  onClick={handleLinearSearch}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
                >
                  Search Element
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] min-h-[300px] border border-slate-200 p-8 shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-sky-900">Array Visualization</h2>
                <div className="flex flex-wrap gap-6 justify-center py-8 items-center">
                  {array.map((value, index) => (
                    <ArrayCard
                      key={index}
                      value={value}
                      index={index}
                      isCurrent={index === currentIndex}
                      isFound={index === foundIndex}
                    />
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">Search log will appear here...</p>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`p-3 rounded-lg border-l-4 ${
                          msg.type === "success" 
                            ? "bg-green-50 border-green-500 text-green-800"
                            : msg.type === "error"
                            ? "bg-red-50 border-red-500 text-red-800"
                            : "bg-blue-50 border-blue-500 text-blue-800"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span>{msg.text}</span>
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="fixed bottom-4 right-4 bg-white p-6 rounded-xl shadow-xl border border-gray-300 z-50 transform transition-all hover:scale-105">
  <div className="flex flex-col items-center space-y-3">

    <CompletionCheckbox problemTitle="Linear_Search" />
  </div>
</div>

      </div>
    </>
  );
}