import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Nav from '../NavBarSide/nav';
import NavTheory from '../NavBarSide/navTheory';
import CompletionCheckbox1 from '../Complete';
export default function LinearSearchTheory() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const codeExamples = {
    'JavaScript': `// JavaScript implementation
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return index if found
    }
  }
  return -1; // Return -1 if not found
}

// Example usage:
const numbers = [4, 2, 7, 1, 9, 5];
const target = 7;
const result = linearSearch(numbers, target);

if (result !== -1) {
  console.log(\`Element found at index \${result}\`);
} else {
  console.log("Element not found");
}`,

    'Python': `# Python implementation
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return index if found
    return -1  # Return -1 if not found

# Example usage:
numbers = [4, 2, 7, 1, 9, 5]
target = 7
result = linear_search(numbers, target)

if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")`,

    'Java': `// Java implementation
public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Return index if found
            }
        }
        return -1;  // Return -1 if not found
    }

    public static void main(String[] args) {
        int[] numbers = {4, 2, 7, 1, 9, 5};
        int target = 7;
        int result = linearSearch(numbers, target);

        if (result != -1) {
            System.out.println("Element found at index " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}`,

    'C++': `// C++ implementation
#include <iostream>
#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;  // Return index if found
        }
    }
    return -1;  // Return -1 if not found
}

int main() {
    std::vector<int> numbers = {4, 2, 7, 1, 9, 5};
    int target = 7;
    int result = linearSearch(numbers, target);

    if (result != -1) {
        std::cout << "Element found at index " << result << std::endl;
    } else {
        std::cout << "Element not found" << std::endl;
    }
    return 0;
}`,

    'Go': `// Go implementation
package main

import "fmt"

func linearSearch(arr []int, target int) int {
    for i, num := range arr {
        if num == target {
            return i  // Return index if found
        }
    }
    return -1  // Return -1 if not found
}

func main() {
    numbers := []int{4, 2, 7, 1, 9, 5}
    target := 7
    result := linearSearch(numbers, target)

    if result != -1 {
        fmt.Printf("Element found at index %d\\n", result)
    } else {
        fmt.Println("Element not found")
    }
}`,

    'Rust': `// Rust implementation
fn linear_search(arr: &[i32], target: i32) -> Option<usize> {
    for (i, &num) in arr.iter().enumerate() {
        if num == target {
            return Some(i);  // Return index if found
        }
    }
    None  // Return None if not found
}

fn main() {
    let numbers = [4, 2, 7, 1, 9, 5];
    let target = 7;

    match linear_search(&numbers, target) {
        Some(index) => println!("Element found at index {}", index),
        None => println!("Element not found"),
    }
}`
  };

  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust'];

  return (
    <>
    <Header></Header>
    <div className="grid grid-cols-5 gap-4 mt-24 md:mt-25">
            <div className="col-span-1 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
              <NavTheory/>
            </div>
    <div className=" col-span-4 mx-auto font-sans bg-white rounded-lg p-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">Linear Search Algorithm</h1>
        <p className="text-xl text-gray-600 pb-4">The simplest searching technique explained in detail</p>
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
          Linear search, also known as sequential search, is a method for finding a particular value in a list. 
          It checks each element of the list one by one in sequence from the start until the target element is found 
          or all elements have been checked. It's the most basic search algorithm with O(n) time complexity.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 mb-12">
        {/* Algorithm Steps */}
        <div className="bg-white p-7 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Algorithm Steps
          </h2>
          <ol className="space-y-4">
            {[
              "Initialize a pointer/index at the beginning (index 0) of the array",
              "Compare the current element with the target value",
              "If the values match, return the current index",
              "If they don't match, increment the pointer/index",
              "Repeat steps 2-4 until the element is found or end of array is reached",
              "If element is not found, return -1 or 'Not Found'"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-purple-100 text-purple-700 rounded-full h-7 w-7 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700 text-lg">{step}</span>
              </li>
            ))}
          </ol>
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
                  className={`px-3 py-1 rounded-full text-xs ${
                    activeLanguage === lang
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-purple-300 hover:bg-gray-600'
                  }`}
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
                case: "Best Case", 
                complexity: "O(1)", 
                desc: "Element is found at the first position (minimum comparisons)",
                example: "Searching for 5 in [5, 8, 2, 10]"
              },
              { 
                case: "Average Case", 
                complexity: "O(n)", 
                desc: "Element is found somewhere in the middle (n/2 comparisons on average)",
                example: "Searching for 8 in [5, 8, 2, 10]"
              },
              { 
                case: "Worst Case", 
                complexity: "O(n)", 
                desc: "Element is not present or at last position (maximum comparisons)",
                example: "Searching for 10 in [5, 8, 2, 10] or 7 in [5, 8, 2, 10]"
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
              <p className="text-gray-700 mb-2">Linear search requires constant additional space:</p>
              <p className="text-sm text-gray-600">Only a few variables are needed (for index, target, etc.) regardless of input size</p>
            </div>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md font-mono text-lg sm:self-center">O(1)</span>
          </div>
          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-2">Memory Usage Example</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Input Size (n)</span>
                <span className="font-medium">Memory Used</span>
              </div>
              {[10, 100, 1000, 10000].map(size => (
                <div key={size} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">{size} elements</span>
                  <span className="font-mono text-purple-600">constant</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Characteristics of Linear Search</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { 
              icon: "🧩", 
              title: "Simplicity", 
              desc: "Easiest search algorithm to implement with basic programming knowledge",
              pros: ["No complex logic", "Easy to debug"]
            },
            { 
              icon: "🔍", 
              title: "Versatility", 
              desc: "Works on any data structure with sequential access (arrays, linked lists)",
              pros: ["Works on unsorted data", "No preprocessing needed"]
            },
            { 
              icon: "🐢", 
              title: "Performance", 
              desc: "Inefficient for large datasets compared to binary search (O(n) vs O(log n))",
              pros: ["Good for small datasets", "Predictable performance"]
            },
            { 
              icon: "💾", 
              title: "Space Efficiency", 
              desc: "Uses minimal additional memory (only needs a few variables)",
              pros: ["No recursion stack", "No auxiliary storage"]
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
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ready to See Linear Search in Action?</h3>
        <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how linear search works step-by-step with real-time animation</p>
        <Link 
          to="/Linear_Search" 
          className="inline-flex items-center bg-purple-600 text-white font-medium py-3 px-8 rounded-full hover:bg-purple-700 transition-colors shadow-md"
        >
            Learn With Visualisation
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
                "When to Use Linear Search vs Binary Search",
                "Optimizing Linear Search for Special Cases",
                "Real-world Applications of Linear Search"
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
    </div>   <div className="fixed bottom-4 right-4 bg-white p-6 rounded-xl shadow-xl border border-gray-300 z-50 transform transition-all hover:scale-105">
                  <div className="flex flex-col items-center space-y-3">
                
                    <CompletionCheckbox1 problemTitle="Linear Search" />
                  </div>
                </div></div>
    </>
  );
}