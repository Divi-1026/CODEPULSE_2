import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import NavTheory from '../NavBarSide/navTheory';

export default function SelectionSortTheory() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const codeExamples = {
    'JavaScript': `// JavaScript implementation
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum element with the first element
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

// Example usage:
const numbers = [64, 25, 12, 22, 11];
const sortedNumbers = selectionSort(numbers);
console.log("Sorted array:", sortedNumbers);`,
    'Python': `# Python implementation
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        # Find the minimum element in unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Example usage:
numbers = [64, 25, 12, 22, 11]
sorted_numbers = selection_sort(numbers)
print("Sorted array:", sorted_numbers)`,
    'Java': `// Java implementation
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            // Swap the found minimum element with the first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};
        selectionSort(numbers);
        System.out.print("Sorted array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,
    'C++': `// C++ implementation
#include <iostream>
#include <vector>

void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        std::swap(arr[i], arr[minIdx]);
    }
}

int main() {
    std::vector<int> numbers = {64, 25, 12, 22, 11};
    selectionSort(numbers);
    std::cout << "Sorted array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    return 0;
}`,
    'Go': `// Go implementation
package main

import "fmt"

func selectionSort(arr []int) []int {
    n := len(arr)
    
    for i := 0; i < n-1; i++ {
        // Find the minimum element in unsorted array
        minIdx := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        
        // Swap the found minimum element with the first element
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
    return arr
}

func main() {
    numbers := []int{64, 25, 12, 22, 11}
    sortedNumbers := selectionSort(numbers)
    fmt.Println("Sorted array:", sortedNumbers)
}`,
    'Rust': `// Rust implementation
fn selection_sort(arr: &mut [i32]) {
    let n = arr.len();
    
    for i in 0..n-1 {
        // Find the minimum element in unsorted array
        let mut min_idx = i;
        for j in i+1..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        arr.swap(i, min_idx);
    }
}

fn main() {
    let mut numbers = [64, 25, 12, 22, 11];
    selection_sort(&mut numbers);
    println!("Sorted array: {:?}", numbers);
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
            <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">Selection Sort Algorithm</h1>
            <p className="text-xl text-gray-600 pb-4">Simple comparison-based sorting algorithm</p>
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
              Selection sort is a simple in-place comparison-based sorting algorithm. It divides the input list into two parts: a sorted sublist and an unsorted sublist. 
              The algorithm repeatedly finds the minimum element from the unsorted part and puts it at the end of the sorted part. It has O(n²) time complexity in all cases.
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
                  "Start with the first element as the beginning of the sorted portion (initially empty)",
                  "Find the minimum element in the unsorted portion of the array",
                  "Swap the found minimum element with the first element of the unsorted portion",
                  "Move the boundary between sorted and unsorted portions one element to the right",
                  "Repeat the process for the remaining unsorted portion until the entire array is sorted"
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
                    case: "Best Case",
                    complexity: "O(n²)",
                    desc: "Even if the array is sorted, we still check all elements",
                    example: "Sorting [1, 2, 3, 4, 5] still requires n²/2 comparisons"
                  },
                  {
                    case: "Average Case",
                    complexity: "O(n²)",
                    desc: "Typical performance on randomly ordered data",
                    example: "Sorting [3, 1, 4, 2, 5] requires n²/2 comparisons"
                  },
                  {
                    case: "Worst Case",
                    complexity: "O(n²)",
                    desc: "Same as average case, always makes the same number of comparisons",
                    example: "Sorting [5, 4, 3, 2, 1] requires n²/2 comparisons"
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
                  <p className="text-gray-700 mb-2">Selection sort is an in-place algorithm:</p>
                  <p className="text-sm text-gray-600">It only requires a constant amount of additional memory space</p>
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Characteristics of Selection Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "⏱️",
                  title: "Time Efficiency",
                  desc: "Always takes O(n²) time regardless of input order",
                  pros: ["Predictable performance", "Same number of comparisons for all cases"]
                },
                {
                  icon: "💾",
                  title: "Space Efficiency",
                  desc: "Sorts in-place with only O(1) additional memory",
                  pros: ["No extra memory needed", "Good for memory-constrained systems"]
                },
                {
                  icon: "🔄",
                  title: "Swapping",
                  desc: "Makes only O(n) swaps in the worst case (minimum possible)",
                  pros: ["Good when memory writes are expensive", "Fewer writes than bubble sort"]
                },
                {
                  icon: "🧠",
                  title: "Simplicity",
                  desc: "Easy to understand and implement",
                  pros: ["Good for educational purposes", "Conceptually straightforward"]
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ready to See Selection Sort in Action?</h3>
            <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how selection sort works step-by-step with real-time animation</p>
            <Link
              to="/Selection-Sort"
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
                    "Selection Sort vs Bubble Sort vs Insertion Sort",
                    "When to Use Selection Sort in Practice",
                    "Optimizations and Variations of Selection Sort"
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