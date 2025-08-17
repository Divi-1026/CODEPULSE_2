import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import Header from '../Header';

export default function ProgressTracking() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProblems, setTotalProblems] = useState(12); // Set your total problems count here

  useEffect(() => {
    const fetchMarkedProblems = async () => {
      try {
        const res = await axios.get('/api/progress/marked');
        setProblems(res.data?.markedProblems || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching progress:", err);
        setError(err.response?.data?.message || "Failed to load your progress. Please try again later.");
        setLoading(false);
      }
    };

    fetchMarkedProblems();
  }, []);

  const progressPercentage = Math.round((problems.length / totalProblems) * 100);

  return (
    <> <div className='bg-gray-100'><Header/>
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-18 md:mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Progress Circle - Shows on left for large screens, top for small */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e6e6e6"
                      strokeWidth="3"
                    />
                    <path
                      className="progress-ring__circle"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeDasharray={`${progressPercentage}, 100`}
                    />
                  </svg>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700">
                    {problems.length} of {totalProblems} problems solved
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Keep up the good work!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Problems List - Takes full width on small screens, 2/3 on large */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Solved Problems</h1>
                    <p className="text-gray-600">Your completed challenges</p>
                  </div>
                  {!loading && !error && problems.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {problems.length} {problems.length === 1 ? 'Problem' : 'Problems'}
                    </span>
                  )}
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
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
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No problems solved yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start solving problems to track your progress!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-t border-gray-200"></div>
                    <ul className="divide-y divide-gray-200">
                      {problems.map((problem) => (
                        <li key={problem._id || problem} className="py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors">
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
        </div>
      </div>
    </div></div></>
  );
}