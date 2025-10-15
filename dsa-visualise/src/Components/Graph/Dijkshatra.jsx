import React, { useState, useEffect } from 'react';
import { Play, Square, Plus, Trash2, Zap, Clock, Cpu, Settings } from 'lucide-react';
import Nav from "../NavBarSide/nav";
import Header from "../Header";

const DijkstraVisualiser = () => {
  // Predefined graph
  const predefinedGraph = {
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 }
  };

  const [graph, setGraph] = useState({});
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [startNode, setStartNode] = useState('A');
  const [endNode, setEndNode] = useState('F');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [distances, setDistances] = useState({});
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [newNode, setNewNode] = useState('');
  const [edgeForm, setEdgeForm] = useState({ from: '', to: '', weight: '' });
  const [animationSpeed, setAnimationSpeed] = useState(1500);
  const [showDetails, setShowDetails] = useState(true);

  // Initialize with predefined graph
  useEffect(() => {
    setGraph(predefinedGraph);
    initializeGraph(predefinedGraph);
  }, []);

  const initializeGraph = (graphData) => {
    const nodeList = Object.keys(graphData);
    const edgeList = [];
    
    Object.entries(graphData).forEach(([from, neighbors]) => {
      Object.entries(neighbors).forEach(([to, weight]) => {
        if (!edgeList.find(edge => edge.from === to && edge.to === from)) {
          edgeList.push({ from, to, weight });
        }
      });
    });
    
    setNodes(nodeList);
    setEdges(edgeList);
    setDistances(Object.fromEntries(nodeList.map(node => [node, Infinity])));
  };

  const dijkstra = (start, end) => {
    const dist = {};
    const prev = {};
    const unvisited = new Set(nodes);
    const visitedOrder = [];
    const steps = [];

    // Initialize distances
    nodes.forEach(node => {
      dist[node] = Infinity;
      prev[node] = null;
    });
    dist[start] = 0;

    steps.push({
      step: 1,
      description: `Initialize all distances to infinity except start node "${start}" to 0`,
      distances: { ...dist },
      visited: [...visitedOrder],
      current: start,
      type: 'initialization'
    });

    while (unvisited.size > 0) {
      // Find unvisited node with smallest distance
      let current = null;
      let minDist = Infinity;
      
      unvisited.forEach(node => {
        if (dist[node] < minDist) {
          minDist = dist[node];
          current = node;
        }
      });

      if (current === null || dist[current] === Infinity) break;

      unvisited.delete(current);
      visitedOrder.push(current);

      steps.push({
        step: steps.length + 1,
        description: `Visit node "${current}" with smallest distance ${dist[current]}`,
        distances: { ...dist },
        visited: [...visitedOrder],
        current: current,
        type: 'visit'
      });

      // Update neighbors
      if (graph[current]) {
        Object.entries(graph[current]).forEach(([neighbor, weight]) => {
          if (unvisited.has(neighbor)) {
            const newDist = dist[current] + weight;
            if (newDist < dist[neighbor]) {
              dist[neighbor] = newDist;
              prev[neighbor] = current;
              
              steps.push({
                step: steps.length + 1,
                description: `Update distance to "${neighbor}" via "${current}": ${dist[current]} + ${weight} = ${newDist}`,
                distances: { ...dist },
                visited: [...visitedOrder],
                current: current,
                updated: neighbor,
                type: 'update'
              });
            }
          }
        });
      }
    }

    // Build path
    const path = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = prev[current];
    }

    if (path[0] !== start) {
      path.length = 0; // No path found
    }

    steps.push({
      step: steps.length + 1,
      description: path.length > 0 
        ? `Shortest path found: ${path.join(' → ')} with total distance ${dist[end]}`
        : `No path found from ${start} to ${end}`,
      distances: { ...dist },
      visited: [...visitedOrder],
      path: [...path],
      type: 'result'
    });

    return { distances: dist, path, visited: visitedOrder, steps };
  };

  const startVisualization = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setPath([]);
    setVisited([]);
    
    const result = dijkstra(startNode, endNode);
    setSteps(result.steps);
    setDistances(result.distances);
    setPath(result.path);
    setVisited(result.visited);
    
    // Animate steps
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < result.steps.length) {
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, animationSpeed);
  };

  const resetVisualization = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSteps([]);
    setPath([]);
    setVisited([]);
    setDistances(Object.fromEntries(nodes.map(node => [node, Infinity])));
  };

  const addNode = () => {
    if (newNode && !nodes.includes(newNode)) {
      const updatedNodes = [...nodes, newNode];
      const updatedGraph = { ...graph, [newNode]: {} };
      setNodes(updatedNodes);
      setGraph(updatedGraph);
      setNewNode('');
      setDistances(prev => ({ ...prev, [newNode]: Infinity }));
    }
  };

  const addEdge = () => {
    if (edgeForm.from && edgeForm.to && edgeForm.weight && 
        nodes.includes(edgeForm.from) && nodes.includes(edgeForm.to)) {
      const weight = parseInt(edgeForm.weight);
      const updatedGraph = {
        ...graph,
        [edgeForm.from]: {
          ...graph[edgeForm.from],
          [edgeForm.to]: weight
        }
      };
      
      // Add reverse edge for undirected graph
      updatedGraph[edgeForm.to] = {
        ...updatedGraph[edgeForm.to],
        [edgeForm.from]: weight
      };
      
      setGraph(updatedGraph);
      const newEdge = { from: edgeForm.from, to: edgeForm.to, weight };
      if (!edges.find(edge => edge.from === newEdge.from && edge.to === newEdge.to)) {
        setEdges([...edges, newEdge]);
      }
      setEdgeForm({ from: '', to: '', weight: '' });
    }
  };

  const removeNode = (node) => {
    const updatedNodes = nodes.filter(n => n !== node);
    const updatedGraph = { ...graph };
    delete updatedGraph[node];
    
    // Remove edges connected to this node
    Object.keys(updatedGraph).forEach(key => {
      delete updatedGraph[key][node];
    });
    
    setNodes(updatedNodes);
    setGraph(updatedGraph);
    setEdges(edges.filter(edge => edge.from !== node && edge.to !== node));
  };

  const getNodePosition = (node, index) => {
    const radius = 150;
    const centerX = 350;
    const centerY = 225;
    const angle = (2 * Math.PI * index) / nodes.length;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  const getStepColor = (type) => {
    switch (type) {
      case 'initialization': return 'bg-blue-100 border-blue-300';
      case 'visit': return 'bg-purple-100 border-purple-300';
      case 'update': return 'bg-green-100 border-green-300';
      case 'result': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-4 mt-48 md:mt-36">
        <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
          <Nav />
        </div>

        {/* Right Content */}
        <div className="col-span-4">
          <div className="p-6 bg-white rounded-lg shadow-xl max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
              Dijkstra Algorithm Visualiser
            </h1>

            {/* Controls */}
            <div className="bg-gradient-to-r from-[#d7d3f1] to-[#d7d3f1] flex flex-wrap border-1 border-white justify-center gap-4 md:h-25 bg-[#81a29c] p-4 text-black rounded mb-6">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-lg">Start:</label>
                <select
                  value={startNode}
                  onChange={(e) => setStartNode(e.target.value)}
                  className="w-16 h-8 px-2 py-1 rounded border border-gray-600 bg-white text-center"
                >
                  {nodes.map(node => (
                    <option key={node} value={node}>{node}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="font-semibold text-lg">End:</label>
                <select
                  value={endNode}
                  onChange={(e) => setEndNode(e.target.value)}
                  className="w-16 h-8 px-2 py-1 rounded border border-gray-600 bg-white text-center"
                >
                  {nodes.map(node => (
                    <option key={node} value={node}>{node}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="font-semibold text-lg">Speed:</label>
                <select
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="w-24 h-8 px-2 py-1 rounded border border-gray-600 bg-white"
                >
                  <option value={2500}>Slow</option>
                  <option value={1500}>Medium</option>
                  <option value={800}>Fast</option>
                </select>
              </div>

              <button
                onClick={startVisualization}
                disabled={isRunning}
                className={`bg-gradient-to-r from-blue-800 to-blue-900 hover:to-blue-800 border-1 border-black text-white px-4 py-2 rounded md:h-10 ${
                  isRunning ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isRunning ? 'Running...' : 'Start'}
              </button>

              <button
                onClick={resetVisualization}
                className="bg-gradient-to-r from-red-800 to-red-900 hover:to-red-800 border-1 border-black text-white px-4 py-2 rounded md:h-10"
              >
                Reset
              </button>
            </div>

            {/* Graph Visualization */}
            <div className="bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] rounded-lg p-4 border-1 flex justify-center items-center mb-6">
              <div className="relative w-[700px] h-[450px]">
                <svg width="700" height="450" className="rounded-lg">
                  {/* Edges */}
                  {edges.map((edge, index) => {
                    const fromPos = getNodePosition(edge.from, nodes.indexOf(edge.from));
                    const toPos = getNodePosition(edge.to, nodes.indexOf(edge.to));
                    const isInPath = path.includes(edge.from) && path.includes(edge.to) && 
                                   Math.abs(path.indexOf(edge.from) - path.indexOf(edge.to)) === 1;
                    const isCurrent = steps[currentStep]?.updated === edge.to && 
                                    steps[currentStep]?.current === edge.from;

                    return (
                      <g key={index}>
                        <line
                          x1={fromPos.x}
                          y1={fromPos.y}
                          x2={toPos.x}
                          y2={toPos.y}
                          stroke={isInPath ? "#10B981" : isCurrent ? "#F59E0B" : "#6B7280"}
                          strokeWidth={isInPath ? 3 : isCurrent ? 3 : 2}
                          strokeDasharray={isCurrent ? "5,5" : "none"}
                        />
                        <text
                          x={(fromPos.x + toPos.x) / 2}
                          y={(fromPos.y + toPos.y) / 2 - 10}
                          textAnchor="middle"
                          fill={isInPath ? "#10B981" : isCurrent ? "#F59E0B" : "#374151"}
                          fontWeight="bold"
                          fontSize="14"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {nodes.map((node, index) => {
                    const pos = getNodePosition(node, index);
                    const isStart = node === startNode;
                    const isEnd = node === endNode;
                    const isVisited = visited.includes(node);
                    const isCurrent = steps[currentStep]?.current === node;
                    const isInPath = path.includes(node);

                    return (
                      <g key={node}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={20}
                          fill={
                            isStart ? "#EF4444" :
                            isEnd ? "#10B981" :
                            isInPath ? "#3B82F6" :
                            isCurrent ? "#F59E0B" :
                            isVisited ? "#8B5CF6" : "#6B7280"
                          }
                          stroke={isCurrent ? "#F59E0B" : "#FFFFFF"}
                          strokeWidth="3"
                        />
                        <text
                          x={pos.x}
                          y={pos.y}
                          textAnchor="middle"
                          dy="5"
                          fill="white"
                          fontWeight="bold"
                          fontSize="14"
                        >
                          {node}
                        </text>
                        <text
                          x={pos.x}
                          y={pos.y + 35}
                          textAnchor="middle"
                          fill="#374151"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {distances[node] === Infinity ? '∞' : distances[node]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Legend and Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-[#313272] bg-[#8C8DC1] p-4 rounded">
                <h2 className="font-semibold text-white text-2xl mb-3">Legend</h2>
                <div className="grid grid-cols-2 gap-2 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>Start Node</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>End Node</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Shortest Path</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span>Visited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Current Node</span>
                  </div>
                </div>
              </div>

              {path.length > 0 && (
                <div className="border-[#313272] bg-[#8C8DC1] p-4 rounded">
                  <h2 className="font-semibold text-white text-2xl mb-3">Shortest Path Found!</h2>
                  <p className="text-white text-lg">
                    Path: <span className="font-bold">{path.join(' → ')}</span>
                  </p>
                  <p className="text-white text-lg">
                    Total Distance: <span className="font-bold">{distances[endNode]}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Algorithm Steps */}
            {showDetails && (
              <div className="border-[#313272] bg-[#8C8DC1] p-4 rounded mb-6">
                <h2 className="font-semibold text-white text-2xl mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Algorithm Steps
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {steps.slice(0, currentStep + 1).map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${getStepColor(step.type)} ${
                        index === currentStep ? 'ring-2 ring-yellow-400' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === currentStep ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}>
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{step.description}</p>
                          {step.current && (
                            <p className="text-sm text-gray-600 mt-1">
                              Current Node: <span className="font-bold">{step.current}</span>
                            </p>
                          )}
                          {step.updated && (
                            <p className="text-sm text-gray-600">
                              Updated Node: <span className="font-bold">{step.updated}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complexity Analysis */}
            <div className="border-[#313272] bg-[#8C8DC1] p-4 rounded">
              <h2 className="font-semibold text-white text-2xl mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Complexity Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-100 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time Complexity
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Best Case:</span>
                      <code className="bg-blue-200 text-blue-800 px-2 py-1 rounded">O((V + E) log V)</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Worst Case:</span>
                      <code className="bg-blue-200 text-blue-800 px-2 py-1 rounded">O((V + E) log V)</code>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mt-2">
                    Where V = {nodes.length} vertices, E = {edges.length} edges
                  </p>
                </div>

                <div className="bg-purple-100 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Space Complexity</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-700">Total Space:</span>
                      <code className="bg-purple-200 text-purple-800 px-2 py-1 rounded">O(V)</code>
                    </div>
                  </div>
                  <p className="text-sm text-purple-600 mt-2">
                    Stores distances and previous nodes for all vertices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DijkstraVisualiser