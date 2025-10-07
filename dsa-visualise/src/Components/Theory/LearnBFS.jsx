import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import NavTheory from '../NavBarSide/navTheory';
import CompletionCheckbox1 from '../Complete';
export default function BFSTraversalTheory() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const codeExamples = {
    'JavaScript': `// JavaScript implementation (for trees)
class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

function breadthFirstSearch(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const currentNode = queue.shift();
    result.push(currentNode.value);
    
    for (const child of currentNode.children) {
      queue.push(child);
    }
  }
  
  return result;
}

// For graphs (adjacency list)
function bfsGraph(adjList, startNode) {
  const visited = new Set();
  const result = [];
  const queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    for (const neighbor of adjList[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// Example usage:
const treeRoot = new Node(1);
treeRoot.children = [new Node(2), new Node(3)];
treeRoot.children[0].children = [new Node(4), new Node(5)];

console.log("Tree BFS:", breadthFirstSearch(treeRoot));

const graph = {
  1: [2, 3],
  2: [4, 5],
  3: [],
  4: [],
  5: []
};
console.log("Graph BFS:", bfsGraph(graph, 1));`,
    'Python': `# Python implementation (for trees)
from collections import deque

class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def breadth_first_search(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        current_node = queue.popleft()
        result.append(current_node.value)
        
        for child in current_node.children:
            queue.append(child)
    
    return result

# For graphs (adjacency list)
def bfs_graph(adj_list, start_node):
    visited = set()
    result = []
    queue = deque([start_node])
    visited.add(start_node)

    while queue:
        current = queue.popleft()
        result.append(current)

        for neighbor in adj_list.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Example usage:
tree_root = Node(1)
tree_root.children = [Node(2), Node(3)]
tree_root.children[0].children = [Node(4), Node(5)]

print("Tree BFS:", breadth_first_search(tree_root))

graph = {
    1: [2, 3],
    2: [4, 5],
    3: [],
    4: [],
    5: []
}
print("Graph BFS:", bfs_graph(graph, 1))`,
    'Java': `// Java implementation (for trees)
import java.util.*;

class Node {
    int value;
    List<Node> children;

    public Node(int value) {
        this.value = value;
        this.children = new ArrayList<>();
    }
}

public class BFSTraversal {
    public static List<Integer> breadthFirstSearch(Node root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<Node> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            Node currentNode = queue.poll();
            result.add(currentNode.value);
            
            for (Node child : currentNode.children) {
                queue.add(child);
            }
        }
        
        return result;
    }

    // For graphs (adjacency list)
    public static List<Integer> bfsGraph(Map<Integer, List<Integer>> adjList, int startNode) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        queue.add(startNode);
        visited.add(startNode);
        
        while (!queue.isEmpty()) {
            int current = queue.poll();
            result.add(current);
            
            for (int neighbor : adjList.getOrDefault(current, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        
        return result;
    }

    // Example usage
    public static void main(String[] args) {
        Node treeRoot = new Node(1);
        treeRoot.children.add(new Node(2));
        treeRoot.children.add(new Node(3));
        treeRoot.children.get(0).children.add(new Node(4));
        treeRoot.children.get(0).children.add(new Node(5));
        
        System.out.println("Tree BFS: " + breadthFirstSearch(treeRoot));

        Map<Integer, List<Integer>> graph = new HashMap<>();
        graph.put(1, Arrays.asList(2, 3));
        graph.put(2, Arrays.asList(4, 5));
        graph.put(3, new ArrayList<>());
        graph.put(4, new ArrayList<>());
        graph.put(5, new ArrayList<>());
        
        System.out.println("Graph BFS: " + bfsGraph(graph, 1));
    }
}`,
    'C++': `// C++ implementation (for trees)
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>

using namespace std;

struct Node {
    int value;
    vector<Node*> children;
    
    Node(int val) : value(val) {}
};

vector<int> breadthFirstSearch(Node* root) {
    vector<int> result;
    if (!root) return result;
    
    queue<Node*> q;
    q.push(root);
    
    while (!q.empty()) {
        Node* current = q.front();
        q.pop();
        result.push_back(current->value);
        
        for (Node* child : current->children) {
            q.push(child);
        }
    }
    
    return result;
}

// For graphs (adjacency list)
vector<int> bfsGraph(const unordered_map<int, vector<int>>& adjList, int startNode) {
    vector<int> result;
    unordered_set<int> visited;
    queue<int> q;
    
    q.push(startNode);
    visited.insert(startNode);
    
    while (!q.empty()) {
        int current = q.front();
        q.pop();
        result.push_back(current);
        
        if (adjList.find(current) != adjList.end()) {
            for (int neighbor : adjList.at(current)) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }
    
    return result;
}

// Example usage
int main() {
    Node* treeRoot = new Node(1);
    treeRoot->children.push_back(new Node(2));
    treeRoot->children.push_back(new Node(3));
    treeRoot->children[0]->children.push_back(new Node(4));
    treeRoot->children[0]->children.push_back(new Node(5));
    
    cout << "Tree BFS: ";
    for (int val : breadthFirstSearch(treeRoot)) {
        cout << val << " ";
    }
    cout << endl;

    unordered_map<int, vector<int>> graph = {
        {1, {2, 3}},
        {2, {4, 5}},
        {3, {}},
        {4, {}},
        {5, {}}
    };
    
    cout << "Graph BFS: ";
    for (int val : bfsGraph(graph, 1)) {
        cout << val << " ";
    }
    cout << endl;
    
    return 0;
}`,
    'Go': `// Go implementation (for trees)
package main

import "fmt"

type Node struct {
    value    int
    children []*Node
}

func breadthFirstSearch(root *Node) []int {
    var result []int
    if root == nil {
        return result
    }

    queue := []*Node{root}

    for len(queue) > 0 {
        current := queue[0]
        queue = queue[1:]
        result = append(result, current.value)

        for _, child := range current.children {
            queue = append(queue, child)
        }
    }

    return result
}

// For graphs (adjacency list)
func bfsGraph(adjList map[int][]int, startNode int) []int {
    var result []int
    visited := make(map[int]bool)
    queue := []int{startNode}
    visited[startNode] = true

    for len(queue) > 0 {
        current := queue[0]
        queue = queue[1:]
        result = append(result, current)

        for _, neighbor := range adjList[current] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }

    return result
}

// Example usage
func main() {
    treeRoot := &Node{value: 1}
    treeRoot.children = []*Node{
        {value: 2, children: []*Node{
            {value: 4},
            {value: 5},
        }},
        {value: 3},
    }

    fmt.Println("Tree BFS:", breadthFirstSearch(treeRoot))

    graph := map[int][]int{
        1: {2, 3},
        2: {4, 5},
        3: {},
        4: {},
        5: {},
    }

    fmt.Println("Graph BFS:", bfsGraph(graph, 1))
}`,
    'Rust': `// Rust implementation (for trees)
use std::collections::{VecDeque, HashMap, HashSet};

struct Node {
    value: i32,
    children: Vec<Node>,
}

impl Node {
    fn new(value: i32) -> Self {
        Node {
            value,
            children: Vec::new(),
        }
    }
}

fn breadth_first_search(root: &Node) -> Vec<i32> {
    let mut result = Vec::new();
    let mut queue = VecDeque::new();
    queue.push_back(root);

    while let Some(current) = queue.pop_front() {
        result.push(current.value);
        
        for child in &current.children {
            queue.push_back(child);
        }
    }

    result
}

// For graphs (adjacency list)
fn bfs_graph(adj_list: &HashMap<i32, Vec<i32>>, start_node: i32) -> Vec<i32> {
    let mut result = Vec::new();
    let mut visited = HashSet::new();
    let mut queue = VecDeque::new();

    queue.push_back(start_node);
    visited.insert(start_node);

    while let Some(current) = queue.pop_front() {
        result.push(current);

        if let Some(neighbors) = adj_list.get(&current) {
            for &neighbor in neighbors {
                if !visited.contains(&neighbor) {
                    visited.insert(neighbor);
                    queue.push_back(neighbor);
                }
            }
        }
    }

    result
}

// Example usage
fn main() {
    let mut tree_root = Node::new(1);
    let mut child1 = Node::new(2);
    child1.children.push(Node::new(4));
    child1.children.push(Node::new(5));
    tree_root.children.push(child1);
    tree_root.children.push(Node::new(3));

    println!("Tree BFS: {:?}", breadth_first_search(&tree_root));

    let mut graph = HashMap::new();
    graph.insert(1, vec![2, 3]);
    graph.insert(2, vec![4, 5]);
    graph.insert(3, vec![]);
    graph.insert(4, vec![]);
    graph.insert(5, vec![]);

    println!("Graph BFS: {:?}", bfs_graph(&graph, 1));
}`
  };

  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust'];

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-4 mt-24 md:mt-25">
        <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
          <NavTheory />
        </div>
        <div className="col-span-4 mx-auto font-sans bg-white rounded-lg p-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">Breadth-First Search (BFS)</h1>
            <p className="text-xl text-gray-600 pb-4">Level-order traversal for trees and graphs</p>
          </div>

          {/* Definition Card */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Definition
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It explores all nodes at the present depth level before moving on to nodes at the next depth level.
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Queue-based</strong>: Uses a queue to keep track of nodes to visit</li>
                <li><strong>Level-order</strong>: Processes nodes level by level from top to bottom</li>
                <li><strong>Complete</strong>: Guaranteed to find a solution if one exists (in unweighted graphs)</li>
                <li><strong>Optimal for unweighted graphs</strong>: Finds the shortest path in unweighted graphs</li>
              </ul>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 mb-12">
            {/* BFS Characteristics */}
            <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                BFS Characteristics & Properties
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Data Structure",
                    description: "Uses a queue (FIFO)",
                    details: [
                      "Nodes are processed in the order they are discovered",
                      "First node enqueued is first node processed",
                      "Ensures level-order processing"
                    ]
                  },
                  {
                    title: "Memory Usage",
                    description: "O(n) space complexity",
                    details: [
                      "Needs to store all nodes at current level",
                      "For balanced trees, space is O(w) where w is max width",
                      "For graphs, stores all visited nodes"
                    ]
                  },
                  {
                    title: "Time Complexity",
                    description: "O(V + E)",
                    details: [
                      "V = number of vertices (nodes)",
                      "E = number of edges (connections)",
                      "Each node and edge visited exactly once"
                    ]
                  },
                  {
                    title: "Optimality",
                    description: "Shortest path in unweighted graphs",
                    details: [
                      "Guaranteed to find shortest path in unweighted graphs",
                      "Not optimal for weighted graphs",
                      "Complete algorithm (finds solution if exists)"
                    ]
                  }
                ].map((property, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {property.title} 
                      <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-sm font-mono">
                        {property.description}
                      </span>
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {property.details.map((detail, i) => (
                        <li key={i} className="flex items-start text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* BFS vs DFS */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-black mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                BFS vs DFS Comparison
              </h2>
              <div className="overflow-x-auto text-black">
                <table className="min-w-full bg-white border border-black">
                  <thead>
                    <tr className="bg-gray-100 text-black border-black">
                      <th className="py-2 px-4 border-b text-left">Feature</th>
                      <th className="py-2 px-4 border-b text-left">BFS</th>
                      <th className="py-2 px-4 border-b text-left">DFS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Approach",
                        bfs: "Level by level (breadth-wise)",
                        dfs: "Depth first (goes deep before wide)"
                      },
                      {
                        feature: "Data Structure",
                        bfs: "Queue",
                        dfs: "Stack (recursion uses call stack)"
                      },
                      {
                        feature: "Memory Usage",
                        bfs: "O(n) (worst case)",
                        dfs: "O(h) (h = height of tree)"
                      },
                      {
                        feature: "Optimal for",
                        bfs: "Shortest path (unweighted), Web crawling",
                        dfs: "Path existence, Topological sorting"
                      },
                      {
                        feature: "Time Complexity",
                        bfs: "O(V + E)",
                        dfs: "O(V + E)"
                      },
                      {
                        feature: "Complete",
                        bfs: "Yes (finds solution if exists)",
                        dfs: "No (may get stuck in infinite depth)"
                      }
                    ].map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border border-black`}                      >
                        <td className="py-2 px-4 border-black font-medium">{row.feature}</td>
                        <td className="py-2 px-4 border-black">{row.bfs}</td>
                        <td className="py-2 px-4 border-black">{row.dfs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code Implementation */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code Implementation
                </h2>
                <div className="flex flex-wrap gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => setActiveLanguage(lang)}
                      className={`px-3 py-1 rounded-full text-xs ${activeLanguage === lang ? 'bg-purple-600 text-white' : 'bg-gray-700 text-purple-300 hover:bg-gray-600'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <pre className="text-gray-200 text-sm">
                  <code>{codeExamples[activeLanguage]}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Complexity Analysis */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Applications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Common Applications
              </h3>
              <div className="space-y-4">
                {[
                  {
                    application: "Shortest Path (Unweighted)",
                    description: "Finding the shortest path between two nodes in unweighted graphs",
                    examples: [
                      "Routing in computer networks",
                      "GPS navigation systems (basic)",
                      "Social network friend connections"
                    ]
                  },
                  {
                    application: "Web Crawling",
                    description: "Indexing web pages by following links",
                    examples: [
                      "Search engine indexing",
                      "Web scraping at controlled depth",
                      "Site mapping"
                    ]
                  },
                  {
                    application: "Network Broadcasting",
                    description: "Spreading information through a network",
                    examples: [
                      "Peer-to-peer networks",
                      "Broadcast in distributed systems",
                      "Virus/malware propagation modeling"
                    ]
                  }
                ].map((app, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                    <h4 className="font-medium text-gray-800">{app.application}</h4>
                    <p className="text-gray-600 text-sm mt-1">{app.description}</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-500">
                      {app.examples.map((example, i) => (
                        <li key={i} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Variations */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                BFS Variations
              </h3>
              <div className="space-y-4">
                {[
                  {
                    variation: "Bidirectional BFS",
                    description: "Simultaneous BFS from start and target",
                    benefits: [
                      "Faster for known target node",
                      "Reduces search space significantly",
                      "Used in AI and puzzle solving"
                    ]
                  },
                  {
                    variation: "Multi-source BFS",
                    description: "BFS starting from multiple nodes",
                    benefits: [
                      "Finds nearest source to each node",
                      "Used in contagion modeling",
                      "Helpful in GPU parallel processing"
                    ]
                  },
                  {
                    variation: "Weighted BFS (Dijkstra's)",
                    description: "BFS with priority queue for weighted edges",
                    benefits: [
                      "Finds shortest path in weighted graphs",
                      "Used in routing protocols",
                      "More general than standard BFS"
                    ]
                  }
                ].map((variant, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                    <h4 className="font-medium text-gray-800">{variant.variation}</h4>
                    <p className="text-gray-600 text-sm mt-1">{variant.description}</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-500">
                      {variant.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visualization CTA */}
          <div className="text-center p-8 bg-purple-50 rounded-lg shadow-sm border border-purple-200 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">See BFS in Action!</h3>
            <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how BFS explores nodes level by level in trees and graphs</p>
            <Link
              to="/BFS-Traversal"
              className="inline-flex items-center bg-purple-600 text-white font-medium py-3 px-8 rounded-full hover:bg-purple-700 transition-colors shadow-md"
            >
              Learn With Visualization
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Additional Resources */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Related Articles
                </h4>
                <ul className="space-y-2">
                  {[
                    "BFS for Puzzle Solving (8-puzzle, Rubik's Cube)",
                    "Parallel BFS Implementations",
                    "BFS in Artificial Intelligence"
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video Resources
                </h4>
                <ul className="space-y-2">
                  {[
                    "BFS Algorithm Visualization",
                    "BFS vs DFS: When to Use Which",
                    "Advanced BFS Applications"
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 bg-white p-6 rounded-xl shadow-xl border border-gray-300 z-50 transform transition-all hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
            
                <CompletionCheckbox1 problemTitle="BFS Traversal" />
              </div>
            </div>
      </div>
    </>
  );
}