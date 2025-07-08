import { useState } from "react";
import Nav from "../NavBarSide/nav";

export default function AvlTree() {
  const [tree, setTree] = useState(null);
  const [input, setInput] = useState('');
  const [highlightNode, setHighlightNode] = useState(null);

  function createNode(value) {
    return {
      value,
      left: null,
      right: null,
      height: 1,
      x: 0,
      y: 0,
    };
  }

  function getHeight(node) {
    return node ? node.height : 0;
  }

  function getBalance(node) {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
  }

  function updateHeight(node) {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }

  function rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    updateHeight(y);
    updateHeight(x);

    return x;
  }

  function rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    updateHeight(x);
    updateHeight(y);

    return y;
  }

  async function insert(node, key) {
    if (!node) {
      const newNode = createNode(key);
      setHighlightNode(newNode);
      await new Promise(res => setTimeout(res, 1000));
      return newNode;
    }

    setHighlightNode(node);
    await new Promise(res => setTimeout(res, 1000));

    if (key < node.value) node.left = await insert(node.left, key);
    else if (key > node.value) node.right = await insert(node.right, key);
    else return node;

    updateHeight(node);

    const balance = getBalance(node);

    if (balance > 1 && key < node.left.value) return rotateRight(node);
    if (balance < -1 && key > node.right.value) return rotateLeft(node);
    if (balance > 1 && key > node.left.value) {
      node.left = rotateLeft(node.left);
      return rotateRight(node);
    }
    if (balance < -1 && key < node.right.value) {
      node.right = rotateRight(node.right);
      return rotateLeft(node);
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

  function getTreeWidth(node) {
    if (!node) return 0;
    return 1 + Math.max(getTreeWidth(node.left), getTreeWidth(node.right));
  }

  async function handleAddNode() {
    const val = Number(input);
    if (isNaN(val)) return;
    const newRoot = await insert(tree, val);
    const width = getTreeWidth(newRoot);
    const canvasWidth = 1000;
    const startX = canvasWidth / 2;
    const gap = Math.min(200, canvasWidth / (width + 1));
    assignCoordinates(newRoot, startX, 40, gap);
    setTree({ ...newRoot });
    setInput('');
    setHighlightNode(null);
  }

  const render = (node) => {
    if (!node) return null;

    return (
      <>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="#60a5fa" strokeWidth={2} />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="#60a5fa" strokeWidth={2} />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r="22"
          fill={highlightNode === node ? "#22c55e" : "#0ea5e9"}
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

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <Nav />
        </div>
        <div className="col-span-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-6 rounded-lg shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <h1 className="text-2xl font-extrabold text-green-400 drop-shadow-sm">AVL Tree Visualizer</h1>
            <div className="flex flex-wrap gap-2">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter value"
                className="px-3 py-1 bg-gray-700 rounded-lg font-semibold w-52 text-white"
              />
              <button onClick={handleAddNode} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg font-semibold">
                Insert Node
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-4 mt-2">AVL Tree: A self-balancing Binary Search Tree where the difference in height of left and right subtrees is at most 1.</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width={1000} height={600} className="border border-slate-700 rounded-lg bg-slate-800 shadow-md">
              {render(tree)}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
} 
