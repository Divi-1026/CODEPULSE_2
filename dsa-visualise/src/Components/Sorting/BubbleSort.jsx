import { useState } from "react";
import Nav from "../NavBarSide/nav";
function ArrayBar({ value, index, currentIndex, minIndex, comparingIndex, nextcomparing }) {
  const baseClasses =
    "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:scale-105";

  let bgColor = "bg-[#3b82f6]"; // ✨ Medium Blue (Default)
  let textColor = "text-white";
  let ring = "";
  let shadow = "shadow-[0_0_8px_2px_rgba(59,130,246,0.4)]";

  // Swapping (both bars have same color)
  if (index === currentIndex || index === minIndex) {
    bgColor = "bg-green-700";
    textColor = "text-white";
    ring = "ring-1 ring-black";
    shadow = "shadow-[0_0_18px_4px_rgba(147,197,253,0.7)]";
  }
  // Comparing current
  else if (index === comparingIndex) {
    bgColor = "bg-[#1e40af]"; // Darker Blue
    ring = "ring-2 ring-blue-500";
    shadow = "shadow-[0_0_15px_3px_rgba(59,130,246,0.6)]";
  }
  // Next to be compared
  else if (index === nextcomparing) {
    bgColor = "bg-[#2563eb]"; // Slightly darker medium blue
    ring = "ring-1 ring-blue-300";
    shadow = "shadow-[0_0_10px_2px_rgba(147,197,253,0.5)]";
  }

  return (
    <div
      className={`${baseClasses} ${bgColor} ${textColor} ${ring} ${shadow}`}
      style={{ height: `${value * 3}px` }}
    >
      <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">
        {value}
      </span>
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
  const [minIndex, setMinIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [nextcomparing, setnextcomparing] = useState(null);

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

  const selectionSort = async () => {
    setIsSorting(true);
    let arr = [...customArray];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      await delay(1000 - speed * 9);
      for (let j = 0; j < n - i - 1; j++) {
        setComparingIndex(j);
        setnextcomparing(j + 1);
        await delay(1000 - speed * 9);
        if (arr[j] > arr[j + 1]) {
          await delay(1000 - speed * 9);
          setCurrentIndex(j + 1);
          setMinIndex(j);
          addMessage(`Swapping of element ${arr[j]}(index ${j}) with element ${arr[j + 1]} (index ${j + 1})`);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setCustomArray(arr);
        }
      }
      setMinIndex(null);
    }

    setCurrentIndex(null);
    setMinIndex(null);
    setComparingIndex(null);
    setIsSorting(false);
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <Nav />
        </div>
        <div className="col-span-4 min-h-screen w-full bg-[#39554b] text-white p-8 font-sans">
          <div className="flex flex-wrap items-center gap-4 mb-6 bg-gradient-to-br from-[#add3c4] to-[#a1bf81] rounded-xl p-4 border-white border-1">
            <label className="flex items-center gap-2">
              <strong>Size:</strong>
              <input
                type="number"
                value={size}
                disabled={isSorting}
                onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))}
                className="w-16 px-2 py-1 rounded border border-gray-600 bg-[#547f58] text-white"
              />
            </label>
            <label className="flex items-center gap-2">
              <strong>Speed: {speed}%</strong>
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
              className="px-4 py-2 text-white font-semibold bg-[#66992c] hover:bg-[#4b7b14] rounded-lg shadow-lg"
            >
              {show ? "Hide Custom Input" : "Enter Custom Array"}
            </button>
            <button
              onClick={generateRandomArray}
              disabled={isSorting}
              className="px-4 py-2 font-semibold bg-[#3f6842] text-white hover:bg-[#274229] rounded-lg shadow-lg"
            >
              Generate Random Array
            </button>
            <button
              onClick={selectionSort}
              disabled={isSorting || customArray.length === 0}
              className="px-4 py-2 bg-[#4b721e] hover:bg-[#304912] text-white font-bold rounded-lg shadow-lg"
            >
              Start Bubble Sort
            </button>
          </div>

          {show && (
            <div className="mb-6">
              <p className="mb-2 text-white text-lg">Enter array values (comma separated):</p>
              <input
                type="text"
                placeholder="e.g. 10, 5, 22, 1, 7"
                value={inputValue}
                disabled={isSorting}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full text-black px-4 py-2 rounded border border-green-800 bg-[#b1bda3] text-lg"
              />
              <button
                onClick={handleSubmit}
                disabled={isSorting}
                className="mt-4 px-5 py-2 bg-[#d0d289] hover:bg-[#9b9d63] hover:text-white rounded-lg shadow-lg text-lg"
              >
                Submit
              </button>
            </div>
          )}

          {customArray.length > 0 && (
            <>
              <div className="bg-gradient-to-r from-[#add3c4] via-[#b7c2ad] to-[#a1bf81] p-8 rounded-2xl shadow-2xl w-full mb-6 animate-fade-in border-white border-1">
                <h2 className="text-2xl font-semibold mb-4 text-center text-white drop-shadow-md">Your Array:</h2>
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
                        nextcomparing={nextcomparing}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                id="messages-container"
                className="max-h-48 overflow-y-auto border border-gray-700 rounded p-4 space-y-3 bg-[#39554b] animate-fade-in"
              >
                {messages.length === 0 && (
                  <p className="text-gray-400 text-center italic">Swap messages will appear here.</p>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-cyan-400 bg-cyan-900/40 p-3 rounded shadow text-green-300 font-bold font-mono"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}