// import { useState } from "react";
// import { Graph } from "react-d3-graph";
// import Nav from "../NavBarSide/nav";

// // Build adjacency list
// const build = (nodes, links, directed = false) => {
//   const adj = {};
//   nodes.forEach((node) => (adj[node.id] = []));
//   links.forEach(({ source, target }) => {
//     adj[source].push(target);
//     if (!directed) adj[target].push(source);
//   });
//   return adj;
// };

// export default function DFS() {
//   const [startNode, setStartNode] = useState("A");
//   const [visitedOrder, setVisitedOrder] = useState([]);
//   const [parentMap, setParentMap] = useState({});
//   const [size, setSize] = useState("small");
//   const [graphType, setGraphType] = useState("undirected");
//   const [nodeColors, setNodeColors] = useState({});
//   const [linkColors, setLinkColors] = useState({});

//   const graphRaw = size === "small" ? smallGraph : largeGraph;
//   const directed = graphType === "directed";
//   const adjlist = build(graphRaw.nodes, graphRaw.links, directed);

//   const runDFS = (start) => {
//     const stack = [start];
//     const visited = new Set();
//     const parents = {};
//     const colors = {};
//     const links = {};
//     const order = [];

//     // Initially color the starting node orange
//     colors[start] = "orange";
//     setNodeColors({ ...colors });

//     const step = () => {
//       if (!stack.length) return;

//       const node = stack.pop();
//       if (visited.has(node)) {
//         setTimeout(step, 1000);
//         return;
//       }

//       visited.add(node);
//       order.push(node);
//       colors[node] = "green";
//       setVisitedOrder([...order]);
//       setNodeColors({ ...colors });

//       const neighbors = [...(adjlist[node] || [])].reverse();
//       for (const n of neighbors) {
//         if (!visited.has(n)) {
//           stack.push(n);
//           if (!parents[n]) parents[n] = node;
//           if (!colors[n]) colors[n] = "orange";

//           const key1 = `${node}-${n}`;
//           const key2 = `${n}-${node}`;
//           links[key1] = "#facc15";
//           links[key2] = "#facc15";
//         }
//       }

//       setParentMap({ ...parents });
//       setLinkColors({ ...links });

//       if (stack.length) setTimeout(step, 2000);
//     };

//     step();
//   };

//   const getCircularLayout = (nodes) => {
//     const radius = 150;
//     const centerX = 350;
//     const centerY = 225;

//     return nodes.map((node, i) => {
//       const angle = (2 * Math.PI * i) / nodes.length;
//       return {
//         ...node,
//         x: centerX + radius * Math.cos(angle),
//         y: centerY + radius * Math.sin(angle),
//         color: nodeColors[node.id] || "blue",
//       };
//     });
//   };

//   const circularNodes = getCircularLayout(graphRaw.nodes);

//   const graphData = {
//     nodes: circularNodes.map((n) => ({ ...n, highlighted: true })),
//     links: graphRaw.links.map((l) => ({
//       ...l,
//       color: linkColors[`${l.source}-${l.target}`] || "#94a3b8",
//     })),
//   };

//   const config = {
//     staticGraph: true,
//     directed,
//     width: 700,
//     height: 450,
//     panAndZoom: false,
//     node: {
//       size: 1000,
//       fontSize: 16,
//       fontColor: "white",
//       fontWeight: "600",
//       strokeWidth: 2,
//       highlightStrokeColor: "yellow",
//       labelPosition: "center",
//     },
//     link: {
//       strokeWidth: 2,
//       highlightColor: "yellow",
//     },
//     d3: { gravity: 0 },
//   };

//   return (
//     <div className="grid grid-cols-5 gap-0 bg-[#273425]">
//       <div className="col-span-1">
//         <Nav />
//       </div>

//       {/* Right Section */}
//       <div className="p-4 w-full col-span-4">
//         <div className="p-6 bg-[#364729] rounded-lg shadow-xl max-w-7xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-[#99dc74] mb-6">
//             DFS Visualizer
//           </h1>

//           {/* Controls */}
//           <div className="bg-gradient-to-br from-[#add3c4] to-[#a1bf81] flex flex-wrap justify-center gap-4 p-4 text-black rounded mb-6">
//             <div className="flex items-center gap-2">
//               <label className="font-semibold text-lg">Start :</label>
//               <input
//                 placeholder="A"
//                 className="w-16 h-8 px-2 py-1 rounded border border-gray-600 bg-[#7baa80]"
//                 value={startNode}
//                 onChange={(e) => setStartNode(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-2 font-semibold">
//               <label>Graph Type:</label>
//               <label>
//                 <input
//                   type="radio"
//                   value="undirected"
//                   checked={graphType === "undirected"}
//                   onChange={(e) => setGraphType(e.target.value)}
//                 />{" "}
//                 Undirected
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="directed"
//                   checked={graphType === "directed"}
//                   onChange={(e) => setGraphType(e.target.value)}
//                 />{" "}
//                 Directed
//               </label>
//             </div>

//             <div className="flex items-center gap-2 font-semibold ml-2">
//               <label>Graph Size:</label>
//               <label>
//                 <input
//                   type="radio"
//                   value="small"
//                   checked={size === "small"}
//                   onChange={(e) => setSize(e.target.value)}
//                 />{" "}
//                 Small
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="large"
//                   checked={size === "large"}
//                   onChange={(e) => setSize(e.target.value)}
//                 />{" "}
//                 Large
//               </label>
//             </div>

//             <button
//               onClick={() => runDFS(startNode)}
//               className="bg-[#2e16a8] hover:bg-[#a81616] ml-8 text-white px-4 py-2 rounded"
//             >
//               Start
//             </button>
//           </div>

//           {/* Graph Display */}
//           <div className="bg-gradient-to-br from-[#202b18] to-[#0e130a] rounded-lg p-4 flex justify-center items-center">
//             <div className="w-[700px] h-[450px]">
//               <Graph id="graph-id" data={graphData} config={config} />
//             </div>
//           </div>

//           {/* Output Sections */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//             <div className="bg-[#78a343] p-4 rounded">
//               <h2 className="font-semibold text-black text-lg mb-3">DFS Order</h2>
//               <div className="flex flex-wrap gap-2">
//                 {visitedOrder.map((n, i) => (
//                   <span
//                     key={i}
//                     className="bg-[#0e079b] text-white font-semibold px-2 py-1 rounded"
//                   >
//                     {n}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-[#78a343] p-4 rounded">
//               <h2 className="font-semibold text-black text-lg mb-3">
//                 Parent Relationships
//               </h2>
//               <ul className="list-disc list-inside text-blue-800 font-semibold">
//                 {Object.entries(parentMap).map(([child, parent]) => (
//                   <li key={child}>
//                     {child} ← {parent}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Sample Graphs
// const smallGraph = {
//   nodes: [
//     { id: "A" }, { id: "B" }, { id: "C" }, { id: "D" },
//     { id: "E" }, { id: "F" }, { id: "G" }, { id: "H" },
//   ],
//   links: [
//     { source: "A", target: "B" },
//     { source: "A", target: "D" },
//     { source: "A", target: "G" },
//     { source: "B", target: "C" },
//     { source: "D", target: "E" },
//     { source: "D", target: "F" },
//     { source: "G", target: "F" },
//     { source: "G", target: "H" },
//   ],
// };

// const largeGraph = {
//   nodes: [
//     { id: "A" }, { id: "B" }, { id: "C" }, { id: "D" },
//     { id: "E" }, { id: "F" }, { id: "G" }, { id: "H" },
//   ],
//   links: [
//     { source: "A", target: "B" }, { source: "A", target: "C" },
//     { source: "B", target: "D" }, { source: "B", target: "E" },
//     { source: "C", target: "F" }, { source: "C", target: "G" },
//     { source: "D", target: "H" }, { source: "E", target: "F" },
//     { source: "F", target: "H" }, { source: "G", target: "H" },
//     { source: "G", target: "F" }, { source: "H", target: "A" },
//     { source: "B", target: "C" }, { source: "C", target: "D" },
//     { source: "D", target: "E" }, { source: "G", target: "E" },
//     { source: "E", target: "A" }, { source: "A", target: "G" },
//   ],
// };






import { useState } from "react";
import { Graph } from "react-d3-graph";
import Nav from "../NavBarSide/nav";
import Header from "../Header";

// Build adjacency list
const build = (nodes, links, directed = false) => {
  const adj = {};
  nodes.forEach((node) => (adj[node.id] = []));
  links.forEach(({ source, target }) => {
    adj[source].push(target);
    if (!directed) adj[target].push(source);
  });
  return adj;
};

export default function DFS() {
  const [startNode, setStartNode] = useState("A");
  const [visitedOrder, setVisitedOrder] = useState([]);
  const [parentMap, setParentMap] = useState({});
  const [size, setSize] = useState("small");
  const [graphType, setGraphType] = useState("undirected");
  const [nodeColors, setNodeColors] = useState({});
  const [linkColors, setLinkColors] = useState({});

  const graphRaw = size === "small" ? smallGraph : largeGraph;
  const directed = graphType === "directed";
  const adjlist = build(graphRaw.nodes, graphRaw.links, directed);

  const runDFS = (start) => {
    const stack = [start];
    const visited = new Set();
    const parents = {};
    const colors = {};
    const links = {};
    const order = [];

    colors[start] = "orange";
    setNodeColors({ ...colors });

    const step = () => {
      if (!stack.length) return;

      const node = stack.pop();
      if (visited.has(node)) {
        setTimeout(step, 1000);
        return;
      }

      visited.add(node);
      order.push(node);
      colors[node] = "green";
      setVisitedOrder([...order]);
      setNodeColors({ ...colors });

      const neighbors = [...(adjlist[node] || [])].reverse();
      for (const n of neighbors) {
        if (!visited.has(n)) {
          stack.push(n);
          if (!parents[n]) parents[n] = node;
          if (!colors[n]) colors[n] = "orange";

          const key1 = `${node}-${n}`;
          const key2 = `${n}-${node}`;
          links[key1] = "red";
          links[key2] = "red";
        }
      }

      setParentMap({ ...parents });
      setLinkColors({ ...links });

      if (stack.length) setTimeout(step, 2000);
    };

    step();
  };

  const getCircularLayout = (nodes) => {
    const radius = 150;
    const centerX = 350;
    const centerY = 225;

    return nodes.map((node, i) => {
      const angle = (2 * Math.PI * i) / nodes.length;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        color: nodeColors[node.id] || "blue",
      };
    });
  };

  const circularNodes = getCircularLayout(graphRaw.nodes);

  const graphData = {
    nodes: circularNodes.map((n) => ({ ...n, highlighted: true })),
    links: graphRaw.links.map((l) => ({
      ...l,
      color: linkColors[`${l.source}-${l.target}`] || "#94a3b8",
    })),
  };

  const config = {
    staticGraph: true,
    directed,
    width: 700,
    height: 450,
    panAndZoom: false,
    node: {
      size: 1000,
      fontSize: 16,
      fontColor: "white",
      fontWeight: "600",
      strokeWidth: 2,
      highlightStrokeColor: "yellow",
      labelPosition: "center",
    },
    link: {
      strokeWidth: 2,
      highlightColor: "yellow",
    },
    d3: { gravity: 0 },
  };

  return (<>
     <Header />
          <div className="grid grid-cols-5 gap-4 mt-48 md:mt-36">
            <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
              <Nav />
            </div>
      <div className="w-full col-span-4">
        <div className="p-6 bg-white rounded-lg shadow-xl max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
            DFS Visualizer
          </h1>

          <div className="bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] flex flex-wrap border-1 border-white justify-center gap-4 md:h-25 bg-[#81a29c] p-4 text-black rounded mb-6">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-lg">Start :</label>
              <input
                placeholder="A"
                className="w-16 h-8 px-2 py-1 rounded border border-gray-600 bg-white text-center"
                value={startNode}
                onChange={(e) => setStartNode(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-black font-semibold">
              <label>Graph Type:</label>
              <label>
                <input
                  type="radio"
                  value="undirected"
                  checked={graphType === "undirected"}
                  onChange={(e) => setGraphType(e.target.value)}
                />{" "}
                Undirected
              </label>
              <label>
                <input
                  type="radio"
                  value="directed"
                  checked={graphType === "directed"}
                  onChange={(e) => setGraphType(e.target.value)}
                />{" "}
                Directed
              </label>
            </div>

            <div className="flex items-center gap-2 text-black font-semibold ml-2">
              <label>Graph Size:</label>
              <label>
                <input
                  type="radio"
                  value="small"
                  checked={size === "small"}
                  onChange={(e) => setSize(e.target.value)}
                />{" "}
                Small
              </label>
              <label>
                <input
                  type="radio"
                  value="large"
                  checked={size === "large"}
                  onChange={(e) => setSize(e.target.value)}
                />{" "}
                Large
              </label>
            </div>

            <button
              onClick={() => runDFS(startNode)}
              className="bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 ml-8 border-1 w-18 border-black text-white px-4 py-2 rounded md:h-10 md:mt-3"
            >
              Start
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] rounded-lg p-4 border-1 flex justify-center items-center">
            <div className="w-[700px] h-[450px]">
              <Graph id="graph-id" data={graphData} config={config} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="border-[#313272] bg-[#8C8DC1] p-4 rounded">
              <h2 className="font-semibold text-white text-2xl mb-3">DFS Order</h2>
              <div className="flex flex-wrap gap-2">
                {visitedOrder.map((n, i) => (
                  <span
                    key={i}
                    className="bg-[#313272] text-white border-1 border-[#313272] font-semibold px-2 py-1 rounded"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-[#313272] bg-[#8C8DC1] p-4 rounded">
              <h2 className="font-semibold text-white text-2xl mb-3">
                Parent Relationships
              </h2>
              <ul className="list-disc list-inside text-[#313272] font-semibold">
                {Object.entries(parentMap).map(([child, parent]) => (
                  <li key={child}>
                    {child} ← {parent}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
}

// Graph Data
const smallGraph = {
  nodes: [
    { id: "A" }, { id: "B" }, { id: "C" }, { id: "D" },
    { id: "E" }, { id: "F" }, { id: "G" }, { id: "H" },
  ],
  links: [
    { source: "A", target: "B" },
    { source: "A", target: "D" },
    { source: "A", target: "G" },
    { source: "B", target: "C" },
    { source: "D", target: "E" },
    { source: "D", target: "F" },
    { source: "G", target: "F" },
    { source: "G", target: "H" },
  ],
};

const largeGraph = {
  nodes: [
    { id: "A" }, { id: "B" }, { id: "C" }, { id: "D" },
    { id: "E" }, { id: "F" }, { id: "G" }, { id: "H" },
  ],
  links: [
    { source: "A", target: "B" }, { source: "A", target: "C" },
    { source: "B", target: "D" }, { source: "B", target: "E" },
    { source: "C", target: "F" }, { source: "C", target: "G" },
    { source: "D", target: "H" }, { source: "E", target: "F" },
    { source: "F", target: "H" }, { source: "G", target: "H" },
    { source: "G", target: "F" }, { source: "H", target: "A" },
    { source: "B", target: "C" }, { source: "C", target: "D" },
    { source: "D", target: "E" }, { source: "G", target: "E" },
    { source: "E", target: "A" }, { source: "A", target: "G" },
  ],
};
