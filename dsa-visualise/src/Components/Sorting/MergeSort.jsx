import { useState, useRef } from "react";
import Nav from "../NavBarSide/nav";
import Header from "../Header";

function ArrayBar({ value, index, currentIndices, comparingIndices, mergedIndices }) {
  const baseClasses =
    "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:scale-105";

  let bgColor = "bg-[#8C8DC1]";
  let textColor = "text-black";
  let ring = "";
  let shadow = "shadow-[0_0_8px_2px_rgba(59,130,246,0.4)]";

  if (mergedIndices.includes(index)) {
    bgColor = "bg-[#580C8E]";
    ring = "ring-1 ring-[#3e0966]";
    shadow = "shadow-[0_0_16px_4px_rgba(88,12,142,0.65)]";
  } else if (currentIndices.includes(index)) {
    bgColor = "bg-[#0b572a]";
  } else if (comparingIndices.includes(index)) {
    bgColor = "bg-[#4937bd] animate-pulse";
  }

  return (
    <div className={`${baseClasses} ${bgColor} ${textColor} ${ring} ${shadow}`} style={{ height: `${value * 3}px` }}>
      <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">{value}</span>
    </div>
  );
}

export default function MergeSort() {
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customArray, setCustomArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState([]);

  const [currentIndices, setCurrentIndices] = useState([]);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [mergedIndices, setMergedIndices] = useState([]);

  const pauseRef = useRef(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const checkPause = async () => {
    while (pauseRef.current) {
      await delay(100);
    }
  };

  const resetVisualization = () => {
    setCurrentIndices([]);
    setComparingIndices([]);
    setMergedIndices([]);
    setMessages([]);
  };

  const addMessage = (text) => {
    setMessages((msgs) => [...msgs, text]);
  };

  const generateRandomArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setCustomArray(arr);
    resetVisualization();
  };

  const handleSubmit = () => {
    const array = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((item) => !isNaN(item));
    setCustomArray(array);
    resetVisualization();
  };

  const mergeSort = async () => {
    setIsSorting(true);
    resetVisualization();
    let arr = [...customArray];
    await performMergeSort(arr, 0, arr.length - 1);
    setMergedIndices(Array.from({ length: arr.length }, (_, i) => i));
    addMessage("Sorting complete!");
    setIsSorting(false);
    pauseRef.current = false;
    setIsPaused(false);
  };

  const performMergeSort = async (arr, left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    setCurrentIndices(Array.from({ length: right - left + 1 }, (_, i) => left + i));
    addMessage(`Splitting array from index ${left} to ${right}`);
    await delay(1000 - speed * 9);
    await checkPause();

    await performMergeSort(arr, left, mid);
    await performMergeSort(arr, mid + 1, right);

    addMessage(`Merging subarrays from ${left} to ${mid} and ${mid + 1} to ${right}`);
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    const temp = [];
    let i = left, j = mid + 1, k = 0;

    const leftSub = Array.from({ length: mid - left + 1 }, (_, idx) => left + idx);
    const rightSub = Array.from({ length: right - mid }, (_, idx) => mid + 1 + idx);
    setCurrentIndices([...leftSub, ...rightSub]);
    await delay(1000 - speed * 9);
    await checkPause();

    while (i <= mid && j <= right) {
      setComparingIndices([i, j]);
      await delay(1000 - speed * 9);
      await checkPause();
      if (arr[i] <= arr[j]) temp[k++] = arr[i++];
      else temp[k++] = arr[j++];
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (let x = 0; x < temp.length; x++) {
      arr[left + x] = temp[x];
      setMergedIndices((prev) => [...prev, left + x]);
      setCustomArray([...arr]);
      await delay(1000 - speed * 9);
      await checkPause();
    }

    setComparingIndices([]);
    setMergedIndices([]);
    setCustomArray([...arr]);
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
            Merge Sort Visualizer
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] rounded-xl p-10 border-white border-1">
            <label className="flex items-center gap-2">
              <strong className="text-lg">Size:</strong>
              <input type="number" value={size} disabled={isSorting} onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))} className="w-16 px-2 py-1 rounded border border-gray-600 bg-white text-black" />
            </label>

            <label className="flex items-center gap-2">
              <strong className="text-lg">Speed: {speed}%</strong>
              <input type="range" min="0" max="100" value={speed} disabled={isSorting} onChange={(e) => setSpeed(+e.target.value)} className="w-32 text-blue-500" />
            </label>

            <button onClick={() => setShow((prev) => !prev)} disabled={isSorting} className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 rounded-lg shadow-lg transition-all duration-300 text-white">
              {show ? "Hide Custom Input" : "Enter Custom Array"}
            </button>

            <button onClick={generateRandomArray} disabled={isSorting} className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-700 rounded-lg shadow-lg transition-all duration-300 text-white">
              Generate Random Array
            </button>

            <button onClick={mergeSort} disabled={isSorting || customArray.length === 0} className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 rounded-lg shadow-lg transition-all duration-300 text-white">
              Start Merge Sort
            </button>
          </div>

          {show && (
            <div className="mb-6">
              <p className="mb-2 text-lg">Enter array values (comma separated):</p>
              <input type="text" placeholder="e.g. 10, 5, 22, 1, 7" value={inputValue} disabled={isSorting} onChange={(e) => setInputValue(e.target.value)} className="w-full px-4 py-2 rounded border border-purple-500 bg-purple-100 text-lg text-black" />
              <button onClick={handleSubmit} disabled={isSorting} className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg text-lg text-white">
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
                  <div className="w-4 h-4 rounded bg-[#580C8E] border border-black"></div>
                  <span className="text-sm">Merged</span>
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
                        currentIndices={currentIndices}
                        comparingIndices={comparingIndices}
                        mergedIndices={mergedIndices}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-2">
                  {isSorting && (
                    <button onClick={() => { pauseRef.current = !pauseRef.current; setIsPaused(pauseRef.current); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition duration-300">
                      {isPaused ? "Resume" : "Pause"}
                    </button>
                  )}
                </div>
              </div>

              <div id="messages-container" className="max-h-48 overflow-y-auto border border-gray-600 rounded p-4 space-y-3 bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] animate-fade-in">
                {messages.length === 0 ? (
                  <p className="text-black text-center italic">Merge sort steps will appear here.</p>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className="border-l-4 border-[#313272] bg-[#8C8DC1] p-3 rounded shadow text-white font-bold font-mono animate-pulse">
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
