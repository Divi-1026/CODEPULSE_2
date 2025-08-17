import { useState, useRef } from "react";
import Nav from "../NavBarSide/nav";
import Header from "../Header";
import CompletionCheckbox from "../ProblemCheckBox";
function ArrayBar({ value, index, currentIndex, minIndex, comparingIndex, nextcomparing }) {
  const baseClasses =
    "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:scale-105";

  let bgColor = "bg-[#8C8DC1]";
  let textColor = "text-white";
  let ring = "";
  let shadow = "shadow-[0_0_8px_2px_rgba(59,130,246,0.4)]";

  if (index === currentIndex) {
    bgColor = "bg-[#0b572a]";
  } else if (index === comparingIndex) {
    bgColor = "bg-[#4937bd]";
  } else if (index === nextcomparing) {
    bgColor = "bg-[#37a262] animate-pulse";
  }

  return (
    <div className={`${baseClasses} ${bgColor} ${textColor} ${ring} ${shadow}`} style={{ height: `${value * 3}px` }}>
      <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">{value}</span>
    </div>
  );
}

export default function InsertionSort() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customArray, setCustomArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [nextcomparing, setNextComparing] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState([]);
  const pauseRef = useRef(false);

  const generateRandomArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setCustomArray(arr);
    resetHighlights();
  };

  const handleSubmit = () => {
    const array = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    setCustomArray(array);
    resetHighlights();
  };

  const resetHighlights = () => {
    setCurrentIndex(null);
    setComparingIndex(null);
    setNextComparing(null);
    setMessages([]);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const checkPause = async () => {
    while (pauseRef.current) {
      await delay(100);
    }
  };

  const addMessage = (text) => {
    setMessages((msgs) => [...msgs, text]);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    let arr = [...customArray];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      setCurrentIndex(i);
      setNextComparing(i);
      addMessage(`Picking element ${key} for insertion`);
      await delay(1000 - speed * 9);
      await checkPause();

      while (j >= 0 && arr[j] > key) {
        setComparingIndex(j);
        addMessage(`Comparing ${arr[j]} > ${key}, shifting ${arr[j]} right`);
        arr[j + 1] = arr[j];
        setCustomArray([...arr]);
        await delay(1000 - speed * 9);
        await checkPause();
        j--;
      }

      arr[j + 1] = key;
      setCustomArray([...arr]);
      addMessage(`Inserting ${key} at position ${j + 1}`);

      setComparingIndex(null);
      setNextComparing(null);
      await delay(1000 - speed * 9);
    }

    resetHighlights();
    setIsSorting(false);
    pauseRef.current = false;
    setIsPaused(false);
  };

  return (<>
          <Header />
          <div className="grid grid-cols-5 gap-4 mt-48 md:mt-36">
            <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
              <Nav />
            </div>

      <div className="col-span-4 min-h-screen w-full bg-white text-black p-8 font-sans rounded-lg">
      <div className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
          Insertion Sort Visualizer
          </div>  <div className="flex flex-wrap items-center gap-4 mb-6 bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] rounded-xl p-10 border-white border-1">
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
            onClick={insertionSort}
            disabled={isSorting || customArray.length === 0}
            className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 rounded-lg shadow-lg transition-all duration-300 text-white"
          >
            Start Insertion Sort
          </button>

        </div>

        {show && (
          <div className="mb-6">
            <p className="mb-2 text-lg">Enter array values (comma separated):</p>
            <input
              type="text"
              placeholder="e.g. 10, 5, 22, 1, 7"
              value={inputValue}
              disabled={isSorting}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 rounded border border-purple-500 bg-purple-100 text-lg text-black"
            />
            <button
              onClick={handleSubmit}
              disabled={isSorting}
              className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg text-lg text-white"
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
                <span className="text-sm">Next Insert</span>
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
                      comparingIndex={comparingIndex}
                      nextcomparing={nextcomparing}
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
              className="max-h-48 overflow-y-auto border border-gray-600 rounded p-4 space-y-3 bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] animate-fade-in"
            >
              {messages.length === 0 ? (
                <p className="text-black text-center italic">Steps will appear here.</p>
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
      <div className="fixed bottom-4 right-4 bg-white p-6 rounded-xl shadow-xl border border-gray-300 z-50 transform transition-all hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
            
                <CompletionCheckbox problemTitle="Insertion Sort" />
              </div>
            </div>
    </div>
    </>
  );
}
