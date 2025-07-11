
// import { useState } from "react";
// import Nav from "../NavBarSide/nav";
// function ArrayBar({ value, index, currentIndex, minIndex, comparingIndex ,nextcomparing}) {
//     const baseClasses = "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-xl hover:scale-105";
//     let bgColor = "bg-sky-400";
//     if (index === minIndex) bgColor = "bg-red-500 animate-pulse";
//     else if (index === currentIndex) bgColor = "bg-green-500 ";
//     else if (index === comparingIndex)bgColor = " bg-sky-600 ring-2 ring-blue-500 text-white shadow-[0_0_20px_2px_rgba(59,130,246,0.5)]";
//   else if(index===nextcomparing) bgColor="bg-sky-600 ring-1 ring-blue-500 text-white shadow-[0_0_18px_12px_rgba(59,130,246,0.5)]";
//     return (
//       <div className={`${baseClasses} ${bgColor}`} style={{ height: `${value * 3}px` }}>
//         <span className="absolute -top-5 text-white text-sm font-semibold drop-shadow-md">{value}</span>
//       </div>
//     );
//   }
  
//   export default function InsertionSort() {
//     const [size, setSize] = useState(10);
//     const [speed, setSpeed] = useState(50);
//     const [show, setShow] = useState(false);
//     const [inputValue, setInputValue] = useState("");
//     const [customArray, setCustomArray] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(null);
//     const [minIndex, setMinIndex] = useState(null);
//     const [comparingIndex, setComparingIndex] = useState(null);
//     const [isSorting, setIsSorting] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const[nextcomparing,setnextcomparing]=useState(null);
  
//     const generateRandomArray = () => {
//       const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
//       setCustomArray(arr);
//       setCurrentIndex(null);
//       setMinIndex(null);
//       setComparingIndex(null);
//       setMessages([]);
//     };
  
//     const handleSubmit = () => {
//       const array = inputValue
//         .split(",")
//         .map((item) => parseInt(item.trim(), 10))
//         .filter((item) => !isNaN(item));
//       setCustomArray(array);
//       setCurrentIndex(null);
//       setMinIndex(null);
//       setComparingIndex(null);
//       setMessages([]);
//     };
  
//     const addMessage = (text) => {
//       setMessages((msgs) => [...msgs, text]);
//     };
  
//     const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  
//     const selectionSort = async () => {
//       setIsSorting(true);
      
//         setIsSorting(true);
//         let arr = [...customArray];
//         const n = arr.length;
      
//         for (let i = 1; i < n; i++) {
//           let key = arr[i];
//           let j = i - 1;
      
//           setCurrentIndex(i);
//           setnextcomparing(i);
//           addMessage(`Picking element ${key} for insertion`);
      
//           await delay(1000 - speed * 9);
      
//           while (j >= 0 && arr[j] > key) {
//             setComparingIndex(j);
//             addMessage(`Comparing ${arr[j]} > ${key}, shifting ${arr[j]} right`);
      
//             arr[j + 1] = arr[j];
//             setCustomArray([...arr]);
//             await delay(1000 - speed * 9);
      
//             j--;
//           }
      
//           arr[j + 1] = key;
//           setCustomArray([...arr]);
//           addMessage(`Inserting ${key} at position ${j + 1}`);
      
//           setComparingIndex(null);
//           setnextcomparing(null);
//           await delay(1000 - speed * 9);
//         }
      
//         setCurrentIndex(null);
//         setComparingIndex(null);
//         setIsSorting(false);
//       };
      
        
      
  
    
  
//     return (
//       <>
//        <div className="grid grid-cols-5 gap-4">
//             <div className="col-span-1">
//             <Nav></Nav> </div>
//       <div className=" col-span-4 min-h-screen w-full  bg-gray-900 text-white p-8 font-sans">
//         <div className="flex flex-wrap items-center gap-4 mb-6  bg-slate-800/80 md:h-25 w-full rounded-xl p-4 border-slate-500 border-1">
//           <label className="flex items-center gap-2">
//             <strong>Size:</strong>
//             <input
//               type="number"
//               value={size}
//               disabled={isSorting}
//               onChange={(e) => setSize(Math.max(5, Math.min(200, +e.target.value)))}
//               className="w-16 px-2 py-1 rounded border border-gray-600 bg-gray-800 text-white"
//             />
//           </label>
  
//           <label className="flex items-center gap-2">
//             <strong>Speed: {speed}%</strong>
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={speed}
//               disabled={isSorting}
//               onChange={(e) => setSpeed(+e.target.value)}
//               className="w-32 text-blue-500"
//             />
//           </label>
  
//           <button
//             onClick={() => setShow((prev) => !prev)}
//             disabled={isSorting}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300"
//           >
//             {show ? "Hide Custom Input" : "Enter Custom Array"}
//           </button>
  
//           <button
//             onClick={generateRandomArray}
//             disabled={isSorting}
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition-all duration-300"
//           >
//             Generate Random Array
//           </button>
  
//           <button
//             onClick={selectionSort}
//             disabled={isSorting || customArray.length === 0}
//             className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg transition-all duration-300"
//           >
//             Start Insertion Sort
//           </button>
//         </div>
  
//         {show && (
//           <div className="mb-6">
//             <p className="mb-2">Enter array values (comma separated):</p>
//             <input
//               type="text"
//               placeholder="e.g. 10, 5, 22, 1, 7"
//               value={inputValue}
//               disabled={isSorting}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-800 text-white text-lg"
//             />
//             <button
//               onClick={handleSubmit}
//               disabled={isSorting}
//               className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg text-lg transition-all duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         )}
  
//         {customArray.length > 0 && (
//           <>
//             <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full mb-6 animate-fade-in border-slate-500 border-1">
//               <h2 className="text-2xl font-semibold mb-4 text-center text-white drop-shadow-md">Your Array:</h2>
//               <div className="flex justify-center overflow-x-auto">
//                 <div className="flex items-end gap-2 py-8 h-[400px]">
//                   {customArray.map((value, index) => (
//                     <ArrayBar
//                       key={index}
//                       value={value}
//                       index={index}
//                       currentIndex={currentIndex}
//                       minIndex={minIndex}
//                       comparingIndex={comparingIndex}
//                       nextcomparing={nextcomparing}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
  
//             <div
//               id="messages-container"
//               className="max-h-48 overflow-y-auto border border-gray-700 rounded p-4 space-y-3 bg-gray-800 animate-fade-in"
//             >
//               {messages.length === 0 && (
//                 <p className="text-gray-400 text-center italic">Swap messages will appear here.</p>
//               )}
//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className="border-l-4 border-cyan-400 bg-cyan-900/40 p-3 rounded shadow text-green-300 font-bold font-mono "
//                 >
//                   {msg}
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//       </div></>
//     );
//   }







import { useState } from "react";
import Nav from "../NavBarSide/nav";

function ArrayBar({ value, index, currentIndex, minIndex, comparingIndex, nextcomparing }) {
  const baseClasses =
    "w-12 rounded flex justify-center items-end relative transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:scale-105";

  let bgColor = "bg-[#8C8DC1]";
  let textColor = "text-white";
  let ring = "";
  let shadow = "shadow-[0_0_8px_2px_rgba(59,130,246,0.4)]";

  if (index === currentIndex || index === minIndex) {
    bgColor = "bg-[#313272]";
    textColor = "text-white";
    ring = "ring-1 ring-[#1e1f4d]";
    shadow = "shadow-[0_0_20px_5px_rgba(49,50,114,0.8)]";
  } else if (index === comparingIndex) {
    bgColor = "bg-[#DEDEFA]";
    ring = "ring-2 ring-[#b7b7f5]";
    shadow = "shadow-[0_0_18px_4px_rgba(222,222,250,0.7)]";
  } else if (index === nextcomparing) {
    bgColor = "bg-[#580C8E]";
    ring = "ring-1 ring-[#3e0966]";
    shadow = "shadow-[0_0_16px_4px_rgba(88,12,142,0.65)]";
  }

  return (
    <div
      className={`${baseClasses} ${bgColor} ${textColor} ${ring} ${shadow}`}
      style={{ height: `${value * 3}px` }}
    >
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

  const insertionSort = async () => {
    setIsSorting(true);
    let arr = [...customArray];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      setCurrentIndex(i);
      setnextcomparing(i);
      addMessage(`Picking element ${key} for insertion`);
      await delay(1000 - speed * 9);

      while (j >= 0 && arr[j] > key) {
        setComparingIndex(j);
        addMessage(`Comparing ${arr[j]} > ${key}, shifting ${arr[j]} right`);
        arr[j + 1] = arr[j];
        setCustomArray([...arr]);
        await delay(1000 - speed * 9);
        j--;
      }

      arr[j + 1] = key;
      setCustomArray([...arr]);
      addMessage(`Inserting ${key} at position ${j + 1}`);

      setComparingIndex(null);
      setnextcomparing(null);
      await delay(1000 - speed * 9);
    }

    setCurrentIndex(null);
    setComparingIndex(null);
    setIsSorting(false);
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <Nav />
        </div>
        <div className="col-span-4 min-h-screen w-full bg-white text-white p-8 font-sans">
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
              className="px-4 py-2 font-semibold bg-gradient-to-r from-blue-800 to-blue-900 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg"
            >
              Generate Random Array
            </button>
            <button
              onClick={insertionSort}
              disabled={isSorting || customArray.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg"
            >
              Start Insertion Sort
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
                className="max-h-48 overflow-y-auto border border-gray-600 rounded p-4 space-y-3 bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] animate-fade-in"
              >
                {messages.length === 0 && (
                  <p className="text-black text-center italic">Swap messages will appear here.</p>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-[#313272] bg-[#8C8DC1] p-3 rounded shadow text-white font-bold font-mono"
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
