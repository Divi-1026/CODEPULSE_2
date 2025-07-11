import { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import Nav from '../NavBarSide/nav';

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

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const pushWithDelay = async (value) => {
    setVisitedArray(prev => [...prev, value]);
    setMessages(prev => [...prev, `Node ${value} is visited`]);
    await delay(1000 - speed * 9.5);
  };

  async function postorder(node) {
    if (!node) return;
    if (node.children) {
      for (const child of node.children) {
        await postorder(child);
      }
    }
    setVisitNode(node.name);
    await pushWithDelay(node.name);
  }

  async function inorder(node) {
    if (!node) return;
    if (node.children && node.children[0]) {
      await inorder(node.children[0]);
    }
    setVisitNode(node.name);
    await pushWithDelay(node.name);
    if (node.children && node.children[1]) {
      await inorder(node.children[1]);
    }
  }

  async function preorder(node) {
    if (!node) return;
    setVisitNode(node.name);
    await pushWithDelay(node.name);
    if (node.children) {
      for (const child of node.children) {
        await preorder(child);
      }
    }
  }

  async function levelorder(root) {
    if (!root) return;
    const queue = [root];
    while (queue.length > 0) {
      const node = queue.shift();
      setVisitNode(node.name);
      await pushWithDelay(node.name);
      if (node.children) {
        for (const child of node.children) queue.push(child);
      }
    }
  }

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
      <circle r={25} fill={visitNode === nodeDatum.name ? '#22c55e' : '#0284c7'} stroke="#fff" strokeWidth="1" />
      <text  x={-12} y={6} fontSize={20} >{nodeDatum.name}</text>
    </g>
  );

  return (
 
    <div className="grid grid-cols-5 gap-4 min-h-screen bg-[#313272] text-white">
      <div className="col-span-1">
        <Nav />
      </div>

      <div className="col-span-4 px-6 py-4">
        <h1 className="text-4xl font-serif font-bold text-white mb-2 text-center">Tree Traversal Visualizer</h1>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className=" bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] p-4 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2 text-black text-center">Traversal Algorithms</h3>
            <div className="flex flex-wrap gap-8">
              {['Inorder', 'Preorder', 'Postorder', 'Levelorder'].map(type => (
                <button
                  key={type}
                  className={`px-3 py-1 rounded-md font-medium border border-sky-400 ${Algo === type ? 'bg-sky-600' : 'bg-gradient-to-r from-blue-800 to-blue-900'} hover:ring hover:shadow-lg`}
                  onClick={() => setAlgo(type)}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className=" bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] p-4 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-2 text-center text-black">Animation Speed</h3>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              className="w-full accent-sky-400"
              onChange={(e) => setSpeed(+e.target.value)}
            />
          </div>
        
        </div>

        <div className=" bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] p-4 rounded-lg shadow flex  gap-2 items-center justify-center mb-4">
          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-semibold w-[20%]"
            onClick={handleStart}>Start
          </button>
          <button
            className="bg-red-600 w-[20%] hover:bg-red-700 px-4 py-2 rounded-md font-semibold "
            onClick={() => { setVisitedArray([]); setMessages([]); setVisitNode(null); }}>End</button>
        </div>

        <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] rounded-lg py-4 px-2 h-[500px] text-black " ref={treeContainer}>
          {treeData && (
            <Tree
              data={treeData}
              renderCustomNodeElement={renderCustomNode}
              orientation="vertical"
              pathFunc="diagonal"
              translate={translate}
              zoomable={false}
              nodeSize={{ x: 70, y: 110 }}
             
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-[#8C8DC1] p-3 rounded-lg max-h-52 overflow-y-auto">
            <h4 className="font-bold text-white mb-2">Traversal Log:</h4>
            {messages.map((msg, i) => (
              <div key={i} className="bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] p-2 rounded border-l-4 border-[#313272] mb-1 text-sm text-[#313272]">
                {msg}
              </div>
            ))}
          </div>

          <div className="bg-[#8C8DC1] p-3 rounded-lg">
            <h4 className="font-bold text-white-300 mb-2">Visited Order:</h4>
            <div className="flex gap-2 flex-wrap">
              {visitedArray.map((val, idx) => (
                <div key={idx} className="bg-[#313272] px-3 py-1 rounded-full text-sm font-semibold">
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
}