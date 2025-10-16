import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Header from '../Header';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../authSlice'; // Async thunk import karein
import { useDispatch, useSelector } from 'react-redux';


export default function UserProfile() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[date,setdate]=useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Logout successful - Redux state automatically update ho jayega
      setSolvedProblems([]);
      // navigate('/signup'); // Yeh automatically ho jayega upar wale useEffect se
    } catch (error) {
      console.error('Logout failed:', error);
      // Agar logout API fail bhi hota hai, toh frontend se hi logout kar do
      dispatch({ type: 'auth/clearAuth' }); // Emergency cleanup
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/auth/user_details', {
          withCredentials: true
        });
        setUserDetails(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError(err.response?.data?.message || "Failed to load user details. Please try again later.");
        setLoading(false);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/problem/problemSolvedByUser');
        console.log(data)
        console.log(data[0].createdAt)
        setSolvedProblems(data);
        console.log("Solved ",solvedProblems)
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserDetails();
      fetchSolvedProblems();
    }
  }, [isAuthenticated]);

  // Agar user authenticated nahi hai to kuch bhi render na karein
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className='bg-gray-50 min-h-screen'>
        <Header />
        <div className="pt-28 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-gray-50 max-h-screen'>
        <Header />
        <div className="pt-28 pb-12">
          <div className="max-w-screen mx-auto px-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Error Loading Profile</h3>
                  <p className="text-sm text-gray-600 mt-1">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Header />
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Profile Header - Clean White Design */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 h-32 border-b border-gray-200"></div>
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start -mt-16">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center">
                    {userDetails?.profilePicture ? (
                      <img 
                        src={userDetails.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border border-gray-200">
                        <span className="text-blue-600 text-3xl font-semibold">
                          {userDetails?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-4 md:ml-6 text-center md:text-left flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {userDetails?.name || 'User'}
                  </h1>
                  <p className="text-gray-600 mb-1 flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {userDetails?.email || 'No email provided'}
                  </p>
                  {userDetails?.username && (
                    <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      @{userDetails.username}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking Link */}
          <div className="mb-8 text-center">
            <Link to='/dashboard'>
              <div className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-400 group">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">View Your Learning Progress</span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Solved Problems Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Solved Problems
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {solvedProblems.length}
              </span>
            </h2>
            
            {solvedProblems.length > 0 ? (
              <div className="space-y-3">
                {solvedProblems.map((problem, index) => (
                <Link to={`/problem/${problem._id}`}>  <div key={problem._id || index} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{problem.title || 'Problem Title'}</h3>
                        {problem.difficulty && (
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {problem.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                    {problem.createdAt && (
                      <span className="text-sm text-black">
                        <p>Submitted on: {new Date(problem.createdAt).toLocaleString()}</p>
                      </span>
                    )}
                  </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-gray-500 mb-2">No problems solved yet</p>
                <p className="text-sm text-gray-400">Start solving problems to see them here!</p>
                <Link to="/problem-list">
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Browse Problems
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* User Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Full Name</span>
                  <span className="text-gray-900">{userDetails?.name || 'Not provided'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Email</span>
                  <span className="text-gray-900">{userDetails?.email || 'Not provided'}</span>
                </div>
                {userDetails?.phone && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Phone</span>
                    <span className="text-gray-900">{userDetails.phone}</span>
                  </div>
                )}
                {userDetails?.dateOfBirth && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Date of Birth</span>
                    <span className="text-gray-900">
                      {new Date(userDetails.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Problems Solved</span>
                  <span className="text-2xl font-bold text-green-600">{solvedProblems.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {solvedProblems.filter(p => p.difficulty === 'Easy').length}
                    </div>
                    <div className="text-xs text-blue-800 font-medium">Easy</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">
                      {solvedProblems.filter(p => p.difficulty === 'Medium').length}
                    </div>
                    <div className="text-xs text-yellow-800 font-medium">Medium</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg border border-gray-300 font-medium transition-colors duration-200 hover:border-gray-400 flex items-center gap-2 justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg border border-gray-300 font-medium transition-colors duration-200 hover:border-gray-400 flex items-center gap-2 justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Change Password
              </button>
              <button onClick={handleLogout} className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg border border-gray-300 font-medium transition-colors duration-200 hover:border-gray-400 flex items-center gap-2 justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

}
  
// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router'; // Fixed import
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all' 
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]); // Clear solved problems on logout
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' || 
//                       solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navigation Bar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">LeetCode</NavLink>
//         </div>
//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName}
//             </div>
//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li><button onClick={handleLogout}>Logout</button></li>
//               {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto p-4">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           {/* New Status Filter */}
//           <select 
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) => setFilters({...filters, status: e.target.value})}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) => setFilters({...filters, tag: e.target.value})}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="grid gap-4">
//           {filteredProblems.map(problem => (
//             <div key={problem._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center justify-between">
//                   <h2 className="card-title">
//                     <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
//                       {problem.title}
//                     </NavLink>
//                   </h2>
//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <div className="badge badge-success gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex gap-2">
//                   <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                     {problem.difficulty}
//                   </div>
//                   <div className="badge badge-info">
//                     {problem.tags}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default Homepage;