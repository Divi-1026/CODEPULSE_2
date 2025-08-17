import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import NavTheory from '../NavBarSide/navTheory';

export default function BinarySearchTreeTheory() {
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

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a new node
  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  // Search for a value
  find(value) {
    if (!this.root) return false;
    
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  // In-order traversal
  inOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }
}

// Example usage:
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(2);
bst.insert(7);

console.log("In-order traversal:", bst.inOrder());
console.log("Search for 7:", bst.find(7));
console.log("Search for 20:", bst.find(20));`,
    'Python': `# Python implementation
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    # Insert a new node
    def insert(self, value):
        new_node = Node(value)
        
        if not self.root:
            self.root = new_node
            return self
        
        current = self.root
        while True:
            if value == current.value:
                return None
            
            if value < current.value:
                if not current.left:
                    current.left = new_node
                    return self
                current = current.left
            else:
                if not current.right:
                    current.right = new_node
                    return self
                current = current.right
    
    # Search for a value
    def find(self, value):
        if not self.root:
            return False
        
        current = self.root
        while current:
            if value == current.value:
                return True
            
            if value < current.value:
                current = current.left
            else:
                current = current.right
        return False
    
    # In-order traversal
    def in_order(self):
        result = []
        def traverse(node):
            if node.left:
                traverse(node.left)
            result.append(node.value)
            if node.right:
                traverse(node.right)
        traverse(self.root)
        return result

# Example usage:
bst = BinarySearchTree()
bst.insert(10)
bst.insert(5)
bst.insert(15)
bst.insert(2)
bst.insert(7)

print("In-order traversal:", bst.in_order())
print("Search for 7:", bst.find(7))
print("Search for 20:", bst.find(20))`,
    'Java': `// Java implementation
class Node {
    int value;
    Node left, right;
    
    public Node(int value) {
        this.value = value;
        left = right = null;
    }
}

class BinarySearchTree {
    Node root;
    
    // Insert a new node
    public void insert(int value) {
        Node newNode = new Node(value);
        
        if (root == null) {
            root = newNode;
            return;
        }
        
        Node current = root;
        while (true) {
            if (value == current.value) return;
            
            if (value < current.value) {
                if (current.left == null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right == null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
    
    // Search for a value
    public boolean find(int value) {
        if (root == null) return false;
        
        Node current = root;
        while (current != null) {
            if (value == current.value) return true;
            
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
    
    // In-order traversal
    public List<Integer> inOrder() {
        List<Integer> result = new ArrayList<>();
        inOrderTraversal(root, result);
        return result;
    }
    
    private void inOrderTraversal(Node node, List<Integer> result) {
        if (node == null) return;
        
        inOrderTraversal(node.left, result);
        result.add(node.value);
        inOrderTraversal(node.right, result);
    }
}

// Example usage:
public class Main {
    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(2);
        bst.insert(7);
        
        System.out.println("In-order traversal: " + bst.inOrder());
        System.out.println("Search for 7: " + bst.find(7));
        System.out.println("Search for 20: " + bst.find(20));
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

class BinarySearchTree {
private:
    Node* root;
    
    void inOrderTraversal(Node* node, std::vector<int>& result) {
        if (!node) return;
        
        inOrderTraversal(node->left, result);
        result.push_back(node->value);
        inOrderTraversal(node->right, result);
    }
    
public:
    BinarySearchTree() : root(nullptr) {}
    
    // Insert a new node
    void insert(int value) {
        Node* newNode = new Node(value);
        
        if (!root) {
            root = newNode;
            return;
        }
        
        Node* current = root;
        while (true) {
            if (value == current->value) return;
            
            if (value < current->value) {
                if (!current->left) {
                    current->left = newNode;
                    return;
                }
                current = current->left;
            } else {
                if (!current->right) {
                    current->right = newNode;
                    return;
                }
                current = current->right;
            }
        }
    }
    
    // Search for a value
    bool find(int value) {
        if (!root) return false;
        
        Node* current = root;
        while (current) {
            if (value == current->value) return true;
            
            if (value < current->value) {
                current = current->left;
            } else {
                current = current->right;
            }
        }
        return false;
    }
    
    // In-order traversal
    std::vector<int> inOrder() {
        std::vector<int> result;
        inOrderTraversal(root, result);
        return result;
    }
};

// Example usage:
int main() {
    BinarySearchTree bst;
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(2);
    bst.insert(7);
    
    std::vector<int> traversal = bst.inOrder();
    std::cout << "In-order traversal: ";
    for (int val : traversal) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Search for 7: " << (bst.find(7) ? "true" : "false") << std::endl;
    std::cout << "Search for 20: " << (bst.find(20) ? "true" : "false") << std::endl;
    
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

type BinarySearchTree struct {
    root *Node
}

// Insert a new node
func (bst *BinarySearchTree) Insert(value int) {
    newNode := &Node{value: value}
    
    if bst.root == nil {
        bst.root = newNode
        return
    }
    
    current := bst.root
    for {
        if value == current.value {
            return
        }
        
        if value < current.value {
            if current.left == nil {
                current.left = newNode
                return
            }
            current = current.left
        } else {
            if current.right == nil {
                current.right = newNode
                return
            }
            current = current.right
        }
    }
}

// Search for a value
func (bst *BinarySearchTree) Find(value int) bool {
    if bst.root == nil {
        return false
    }
    
    current := bst.root
    for current != nil {
        if value == current.value {
            return true
        }
        
        if value < current.value {
            current = current.left
        } else {
            current = current.right
        }
    }
    return false
}

// In-order traversal
func (bst *BinarySearchTree) InOrder() []int {
    var result []int
    var traverse func(node *Node)
    
    traverse = func(node *Node) {
        if node == nil {
            return
        }
        
        traverse(node.left)
        result = append(result, node.value)
        traverse(node.right)
    }
    
    traverse(bst.root)
    return result
}

func main() {
    bst := BinarySearchTree{}
    bst.Insert(10)
    bst.Insert(5)
    bst.Insert(15)
    bst.Insert(2)
    bst.Insert(7)
    
    fmt.Println("In-order traversal:", bst.InOrder())
    fmt.Println("Search for 7:", bst.Find(7))
    fmt.Println("Search for 20:", bst.Find(20))
}`,
    'Rust': `// Rust implementation
use std::cell::RefCell;
use std::rc::Rc;

type NodeRef = Rc<RefCell<Node>>;

struct Node {
    value: i32,
    left: Option<NodeRef>,
    right: Option<NodeRef>,
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

struct BinarySearchTree {
    root: Option<NodeRef>,
}

impl BinarySearchTree {
    fn new() -> Self {
        BinarySearchTree { root: None }
    }
    
    // Insert a new node
    fn insert(&mut self, value: i32) {
        let new_node = Rc::new(RefCell::new(Node::new(value)));
        
        match &self.root {
            None => {
                self.root = Some(new_node);
            }
            Some(root) => {
                let mut current = Rc::clone(root);
                loop {
                    let mut current_borrow = current.borrow_mut();
                    
                    if value == current_borrow.value {
                        return;
                    }
                    
                    if value < current_borrow.value {
                        if let Some(left) = &current_borrow.left {
                            current = Rc::clone(left);
                        } else {
                            current_borrow.left = Some(Rc::clone(&new_node));
                            return;
                        }
                    } else {
                        if let Some(right) = &current_borrow.right {
                            current = Rc::clone(right);
                        } else {
                            current_borrow.right = Some(Rc::clone(&new_node));
                            return;
                        }
                    }
                }
            }
        }
    }
    
    // Search for a value
    fn find(&self, value: i32) -> bool {
        match &self.root {
            None => false,
            Some(root) => {
                let mut current = Rc::clone(root);
                loop {
                    let current_borrow = current.borrow();
                    
                    if value == current_borrow.value {
                        return true;
                    }
                    
                    if value < current_borrow.value {
                        match &current_borrow.left {
                            Some(left) => current = Rc::clone(left),
                            None => return false,
                        }
                    } else {
                        match &current_borrow.right {
                            Some(right) => current = Rc::clone(right),
                            None => return false,
                        }
                    }
                }
            }
        }
    }
    
    // In-order traversal
    fn in_order(&self) -> Vec<i32> {
        let mut result = Vec::new();
        self.in_order_traversal(&self.root, &mut result);
        result
    }
    
    fn in_order_traversal(&self, node: &Option<NodeRef>, result: &mut Vec<i32>) {
        if let Some(node) = node {
            let node_borrow = node.borrow();
            self.in_order_traversal(&node_borrow.left, result);
            result.push(node_borrow.value);
            self.in_order_traversal(&node_borrow.right, result);
        }
    }
}

// Example usage
fn main() {
    let mut bst = BinarySearchTree::new();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(2);
    bst.insert(7);
    
    println!("In-order traversal: {:?}", bst.in_order());
    println!("Search for 7: {}", bst.find(7));
    println!("Search for 20: {}", bst.find(20));
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
            <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">Binary Search Tree (BST)</h1>
            <p className="text-xl text-gray-600 pb-4">Efficient hierarchical data structure for searching and sorting</p>
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
              A Binary Search Tree (BST) is a node-based binary tree data structure where each node has at most two children.
              It maintains the property that for each node:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>All values in the left subtree are less than the node's value</li>
                <li>All values in the right subtree are greater than the node's value</li>
                <li>No duplicate nodes are allowed (typically)</li>
              </ul>
              BSTs provide efficient O(log n) average-case time complexity for search, insert, and delete operations when balanced.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 mb-12">
            {/* BST Properties */}
            <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                BST Properties & Operations
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Insertion",
                    desc: "Add new nodes while maintaining BST properties",
                    complexity: "O(h) where h is tree height (O(log n) if balanced)"
                  },
                  {
                    title: "Search",
                    desc: "Find a value by comparing and traversing left/right",
                    complexity: "O(h) where h is tree height (O(log n) if balanced)"
                  },
                  {
                    title: "Deletion",
                    desc: "Remove nodes while maintaining BST properties (3 cases)",
                    complexity: "O(h) where h is tree height (O(log n) if balanced)"
                  },
                  {
                    title: "Traversals",
                    desc: "In-order (sorted), Pre-order, Post-order, Level-order",
                    complexity: "O(n) as each node is visited once"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.desc}</p>
                    <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-mono text-sm inline-block">
                      {item.complexity}
                    </div>
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
                    case: "Balanced BST",
                    complexity: "O(log n)",
                    desc: "Operations are logarithmic to the number of nodes",
                    example: "Search in a perfectly balanced tree of 1,000,000 nodes takes ~20 steps"
                  },
                  {
                    case: "Unbalanced BST",
                    complexity: "O(n)",
                    desc: "Degenerates to a linked list in worst case",
                    example: "Search in a tree that's completely skewed to one side"
                  },
                  {
                    case: "Construction",
                    complexity: "O(n log n)",
                    desc: "Inserting n elements into an initially empty BST",
                    example: "Building a BST from a random array of n elements"
                  }
                ].map((item, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-gray-800">{item.case}</span>
                        <span className="ml-3 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md font-mono text-sm">
                          {item.complexity}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    <p className="text-gray-500 text-xs mt-1 italic">Example: {item.example}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Space Complexity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Space Complexity Analysis
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mt-4 gap-4">
                <div>
                  <p className="text-gray-700 mb-2">BST space requirements:</p>
                  <p className="text-sm text-gray-600">Each node stores value and two pointers (left/right)</p>
                </div>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md font-mono text-lg sm:self-center">O(n)</span>
              </div>
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-2">Memory Usage Example</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Nodes (n)</span>
                    <span className="font-medium">Space Used</span>
                  </div>
                  {[10, 100, 1000, 10000].map(size => (
                    <div key={size} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{size} nodes</span>
                      <span className="font-mono text-purple-600">O({size})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Characteristics of Binary Search Trees</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "Efficient Searching",
                  desc: "Average case O(log n) search time when balanced",
                  pros: ["Faster than linear search", "Comparable to binary search"]
                },
                {
                  icon: "🔄",
                  title: "Dynamic Structure",
                  desc: "Supports efficient insertions and deletions",
                  pros: ["Can grow/shrink dynamically", "No need to pre-allocate space"]
                },
                {
                  icon: "📊",
                  title: "Sorted Order",
                  desc: "In-order traversal yields sorted sequence",
                  pros: ["No need for separate sorting", "Efficient range queries"]
                },
                {
                  icon: "⚠️",
                  title: "Balance Dependency",
                  desc: "Performance degrades if tree becomes unbalanced",
                  pros: ["Self-balancing variants exist (AVL, Red-Black)", "Requires balancing operations"]
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:border-purple-200 transition-colors">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.desc}</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    {item.pros.map((pro, i) => (
                      <li key={i} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Visualization CTA */}
          <div className="text-center p-8 bg-purple-50 rounded-lg shadow-sm border border-purple-200 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ready to See BST in Action?</h3>
            <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how BST operations work with real-time animation</p>
            <Link
              to="/Binary-Search-Tree"
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
                    "Self-Balancing BSTs: AVL Trees and Red-Black Trees",
                    "BST vs Hash Tables: When to Use Each",
                    "Applications of BSTs in Database Systems"
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
      </div>
    </>
  );
}