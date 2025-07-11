import { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import Nav from '../NavBarSide/nav';
import Header from '../Header';

const defaultTreeData = {
  name: '50',
  children: [
    {
      name: '30',
      children: [
        { name: '20', children: [] },
        { name: '40', children: [] },
      ],
    },
    {
      name: '70',
      children: [
        { name: '60', children: [] },
        { name: '80', children: [] },
      ],
    },
  ],
};

export default function Traversal() {
  const [visitedArray, setVisitedArray] = useState([]);
  const [messages, setMessages] = useState([]);
  const [Algo, setAlgo] = useState(null);
  const [speed, setSpeed] = useState(50);
  const [visitNode, setVisitNode] = useState(null);
  const [treeData, setTreeData] = useState(defaultTreeData);
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: 80 });
    }
  }, []);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const pushWithDelay = async (value) => {
    setVisitedArray(prev => [...prev, value]);
    setMessages(prev => [...prev, `Visited node ${value}`]);
    await delay(1000 - speed * 9.5);
  };

  const preorder = async (node) => {
    if (!node) return;
    setVisitNode(node.name);
    await pushWithDelay(node.name);
    if (node.children) {
      for (const child of node.children) await preorder(child);
    }
  };

  const inorder = async (node) => {
    if (!node) return;
    if (node.children && node.children[0]) await inorder(node.children[0]);
    setVisitNode(node.name);
    await pushWithDelay(node.name);
    if (node.children && node.children[1]) await inorder(node.children[1]);
  };

  const postorder = async (node) => {
    if (!node) return;
    if (node.children) {
      for (const child of node.children) await postorder(child);
    }
    setVisitNode(node.name);
    await pushWithDelay(node.name);
  };

  const levelorder = async (root) => {
    if (!root) return;
    const queue = [root];
    while (queue.length > 0) {
      const node = queue.shift();
      setVisitNode(node.name);
      await pushWithDelay(node.name);
      if (node.children) for (const child of node.children) queue.push(child);
    }
  };

  const handleStart = () => {
    setVisitedArray([]);
    setMessages([]);
    if (!treeData) return;
    if (Algo === 'Preorder') preorder(treeData);
    else if (Algo === 'Postorder') postorder(treeData);
    else if (Algo === 'Inorder') inorder(treeData);
    else if (Algo === 'Levelorder') levelorder(treeData);
  };

  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle
        r={25}
        fill={visitNode === nodeDatum.name ? '#22c55e' : '#3b82f6'}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x="0"
        y="6"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#ffffff"
        style={{
          pointerEvents: 'none',
          paintOrder: 'stroke',
          strokeWidth: 0,  // Removes outline
          stroke: 'none'   // Completely disables outline
        }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );
  

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-4 mt-48 md:mt-36">
        <div className="col-span-1 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <Nav />
        </div>

        <div className="col-span-4 min-h-screen w-full bg-white text-black p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
            Tree Traversal Visualizer
          </h1>

          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-r from-[#d7d3f1] to-[#f0f0ff] p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-center">Choose Traversal</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Inorder', 'Preorder', 'Postorder', 'Levelorder'].map(type => (
                  <button
                    key={type}
                    onClick={() => setAlgo(type)}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                      Algo === type ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#d7d3f1] to-[#f0f0ff] p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-center">Animation Speed</h3>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Start & End Buttons */}
          <div className="flex justify-center gap-6 mb-6">
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow">
              Start Traversal
            </button>
            <button
              onClick={() => {
                setVisitedArray([]);
                setMessages([]);
                setVisitNode(null);
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow">
              End
            </button>
          </div>

          {/* Tree Visual */}
          <div
            ref={treeContainer}
            className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] rounded-xl p-4 shadow-xl h-[500px] overflow-x-auto">
            <Tree
              data={treeData}
              translate={translate}
              renderCustomNodeElement={renderCustomNode}
              orientation="vertical"
              pathFunc="diagonal"
              zoomable={false}
              nodeSize={{ x: 80, y: 120 }}
            />
          </div>

          {/* Logs & Visited Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#8C8DC1] p-4 rounded-xl max-h-52 overflow-y-auto shadow">
              <h4 className="text-white font-bold mb-2">Traversal Log:</h4>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-white p-2 rounded border-l-4 border-[#313272] mb-1 text-sm text-[#313272] shadow-sm">
                  {msg}
                </div>
              ))}
            </div>

            <div className="bg-[#8C8DC1] p-4 rounded-xl shadow">
              <h4 className="text-white font-bold mb-2">Visited Order:</h4>
              <div className="flex flex-wrap gap-2">
                {visitedArray.map((val, idx) => (
                  <div key={idx} className="bg-[#313272] px-3 py-1 rounded-full text-white text-sm font-bold shadow">
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
