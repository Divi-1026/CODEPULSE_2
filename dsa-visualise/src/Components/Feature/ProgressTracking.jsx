import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Header from '../Header';
import { Link } from 'react-router-dom';

export default function ProgressTracking() {
  const [problems, setProblems] = useState([]);
  const [learningProgress, setLearningProgress] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
   const [totalproblem, settotalProblems] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProblems, setTotalProblems] = useState(12);
  const [totalLearning, setTotalLearning] = useState(10);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        const [problemsRes, learningRes, solvedRes,totalproblem1] = await Promise.all([
          axios.get('https://codepulse-2-cdpc.onrender.com/api/progress/marked', { withCredentials: true }),
    axios.get('https://codepulse-2-cdpc.onrender.com/api/theory/marked', { withCredentials: true }),
    axios.get('https://codepulse-2-cdpc.onrender.com/problem/problemSolvedByUser', { withCredentials: true }),
    axios.get('https://codepulse-2-cdpc.onrender.com/problem/getAllProblem', { withCredentials: true })
        ]);
        console.log(totalproblem1.data)
        console.log("from frontend", learningRes);
        setProblems(problemsRes.data?.markedProblems || []);
        setLearningProgress(learningRes.data?.markedProblems || []);
        setSolvedProblems(solvedRes.data || []);
        settotalProblems(totalproblem1.data.length);
        console.log("lenth",totalproblem1.length)
        setLoading(false);
      } catch (err) {
        console.error("Error fetching progress:", err);
        setError(err.response?.data?.message || "Failed to load your progress. Please try again later.");
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  // Calculate statistics for solved problems
  const solvedStats = {
    total: solvedProblems.length,
    easy: solvedProblems.filter(p => p.difficulty === 'Easy').length,
    medium: solvedProblems.filter(p => p.difficulty === 'Medium').length,
    hard: solvedProblems.filter(p => p.difficulty === 'Hard').length
  };

  const problemsPercentage = Math.round((problems.length / totalProblems) * 100);
  const learningPercentage = Math.round((learningProgress.length / totalLearning) * 100);
  const solvedPercentage = Math.round((solvedProblems.length / 50) * 100); // Assuming 50 total problems available
  const overallPercentage = Math.round(((problems.length + learningProgress.length + solvedProblems.length) / (totalProblems + totalLearning + 50)) * 100);

  // Enhanced ProgressCircle component with better animations
  const ProgressCircle = ({ percentage, label, color, size = "md" }) => {
    const sizes = {
      sm: { radius: 12, fontSize: "text-sm", container: "w-20 h-20" },
      md: { radius: 15.9155, fontSize: "text-xl", container: "w-32 h-32" },
      lg: { radius: 20, fontSize: "text-2xl", container: "w-40 h-40" }
    };
    
    const { radius, fontSize, container } = sizes[size];
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className={`relative ${container} mb-3`}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${fontSize} font-bold text-gray-800`}>
            {percentage}%
          </span>
        </div>
        <p className="text-sm font-medium text-gray-700 text-center">{label}</p>
        <p className="text-xs text-gray-500 text-center mt-1">
          {percentage === 100 ? 'Completed!' : 'In Progress'}
        </p>
      </div>
    );
  };

  // Enhanced Overall Progress Circle
  const OverallProgressCircle = ({ percentage }) => {
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-indigo-700">
          {percentage}%
        </span>
      </div>
    );
  };

  // Difficulty Distribution Chart Component
  const DifficultyChart = ({ stats }) => {
    const total = stats.easy + stats.medium + stats.hard;
    const easyPercent = total > 0 ? (stats.easy / total) * 100 : 0;
    const mediumPercent = total > 0 ? (stats.medium / total) * 100 : 0;
    const hardPercent = total > 0 ? (stats.hard / total) * 100 : 0;

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Difficulty Distribution</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Easy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{stats.easy} problems</span>
              <span className="text-sm font-medium text-gray-800">{Math.round(easyPercent)}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${easyPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{stats.medium} problems</span>
              <span className="text-sm font-medium text-gray-800">{Math.round(mediumPercent)}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${mediumPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Hard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{stats.hard} problems</span>
              <span className="text-sm font-medium text-gray-800">{Math.round(hardPercent)}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${hardPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  // Progress Trend Chart Component
  const ProgressTrendChart = () => {
    // Mock data for progress trend (you can replace with actual data)
    const weeklyProgress = [2, 5, 3, 8, 6, 10, 7]; // Problems solved per day
    
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Progress Trend</h3>
        <div className="flex items-end justify-between h-32 gap-1">
          {weeklyProgress.map((count, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500 ease-out"
                style={{ height: `${(count / Math.max(...weeklyProgress)) * 80}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
              <span className="text-xs font-medium text-gray-700">{count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='bg-gray-100'>
        <Header/>
        <div className="min-h-screen bg-gray-50 py-8 px-4 mt-18 md:mt-28">
          <div className="max-w-7xl mx-auto">
            
            {/* Enhanced Overall Progress Section */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Learning Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Overall Progress */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
                    <OverallProgressCircle percentage={overallPercentage} />
                    <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {problems.length + learningProgress.length + solvedProblems.length} of {totalProblems + totalLearning + 50} items completed
                    </p>
                  </div>

                  {/* Problems Progress */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-center">
                    <ProgressCircle 
                      percentage={problemsPercentage} 
                      label="Practice Problems"
                      color="#10b981"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {problems.length} of {totalProblems} problems
                    </p>
                  </div>

                  {/* Learning Progress */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-6 text-center">
                    <ProgressCircle 
                      percentage={learningPercentage} 
                      label="Theory Learned"
                      color="#8b5cf6"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {learningProgress.length} of {totalLearning} topics
                    </p>
                  </div>

                  {/* Solved Problems Progress */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 text-center">
                    <ProgressCircle 
                      percentage={solvedPercentage} 
                      label="Coding Problems Solved"
                      color="#f59e0b"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {solvedProblems.length} problems solved of {totalproblem}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <DifficultyChart stats={solvedStats} />
              <ProgressTrendChart />
            </div> */}

            <div className="flex flex-col lg:flex-col gap-8">
              
              {/* Problems Progress Section */}
              <div className="mt-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                        Coding Problems Solved
                      </h2>
                      <p className="text-gray-600">Your completed coding challenges</p>
                    </div>
                    {!loading && !error && solvedProblems.length > 0 && (
                      <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                        {solvedProblems.length} {solvedProblems.length === 1 ? 'Problem' : 'Problems'}
                      </span>
                    )}
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  ) : solvedProblems.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">No problems solved yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Start solving coding problems to see them here!</p>
                      <Link to="/problem-list">
                        <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Browse Problems
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-t border-gray-200"></div>
                      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                        {solvedProblems.map((problem, index) => (
                          <li key={problem._id || index} className="py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                            <Link to={`/problem/${problem._id}`} className="block">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 hover:text-orange-600">
                                      {problem.title || 'Problem Title'}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      {problem.difficulty && (
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-red-100 text-red-800'
                                        }`}>
                                          {problem.difficulty}
                                        </span>
                                      )}
                                      {/* {problem.tags && problem.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                          {tag}
                                        </span>
                                      ))} */}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {problem.solvedAt && (
                                    <span className="text-sm text-gray-500">
                                      {new Date(problem.solvedAt).toLocaleDateString()}
                                    </span>
                                  )}
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
              <div className="w-full">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                          Learned Visualizations
                        </h2>
                        <p className="text-gray-600">Your marked practice problems</p>
                      </div>
                      {!loading && !error && problems.length > 0 && (
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                          {problems.length} {problems.length === 1 ? 'Problem' : 'Problems'}
                        </span>
                      )}
                    </div>

                    {loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    ) : error ? (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    ) : problems.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No problems marked yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Start practicing to track your progress!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="border-t border-gray-200"></div>
                        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                          {problems.map((problem, index) => (
                            <li key={problem._id || problem || index} className="py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                      {typeof problem === 'string' ? problem : (problem.title || `Problem ${problem._id}`)}
                                    </h3>
                                    {problem.solvedAt && (
                                      <p className="text-sm text-gray-500">
                                        Solved on {new Date(problem.solvedAt).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                        })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Completed
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Learning Progress Section */}
              <div className=" w-full">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                          <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                          Theory Learned
                        </h2>
                        <p className="text-gray-600">Your completed learning topics</p>
                      </div>
                      {!loading && !error && learningProgress.length > 0 && (
                        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                          {learningProgress.length} {learningProgress.length === 1 ? 'Topic' : 'Topics'}
                        </span>
                      )}
                    </div>

                    {loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                      </div>
                    ) : error ? (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    ) : learningProgress.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No topics learned yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Start learning to build your knowledge!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="border-t border-gray-200"></div>
                        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                          {learningProgress.map((topic, index) => (
                            <li key={topic._id || topic || index} className="py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                      {typeof topic === 'string' ? topic : (topic.title || `Topic ${topic._id}`)}
                                    </h3>
                                    {topic.completedAt && (
                                      <p className="text-sm text-gray-500">
                                        Learned on {new Date(topic.completedAt).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                        })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  Learned
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Solved Problems Section */}
            
          </div>
        </div>
      </div>
    </>
  );
}