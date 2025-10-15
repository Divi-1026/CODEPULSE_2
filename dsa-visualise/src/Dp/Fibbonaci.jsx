import React, { useState } from "react";

const FibonacciAnimatedDP = () => {
  const [n, setN] = useState(10);
  const [dp, setDp] = useState([]);
  const [current, setCurrent] = useState(null);
  const [speed, setSpeed] = useState(500);

  const computeFibonacci = async () => {
    let table = Array(n + 1).fill(null);
    table[0] = 0;
    table[1] = 1;
    setDp([...table]);

    for (let i = 2; i <= n; i++) {
      setCurrent(i);
      await new Promise((r) => setTimeout(r, speed));
      table[i] = table[i - 1] + table[i - 2];
      setDp([...table]);
      await new Promise((r) => setTimeout(r, speed));
    }
    setCurrent(null);
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Fibonacci DP Visualizer</h2>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-300">n:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={n}
            onChange={(e) => setN(+e.target.value)}
            className="px-2 py-1 rounded text-black w-20"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-300">Speed:</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
            className="w-40 accent-blue-500"
          />
          <span className="w-12 text-gray-300 text-center">{speed}ms</span>
        </div>

        <button
          onClick={computeFibonacci}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
        >
          Start
        </button>
      </div>

      <div className="grid grid-cols-auto-fit gap-2 w-full max-w-3xl justify-center">
        {dp.map((val, idx) => (
          <div
            key={idx}
            className={`w-16 h-16 flex justify-center items-center font-mono font-bold text-lg rounded border-2
              ${
                idx === current
                  ? "bg-green-500 text-white border-white"
                  : val !== null
                  ? "bg-blue-500 text-white border-blue-700"
                  : "bg-slate-700 text-gray-300 border-slate-600"
              }`}
          >
            {val !== null ? val : "-"}
          </div>
        ))}
      </div>

      {current !== null && (
        <div className="mt-6 text-gray-300">
          <p>
            Computing <strong>F({current})</strong> = F({current - 1}) + F({current - 2})
          </p>
        </div>
      )}
    </div>
  );
};

export default FibonacciAnimatedDP;
