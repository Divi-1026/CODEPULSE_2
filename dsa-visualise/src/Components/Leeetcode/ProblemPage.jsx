import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axios from "../../axios"
import SubmissionHistory from "./SubmissionHistory"

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'javascript'
};

// Default starter code templates
const defaultStarterCode = {
  javascript: `function solve(input) {
    // Write your code here
    return input;
}`,
  java: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(defaultStarterCode.javascript);
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [error, setError] = useState(null);
  const editorRef = useRef(null);
  let { problemId } = useParams();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching problem with ID:", problemId);
        const response = await axios.get(`http://localhost:5000/problem/problemById/${problemId}`);
        
        if (!response.data) {
          throw new Error('No problem data received');
        }

        const problemData = response.data;
        console.log("Problem data received:", problemData);
        console.log("problem",problemData)
        // Set the problem state
        setProblem(problemData);

        // Safely get initial code
        let initialCode = defaultStarterCode[selectedLanguage];
        
        // Check if startcode exists and has the correct structure
        if (problemData.startcode && Array.isArray(problemData.startcode) && problemData.startcode.length > 0) {
          const languageCode = problemData.startcode.find(sc => {
            console.log(problemData.startcode)
            console.log(sc.language,"h4h4jbh ",langMap[selectedLanguage])
          return  sc && sc.language && sc.language === langMap[selectedLanguage]
         } );
          console.log("Found language code:", languageCode);
          
          if (languageCode && languageCode.initialcode) {
            initialCode = languageCode.initialcode;
          }
        }
        
        console.log("Setting initial code:", initialCode);
        setCode(initialCode);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching problem:', error);
        setError(error.response?.data || error.message || 'Failed to load problem');
        setLoading(false);
      }
    };

    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);

  // Update code when language changes
  useEffect(() => {
    if (problem) {
      let initialCode = defaultStarterCode[selectedLanguage];
      
      console.log("Problem startcode:", problem.startcode);
      if (problem.startcode && Array.isArray(problem.startcode) && problem.startcode.length > 0) {
        const languageCode = problem.startcode.find(sc => 
          sc && sc.language && sc.language === langMap[selectedLanguage]
        );
        
        if (languageCode && languageCode.initialcode) {
          initialCode = languageCode.initialcode;
        }
      }
      
      console.log("Updated code for language:", selectedLanguage, initialCode);
      setCode(initialCode);
    } else {
      // If no problem loaded, use default starter code
      setCode(defaultStarterCode[selectedLanguage]);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    if (!problemId) return;
    
    setLoading(true);
    setRunResult(null);
    
    try {
      const response = await axios.post(`http://localhost:5000/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
      
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: error.response?.data?.message || 'Internal server error',
        testCases: []
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    if (!problemId) return;
    
    setLoading(true);
    setSubmitResult(null);
    
    try {
      const response = await axios.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });

      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
      
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult({
        accepted: false,
        error: error.response?.data?.message || 'Submission failed',
        passedTestCases: 0,
        totalTestCases: 0
      });
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Add debugging to see current state
  console.log("Current problem state:", problem);
  console.log("Current code:", code);
  console.log("Selected language:", selectedLanguage);

  if (loading && !problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen mt-22 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Problem Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        {/* Left Tabs */}
        <div className="flex bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
          {['description', 'editorial', 'solutions', 'submissions', 'chatAI'].map((tab) => (
            <button 
              key={tab}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-all duration-200 ${
                activeLeftTab === tab 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveLeftTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Left Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {problem ? (
            <>
              {activeLeftTab === 'description' && (
                <div className="space-y-6">
                  {/* Problem Header */}
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {problem.title || 'Untitled Problem'}
                    </h1>
                  </div>

                  {/* Difficulty and Tags */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty ? problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1) : 'Unknown'}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                      {problem.tags || 'General'}
                    </span>
                  </div>

                  {/* Problem Description */}
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-wrap">
                      {problem.description || 'No description available.'}
                    </div>
                  </div>

                  {/* Examples */}
                  {problem.visibletestcases && problem.visibletestcases.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Examples</h3>
                      {problem.visibletestcases.map((example, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Example {index + 1}</h4>
                          <div className="space-y-3 font-mono text-sm">
                            <div>
                              <span className="font-medium text-gray-600 dark:text-gray-400">Input: </span>
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                                {example.input}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600 dark:text-gray-400">Output: </span>
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                                {example.output}
                              </code>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Explanation: </span>
                                <span className="text-gray-700 dark:text-gray-300">{example.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Constraints */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Constraints</h3>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                      <li>• 1 ≤ input size ≤ 10⁴</li>
                      <li>• -10⁹ ≤ input values ≤ 10⁹</li>
                      <li>• Your solution must be efficient</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Solutions</h2>
                  <div className="space-y-4">
                    {problem.referenceSolution && problem.referenceSolution.length > 0 ? (
                      problem.referenceSolution.map((solution, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {problem.title} - {solution.language}
                            </h3>
                          </div>
                          <div className="p-4">
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{solution.completeCode}</code>
                            </pre>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        Solutions will be available after you solve the problem.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Submissions</h2>
                  <SubmissionHistory problemId={problemId} />
                </div>
              )}

              {activeLeftTab === 'chatAI' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Chat with AI</h2>
                  <p className="text-gray-600 dark:text-gray-400">AI assistant coming soon!</p>
                </div>
              )}

              {activeLeftTab === 'editorial' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Editorial</h2>
                  <p className="text-gray-600 dark:text-gray-400">Editorial content coming soon!</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Problem Loading</h2>
              <p className="text-gray-600 dark:text-gray-400">Problem data is being loaded...</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        {/* Right Tabs */}
        <div className="flex bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
          {['code', 'testcase', 'result'].map((tab) => (
            <button 
              key={tab}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-all duration-200 ${
                activeRightTab === tab 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveRightTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          {activeRightTab === 'code' && (
            <div className="flex-1 flex flex-col">
              {/* Language Selector */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex gap-2">
                  {['javascript', 'java', 'cpp'].map((lang) => (
                    <button
                      key={lang}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedLanguage === lang 
                          ? 'bg-blue-500 text-white shadow-lg' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between">
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    onClick={() => setActiveRightTab('testcase')}
                  >
                    Console
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleRun}
                    disabled={loading}
                  >
                    {loading ? 'Running...' : 'Run'}
                  </button>
                  <button
                    className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSubmitCode}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRightTab === 'testcase' && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Test Results</h3>
                {runResult && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    runResult.success 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {runResult.success ? 'All Tests Passed' : 'Tests Failed'}
                  </div>
                )}
              </div>
              
              {runResult ? (
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        {runResult.testCases ? runResult.testCases.filter(tc => tc.status_id === 3).length : 0}/{runResult.testCases ? runResult.testCases.length : 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Test Cases</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        {runResult.runtime || '0.00'}s
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Runtime</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        {runResult.memory || '0'} KB
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Memory</div>
                    </div>
                  </div>

                  {/* Test Cases Details */}
                  {runResult.testCases && runResult.testCases.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Test Case Details</h4>
                      <div className="space-y-3">
                        {runResult.testCases.map((tc, i) => (
                          <div key={i} className={`p-4 rounded-lg border ${
                            tc.status_id === 3 
                              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                              : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                          }`}>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-semibold text-gray-800 dark:text-white">Test Case {i + 1}</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                tc.status_id === 3 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300' 
                                  : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-300'
                              }`}>
                                {tc.status_id === 3 ? 'Passed' : 'Failed'}
                              </span>
                            </div>
                            <div className="font-mono text-sm space-y-2">
                              <div className="flex items-start space-x-2">
                                <span className="font-medium text-gray-600 dark:text-gray-400 min-w-16">Input:</span>
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200 flex-1">
                                  {tc.stdin}
                                </code>
                              </div>
                              <div className="flex items-start space-x-2">
                                <span className="font-medium text-gray-600 dark:text-gray-400 min-w-16">Expected:</span>
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200 flex-1">
                                  {tc.expected_output}
                                </code>
                              </div>
                              <div className="flex items-start space-x-2">
                                <span className="font-medium text-gray-600 dark:text-gray-400 min-w-16">Output:</span>
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200 flex-1">
                                  {tc.stdout}
                                </code>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {runResult.error && !runResult.success && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-red-800 dark:text-red-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Error:</span>
                      </div>
                      <p className="text-red-700 dark:text-red-400 mt-2 text-sm">{runResult.error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No Test Results</h4>
                  <p className="text-gray-500 dark:text-gray-500">Click "Run" to test your code with the example test cases.</p>
                </div>
              )}
            </div>
          )}

          {activeRightTab === 'result' && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Submission Result</h3>
                {submitResult && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    submitResult.accepted 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {submitResult.accepted ? 'Accepted' : 'Rejected'}
                  </div>
                )}
              </div>

              {submitResult ? (
                <div className="space-y-6">
                  {/* Result Header */}
                  <div className={`p-6 rounded-xl border ${
                    submitResult.accepted 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                      : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        submitResult.accepted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {submitResult.accepted ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className={`text-2xl font-bold ${
                          submitResult.accepted 
                            ? 'text-green-800 dark:text-green-300' 
                            : 'text-red-800 dark:text-red-300'
                        }`}>
                          {submitResult.accepted ? 'Solution Accepted' : submitResult.error || 'Wrong Answer'}
                        </h4>
                        <p className={`mt-1 ${
                          submitResult.accepted 
                            ? 'text-green-700 dark:text-green-400' 
                            : 'text-red-700 dark:text-red-400'
                        }`}>
                          {submitResult.accepted 
                            ? 'Congratulations! Your solution passed all test cases.' 
                            : 'Some test cases failed. Review your solution and try again.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        {submitResult.passedTestCases}/{submitResult.totalTestCases}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Test Cases</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        {submitResult.runtime || '0.00'}s
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Runtime</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        {submitResult.memory || '0'} KB
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Memory</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {submitResult.accepted && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Success</span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-400 mt-2 text-sm">
                        Your solution has been successfully submitted and accepted. You can now view other solutions or attempt more problems.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No Submission Result</h4>
                  <p className="text-gray-500 dark:text-gray-500">Click "Submit" to submit your solution for evaluation.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;