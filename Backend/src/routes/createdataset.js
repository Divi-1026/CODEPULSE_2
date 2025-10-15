// const fs = require('fs');

// // Dataset creation
// const data = [
//     // O(1) - Constant
//     {
//         code: `function getFirst(arr) { return arr[0]; }`,
//         language: "javascript",
//         time_complexity: "O(1)",
//         space_complexity: "O(1)"
//     },
//     {
//         code: `def get_first(arr): return arr[0]`,
//         language: "python", 
//         time_complexity: "O(1)",
//         space_complexity: "O(1)"
//     },

//     // O(n) - Linear
//     {
//         code: `function linearSearch(arr, target) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] === target) return i;
//     }
//     return -1;
// }`,
//         language: "javascript",
//         time_complexity: "O(n)",
//         space_complexity: "O(1)"
//     },
//     {
//         code: `def linear_search(arr, target):
//     for i in range(len(arr)):
//         if arr[i] == target:
//             return i
//     return -1`,
//         language: "python",
//         time_complexity: "O(n)", 
//         space_complexity: "O(1)"
//     },

//     // O(n²) - Quadratic
//     {
//         code: `function bubbleSort(arr) {
//     let n = arr.length;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n - i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
// }`,
//         language: "javascript",
//         time_complexity: "O(n^2)",
//         space_complexity: "O(1)"
//     },
//     {
//         code: `def bubble_sort(arr):
//     n = len(arr)
//     for i in range(n):
//         for j in range(0, n - i - 1):
//             if arr[j] > arr[j + 1]:
//                 arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
//         language: "python",
//         time_complexity: "O(n^2)",
//         space_complexity: "O(1)"
//     },

//     // O(log n) - Logarithmic
//     {
//         code: `function binarySearch(arr, target) {
//     let low = 0, high = arr.length - 1;
//     while (low <= high) {
//         let mid = Math.floor((low + high) / 2);
//         if (arr[mid] === target) return mid;
//         else if (arr[mid] < target) low = mid + 1;
//         else high = mid - 1;
//     }
//     return -1;
// }`,
//         language: "javascript", 
//         time_complexity: "O(log n)",
//         space_complexity: "O(1)"
//     },

//     // O(2^n) - Exponential
//     {
//         code: `function fibonacci(n) {
//     if (n <= 1) return n;
//     return fibonacci(n - 1) + fibonacci(n - 2);
// }`,
//         language: "javascript",
//         time_complexity: "O(2^n)", 
//         space_complexity: "O(n)"
//     },
//     {
//         code: `def fibonacci(n):
//     if n <= 1:
//         return n
//     return fibonacci(n-1) + fibonacci(n-2)`,
//         language: "python",
//         time_complexity: "O(2^n)",
//         space_complexity: "O(n)"
//     },

//     // O(n log n) - Linearithmic
//     {
//         code: `function quickSort(arr) {
//     if (arr.length <= 1) return arr;
//     let pivot = arr[Math.floor(arr.length / 2)];
//     let left = arr.filter(x => x < pivot);
//     let middle = arr.filter(x => x === pivot);
//     let right = arr.filter(x => x > pivot);
//     return quickSort(left).concat(middle, quickSort(right));
// }`,
//         language: "javascript",
//         time_complexity: "O(n log n)",
//         space_complexity: "O(n)"
//     }
// ];

// // Save dataset
// fs.writeFileSync('big_o_dataset.json', JSON.stringify(data, null, 2));
// console.log(`Dataset created with ${data.length} examples`);