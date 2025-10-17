import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { checkAuth } from "./authSlice"

import { useDispatch, useSelector } from 'react-redux';
import UserProfile from "./Components/Feature/UserDetail";
import LinearSearchTheory from "./Components/Theory/LinearSearchTheory";
import Visualizations from "./Components/Feature/Visulaization";
import AuthPage from "./Pages/SignUp";  
import CodeVisualizerPage from "./Components/Feature/DryRun";
import LinearSearchComponent from './Components/Searching/LinearSearch';
import DFS from './Components/Graph/DFS';
import UpdateProblem from "./Components/Leeetcode/UpdateProblem";
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
import OnlineCompiler from "./Components/Feature/CodeEditor";
import DijkstraVisualiser from "./Components/Graph/Dijkshatra";
import FibonacciAnimatedDP from "./Dp/Fibbonaci";
import DijkstraTheory from "./Components/Theory/LearnDijkstara";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import ManageProblems from "./Components/Leeetcode/ManageProblem";
import Homepage from "./Components/Leeetcode/ProblemListHome";
import ProblemPage from "./Components/Leeetcode/ProblemPage";
import Admin from "./Components/Leeetcode/AdminPannel";
import ProblemCreate from "./Components/Leeetcode/ProblemCreate";
import UserList from "./Components/Leeetcode/UserList";
import AboutPage from "./Components/About";
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/signup" />;
};

// Public Route Component (Jab user authenticated ho toh redirect kare)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }
  
  return !isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {/* Header har authenticated route par show karein */}
        {isAuthenticated && <Header />}
        
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public Routes - Only accessible when NOT authenticated */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
             <Route path='/problem/create' element={<ProblemCreate></ProblemCreate>}></Route>
         <Route path='/problem/update/:problemId' element={<UpdateProblem></UpdateProblem>}></Route>
         <Route path='/problem/detail' element={<ManageProblems></ManageProblems>}></Route>
            <Route path='/admin'element={<Admin></Admin>}></Route>
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            <Route path='/about' element={<AboutPage></AboutPage>}></Route>
<Route path='/user_details' element={<UserList></UserList>}></Route>
            {/* Protected Routes - Only accessible when authenticated */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Searching" 
              element={
                <ProtectedRoute>
                  <LinearSearchTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn" 
              element={
                <ProtectedRoute>
                  <LearnTopic />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/header" 
              element={
                <ProtectedRoute>
                  <Header />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dryrun" 
              element={
                <ProtectedRoute>
                  <CodeVisualizerPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <ProgressTracking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Binary" 
              element={
                <ProtectedRoute>
                  <BinarySearchTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Visualization" 
              element={
                <ProtectedRoute>
                  <Visualizations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ContactUs" 
              element={
                <ProtectedRoute>
                  <ContactUs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Selection-Sort" 
              element={
                <ProtectedRoute>
                  <SelectionSortTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Bubble-Sort" 
              element={
                <ProtectedRoute>
                  <BubbleSortTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Bubble-Sort" 
              element={
                <ProtectedRoute>
                  <BubbleSort />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Merge-Sort" 
              element={
                <ProtectedRoute>
                  <MergeSort />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Merge-Sort" 
              element={
                <ProtectedRoute>
                  <MergeSortTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Insertion-Sort" 
              element={
                <ProtectedRoute>
                  <InsertionSortTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Insertion-Sort" 
              element={
                <ProtectedRoute>
                  <InsertionSort />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Selection-Sort" 
              element={
                <ProtectedRoute>
                  <Selection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Linear_Search" 
              element={
                <ProtectedRoute>
                  <LinearSearchComponent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Binary_Search" 
              element={
                <ProtectedRoute>
                  <BinarySearchComponent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/AVL-Tree" 
              element={
                <ProtectedRoute>
                  <AvlTree />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_AVL-Tree" 
              element={
                <ProtectedRoute>
                  <AVLTreeTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/code_run" 
              element={
                <ProtectedRoute>
                  <OnlineCompiler />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Binary-Search-Tree" 
              element={
                <ProtectedRoute>
                  <BinarySearchTree />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Binary-Search-Tree" 
              element={
                <ProtectedRoute>
                  <BinarySearchTreeTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_Tree-Traversal" 
              element={
                <ProtectedRoute>
                  <TreeTraversalTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Tree-Traversal" 
              element={
                <ProtectedRoute>
                  <Traversal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/DFS-Traversal" 
              element={
                <ProtectedRoute>
                  <DFS />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/BFS-Traversal" 
              element={
                <ProtectedRoute>
                  <BFS />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Learn_BFS-Traversal" 
              element={
                <ProtectedRoute>
                  <BfsTraversalTheory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/graph-algorithms" 
              element={
                <ProtectedRoute>
                  <BFS />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/searching" 
              element={
                <ProtectedRoute>
                  <LinearSearchComponent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sorting-algorithms" 
              element={
                <ProtectedRoute>
                  <BubbleSort />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mathematical-algorithms" 
              element={
                <ProtectedRoute>
                  <Euclian />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/backtracking" 
              element={
                <ProtectedRoute>
                  <BinarySearchTree />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tree-data-structure" 
              element={
                <ProtectedRoute>
                  <BinarySearchTree />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dynamic-programming" 
              element={
                <ProtectedRoute>
                  <MergeSortVisualizer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/greedy-algorithms" 
              element={
                <ProtectedRoute>
                  <BubbleSort />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dijkstara" 
              element={
                <ProtectedRoute>
                  <DijkstraVisualiser />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dijkstara-thoery" 
              element={
                <ProtectedRoute>
                  <DijkstraTheory />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/problem-list" 
              element={
                <Homepage></Homepage>
              } 
            />

            {/* Default route based on authentication */}
            <Route 
              path="*" 
              element={
                isAuthenticated ? <Navigate to="/" /> : <Navigate to="/signup" />
              } 
            />
            <Route path="/problem/:problemId" element={<ProblemPage/>}></Route>
          </Routes>
        </div>
        
        {/* Footer har authenticated route par show karein */}
        {isAuthenticated && <Footer />}
      </Router>
    </div>
  );
}

export default App;

// import {Routes, Route ,Navigate} from "react-router";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Homepage from "./pages/Homepage";
// import { useDispatch, useSelector } from 'react-redux';
// import { checkAuth } from "./authSlice";
// import { useEffect } from "react";
// import AdminPanel from "./components/AdminPanel";
// import ProblemPage from "./pages/ProblemPage"
// import Admin from "./pages/Admin";
// import AdminVideo from "./components/AdminVideo"
// import AdminDelete from "./components/AdminDelete"
// import AdminUpload from "./components/AdminUpload"

// function App(){
  
//   const dispatch = useDispatch();
//   const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

//   // check initial authentication
//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);
  
//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">
//       <span className="loading loading-spinner loading-lg"></span>
//     </div>;
//   }

//   return(
//   <>
//     <Routes>
//       <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
//       <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
//       <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
//       <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
//       <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
//       <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
//       <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
//       <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
//       <Route path="/problem/:problemId" element={<ProblemPage/>}></Route>
      
//     </Routes>
//   </>
//   )
// }

//  export default App