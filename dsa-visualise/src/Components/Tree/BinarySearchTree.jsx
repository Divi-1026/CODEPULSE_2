
// import { useState } from "react";
// import Nav from "../NavBarSide/nav";

// export default function BinarySearchTree() {
//   const [tree, Settree] = useState(null);
//   const [root, setroot] = useState(null);
//   const [input, setInput] = useState('');
//   const [highlightNode, setHighlightNode] = useState(null);

//   function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   function createNode(value) {
//     return {
//       value,
//       left: null,
//       right: null,
//       x: 0,
//       y: 0,
//     };
//   }

//   async function InsertWithVisualization(node, val) {
//     if (node === null) {
//       const newNode = createNode(val);
//       setHighlightNode({ ...newNode });
//       await sleep(1000);
//       return newNode;
//     }

//     setHighlightNode({ ...node });
//     await sleep(1000);

//     if (val < node.value) {
//       node.left = await InsertWithVisualization(node.left, val);
//     } else if (val > node.value) {
//       node.right = await InsertWithVisualization(node.right, val);
//     }

//     return node;
//   }

//   async function RemoveWithVisualization(node, val) {
//     if (!node) {
//       alert("Node not found");
//       return null;
//     }

//     setHighlightNode({ ...node });
//     await sleep(1000);

//     if (val < node.value) {
//       node.left = await RemoveWithVisualization(node.left, val);
//     } else if (val > node.value) {
//       node.right = await RemoveWithVisualization(node.right, val);
//     } else {
//       if (!node.left) return node.right;
//       if (!node.right) return node.left;

//       let successor = node.right;
//       while (successor.left) {
//         setHighlightNode({ ...successor });
//         await sleep(1000);
//         successor = successor.left;
//       }

//       node.value = successor.value;
//       node.right = await RemoveWithVisualization(node.right, successor.value);
//     }

//     return node;
//   }

//   function assignCoordinates(node, x, y, gap) {
//     if (!node) return;
//     node.x = x;
//     node.y = y;
//     assignCoordinates(node.left, x - gap, y + 80, gap / 1.7);
//     assignCoordinates(node.right, x + gap, y + 80, gap / 1.7);
//   }

//   const render = (node) => {
//     if (!node) return null;

//     return (
//       <>
//         {node.left && (
//           <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="#60a5fa" strokeWidth={2} />
//         )}
//         {node.right && (
//           <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="#60a5fa" strokeWidth={2} />
//         )}
//         <circle
//           cx={node.x}
//           cy={node.y}
//           r="22"
//           fill={highlightNode?.value === node.value ? "#22c55e" : "blue"}
//           stroke="#fff"
//           strokeWidth="2"
//         />
//         <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">
//           {node.value}
//         </text>
//         {render(node.left)}
//         {render(node.right)}
//       </>
//     );
//   };

//   async function handleAddNode() {
//     if (input === '') return;
//     const val = Number(input);
//     let newRoot = await InsertWithVisualization(root, val);
//     assignCoordinates(newRoot, 400, 40, 200);
//     setroot({ ...newRoot });
//     Settree({ ...newRoot });
//     setInput('');
//     setHighlightNode(null);
//   }

//   async function handleRemoveNode() {
//     if (input === '') return;
//     const val = Number(input);
//     let newRoot = await RemoveWithVisualization(root, val);
//     assignCoordinates(newRoot, 400, 40, 200);
//     setroot(newRoot ? { ...newRoot } : null);
//     Settree(newRoot ? { ...newRoot } : null);
//     setInput('');
//     setHighlightNode(null);
//   }

//   function GenerateRandom() {
//     const arr1 = new Set();
//     while (arr1.size < 6) {
//       arr1.add(Math.floor(Math.random() * 50) + 1);
//     }
//     const newArr = [...arr1];
//     let tempRoot = null;
//     for (let val of newArr) {
//       tempRoot = InsertSimple(tempRoot, val);
//     }
//     assignCoordinates(tempRoot, 400, 40, 100);
//     setroot({ ...tempRoot });
//     Settree({ ...tempRoot });
//     setHighlightNode(null);
//   }

//   async function SearchNode(node, val) {
//     if (!node) {
//       alert("Not Found");
//       setHighlightNode(null);
//       return;
//     }

//     setHighlightNode({ ...node });
//     await sleep(1000);

//     if (node.value === val) {
//       alert("Found");
//       setHighlightNode(null);
//       return;
//     } else if (val < node.value) {
//       await SearchNode(node.left, val);
//     } else {
//       await SearchNode(node.right, val);
//     }
//   }

//   function InsertSimple(root, val) {
//     if (root === null) return createNode(val);
//     if (val < root.value) {
//       root.left = InsertSimple(root.left, val);
//     } else if (val > root.value) {
//       root.right = InsertSimple(root.right, val);
//     }
//     return root;
//   }

//   return (
//     <>
//       <div className="grid grid-cols-5 gap-4">
//         <div className="col-span-1">
//           <Nav />
//         </div>
//         <div className=" col-span-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-6 rounded-lg shadow-xl">
//           <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
//             <h1 className="text-2xl font-extrabold text-cyan-400 drop-shadow-sm">Binary Search Tree Visualizer</h1>
//             <div className="flex flex-wrap gap-2">
//               <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg font-semibold" onClick={handleAddNode}>Add Node</button>
//               <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg font-semibold" onClick={handleRemoveNode}>Remove Node</button>
//               <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg font-semibold" onClick={() => {
//                 const val = Number(input);
//                 if (isNaN(val)) return;
//                 SearchNode(root, val);
//               }}>Search</button>
//               <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg font-semibold" onClick={GenerateRandom}>Generate Random Tree</button>
//             </div>
//           </div>
//           <div className="my-4">
//             <input
//               type="number"
//               placeholder="Enter Node value"
//               className="px-3 py-1 bg-gray-700 rounded-lg font-semibold w-60 text-white"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//           </div>
//           <p className="text-sm text-gray-300 mb-6">Each node in a Binary Search Tree has values in the left subtree smaller and right subtree greater than itself.</p>
//           <div className="flex justify-center">
//             <svg width={850} height={450} className="border border-cyan-500 rounded-lg bg-slate-800 shadow-md">
//               {render(tree)}
//             </svg>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }










import { useState } from "react";
import Nav from "../NavBarSide/nav";

export default function BinarySearchTree() {
  const [tree, setTree] = useState(null);
  const [root, setRoot] = useState(null);
  const [input, setInput] = useState('');
  const [highlightNode, setHighlightNode] = useState(null);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function createNode(value) {
    return {
      value,
      left: null,
      right: null,
      x: 0,
      y: 0,
    };
  }

  async function InsertWithVisualization(node, val) {
    if (node === null) {
      const newNode = createNode(val);
      setHighlightNode({ ...newNode });
      await sleep(1000);
      return newNode;
    }

    setHighlightNode({ ...node });
    await sleep(1000);

    if (val < node.value) {
      node.left = await InsertWithVisualization(node.left, val);
    } else if (val > node.value) {
      node.right = await InsertWithVisualization(node.right, val);
    }

    return node;
  }

  async function RemoveWithVisualization(node, val) {
    if (!node) {
      alert("Node not found");
      return null;
    }

    setHighlightNode({ ...node });
    await sleep(1000);

    if (val < node.value) {
      node.left = await RemoveWithVisualization(node.left, val);
    } else if (val > node.value) {
      node.right = await RemoveWithVisualization(node.right, val);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let successor = node.right;
      while (successor.left) {
        setHighlightNode({ ...successor });
        await sleep(1000);
        successor = successor.left;
      }

      node.value = successor.value;
      node.right = await RemoveWithVisualization(node.right, successor.value);
    }

    return node;
  }

  function assignCoordinates(node, x, y, gap) {
    if (!node) return;
    node.x = x;
    node.y = y;
    assignCoordinates(node.left, x - gap, y + 80, gap / 1.7);
    assignCoordinates(node.right, x + gap, y + 80, gap / 1.7);
  }

  const render = (node) => {
    if (!node) return null;

    return (
      <>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="#313272" strokeWidth={2} />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="#313272" strokeWidth={2} />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r="22"
          fill={highlightNode?.value === node.value ? "#22c55e" : "#313272"}
          stroke="#fff"
          strokeWidth="2"
        />
        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">
          {node.value}
        </text>
        {render(node.left)}
        {render(node.right)}
      </>
    );
  };

  async function handleAddNode() {
    if (input === '' || isNaN(input)) return;
    const val = Number(input);
    let newRoot = await InsertWithVisualization(root, val);
    assignCoordinates(newRoot, 400, 40, 200);
    setRoot({ ...newRoot });
    setTree({ ...newRoot });
    setInput('');
    setHighlightNode(null);
  }

  async function handleRemoveNode() {
    if (input === '' || isNaN(input)) return;
    const val = Number(input);
    let newRoot = await RemoveWithVisualization(root, val);
    assignCoordinates(newRoot, 400, 40, 200);
    setRoot(newRoot ? { ...newRoot } : null);
    setTree(newRoot ? { ...newRoot } : null);
    setInput('');
    setHighlightNode(null);
  }

  function GenerateRandom() {
    const arr1 = new Set();
    while (arr1.size < 6) {
      arr1.add(Math.floor(Math.random() * 50) + 1);
    }
    const newArr = [...arr1];
    let tempRoot = null;
    for (let val of newArr) {
      tempRoot = InsertSimple(tempRoot, val);
    }
    assignCoordinates(tempRoot, 400, 40, 100);
    setRoot({ ...tempRoot });
    setTree({ ...tempRoot });
    setHighlightNode(null);
  }

  async function SearchNode(node, val) {
    if (!node) {
      alert("Not Found");
      setHighlightNode(null);
      return;
    }

    setHighlightNode({ ...node });
    await sleep(1000);

    if (node.value === val) {
      alert("Found");
      await sleep(1000);
      setHighlightNode(null);
      return;
    } else if (val < node.value) {
      await SearchNode(node.left, val);
    } else {
      await SearchNode(node.right, val);
    }
  }

  function InsertSimple(root, val) {
    if (root === null) return createNode(val);
    if (val < root.value) {
      root.left = InsertSimple(root.left, val);
    } else if (val > root.value) {
      root.right = InsertSimple(root.right, val);
    }
    return root;
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <Nav />
        </div>
        <div className="col-span-4 min-h-screen bg-white text-black px-4 py-6 rounded-lg shadow-xl text-center">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <h1 className="text-4xl font-serif font-extrabold text-[#313272] drop-shadow-sm ml-4">Binary Search Tree Visualizer</h1>
            <div className="flex flex-wrap gap-2">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter value"
                className="px-7 py-1 bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 rounded-lg font-semibold w-52 text-white "
              />
              <button onClick={handleAddNode} className="bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 px-3 py-1 rounded-lg font-semibold text-white">
                Insert Node
              </button>
              <button onClick={handleRemoveNode} className="bg-gradient-to-r from-red-700 to-red-800 hover:to-red-700 px-3 py-1 rounded-lg font-semibold text-white">
                Delete Node
              </button>
              <button onClick={() => {
                const val = Number(input);
                if (isNaN(val)) return;
                SearchNode(root, val);
              }} className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:to-yellow-500 px-3 py-1 rounded-lg font-semibold text-white">
                Search Node
              </button>
              <button onClick={GenerateRandom} className="bg-gradient-to-r from-green-600 to-green-700 hover:to-green-600 px-3 py-1 rounded-lg font-semibold text-white">
                Generate Random Tree
              </button>
            </div>
          </div>
          <hr className="h-1 bg-[#313272] border-none my-4"></hr>
          <p className="text-l font-bold text-[#313272] mb-6 mt-4">
            Each node in a Binary Search Tree has values in the left subtree smaller and right subtree greater than itself.
          </p>
          <div className="flex justify-center overflow-x-auto">
            <svg width={1000} height={550} className="border border-slate-700 rounded-lg bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] shadow-md">
              {render(tree)}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
