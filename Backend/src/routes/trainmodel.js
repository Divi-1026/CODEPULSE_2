// const fs = require('fs');
// const natural = require('natural');
// const { TfIdf } = require('natural');
// const { RandomForestRegression, RandomForestClassifier } = require('ml-random-forest');

// // Load dataset
// const data = JSON.parse(fs.readFileSync('big_o_dataset.json', 'utf8'));

// class BigOAnalyzer {
//     constructor() {
//         this.tfidf = new natural.TfIdf();
//         this.timeModel = null;
//         this.spaceModel = null;
//         this.featureNames = [];
//     }

//     extractFeatures(code) {
//         const features = {};
        
//         // Basic metrics
//         features.length = code.length;
//         features.numLines = (code.match(/\n/g) || []).length + 1;
//         features.numWords = code.split(/\s+/).length;
        
//         // Loop patterns
//         features.forLoops = (code.match(/for\s*\(/g) || []).length;
//         features.whileLoops = (code.match(/while\s*\(/g) || []).length;
//         features.totalLoops = features.forLoops + features.whileLoops;
        
//         // Conditional patterns
//         features.ifStatements = (code.match(/if\s*\(/g) || []).length;
//         features.elseStatements = (code.match(/else/g) || []).length;
        
//         // Function patterns
//         features.functionDef = (code.match(/def\s+|function\s+/g) || []).length;
        
//         // Recursion detection
//         features.recursion = this.detectRecursion(code) ? 1 : 0;
        
//         // Nested loops detection
//         features.nestedLoops = this.detectNestedLoops(code) ? 1 : 0;
        
//         // Array operations
//         features.arrayAccess = (code.match(/\[/g) || []).length;
        
//         return features;
//     }

//     detectRecursion(code) {
//         // Simple recursion detection for JavaScript
//         const functionMatch = code.match(/function\s+(\w+)/);
//         if (functionMatch) {
//             const funcName = functionMatch[1];
//             return (code.match(new RegExp(`${funcName}\s*\(`, 'g')) || []).length > 1;
//         }
        
//         // For Python
//         const defMatch = code.match(/def\s+(\w+)/);
//         if (defMatch) {
//             const funcName = defMatch[1];
//             return (code.match(new RegExp(`${funcName}\s*\(`, 'g')) || []).length > 1;
//         }
        
//         return false;
//     }

//     detectNestedLoops(code) {
//         const lines = code.split('\n');
//         let loopDepth = 0;
//         let maxLoopDepth = 0;
        
//         for (const line of lines) {
//             const trimmed = line.trim();
            
//             // Check for loop start
//             if (trimmed.match(/for\s*\(|while\s*\(|for\s+\w+\s+in/)) {
//                 loopDepth++;
//                 maxLoopDepth = Math.max(maxLoopDepth, loopDepth);
//             }
            
//             // Check for block end (simplified)
//             if (trimmed.match(/^\}|^\)/)) {
//                 loopDepth = Math.max(0, loopDepth - 1);
//             }
//         }
        
//         return maxLoopDepth > 1;
//     }

//     prepareTrainingData() {
//         const X = [];
//         const yTime = [];
//         const ySpace = [];
        
//         // First pass: build TF-IDF
//         data.forEach(item => {
//             this.tfidf.addDocument(item.code);
//         });
        
//         // Second pass: extract features
//         data.forEach(item => {
//             const features = this.extractFeatures(item.code);
//             const featureVector = Object.values(features);
            
//             // Get TF-IDF features (simplified - using top terms)
//             const tfidfFeatures = new Array(10).fill(0);
//             this.tfidf.listTerms(data.indexOf(item)).slice(0, 10).forEach((term, idx) => {
//                 if (idx < 10) tfidfFeatures[idx] = term.tfidf;
//             });
            
//             // Combine features
//             const combinedFeatures = [...featureVector, ...tfidfFeatures];
//             X.push(combinedFeatures);
            
//             // Convert labels to numerical values
//             yTime.push(this.complexityToNumber(item.time_complexity));
//             ySpace.push(this.complexityToNumber(item.space_complexity));
//         });
        
//         this.featureNames = [...Object.keys(this.extractFeatures(data[0].code)), ...Array(10).fill(0).map((_, i) => `tfidf_${i}`)];
        
//         return { X, yTime, ySpace };
//     }

//     complexityToNumber(complexity) {
//         const mapping = {
//             'O(1)': 0,
//             'O(log n)': 1,
//             'O(n)': 2,
//             'O(n log n)': 3,
//             'O(n^2)': 4,
//             'O(2^n)': 5,
//             'O(n!)': 6
//         };
//         return mapping[complexity] || 0;
//     }

//     numberToComplexity(number) {
//         const mapping = [
//             'O(1)',
//             'O(log n)', 
//             'O(n)',
//             'O(n log n)',
//             'O(n^2)',
//             'O(2^n)',
//             'O(n!)'
//         ];
//         return mapping[number] || 'O(1)';
//     }

//     train() {
//         console.log("Preparing training data...");
//         const { X, yTime, ySpace } = this.prepareTrainingData();
        
//         console.log(`Training with ${X.length} samples...`);
        
//         // Train Random Forest models
//         this.timeModel = new RandomForestClassifier({
//             nEstimators: 100,
//             maxFeatures: 5,
//             replacement: true,
//             seed: 42
//         });
        
//         this.spaceModel = new RandomForestClassifier({
//             nEstimators: 100,
//             maxFeatures: 5,
//             replacement: true,
//             seed: 42
//         });
        
//         this.timeModel.train(X, yTime);
//         this.spaceModel.train(X, ySpace);
        
//         console.log("✅ Models trained successfully!");
        
//         // Test predictions
//         this.testPredictions();
//     }

//     testPredictions() {
//         console.log("\n🧪 Testing Predictions:");
        
//         const testCases = [
//             `function sumArray(arr) {
//     let total = 0;
//     for (let i = 0; i < arr.length; i++) {
//         total += arr[i];
//     }
//     return total;
// }`,
//             `function bubbleSort(arr) {
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
//             `function binarySearch(arr, target) {
//     let low = 0, high = arr.length - 1;
//     while (low <= high) {
//         let mid = Math.floor((low + high) / 2);
//         if (arr[mid] === target) return mid;
//         else if (arr[mid] < target) low = mid + 1;
//         else high = mid - 1;
//     }
//     return -1;
// }`
//         ];
        
//         testCases.forEach((code, i) => {
//             const result = this.predict(code);
//             console.log(`\nTest ${i + 1}:`);
//             console.log(`Code: ${code.split('\n')[0]}...`);
//             console.log(`Time: ${result.time_complexity}`);
//             console.log(`Space: ${result.space_complexity}`);
//         });
//     }

//     predict(code) {
//         if (!this.timeModel || !this.spaceModel) {
//             throw new Error("Models not trained. Call train() first.");
//         }
        
//         const features = this.extractFeatures(code);
//         const featureVector = Object.values(features);
        
//         // TF-IDF features (simplified)
//         const tfidfFeatures = new Array(10).fill(0);
        
//         const combinedFeatures = [...featureVector, ...tfidfFeatures];
        
//         const timePred = this.timeModel.predict([combinedFeatures])[0];
//         const spacePred = this.spaceModel.predict([combinedFeatures])[0];
        
//         return {
//             time_complexity: this.numberToComplexity(timePred),
//             space_complexity: this.numberToComplexity(spacePred),
//             features: features
//         };
//     }

//     saveModel(filename = 'big_o_model.json') {
//         const modelData = {
//             featureNames: this.featureNames,
//             timeModel: this.timeModel ? this.timeModel.toJSON() : null,
//             spaceModel: this.spaceModel ? this.spaceModel.toJSON() : null
//         };
        
//         fs.writeFileSync(filename, JSON.stringify(modelData, null, 2));
//         console.log(`✅ Model saved as ${filename}`);
//     }
// }

// // Install required packages first:
// // npm install natural ml-random-forest

// // Run training
// const analyzer = new BigOAnalyzer();
// analyzer.train();
// analyzer.saveModel();