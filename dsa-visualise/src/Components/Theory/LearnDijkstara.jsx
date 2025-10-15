import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import NavTheory from '../NavBarSide/navTheory';
import CompletionCheckbox1 from '../Complete';

export default function DijkstraTheory() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const codeExamples = {
    'JavaScript': `// JavaScript implementation of Dijkstra's Algorithm
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = new MinPriorityQueue({ priority: x => x.distance });

  for (let node in graph) distances[node] = Infinity;
  distances[start] = 0;

  pq.enqueue({ node: start, distance: 0 });

  while (!pq.isEmpty()) {
    const { node } = pq.dequeue().element;
    if (visited.has(node)) continue;
    visited.add(node);

    for (const [neighbor, weight] of Object.entries(graph[node])) {
      const newDist = distances[node] + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue({ node: neighbor, distance: newDist });
      }
    }
  }

  return distances;
}

// Example usage
const graph = {
  A: { B: 4, C: 2 },
  B: { C: 5, D: 10 },
  C: { E: 3 },
  D: { F: 11 },
  E: { D: 4 },
  F: {}
};

console.log(dijkstra(graph, 'A'));`,

    'Python': `# Python implementation of Dijkstra's Algorithm
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        current_dist, node = heapq.heappop(pq)
        if current_dist > distances[node]:
            continue

        for neighbor, weight in graph[node].items():
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances

# Example usage
graph = {
    'A': {'B':4, 'C':2},
    'B': {'C':5, 'D':10},
    'C': {'E':3},
    'D': {'F':11},
    'E': {'D':4},
    'F': {}
}

print(dijkstra(graph, 'A'))`,

    'Java': `// Java implementation of Dijkstra's Algorithm
import java.util.*;

public class Dijkstra {
    public static Map<String, Integer> dijkstra(Map<String, Map<String, Integer>> graph, String start) {
        Map<String, Integer> distances = new HashMap<>();
        for (String node : graph.keySet()) distances.put(node, Integer.MAX_VALUE);
        distances.put(start, 0);

        PriorityQueue<String> pq = new PriorityQueue<>(Comparator.comparingInt(distances::get));

        pq.add(start);

        while (!pq.isEmpty()) {
            String current = pq.poll();
            for (Map.Entry<String, Integer> neighbor : graph.get(current).entrySet()) {
                int newDist = distances.get(current) + neighbor.getValue();
                if (newDist < distances.get(neighbor.getKey())) {
                    distances.put(neighbor.getKey(), newDist);
                    pq.add(neighbor.getKey());
                }
            }
        }
        return distances;
    }

    public static void main(String[] args) {
        Map<String, Map<String, Integer>> graph = new HashMap<>();
        graph.put("A", Map.of("B",4,"C",2));
        graph.put("B", Map.of("C",5,"D",10));
        graph.put("C", Map.of("E",3));
        graph.put("D", Map.of("F",11));
        graph.put("E", Map.of("D",4));
        graph.put("F", Map.of());

        System.out.println(dijkstra(graph, "A"));
    }
}`
    // You can add C++, Go, Rust implementations here similarly
  };

  const languages = ['JavaScript', 'Python', 'Java'];

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 gap-4 mt-24 md:mt-25">
        <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
          <NavTheory />
        </div>
        <div className="col-span-4 mx-auto font-sans bg-white rounded-lg p-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">Dijkstra's Algorithm</h1>
            <p className="text-xl text-gray-600 pb-4">Shortest path algorithm for weighted graphs</p>
          </div>

          {/* Definition */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              Definition
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Dijkstra's Algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights. It uses a priority queue to always expand the nearest unvisited node.
            </p>
          </div>

          {/* Code Implementation */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
              <h2 className="text-xl font-semibold text-white flex items-center">Code Implementation</h2>
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

          {/* Visualization CTA */}
          <div className="text-center p-8 bg-purple-50 rounded-lg shadow-sm border border-purple-200 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">See Dijkstra in Action!</h3>
            <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how Dijkstra explores nodes and updates shortest distances</p>
            <Link
              to="/Dijkstra-Traversal"
              className="inline-flex items-center bg-purple-600 text-white font-medium py-3 px-8 rounded-full hover:bg-purple-700 transition-colors shadow-md"
            >
              Learn With Visualization
            </Link>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 bg-white p-6 rounded-xl shadow-xl border border-gray-300 z-50 transform transition-all hover:scale-105">
          <div className="flex flex-col items-center space-y-3">
            <CompletionCheckbox1 problemTitle="Dijkstra's Algorithm" />
          </div>
        </div>
      </div>
    </>
  );
}
