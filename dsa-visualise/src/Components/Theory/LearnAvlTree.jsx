import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import NavTheory from '../NavBarSide/navTheory';
import CompletionCheckbox1 from '../Complete';
export default function AVLTreeTheory() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const codeExamples = {
    'JavaScript': `// JavaScript implementation
class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // Get height of node
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Get balance factor
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Right rotation
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // Left rotation
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  // Insert node
  insert(node, value) {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    } else {
      return node; // Duplicates not allowed
    }

    // Update height
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // Get balance factor
    const balance = this.getBalance(node);

    // Perform rotations if unbalanced
    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  // Example usage
  insertValue(value) {
    this.root = this.insert(this.root, value);
  }
}

// Example usage:
const avlTree = new AVLTree();
avlTree.insertValue(10);
avlTree.insertValue(20);
avlTree.insertValue(30); // Automatically balances
avlTree.insertValue(40);
avlTree.insertValue(50);
avlTree.insertValue(25);`,
    'Python': `# Python implementation
class AVLNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def __init__(self):
        self.root = None

    def get_height(self, node):
        return node.height if node else 0

    def get_balance(self, node):
        return self.get_height(node.left) - self.get_height(node.right) if node else 0

    def right_rotate(self, y):
        x = y.left
        T2 = x.right

        x.right = y
        y.left = T2

        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))

        return x

    def left_rotate(self, x):
        y = x.right
        T2 = y.left

        y.left = x
        x.right = T2

        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))

        return y

    def insert(self, node, value):
        if not node:
            return AVLNode(value)

        if value < node.value:
            node.left = self.insert(node.left, value)
        elif value > node.value:
            node.right = self.insert(node.right, value)
        else:
            return node  # Duplicates not allowed

        node.height = 1 + max(self.get_height(node.left), self.get_height(node.right))

        balance = self.get_balance(node)

        # Left Left
        if balance > 1 and value < node.left.value:
            return self.right_rotate(node)

        # Right Right
        if balance < -1 and value > node.right.value:
            return self.left_rotate(node)

        # Left Right
        if balance > 1 and value > node.left.value:
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)

        # Right Left
        if balance < -1 and value < node.right.value:
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)

        return node

    def insert_value(self, value):
        self.root = self.insert(self.root, value)

# Example usage
avl_tree = AVLTree()
avl_tree.insert_value(10)
avl_tree.insert_value(20)
avl_tree.insert_value(30)  # Automatically balances
avl_tree.insert_value(40)
avl_tree.insert_value(50)
avl_tree.insert_value(25)`,
    'Java': `// Java implementation
class AVLNode {
    int value, height;
    AVLNode left, right;

    AVLNode(int value) {
        this.value = value;
        this.height = 1;
    }
}

class AVLTree {
    AVLNode root;

    int height(AVLNode node) {
        return node == null ? 0 : node.height;
    }

    int getBalance(AVLNode node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }

    AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left;
        AVLNode T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;

        return x;
    }

    AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right;
        AVLNode T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;

        return y;
    }

    AVLNode insert(AVLNode node, int value) {
        if (node == null) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = insert(node.left, value);
        } else if (value > node.value) {
            node.right = insert(node.right, value);
        } else {
            return node; // Duplicates not allowed
        }

        node.height = 1 + Math.max(height(node.left), height(node.right));

        int balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            return rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            return leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        return node;
    }

    void insertValue(int value) {
        root = insert(root, value);
    }

    // Example usage
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        tree.insertValue(10);
        tree.insertValue(20);
        tree.insertValue(30); // Automatically balances
        tree.insertValue(40);
        tree.insertValue(50);
        tree.insertValue(25);
    }
}`,
    'C++': `// C++ implementation
#include <iostream>
#include <algorithm>
using namespace std;

class AVLNode {
public:
    int value;
    AVLNode *left;
    AVLNode *right;
    int height;

    AVLNode(int val) : value(val), left(nullptr), right(nullptr), height(1) {}
};

class AVLTree {
private:
    AVLNode* root;

    int height(AVLNode* node) {
        return node ? node->height : 0;
    }

    int getBalance(AVLNode* node) {
        return node ? height(node->left) - height(node->right) : 0;
    }

    AVLNode* rightRotate(AVLNode* y) {
        AVLNode* x = y->left;
        AVLNode* T2 = x->right;

        x->right = y;
        y->left = T2;

        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;

        return x;
    }

    AVLNode* leftRotate(AVLNode* x) {
        AVLNode* y = x->right;
        AVLNode* T2 = y->left;

        y->left = x;
        x->right = T2;

        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;

        return y;
    }

    AVLNode* insert(AVLNode* node, int value) {
        if (!node) return new AVLNode(value);

        if (value < node->value) {
            node->left = insert(node->left, value);
        } else if (value > node->value) {
            node->right = insert(node->right, value);
        } else {
            return node; // Duplicates not allowed
        }

        node->height = 1 + max(height(node->left), height(node->right));

        int balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node->left->value) {
            return rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node->right->value) {
            return leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node->left->value) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node->right->value) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }

        return node;
    }

public:
    AVLTree() : root(nullptr) {}

    void insertValue(int value) {
        root = insert(root, value);
    }
};

// Example usage
int main() {
    AVLTree tree;
    tree.insertValue(10);
    tree.insertValue(20);
    tree.insertValue(30); // Automatically balances
    tree.insertValue(40);
    tree.insertValue(50);
    tree.insertValue(25);
    return 0;
}`,
    'Go': `// Go implementation
package main

import "fmt"

type AVLNode struct {
    value  int
    left   *AVLNode
    right  *AVLNode
    height int
}

type AVLTree struct {
    root *AVLNode
}

func (t *AVLTree) getHeight(node *AVLNode) int {
    if node == nil {
        return 0
    }
    return node.height
}

func (t *AVLTree) getBalance(node *AVLNode) int {
    if node == nil {
        return 0
    }
    return t.getHeight(node.left) - t.getHeight(node.right)
}

func (t *AVLTree) rightRotate(y *AVLNode) *AVLNode {
    x := y.left
    T2 := x.right

    x.right = y
    y.left = T2

    y.height = max(t.getHeight(y.left), t.getHeight(y.right)) + 1
    x.height = max(t.getHeight(x.left), t.getHeight(x.right)) + 1

    return x
}

func (t *AVLTree) leftRotate(x *AVLNode) *AVLNode {
    y := x.right
    T2 := y.left

    y.left = x
    x.right = T2

    x.height = max(t.getHeight(x.left), t.getHeight(x.right)) + 1
    y.height = max(t.getHeight(y.left), t.getHeight(y.right)) + 1

    return y
}

func (t *AVLTree) insert(node *AVLNode, value int) *AVLNode {
    if node == nil {
        return &AVLNode{value: value, height: 1}
    }

    if value < node.value {
        node.left = t.insert(node.left, value)
    } else if value > node.value {
        node.right = t.insert(node.right, value)
    } else {
        return node // Duplicates not allowed
    }

    node.height = 1 + max(t.getHeight(node.left), t.getHeight(node.right))

    balance := t.getBalance(node)

    // Left Left Case
    if balance > 1 && value < node.left.value {
        return t.rightRotate(node)
    }

    // Right Right Case
    if balance < -1 && value > node.right.value {
        return t.leftRotate(node)
    }

    // Left Right Case
    if balance > 1 && value > node.left.value {
        node.left = t.leftRotate(node.left)
        return t.rightRotate(node)
    }

    // Right Left Case
    if balance < -1 && value < node.right.value {
        node.right = t.rightRotate(node.right)
        return t.leftRotate(node)
    }

    return node
}

func (t *AVLTree) InsertValue(value int) {
    t.root = t.insert(t.root, value)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

// Example usage
func main() {
    tree := AVLTree{}
    tree.InsertValue(10)
    tree.InsertValue(20)
    tree.InsertValue(30) // Automatically balances
    tree.InsertValue(40)
    tree.InsertValue(50)
    tree.InsertValue(25)
}`,
    'Rust': `// Rust implementation
use std::cmp;

#[derive(Debug)]
struct AVLNode {
    value: i32,
    left: Option<Box<AVLNode>>,
    right: Option<Box<AVLNode>>,
    height: i32,
}

impl AVLNode {
    fn new(value: i32) -> Self {
        AVLNode {
            value,
            left: None,
            right: None,
            height: 1,
        }
    }
}

struct AVLTree {
    root: Option<Box<AVLNode>>,
}

impl AVLTree {
    fn height(&self, node: &Option<Box<AVLNode>>) -> i32 {
        node.as_ref().map_or(0, |n| n.height)
    }

    fn balance_factor(&self, node: &Option<Box<AVLNode>>) -> i32 {
        match node {
            Some(n) => self.height(&n.left) - self.height(&n.right),
            None => 0,
        }
    }

    fn right_rotate(&mut self, y: Box<AVLNode>) -> Box<AVLNode> {
        let mut x = y.left.unwrap();
        let t2 = x.right.take();

        x.right = Some(y);
        x.right.as_mut().unwrap().left = t2;

        x.right.as_mut().unwrap().height = cmp::max(
            self.height(&x.right.as_ref().unwrap().left),
            self.height(&x.right.as_ref().unwrap().right),
        ) + 1;
        x.height = cmp::max(self.height(&x.left), self.height(&x.right)) + 1;

        x
    }

    fn left_rotate(&mut self, x: Box<AVLNode>) -> Box<AVLNode> {
        let mut y = x.right.unwrap();
        let t2 = y.left.take();

        y.left = Some(x);
        y.left.as_mut().unwrap().right = t2;

        y.left.as_mut().unwrap().height = cmp::max(
            self.height(&y.left.as_ref().unwrap().left),
            self.height(&y.left.as_ref().unwrap().right),
        ) + 1;
        y.height = cmp::max(self.height(&y.left), self.height(&y.right)) + 1;

        y
    }

    fn insert(&mut self, node: Option<Box<AVLNode>>, value: i32) -> Option<Box<AVLNode>> {
        let mut node = match node {
            Some(n) => n,
            None => return Some(Box::new(AVLNode::new(value))),
        };

        if value < node.value {
            node.left = self.insert(node.left, value);
        } else if value > node.value {
            node.right = self.insert(node.right, value);
        } else {
            return Some(node); // Duplicates not allowed
        }

        node.height = 1 + cmp::max(
            self.height(&node.left),
            self.height(&node.right),
        );

        let balance = self.balance_factor(&Some(Box::new(node.clone())));

        // Left Left Case
        if balance > 1 && value < node.left.as_ref().unwrap().value {
            return Some(self.right_rotate(node));
        }

        // Right Right Case
        if balance < -1 && value > node.right.as_ref().unwrap().value {
            return Some(self.left_rotate(node));
        }

        // Left Right Case
        if balance > 1 && value > node.left.as_ref().unwrap().value {
            node.left = Some(self.left_rotate(node.left.unwrap()));
            return Some(self.right_rotate(node));
        }

        // Right Left Case
        if balance < -1 && value < node.right.as_ref().unwrap().value {
            node.right = Some(self.right_rotate(node.right.unwrap()));
            return Some(self.left_rotate(node));
        }

        Some(node)
    }

    fn insert_value(&mut self, value: i32) {
        self.root = self.insert(self.root.take(), value);
    }
}

// Example usage
fn main() {
    let mut tree = AVLTree { root: None };
    tree.insert_value(10);
    tree.insert_value(20);
    tree.insert_value(30); // Automatically balances
    tree.insert_value(40);
    tree.insert_value(50);
    tree.insert_value(25);
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
            <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">AVL Tree</h1>
            <p className="text-xl text-gray-600 pb-4">Self-balancing Binary Search Tree</p>
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
              An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees (balance factor) cannot be more than one for all nodes. This balancing ensures that the tree remains approximately balanced, guaranteeing O(log n) time complexity for search, insert, and delete operations.
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Balance Factor</strong>: Height of left subtree - Height of right subtree (must be -1, 0, or 1)</li>
                <li><strong>Rotations</strong>: Tree performs rotations to maintain balance after insertions/deletions</li>
                <li><strong>Height Balance</strong>: Ensures tree remains balanced, preventing degenerate cases</li>
              </ul>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 mb-12">
            {/* AVL Tree Properties */}
            <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                AVL Tree Properties & Characteristics
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Balance Factor",
                    description: "Height(left) - Height(right)",
                    details: [
                      "Must be -1, 0, or 1 for all nodes",
                      "If balance factor > 1 or < -1, rotations are performed",
                      "Calculated during insert/delete operations"
                    ]
                  },
                  {
                    title: "Rotations",
                    description: "Four rotation cases",
                    details: [
                      "Left Left (Single Rotation)",
                      "Right Right (Single Rotation)",
                      "Left Right (Double Rotation)",
                      "Right Left (Double Rotation)"
                    ]
                  },
                  {
                    title: "Time Complexity",
                    description: "Guaranteed O(log n)",
                    details: [
                      "Search: O(log n)",
                      "Insert: O(log n) (including rotations)",
                      "Delete: O(log n) (including rotations)"
                    ]
                  },
                  {
                    title: "Space Complexity",
                    description: "O(n) for storage",
                    details: [
                      "Each node stores additional height information",
                      "Recursive operations use O(log n) stack space",
                      "More memory efficient than many other balanced trees"
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

            {/* Rotation Cases */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                Rotation Cases
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    case: "Left Left Case",
                    description: "Right rotation on unbalanced node",
                    scenario: "Inserted into left subtree of left child",
                    balance: "Balance factor > 1 and new value < left child value"
                  },
                  {
                    case: "Right Right Case",
                    description: "Left rotation on unbalanced node",
                    scenario: "Inserted into right subtree of right child",
                    balance: "Balance factor < -1 and new value > right child value"
                  },
                  {
                    case: "Left Right Case",
                    description: "Left rotation on left child, then right rotation on node",
                    scenario: "Inserted into right subtree of left child",
                    balance: "Balance factor > 1 and new value > left child value"
                  },
                  {
                    case: "Right Left Case",
                    description: "Right rotation on right child, then left rotation on node",
                    scenario: "Inserted into left subtree of right child",
                    balance: "Balance factor < -1 and new value < right child value"
                  }
                ].map((rotation, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {rotation.case}
                      <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-sm font-mono">
                        {rotation.description}
                      </span>
                    </h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Scenario:</span> {rotation.scenario}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Balance Condition:</span> {rotation.balance}
                      </p>
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
                    operation: "Search",
                    complexity: "O(log n)",
                    explanation: "Height is always logarithmic due to balancing",
                    note: "Same as regular BST but guaranteed"
                  },
                  {
                    operation: "Insert",
                    complexity: "O(log n)",
                    explanation: "Requires search + possible rotations",
                    note: "Rotations are O(1) operations"
                  },
                  {
                    operation: "Delete",
                    complexity: "O(log n)",
                    explanation: "Requires search + possible rotations",
                    note: "May require multiple rotations"
                  },
                  {
                    operation: "Space Complexity",
                    complexity: "O(n)",
                    explanation: "Each node stores additional height information",
                    note: "More efficient than many other balanced trees"
                  }
                ].map((item, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-gray-800">{item.operation}</span>
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
                    application: "Database Indices",
                    description: "When frequent insertions/deletions are needed with guaranteed O(log n) performance",
                    examples: [
                      "Database systems requiring balanced trees",
                      "In-memory databases",
                      "Indexing for fast lookups"
                    ]
                  },
                  {
                    application: "Language Libraries",
                    description: "Implementation of ordered maps and sets",
                    examples: [
                      "C++ STL (map, set, multimap, multiset)",
                      "Java TreeMap and TreeSet",
                      "Python's bisect module alternatives"
                    ]
                  },
                  {
                    application: "File Systems",
                    description: "Maintaining directories and file hierarchies",
                    examples: [
                      "Filesystem indexing",
                      "Directory tree maintenance",
                      "Balanced storage structures"
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">See AVL Tree Balancing in Action!</h3>
            <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how AVL trees automatically balance themselves through rotations</p>
            <Link
              to="/AVL-Tree"
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
                    "AVL Tree vs Red-Black Tree: Performance Comparison",
                    "Deletion in AVL Trees with Multiple Rotations",
                    "Applications of AVL Trees in Database Systems"
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
                    "AVL Tree Rotations Explained Visually",
                    "Step-by-Step AVL Tree Implementation",
                    "Advanced AVL Tree Applications"
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
            
                <CompletionCheckbox1 problemTitle="AVL Tree" />
              </div>
            </div>
      </div>
    </>
  );
}