import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import Login from './Pages/AuthPage';
import UserProfile from "./Components/Feature/UserDetail";
import LinearSearchTheory from "./Components/Theory/LinearSearchTheory";
import Visualizations from "./Components/Feature/Visulaization";
import AuthPage from "./Pages/AuthPage";  
import CodeVisualizerPage from "./Components/Feature/DryRun";
import LinearSearchComponent from './Components/Searching/LinearSearch';
import DFS from './Components/Graph/DFS';
import BFS from './Components/Graph/BFS';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import Nav from './Components/NavBarSide/nav';
import Traversal from './Components/Tree/Traversal';
import Selection from './Components/Sorting/SelectionSort';
import BubbleSort from './Components/Sorting/BubbleSort';
import InsertionSort from './Components/Sorting/InsertionSort';
import MergeSort from './Components/Sorting/MergeSort';
import MergeSortVisualizer from './Components/Sorting/MergeSort';
import BinarySearchTree from './Components/Tree/BinarySearchTree';
import Euclian from './Components/MatheMatical/Euclian';
import AvlTree from './Components/Tree/AvlTree';
import BinarySearchComponent from './Components/Searching/BinarySearch';
import ProtectedRoute from "./utils/ProtectedRoute";
import ProgressTracking from "./Components/Feature/ProgressTracking";
import LearnTopic from "./Components/Feature/LearnTopic";
import BinarySearchTheory from "./Components/Theory/LearnBinarySearch";
import SelectionSortTheory from "./Components/Theory/LearnSelectionSort";
import BubbleSortTheory from "./Components/Theory/LearnBubbleSort";
import InsertionSortTheory from "./Components/Theory/LearnInsertionSort";
import MergeSortTheory from "./Components/Theory/LearnMergeSort";
import BinarySearchTreeTheory from "./Components/Theory/BinarySearchTree";
import TreeTraversalTheory from "./Components/Theory/LearnTraversal";
import ContactUs from "./Components/Feature/ContactUs";
import BfsTraversalTheory from "./Components/Theory/LearnBFS";
import AVLTreeTheory from "./Components/Theory/LearnAvlTree";
import BFSTraversalTheory from "./Components/Theory/LearnBFS";
import OnlineCompiler from "./Components/Feature/CodeEditor";
// import ProfilePage from "./Components/Profile";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Routes>
          <Route path="/auth" element={<AuthPage />} />

            {/* 🔒 Protected Routes */}
            
            <Route path="/Learn_Searching" element={<ProtectedRoute><LinearSearchTheory></LinearSearchTheory></ProtectedRoute>}></Route>
            <Route path="/Learn" element={<ProtectedRoute><LearnTopic></LearnTopic></ProtectedRoute>}></Route>
            <Route path="/header" element={<ProtectedRoute><Header /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/dryrun" element={<ProtectedRoute><CodeVisualizerPage/></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><ProgressTracking/></ProtectedRoute>} />
             <Route path="/Profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />
            <Route path="/Learn_Binary" element={<ProtectedRoute><BinarySearchTheory/></ProtectedRoute>} />
            {/* <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} /> */}
            <Route path="/Visualization" element={<ProtectedRoute><Visualizations /></ProtectedRoute>} />
            <Route path="/ContactUs" element={<ProtectedRoute><ContactUs/></ProtectedRoute>} />
            
            <Route path="/Learn_Selection-Sort" element={<ProtectedRoute><SelectionSortTheory /></ProtectedRoute>} />
            <Route path="/Learn_Bubble-Sort" element={<ProtectedRoute><BubbleSortTheory /></ProtectedRoute>} />
            <Route path="/Bubble-Sort" element={<ProtectedRoute><BubbleSort /></ProtectedRoute>} />
            <Route path="/Merge-Sort" element={<ProtectedRoute><MergeSort /></ProtectedRoute>} />
            <Route path="/Learn_Merge-Sort" element={<ProtectedRoute><MergeSortTheory /></ProtectedRoute>} />
            <Route path="/Learn_Insertion-Sort" element={<ProtectedRoute><InsertionSortTheory /></ProtectedRoute>} />
            <Route path="/Insertion-Sort" element={<ProtectedRoute><InsertionSort /></ProtectedRoute>} />
            <Route path="/Selection-Sort" element={<ProtectedRoute><Selection /></ProtectedRoute>} />
            <Route path="/Linear_Search" element={<ProtectedRoute><LinearSearchComponent /></ProtectedRoute>} />
            <Route path="/Binary_Search" element={<ProtectedRoute><BinarySearchComponent /></ProtectedRoute>} />
            <Route path="/AVL-Tree" element={<ProtectedRoute><AvlTree /></ProtectedRoute>} />
            <Route path="/Learn_AVL-Tree" element={<ProtectedRoute><AVLTreeTheory /></ProtectedRoute>} />
           <Route path='/code_run' element={<OnlineCompiler/>}></Route>
            <Route path="/Binary-Search-Tree" element={<ProtectedRoute><BinarySearchTree /></ProtectedRoute>} />
            <Route path="/Learn_Binary-Search-Tree" element={<ProtectedRoute><BinarySearchTreeTheory /></ProtectedRoute>} />
            <Route path="/Learn_Tree-Traversal" element={<ProtectedRoute><TreeTraversalTheory /></ProtectedRoute>} />
            <Route path="/Tree-Traversal" element={<ProtectedRoute><Traversal /></ProtectedRoute>} />
            <Route path="/DFS-Traversal" element={<ProtectedRoute><DFS /></ProtectedRoute>} />
            <Route path="/BFS-Traversal" element={<ProtectedRoute><BFS /></ProtectedRoute>} />
            <Route path="/Learn_BFS-Traversal" element={<ProtectedRoute><BFSTraversalTheory/></ProtectedRoute>} />
            <Route path="/graph-algorithms" element={<ProtectedRoute><BFS /></ProtectedRoute>} />
            <Route path="/searching" element={<ProtectedRoute><LinearSearchComponent /></ProtectedRoute>} />
            <Route path="/sorting-algorithms" element={<ProtectedRoute><BubbleSort /></ProtectedRoute>} />
            <Route path="/mathematical-algorithms" element={<ProtectedRoute><Euclian /></ProtectedRoute>} />
            <Route path="/backtracking" element={<ProtectedRoute><BinarySearchTree /></ProtectedRoute>} />
            <Route path="/tree-data-structure" element={<ProtectedRoute><BinarySearchTree /></ProtectedRoute>} />
            <Route path="/dynamic-programming" element={<ProtectedRoute><MergeSortVisualizer /></ProtectedRoute>} />
            <Route path="/greedy-algorithms" element={<ProtectedRoute><BubbleSort /></ProtectedRoute>} />

            {/* Default to register if unknown route */}
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
