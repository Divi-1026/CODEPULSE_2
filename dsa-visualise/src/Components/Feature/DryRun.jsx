import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { PlayIcon, SpinnerIcon, CodeBracketSquareIcon } from '../../utils/icons';
import Header from '../Header';

const languageDisplayNames = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

const placeholderCode = {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

my_list = [64, 34, 25, 12, 22]
bubble_sort(my_list)
print("Sorted array is:", my_list)`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>

void bubble_sort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    std::vector<int> my_list = {64, 34, 25, 12, 22};
    bubble_sort(my_list);
    std::cout << "Sorted array is:";
    for(int i=0; i < my_list.size(); ++i)
      std::cout << " " << my_list[i];
    return 0;
}`,
    java: `import java.util.Arrays;

class BubbleSort {
    void bubbleSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void main(String args[]) {
        BubbleSort ob = new BubbleSort();
        int arr[] = {64, 34, 25, 12, 22};
        ob.bubbleSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`
};

const CodeVisualizerPage = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(placeholderCode.python);
  const [visualization, setVisualization] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(placeholderCode[lang]);
    setVisualization(null);
    setError(null);
  }

  const handleVisualize = async () => {
    if (!code.trim()) {
      setError("Code cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setVisualization(null);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      const schema = {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              line_executed: { type: Type.INTEGER, description: 'The line number that was just executed.' },
              variables: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.STRING },
                    scope: { type: Type.STRING },
                  },
                  required: ['name', 'value', 'scope']
                }
              },
              output: { type: Type.STRING, description: 'Any stdout output from this step.' },
              explanation: { type: Type.STRING, description: 'A brief explanation of this step.'}
            },
            required: ['line_executed', 'variables', 'output', 'explanation']
          }
      };
      
      const prompt = `You are a code execution simulator. Analyze the following ${language} code and provide a step-by-step dry run. Trace its execution logically, line by line.

Return a JSON array where each object represents a single step, conforming to the provided schema.

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY the JSON array. Do not include markdown formatting or other text.`;

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema,
          },
      });

      const result = JSON.parse(response.text);
      if(result && result.length > 0) {
        setVisualization(result);
        setCurrentStep(0);
      } else {
        setError("Could not generate a visualization. The code may be empty, incomplete, or have syntax errors.");
      }
    } catch (e) {
      console.error(e);
      setError(`An error occurred: ${e.message || 'Please check your code and try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const codeLines = code.split('\n');
  const activeLine = visualization ? visualization[currentStep]?.line_executed : -1;

  return (
    <div className="min-h-screen pt-22 flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      {/* <Header></Header> */}

      {/* Main Content */}
      <main className=" flex-grow max-w-8xl mx-auto w-full px-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#1051a1] to-[#0f2664] mb-8 animate-textShine">
            DRY RUN YOUR CODE
          </h1>
          <p className="mt-3 text-lg text-blue-600 font-medium">Step through your code execution with AI-powered visualization</p>
        </div>

        {/* Code Editor Section */}
        <div className="bg-white rounded-xl shadow-xl border border-blue-200 overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gradient-to-br from-[#d7d3f1] to-[#e7ecfc] border-b border-blue-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-2">
              {Object.keys(languageDisplayNames).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    language === lang 
                      ? 'bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white shadow-md' 
                      : 'bg-white text-blue-800 hover:bg-blue-50 border border-blue-200'
                  }`}
                >
                  {languageDisplayNames[lang]}
                </button>
              ))}
            </div>
            <button
              onClick={handleVisualize}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-2 font-medium text-white bg-gradient-to-br from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 disabled:bg-green-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-5 h-5 animate-spin"/>
                  Visualizing...
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5"/>
                  Visualize Code
                </>
              )}
            </button>
          </div>
          
          <div className="p-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Enter your ${languageDisplayNames[language]} code here...`}
              className="w-full pl-7 py-7 bg-gradient-to-br from-[#c9c7c4] to-[#eeeff2] h-96 p-4 font-mono text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none"
              aria-label="Code input"
            />
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {visualization && visualization.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Execution Panel */}
            <div className="bg-white rounded-xl shadow-xl border border-blue-200 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-br from-[#d7d3f1] to-[#e7ecfc] border-b border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800">Code Execution Trace</h3>
              </div>
              <div className="p-4 bg-gray-50 overflow-auto font-mono text-sm h-[500px]">
                {codeLines.map((line, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start transition-all duration-200 ${activeLine === index + 1 ? 'bg-blue-100 rounded-lg' : ''}`}
                  >
                    <span 
                      className={`w-10 text-right select-none mr-4 ${activeLine === index + 1 ? 'text-blue-700 font-bold' : 'text-gray-500'}`}
                    >
                      {index + 1}
                    </span>
                    <pre 
                      className={`whitespace-pre-wrap flex-1 ${activeLine === index + 1 ? 'text-blue-900 font-medium' : 'text-gray-700'}`}
                    >
                      {line || ' '}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Execution Details Panel */}
            <div className="bg-white rounded-xl shadow-xl border border-blue-200 overflow-hidden flex flex-col">
              <div className="px-6 py-4 bg-gradient-to-br from-[#d7d3f1] to-[#e7ecfc] border-b border-blue-700">
                <h3 className="text-xl font-bold text-blue-800">Execution Details</h3>
                <div className="flex items-center mt-2">
                  <span className="text-blue-700 text-sm font-medium">
                    Step {currentStep + 1} of {visualization.length}
                  </span>
                  <div className="ml-auto flex space-x-2">
                    <button 
                      onClick={() => setCurrentStep(s => Math.max(0, s-1))} 
                      disabled={currentStep === 0} 
                      className="px-3 py-1 text-s font-medium text-white bg-blue-700 bg-opacity-50 rounded hover:bg-opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                    <button 
                      onClick={() => setCurrentStep(s => Math.min(visualization.length - 1, s+1))} 
                      disabled={currentStep === visualization.length - 1} 
                      className="px-3 py-1 text-s font-medium text-white bg-blue-700 bg-opacity-50 rounded hover:bg-opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow p-6 space-y-6 overflow-y-auto bg-gradient-to-b from-blue-50 to-purple-50">
                {/* Explanation Card */}
                <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-br from-[#bfb8ec] to-[#e7ecfc] border-b border-blue-200 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-md font-semibold text-blue-800">Explanation</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-blue-900">{visualization[currentStep].explanation}</p>
                  </div>
                </div>

                {/* Variables Card */}
                <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-br from-[#d7d3f1] to-[#e7ecfc] border-b border-blue-200 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    <h3 className="text-md font-semibold text-blue-800">Variables</h3>
                  </div>
                  <div className="p-4">
                    {visualization[currentStep].variables.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {visualization[currentStep].variables.map(v => (
                          <div key={`${v.scope}-${v.name}`} className="bg-blue-50 rounded p-3 border border-blue-100">
                            <div className="flex justify-between items-baseline">
                              <span className="font-mono font-bold text-blue-700">{v.name}</span>
                              <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded">{v.scope}</span>
                            </div>
                            <div className="mt-1 font-mono text-blue-900 bg-white px-2 py-1 rounded border border-blue-200">
                              {v.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-blue-500 italic py-4">
                        No variables in current scope
                      </div>
                    )}
                  </div>
                </div>

                {/* Output Card */}
                <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-br from-[#d7d3f1] to-[#e7ecfc] border-b border-blue-200 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h3 className="text-md font-semibold text-blue-800">Output</h3>
                  </div>
                  <div className="p-4">
                    {visualization[currentStep].output ? (
                      <pre className="font-mono text-blue-900 bg-blue-50 p-3 rounded border border-blue-200 whitespace-pre-wrap overflow-x-auto">
                        {visualization[currentStep].output}
                      </pre>
                    ) : (
                      <div className="text-center text-blue-500 italic py-4">
                        No output in this step
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {/* <footer className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white py-8">
        <div className="max-w-8xl mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-blue-200 hover:text-white">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="text-blue-200">
            &copy; {new Date().getFullYear()} CodePulse Visualizer. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default CodeVisualizerPage;