import Header from "../Header";
import { useState, useRef } from "react";
import Nav from "../NavBarSide/nav";

function ArrayBar({ value, index, currentIndex, minIndex, comparingIndex }) {
  const baseClasses = "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-xl hover:scale-105";
  let bgColor = "bg-[#8C8DC1]";

  if (index === minIndex) bgColor = "bg-[#37a262] animate-pulse";
  else if (index === currentIndex) bgColor = "bg-[#0b572a]";
  else if (index === comparingIndex)
    bgColor = "bg-[#4937bd] ring-3 ring-blue-500 text-white shadow-[0_0_12px_2px_rgba(59,130,246,0.5)]";

  return (
    <div className={`${baseClasses} ${bgColor}`} style={{ height: `${value * 3}px` }}>
      <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">{value}</span>
    </div>
  );
}

export default function Selection() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customArray, setCustomArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState([]);
  const pauseRef = useRef(false);

  const generateRandomArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setCustomArray(arr);
    setCurrentIndex(null);
    setMinIndex(null);
    setComparingIndex(null);
    setMessages([]);
  };

  const handleSubmit = () => {
    const array = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    setCustomArray(array);
    setCurrentIndex(null);
    setMinIndex(null);
    setComparingIndex(null);
    setMessages([]);
  };

  const addMessage = (text) => {
    setMessages((msgs) => [...msgs, text]);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const checkPause = async () => {
    while (pauseRef.current) {
      await delay(100);
    }
  };

  const selectionSort = async () => {
    setIsSorting(true);
    let arr = [...customArray];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      setCurrentIndex(i);
      let minIdx = i;
      await delay(1000 - speed * 9);
      await checkPause();

      for (let j = i + 1; j < n; j++) {
        setComparingIndex(j);
        await delay(1000 - speed * 9);
        await checkPause();

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setMinIndex(minIdx);
        }
      }

      if (minIdx !== i) {
        addMessage(`Swapping elements at index ${i} (${arr[i]}) and ${minIdx} (${arr[minIdx]})`);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setCustomArray([...arr]);
        await delay(1000 - speed * 9);
        await checkPause();
      }

      setMinIndex(null);
    }

    setCurrentIndex(null);
    setMinIndex(null);
    setComparingIndex(null);
    setIsSorting(false);
    pauseRef.current = false;
    setIsPaused(false);
  };

  return (
    <>
    <Header />
          <div className="grid grid-cols-5 gap-4 mt-48 md:mt-36">
            <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
              <Nav />
            </div>
      <div className="col-span-4 min-h-screen w-full bg-white text-black p-8 font-sans rounded-lg">
      <div className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
          Selection Sort Visualizer
          </div>   <div className="flex flex-wrap items-center gap-4 mb-6 bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] rounded-xl p-10 border-white border-1">
          <label className="flex items-center gap-2">
            <strong className="text-lg">Size:</strong>
            <input
              type="number"
              value={size}
              disabled={isSorting}
              onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))}
              className="w-16 px-2 py-1 rounded border border-gray-600 bg-white text-black"
            />
          </label>

          <label className="flex items-center gap-2">
            <strong className="text-lg">Speed: {speed}%</strong>
            <input
              type="range"
              min="0"
              max="100"
              value={speed}
              disabled={isSorting}
              onChange={(e) => setSpeed(+e.target.value)}
              className="w-32 text-blue-500"
            />
          </label>

          <button
            onClick={() => setShow((prev) => !prev)}
            disabled={isSorting}
            className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 rounded-lg shadow-lg transition-all duration-300 text-white"
          >
            {show ? "Hide Custom Input" : "Enter Custom Array"}
          </button>

          <button
            onClick={generateRandomArray}
            disabled={isSorting}
            className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-700 rounded-lg shadow-lg transition-all duration-300 text-white"
          >
            Generate Random Array
          </button>

          <button
            onClick={selectionSort}
            disabled={isSorting || customArray.length === 0}
            className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 rounded-lg shadow-lg transition-all duration-300 text-white"
          >
            Start Selection Sort
          </button>

        
        </div>

        {show && (
          <div className="mb-6">
            <p className="mb-2">Enter array values (comma separated):</p>
            <input
              type="text"
              placeholder="e.g. 10, 5, 22, 1, 7"
              value={inputValue}
              disabled={isSorting}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 rounded border border-purple-500 bg-purple-100 text-lg"
            />
            <button
              onClick={handleSubmit}
              disabled={isSorting}
              className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg text-lg transition-all duration-300 text-white"
            >
              Submit
            </button>
          </div>
        )}

        {customArray.length > 0 && (
          <>
            <div className="flex gap-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#0b572a] border border-black"></div>
                <span className="text-sm">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#4937bd] border border-black"></div>
                <span className="text-sm">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#37a262] border border-black"></div>
                <span className="text-sm">Minimum</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] p-8 rounded-2xl shadow-2xl w-full mb-6 border-slate-500 border-1 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-center text-black drop-shadow-md">Your Array:</h2>
              <div className="flex justify-center overflow-x-auto">
                <div className="flex items-end gap-2 py-8 h-[400px]">
                  {customArray.map((value, index) => (
                    <ArrayBar
                      key={index}
                      value={value}
                      index={index}
                      currentIndex={currentIndex}
                      minIndex={minIndex}
                      comparingIndex={comparingIndex}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-2">
              {isSorting && (
            <button
              onClick={() => {
                pauseRef.current = !pauseRef.current;
                setIsPaused(pauseRef.current);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition duration-300"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          )} </div>
            </div>

            <div
              id="messages-container"
              className="max-h-48 overflow-y-auto border border-gray-700 rounded p-4 space-y-3 bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] animate-fade-in"
            >
              {messages.length === 0 ? (
                <p className="text-black text-center italic">Swap messages will appear here.</p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-[#313272] bg-[#8C8DC1] p-3 rounded shadow text-white font-bold font-mono animate-pulse"
                  >
                    {msg}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}
