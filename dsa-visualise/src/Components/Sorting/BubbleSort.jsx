// BubbleSortVisualizer.jsx
import { useState, useRef } from "react";
import Nav from "../NavBarSide/nav";
import Header from "../Header";

function ArrayBar({ value, index, currentIndex, comparingIndex, nextcomparing }) {
  const baseClasses =
    "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:scale-105";

  let bgColor = "bg-[#8C8DC1]";
  let textColor = "text-white";
  let ring = "";
  let shadow = "shadow-[0_0_6px_1px_rgba(59,130,246,0.3)]";

  if (index === comparingIndex || index === nextcomparing) {
    bgColor = "bg-[#4937bd]";
    shadow = "shadow-[0_0_20px_5px_rgba(49,30,172,0.6)]";
    ring = "ring-2 ring-[#645dd7]";
  }
  if (index === currentIndex) {
    bgColor = "bg-[#37a262]";
    shadow = "shadow-[0_0_22px_6px_rgba(55,162,98,0.7)]";
    ring = "ring-2 ring-[#aef3ce]";
  }

  return (
    <div className={`${baseClasses} ${bgColor} ${textColor} ${ring} ${shadow}`} style={{ height: `${value * 3}px` }}>
      <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">{value}</span>
    </div>
  );
}

export default function BubbleSort() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customArray, setCustomArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [nextcomparing, setnextcomparing] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sortOrder, setSortOrder] = useState("increasing");

  const pauseRef = useRef(false);

  const generateRandomArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setCustomArray(arr);
    resetStates();
  };

  const handleSubmit = () => {
    const array = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    setCustomArray(array);
    resetStates();
  };

  const resetStates = () => {
    setCurrentIndex(null);
    setComparingIndex(null);
    setnextcomparing(null);
    setMessages([]);
    pauseRef.current = false;
    setIsPaused(false);
    if (customArray.length > 0) bubbleSort();
  };

  const addMessage = (text) => setMessages((msgs) => [...msgs, text]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const checkPause = async () => {
    while (pauseRef.current) {
      await delay(100);
    }
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...customArray];
    const n = arr.length;
    const isInc = sortOrder === "increasing";

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparingIndex(j);
        setnextcomparing(j + 1);
        await checkPause();
        await delay(1000 - speed * 9);

        const shouldSwap = isInc ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
        if (shouldSwap) {
          setCurrentIndex(j + 1);
          addMessage(`Swapping ${arr[j]} and ${arr[j + 1]}`);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setCustomArray([...arr]);
          await delay(1000 - speed * 9);
        }
      }
    }

    resetStatesWithoutRestart();
    setIsSorting(false);
  };

  const resetStatesWithoutRestart = () => {
    setCurrentIndex(null);
    setComparingIndex(null);
    setnextcomparing(null);
    setMessages([]);
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

        <div className="col-span-4 min-h-screen w-full bg-white text-white p-8 font-sans rounded-lg">
        <div className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
          Bubble Sort Visualizer
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-6 bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] rounded-xl p-10 border-white border-1">
            <label className="flex items-center gap-2">
              <strong className="text-black text-lg">Size:</strong>
              <input
                type="number"
                value={size}
                disabled={isSorting}
                onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))}
                className="w-16 px-2 py-1 rounded border border-gray-600 bg-white text-black"
              />
            </label>
            <label className="flex items-center gap-2">
              <strong className="text-black text-lg">Speed: {speed}%</strong>
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
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={isSorting}
              className="px-3 py-1 bg-white rounded-lg border border-gray-500 text-black"
            >
              <option value="increasing">Increasing</option>
              <option value="decreasing">Decreasing</option>
            </select>
            <button
              onClick={() => setShow((prev) => !prev)}
              disabled={isSorting}
              className="px-4 py-2 text-white font-semibold bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg shadow-lg hover:to-blue-800"
            >
              {show ? "Hide Custom Input" : "Enter Custom Array"}
            </button>
            <button
              onClick={generateRandomArray}
              disabled={isSorting}
              className="px-4 py-2 font-semibold bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg shadow-lg"
            >
              Generate Random Array
            </button>
            <button
              onClick={bubbleSort}
              disabled={isSorting || customArray.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 text-white font-bold rounded-lg shadow-lg"
            >
              Start Bubble Sort
            </button>
          </div>

          {show && (
            <div className="mb-6">
              <p className="mb-2 text-black text-lg">Enter array values (comma separated):</p>
              <input
                type="text"
                placeholder="e.g. 10, 5, 22, 1, 7"
                value={inputValue}
                disabled={isSorting}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full text-black px-4 py-2 rounded border border-purple-500 bg-purple-100 text-lg"
              />
              <button
                onClick={handleSubmit}
                disabled={isSorting}
                className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 hover:text-white rounded-lg shadow-lg text-lg"
              >
                Submit
              </button>
            </div>
          )}

          {customArray.length > 0 && (
            <>
              <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] p-8 rounded-2xl shadow-2xl w-full mb-6 animate-fade-in border-white border-1">
                <h2 className="text-2xl font-semibold mb-4 text-center text-black drop-shadow-md">Your Array:</h2>
                <div className="flex justify-center overflow-x-auto">
                  <div className="flex items-end gap-2 py-8 h-[400px]">
                    {customArray.map((value, index) => (
                      <ArrayBar
                        key={index}
                        value={value}
                        index={index}
                        currentIndex={currentIndex}
                        comparingIndex={comparingIndex}
                        nextcomparing={nextcomparing}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-center gap-6">
                  {isSorting && (
                    <>
                      <button
                        onClick={() => {
                          pauseRef.current = !pauseRef.current;
                          setIsPaused(pauseRef.current);
                        }}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md"
                      >
                        {isPaused ? "Resume" : "Pause"}
                      </button>
                      {/* <button
                        onClick={resetStates}
                        className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md"
                      >
                        Reset
                      </button> */}
                    </>
                  )}
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto border border-gray-600 rounded p-4 space-y-3 bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] animate-fade-in">
                {messages.length === 0 ? (
                  <p className="text-black text-center italic">Swap messages will appear here.</p>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className="border-l-4 border-[#313272] bg-[#8C8DC1] p-3 rounded shadow text-white font-bold font-mono"
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