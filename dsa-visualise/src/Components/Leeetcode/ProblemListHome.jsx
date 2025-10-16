import { useEffect, useState } from 'react';
import { NavLink } from 'react-router'; // Fixed import
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
import { logoutUser } from '../../authSlice';
import Header from '../Header';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all' 
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/problem/getAllProblem');
        setProblems(data);
        console.log(problems)
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]); // Clear solved problems on logout
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || (problem.difficulty && problem.difficulty.toLowerCase() === filters.difficulty);
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' || 
                      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 pt-20">
        <div className="container mx-auto p-6 max-w-7xl">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Problems Library
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Master Data Structures & Algorithms with our curated collection of problems
            </p>
          </div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{problems.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Problems</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-green-100 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {solvedProblems.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Solved</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-yellow-100 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {problems.length - solvedProblems.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Unsolved</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {problems.length > 0 ? Math.round((solvedProblems.length / problems.length) * 100) : 0}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">Progress</div>
            </div>
          </div> */}

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mr-4">Filter by:</h3>
              
              {/* Status Filter */}
              <select 
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Problems</option>
                <option value="solved">Solved Problems</option>
              </select>

              {/* Difficulty Filter */}
              <select 
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {/* Tag Filter */}
              <select 
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={filters.tag}
                onChange={(e) => setFilters({...filters, tag: e.target.value})}
              >
                <option value="all">All Tags</option>
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
              </select>

              {/* Reset Filters */}
              <button
                onClick={() => setFilters({ difficulty: 'all', tag: 'all', status: 'all' })}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all ml-auto"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No problems found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your filters to see more problems.
                </p>
              </div>
            ) : (
              filteredProblems.map(problem => (
                <div 
                  key={problem._id} 
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Problem Status Indicator */}
                        {solvedProblems.some(sp => sp._id === problem._id) ? (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                          </div>
                        )}

                        {/* Problem Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                            <NavLink 
                              to={`/problem/${problem._id}`} 
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {problem.title}
                            </NavLink>
                          </h3>
                          
                          <div className="flex items-center space-x-3">
                            {/* Difficulty Badge */}
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadgeColor(problem.difficulty)}`}>
                              {problem.difficulty || 'Unknown'}
                            </span>
                            
                            {/* Tag Badge */}
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                              {problem.tags || 'Unknown'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <NavLink
                        to={`/problem/${problem._id}`}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Solve
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
            <p>Keep practicing to master DSA! 🚀</p>
          </div>
        </div>
      </div>
    </>
  );
}

const getDifficultyBadgeColor = (difficulty) => {
  if (!difficulty) return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  
  switch (difficulty.toLowerCase()) {
    case 'easy': 
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
    case 'medium': 
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
    case 'hard': 
      return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
    default: 
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  }
};

export default Homepage;