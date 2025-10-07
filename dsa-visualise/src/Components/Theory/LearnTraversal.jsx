import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import NavTheory from '../NavBarSide/navTheory';
import CompletionCheckbox1 from '../Complete';
export default function TreeTraversalTheory() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const codeExamples = {
    'JavaScript': `// JavaScript implementation
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Tree Traversals
function preOrder(node, result = []) {
  if (node) {
    result.push(node.value);
    preOrder(node.left, result);
    preOrder(node.right, result);
  }
  return result;
}

function inOrder(node, result = []) {
  if (node) {
    inOrder(node.left, result);
    result.push(node.value);
    inOrder(node.right, result);
  }
  return result;
}

function postOrder(node, result = []) {
  if (node) {
    postOrder(node.left, result);
    postOrder(node.right, result);
    result.push(node.value);
  }
  return result;
}

// Example usage:
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

console.log("Pre-order:", preOrder(root));
console.log("In-order:", inOrder(root));
console.log("Post-order:", postOrder(root));`,
    'Python': `# Python implementation
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Binary Tree Traversals
def pre_order(node, result=None):
    if result is None:
        result = []
    if node:
        result.append(node.value)
        pre_order(node.left, result)
        pre_order(node.right, result)
    return result

def in_order(node, result=None):
    if result is None:
        result = []
    if node:
        in_order(node.left, result)
        result.append(node.value)
        in_order(node.right, result)
    return result

def post_order(node, result=None):
    if result is None:
        result = []
    if node:
        post_order(node.left, result)
        post_order(node.right, result)
        result.append(node.value)
    return result

# Example usage:
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)

print("Pre-order:", pre_order(root))
print("In-order:", in_order(root))
print("Post-order:", post_order(root))`,
    'Java': `// Java implementation
import java.util.ArrayList;
import java.util.List;

class Node {
    int value;
    Node left, right;
    
    public Node(int value) {
        this.value = value;
        left = right = null;
    }
}

class TreeTraversal {
    // Pre-order traversal
    public static List<Integer> preOrder(Node node) {
        List<Integer> result = new ArrayList<>();
        preOrderHelper(node, result);
        return result;
    }
    
    private static void preOrderHelper(Node node, List<Integer> result) {
        if (node != null) {
            result.add(node.value);
            preOrderHelper(node.left, result);
            preOrderHelper(node.right, result);
        }
    }
    
    // In-order traversal
    public static List<Integer> inOrder(Node node) {
        List<Integer> result = new ArrayList<>();
        inOrderHelper(node, result);
        return result;
    }
    
    private static void inOrderHelper(Node node, List<Integer> result) {
        if (node != null) {
            inOrderHelper(node.left, result);
            result.add(node.value);
            inOrderHelper(node.right, result);
        }
    }
    
    // Post-order traversal
    public static List<Integer> postOrder(Node node) {
        List<Integer> result = new ArrayList<>();
        postOrderHelper(node, result);
        return result;
    }
    
    private static void postOrderHelper(Node node, List<Integer> result) {
        if (node != null) {
            postOrderHelper(node.left, result);
            postOrderHelper(node.right, result);
            result.add(node.value);
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        
        System.out.println("Pre-order: " + preOrder(root));
        System.out.println("In-order: " + inOrder(root));
        System.out.println("Post-order: " + postOrder(root));
    }
}`,
    'C++': `// C++ implementation
#include <iostream>
#include <vector>

struct Node {
    int value;
    Node* left;
    Node* right;
    
    Node(int val) : value(val), left(nullptr), right(nullptr) {}
};

void preOrder(Node* node, std::vector<int>& result) {
    if (node) {
        result.push_back(node->value);
        preOrder(node->left, result);
        preOrder(node->right, result);
    }
}

void inOrder(Node* node, std::vector<int>& result) {
    if (node) {
        inOrder(node->left, result);
        result.push_back(node->value);
        inOrder(node->right, result);
    }
}

void postOrder(Node* node, std::vector<int>& result) {
    if (node) {
        postOrder(node->left, result);
        postOrder(node->right, result);
        result.push_back(node->value);
    }
}

// Example usage
int main() {
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    
    std::vector<int> traversal;
    
    preOrder(root, traversal);
    std::cout << "Pre-order: ";
    for (int val : traversal) std::cout << val << " ";
    std::cout << std::endl;
    
    traversal.clear();
    inOrder(root, traversal);
    std::cout << "In-order: ";
    for (int val : traversal) std::cout << val << " ";
    std::cout << std::endl;
    
    traversal.clear();
    postOrder(root, traversal);
    std::cout << "Post-order: ";
    for (int val : traversal) std::cout << val << " ";
    std::cout << std::endl;
    
    return 0;
}`,
    'Go': `// Go implementation
package main

import "fmt"

type Node struct {
    value int
    left  *Node
    right *Node
}

func preOrder(node *Node, result *[]int) {
    if node != nil {
        *result = append(*result, node.value)
        preOrder(node.left, result)
        preOrder(node.right, result)
    }
}

func inOrder(node *Node, result *[]int) {
    if node != nil {
        inOrder(node.left, result)
        *result = append(*result, node.value)
        inOrder(node.right, result)
    }
}

func postOrder(node *Node, result *[]int) {
    if node != nil {
        postOrder(node.left, result)
        postOrder(node.right, result)
        *result = append(*result, node.value)
    }
}

func main() {
    root := &Node{value: 1}
    root.left = &Node{value: 2}
    root.right = &Node{value: 3}
    root.left.left = &Node{value: 4}
    root.left.right = &Node{value: 5}

    var traversal []int

    preOrder(root, &traversal)
    fmt.Println("Pre-order:", traversal)

    traversal = nil
    inOrder(root, &traversal)
    fmt.Println("In-order:", traversal)

    traversal = nil
    postOrder(root, &traversal)
    fmt.Println("Post-order:", traversal)
}`,
    'Rust': `// Rust implementation
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    left: Option<Rc<RefCell<Node>>>,
    right: Option<Rc<RefCell<Node>>>,
}

impl Node {
    fn new(value: i32) -> Self {
        Node {
            value,
            left: None,
            right: None,
        }
    }
}

fn pre_order(node: &Option<Rc<RefCell<Node>>>, result: &mut Vec<i32>) {
    if let Some(node) = node {
        let node = node.borrow();
        result.push(node.value);
        pre_order(&node.left, result);
        pre_order(&node.right, result);
    }
}

fn in_order(node: &Option<Rc<RefCell<Node>>>, result: &mut Vec<i32>) {
    if let Some(node) = node {
        let node = node.borrow();
        in_order(&node.left, result);
        result.push(node.value);
        in_order(&node.right, result);
    }
}

fn post_order(node: &Option<Rc<RefCell<Node>>>, result: &mut Vec<i32>) {
    if let Some(node) = node {
        let node = node.borrow();
        post_order(&node.left, result);
        post_order(&node.right, result);
        result.push(node.value);
    }
}

fn main() {
    let root = Rc::new(RefCell::new(Node::new(1)));
    root.borrow_mut().left = Some(Rc::new(RefCell::new(Node::new(2))));
    root.borrow_mut().right = Some(Rc::new(RefCell::new(Node::new(3))));
    
    if let Some(left) = &root.borrow().left {
        left.borrow_mut().left = Some(Rc::new(RefCell::new(Node::new(4))));
        left.borrow_mut().right = Some(Rc::new(RefCell::new(Node::new(5))));
    }

    let mut result = Vec::new();
    pre_order(&Some(root.clone()), &mut result);
    println!("Pre-order: {:?}", result);

    result.clear();
    in_order(&Some(root.clone()), &mut result);
    println!("In-order: {:?}", result);

    result.clear();
    post_order(&Some(root.clone()), &mut result);
    println!("Post-order: {:?}", result);
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
            <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">Tree Traversal Algorithms</h1>
            <p className="text-xl text-gray-600 pb-4">Systematic methods for visiting all nodes in a tree</p>
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
              Tree traversal refers to the process of visiting (checking or updating) each node in a tree data structure exactly once.
              Traversals are classified by the order in which nodes are visited. The most common traversals for binary trees are:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Pre-order (NLR)</strong>: Visit the current node before its child nodes</li>
                <li><strong>In-order (LNR)</strong>: Visit the left subtree, then the current node, then the right subtree</li>
                <li><strong>Post-order (LRN)</strong>: Visit the current node after its child nodes</li>
                <li><strong>Level-order</strong>: Visit nodes level by level from top to bottom</li>
              </ul>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 mb-12">
            {/* Traversal Types */}
            <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Traversal Types & Characteristics
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Pre-order (NLR)",
                    description: "Root → Left → Right",
                    useCases: [
                      "Create a copy of the tree",
                      "Prefix notation for expression trees",
                      "Serialization of tree structures"
                    ]
                  },
                  {
                    title: "In-order (LNR)",
                    description: "Left → Root → Right",
                    useCases: [
                      "Get nodes in non-decreasing order (BST)",
                      "Infix notation for expression trees",
                      "Binary search in BST"
                    ]
                  },
                  {
                    title: "Post-order (LRN)",
                    description: "Left → Right → Root",
                    useCases: [
                      "Delete the tree (free nodes)",
                      "Postfix notation for expression trees",
                      "Bottom-up calculations"
                    ]
                  },
                  {
                    title: "Level-order (BFS)",
                    description: "Level by level from top to bottom",
                    useCases: [
                      "Finding the shortest path (unweighted)",
                      "Breadth-first search",
                      "Finding levels/depth of nodes"
                    ]
                  }
                ].map((traversal, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {traversal.title} 
                      <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-sm font-mono">
                        {traversal.description}
                      </span>
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {traversal.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
            {/* Time Complexity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Time Complexity Analysis
              </h3>
              <div className="space-y-4">
                {[
                  {
                    traversal: "All Recursive Traversals",
                    complexity: "O(n)",
                    explanation: "Each node is visited exactly once",
                    note: "Pre-order, In-order, Post-order"
                  },
                  {
                    traversal: "Level-order (BFS)",
                    complexity: "O(n)",
                    explanation: "Each node is processed exactly once",
                    note: "Uses queue for implementation"
                  },
                  {
                    traversal: "Space Complexity (Worst Case)",
                    complexity: "O(h)",
                    explanation: "Where h is the height of the tree",
                    note: "Recursion stack or queue size"
                  }
                ].map((item, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-gray-800">{item.traversal}</span>
                        <span className="ml-3 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md font-mono text-sm">
                          {item.complexity}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{item.explanation}</p>
                    <p className="text-gray-500 text-xs mt-1 italic">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

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
                    application: "Expression Trees",
                    description: "Different traversals produce different notations",
                    examples: [
                      "Pre-order → Prefix notation (+ 2 3)",
                      "In-order → Infix notation (2 + 3)",
                      "Post-order → Postfix notation (2 3 +)"
                    ]
                  },
                  {
                    application: "File System Traversal",
                    description: "Navigating directory structures",
                    examples: [
                      "Pre-order to list directories first",
                      "Post-order to delete contents before directory"
                    ]
                  },
                  {
                    application: "DOM Tree Processing",
                    description: "Web browsers processing HTML elements",
                    examples: [
                      "Pre-order for rendering order",
                      "Post-order for cleanup operations"
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
          </div>

          {/* Visualization CTA */}
          <div className="text-center p-8 bg-purple-50 rounded-lg shadow-sm border border-purple-200 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ready to See Tree Traversals in Action?</h3>
            <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how different traversal algorithms work with real-time animation</p>
            <Link
              to="/Tree-Traversal"
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
                    "Iterative Implementations of Tree Traversals",
                    "Morris Traversal: In-order with O(1) Space",
                    "Applications of Tree Traversals in Compiler Design"
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
            
                <CompletionCheckbox1 problemTitle="Traversal Tree" />
              </div>
            </div>
      </div>
    </>
  );
}