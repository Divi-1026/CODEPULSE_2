// LinearSearchComponent.jsx
import { useState } from "react";
import Nav from "../NavBarSide/nav";
import Header from "../Header";

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
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customArray, setCustomArray] = useState([]);
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  const generateRandomArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setCustomArray(arr);
    setFoundIndex(null);
    setCurrentIndex(null);
    setShow(false);
  };

  const handleSubmit = () => {
    const array = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    setCustomArray(array);
    setFoundIndex(null);
    setCurrentIndex(null);
    setShow(false);
  };

  const handleLinearSearch = async () => {
    const main = document.getElementById("content");
    const targ = parseInt(target.trim(), 10);
    if (isNaN(targ)) return;

    main.innerHTML = "";
    setFoundIndex(null);
    setCurrentIndex(null);
    const createBox = (text, color, icon) => {
      const box = document.createElement("div");
      box.textContent = icon ? `${icon} ${text}` : text;
      box.className = `
        w-full
        p-4
        mt-3
        text-lg
        font-semibold
        rounded-xl
        border-l-8
        shadow-xl
        bg-gradient-to-br from-[#f4f9f8] to-[#e9f1f2]
        ${color}
        animate-fade-in
      `;
      box.style.boxShadow = `0 0 15px 3px rgba(255,255,255,0.15)`;
      return box;
    };

    for (let i = 0; i < customArray.length; i++) {
      setCurrentIndex(i);
      const searchingMsg = createBox(`${targ} is searching at index ${i}`, "border-blue-400 text-blue-900", "🔍");
      main.appendChild(searchingMsg);
      await new Promise((res) => setTimeout(res, 1000 - speed * 9.5));

      if (customArray[i] === targ) {
        const foundMsg = createBox(`${targ} is found at index ${i}`, "border-green-500 text-green-700", "✅");
        foundMsg.classList.add("shadow-[0_0_15px_rgba(34,197,94,0.6)]");
        main.appendChild(foundMsg);
        setFoundIndex(i);
        setCurrentIndex(null);
        return;
      }
    }

    const notFoundMsg = createBox(`${targ} is not Found`, "border-red-500 text-red-600", "❌");
    notFoundMsg.classList.add("shadow-[0_0_15px_rgba(248,113,113,0.6)]");
    main.appendChild(notFoundMsg);
    setCurrentIndex(null);
  };

  return (
    <>
  <Header />
      <div className="grid grid-cols-5 gap-4 mt-55 md:mt-38">
        <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
          <Nav />
        </div>
        <div className="col-span-4 min-h-screen w-full bg-[#f8fafc] text-gray-900 px-10 py-6 rounded-xl">
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

          <div className="flex flex-wrap items-center gap-4 mb-8 bg-gradient-to-br from-[#d7d3f1] to-[#e7ecfc] w-full p-5 border border-slate-300  md:h-28 shadow-lg">
            <label className="flex items-center gap-2">
              <strong>Size:</strong>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))}
                className="w-16 px-2 py-1 rounded font-semibold bg-white text-sky-700 border border-slate-400"
              />
            </label>

            <label className="flex items-center gap-2">
              <strong>Speed: {speed}%</strong>
              <input
                type="range"
                min="0"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
                className="w-32"
              />
            </label>

            <button
              onClick={() => setShow((prev) => !prev)}
              className="px-4 py-2 font-medium text-white rounded-lg bg-gradient-to-r from-blue-800 to-blue-900 hover:brightness-110 shadow-md"
            >
              {show ? "Hide Custom Input" : "Enter Custom Array"}
            </button>

            <button
              onClick={generateRandomArray}
              className="px-4 py-2 font-medium bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 hover:brightness-110 text-white rounded-lg shadow-md flex items-center gap-2"
            >
              🔄 Generate Random Array
            </button>
          </div>

          {show && (
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
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 hover:text-white rounded-lg shadow-lg text-lg"
              >
                Submit
              </button>
            </div>
          )}

          {customArray.length > 0 && (
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

              <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] min-h-[300px] border border-slate-200 p-8  shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-sky-900">Array Visualization</h2>
                <div className="flex flex-wrap gap-6 justify-center py-8 items-center">
                  {customArray.map((value, index) => (
                    <ArrayCard
                      key={index}
                      value={value}
                      index={index}
                      isCurrent={index === currentIndex}
                      isFound={index === foundIndex}
                    />
                  ))}
                </div>
                <div id="content" className="mt-6 space-y-3"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
