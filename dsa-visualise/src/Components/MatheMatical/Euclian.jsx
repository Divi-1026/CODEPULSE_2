import { useState } from "react";

export default function Euclian() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  async function Euclean() {
    const div1 = document.getElementById("main");
    div1.innerHTML = ""; // Clear previous steps

    let a = Math.max(Number(first), Number(second));
    let b = Math.min(Number(first), Number(second));

    while (b !== 0) {
      const stepBox = document.createElement("div");
      stepBox.className =
        "bg-[#1e293b] text-white w-full sm:w-[60%] mx-auto my-4 px-4 py-3 rounded-lg border border-blue-400 shadow-md";

      stepBox.innerHTML = `
        <h2 class="text-lg font-semibold mb-1">Step:</h2>
        <p><strong>First Number:</strong> ${a}</p>
        <p><strong>Second Number:</strong> ${b}</p>
        <p><strong>GCD(${a}, ${b})</strong> = ${a} % ${b} = <span class="text-yellow-400 font-semibold">${a % b}</span></p>
      `;

      div1.appendChild(stepBox);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const temp = b;
      b = a % b;
      a = temp;
    }

    const finalStep = document.createElement("div");
    finalStep.className =
      "bg-green-700 text-white w-full sm:w-[60%] mx-auto mt-6 px-4 py-4 rounded-lg border shadow-md text-center";

    finalStep.innerHTML = `
      <h2 class="text-xl font-bold">GCD Found</h2>
      <p class="text-lg mt-2">GCD of ${first} and ${second} is <span class="text-yellow-300 font-semibold text-2xl">${a}</span></p>
    `;

    div1.appendChild(finalStep);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Inputs and Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-900 rounded-xl p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Enter Two Numbers</h2>
          <input
            type="number"
            placeholder="First Number"
            className="px-4 py-2 rounded bg-slate-800 border border-gray-600 w-full"
            onChange={(e) => setFirst(e.target.value)}
          />
          <input
            type="number"
            placeholder="Second Number"
            className="px-4 py-2 rounded bg-slate-800 border border-gray-600 w-full"
            onChange={(e) => setSecond(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={Euclean}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-md text-lg font-semibold"
          >
            Start
          </button>
          <button
            onClick={() => (document.getElementById("main").innerHTML = "")}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg shadow-md text-lg font-semibold"
          >
            Clear
          </button>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
          <h3 className="text-lg font-semibold mb-2">About Euclidean Algorithm</h3>
          <p className="text-sm opacity-80">
            The Euclidean algorithm efficiently finds the greatest common divisor
            (GCD) of two integers. It repeatedly replaces the larger number with
            the remainder of the two until one becomes zero. The last non-zero
            remainder is the GCD.
          </p>
        </div>
      </div>

      {/* Steps Visualization */}
      <div id="main" className="mt-10"></div>
    </div>
  );
}
