import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import NavTheory from '../NavBarSide/navTheory';
import CompletionCheckbox1 from '../Complete';
export default function MergeSortTheory() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const codeExamples = {
    'JavaScript': `// JavaScript implementation
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  // Divide the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Merge the sorted halves
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0, rightIndex = 0;
  
  // Compare elements and merge
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Example usage:
const numbers = [38, 27, 43, 3, 9, 82, 10];
const sortedNumbers = mergeSort(numbers);
console.log("Sorted array:", sortedNumbers);`,
    'Python': `# Python implementation
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    left_index = right_index = 0
    
    # Compare elements and merge
    while left_index < len(left) and right_index < len(right):
        if left[left_index] < right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1
    
    # Add remaining elements
    result.extend(left[left_index:])
    result.extend(right[right_index:])
    return result

# Example usage:
numbers = [38, 27, 43, 3, 9, 82, 10]
sorted_numbers = merge_sort(numbers)
print("Sorted array:", sorted_numbers)`,
    'Java': `// Java implementation
public class MergeSort {
    public static void mergeSort(int[] arr) {
        if (arr.length <= 1) return;
        
        // Divide the array into two halves
        int mid = arr.length / 2;
        int[] left = new int[mid];
        int[] right = new int[arr.length - mid];
        
        System.arraycopy(arr, 0, left, 0, mid);
        System.arraycopy(arr, mid, right, 0, arr.length - mid);
        
        // Recursively sort both halves
        mergeSort(left);
        mergeSort(right);
        
        // Merge the sorted halves
        merge(arr, left, right);
    }
    
    private static void merge(int[] arr, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        // Compare elements and merge
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        // Add remaining elements
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }
    
    public static void main(String[] args) {
        int[] numbers = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(numbers);
        System.out.print("Sorted array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,
    'C++': `// C++ implementation
#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temporary arrays
    std::vector<int> L(n1), R(n2);
    
    // Copy data to temporary arrays
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Merge the temporary arrays
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

int main() {
    std::vector<int> numbers = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(numbers, 0, numbers.size() - 1);
    std::cout << "Sorted array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    return 0;
}`,
    'Go': `// Go implementation
package main

import "fmt"

func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    
    // Divide the array into two halves
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    
    // Merge the sorted halves
    return merge(left, right)
}

func merge(left, right []int) []int {
    result := make([]int, 0, len(left)+len(right))
    i, j := 0, 0
    
    // Compare elements and merge
    for i < len(left) && j < len(right) {
        if left[i] < right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    
    // Add remaining elements
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
}

func main() {
    numbers := []int{38, 27, 43, 3, 9, 82, 10}
    sortedNumbers := mergeSort(numbers)
    fmt.Println("Sorted array:", sortedNumbers)
}`,
    'Rust': `// Rust implementation
fn merge_sort(arr: &mut [i32]) {
    if arr.len() <= 1 {
        return;
    }
    
    let mid = arr.len() / 2;
    let (left, right) = arr.split_at_mut(mid);
    
    // Recursively sort both halves
    merge_sort(left);
    merge_sort(right);
    
    // Merge the sorted halves
    let mut temp = arr.to_vec();
    merge(left, right, &mut temp);
    arr.copy_from_slice(&temp);
}

fn merge(left: &[i32], right: &[i32], result: &mut [i32]) {
    let (mut i, mut j, mut k) = (0, 0, 0);
    
    // Compare elements and merge
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            result[k] = left[i];
            i += 1;
        } else {
            result[k] = right[j];
            j += 1;
        }
        k += 1;
    }
    
    // Add remaining elements
    while i < left.len() {
        result[k] = left[i];
        i += 1;
        k += 1;
    }
    while j < right.len() {
        result[k] = right[j];
        j += 1;
        k += 1;
    }
}

fn main() {
    let mut numbers = [38, 27, 43, 3, 9, 82, 10];
    merge_sort(&mut numbers);
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
            <h1 className="text-4xl font-bold text-[#334e98] mb-3 pt-6">Merge Sort Algorithm</h1>
            <p className="text-xl text-gray-600 pb-4">Efficient, stable, divide-and-conquer sorting algorithm</p>
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
              Merge sort is a divide-and-conquer algorithm that divides the input array into two halves, 
              recursively sorts each half, and then merges the two sorted halves. It is a stable sort with 
              O(n log n) time complexity in all cases (worst, average, and best), making it one of the most 
              efficient general-purpose sorting algorithms. The main drawback is its O(n) space complexity.
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
                  "Divide the unsorted array into two subarrays of about half the size",
                  "Recursively sort each subarray using merge sort",
                  "Merge the two sorted subarrays back into one sorted array",
                  "To merge: compare the first elements of each subarray",
                  "Take the smaller element and put it in the result array",
                  "Repeat until all elements from both subarrays are merged",
                  "If one subarray is exhausted, copy remaining elements from the other"
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
                    complexity: "O(n log n)",
                    desc: "The array is divided into halves log n times, and each merge is O(n)",
                    example: "Sorting any array requires the same divide and merge steps"
                  },
                  {
                    case: "Average Case",
                    complexity: "O(n log n)",
                    desc: "Consistent performance regardless of input order",
                    example: "Sorting [3, 1, 4, 2, 5] has same complexity as [1, 2, 3, 4, 5]"
                  },
                  {
                    case: "Worst Case",
                    complexity: "O(n log n)",
                    desc: "Same as best and average cases - very predictable",
                    example: "Sorting [5, 4, 3, 2, 1] has same complexity as sorted array"
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
                  <p className="text-gray-700 mb-2">Merge sort requires additional space:</p>
                  <p className="text-sm text-gray-600">Needs temporary arrays during the merge process</p>
                </div>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md font-mono text-lg sm:self-center">O(n)</span>
              </div>
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-2">Memory Usage Example</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Input Size (n)</span>
                    <span className="font-medium">Additional Memory</span>
                  </div>
                  {[10, 100, 1000, 10000].map(size => (
                    <div key={size} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{size} elements</span>
                      <span className="font-mono text-purple-600">{size} units</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Characteristics of Merge Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "Consistent Performance",
                  desc: "Always O(n log n) time complexity regardless of input order",
                  pros: ["Predictable execution time", "Good for large datasets"]
                },
                {
                  icon: "📊",
                  title: "Stable Sort",
                  desc: "Maintains relative order of equal elements",
                  pros: ["Important for certain applications", "Preserves original order of duplicates"]
                },
                {
                  icon: "🔄",
                  title: "Divide and Conquer",
                  desc: "Recursively divides problem into smaller subproblems",
                  pros: ["Efficient for large datasets", "Parallelizable implementation"]
                },
                {
                  icon: "💾",
                  title: "Not In-Place",
                  desc: "Requires O(n) additional space for merging",
                  pros: ["Trade-off for guaranteed O(n log n) performance", "Can be optimized for space in some implementations"]
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
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ready to See Merge Sort in Action?</h3>
            <p className="text-gray-600 mb-6 text-lg">Explore our interactive visualization to understand how merge sort works step-by-step with real-time animation</p>
            <Link
              to="/Merge-Sort"
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
                    "Merge Sort vs Quick Sort: Key Differences",
                    "In-Place Merge Sort: Space Optimization",
                    "Parallel Merge Sort: Leveraging Multi-Core Processors"
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
            
                <CompletionCheckbox1 problemTitle="Merge Sort" />
              </div>
            </div>
      </div>
    </>
  );
}