import React, { useState } from 'react';
import Header from '../Header';
import { 
  PlayCircle, 
  Trash2, 
  Code2, 
  Terminal, 
  FileCode,
  Cpu,
  Zap,
  Coffee,
  FileText,
  Clock,
  MemoryStick,
  Activity,
  BarChart3
} from 'lucide-react';
import Editor from '@monaco-editor/react';

const languages = [
  { name: 'python', icon: FileCode, colorClass: 'text-green-500', monacoLang: 'python' },
  { name: 'cpp', icon: Cpu, colorClass: 'text-blue-500', monacoLang: 'cpp' },
  { name: 'java', icon: Coffee, colorClass: 'text-red-500', monacoLang: 'java' },
  { name: 'node', icon: Zap, colorClass: 'text-emerald-500', monacoLang: 'javascript' }
];

const placeholderCode = {
  python: `# Python example\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\nint main() {\n    cout << fibonacci(10) << endl;\n    return 0;\n}`,
  java: `public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 1) return n;\n        return fibonacci(n-1) + fibonacci(n-2);\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(fibonacci(10));\n    }\n}`,
  node: `function fibonacci(n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\nconsole.log(fibonacci(10));`,
};

const OnlineCompiler = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(placeholderCode.python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(placeholderCode[lang]);
    setOutput('');
    setError('');
    setAnalysis(null);
    setShowAnalysis(false);
  };

  const handleClear = () => {
    setCode(placeholderCode[language]);
    setInput('');
    setOutput('');
    setError('');
    setAnalysis(null);
    setShowAnalysis(false);
  };

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('');
    setError('');
    setAnalysis(null);
    setShowAnalysis(false);

    try {
      const res = await fetch('http://localhost:5000/api/analyze-complexity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, input }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        let combinedOutput = '';
        if (data.compile_output) combinedOutput += `⚠ Compile Output:\n${data.compile_output}\n\n`;
        if (data.stderr) combinedOutput += `❌ Runtime Error:\n${data.stderr}\n\n`;
        if (data.stdout) combinedOutput += `✅ Output:\n${data.stdout}\n`;
        setOutput(combinedOutput || 'Code executed successfully!');
      }
    } catch (e) {
      setError('Connection Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeComplexity = async () => {
    setLoading(true);
    setAnalysis(null);
    setShowAnalysis(true);

    try {
      const res = await fetch('http://localhost:5000/api/analyze-complexity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code, 
          language, 
          input
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        setAnalysis({ error: data.error });
      } else {
        setAnalysis(data);
      }
    } catch (e) {
      setAnalysis({ error: 'Analysis failed: ' + e.message });
    } finally {
      setLoading(false);
    }
  };

  const formatMemory = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0s';
    if (seconds < 0.001) return (seconds * 1000).toFixed(2) + 'ms';
    if (seconds < 1) return (seconds * 1000).toFixed(0) + 'ms';
    return seconds.toFixed(4) + 's';
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const getMonacoLanguage = () => {
    const langConfig = languages.find(lang => lang.name === language);
    return langConfig ? langConfig.monacoLang : 'plaintext';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />
      <div className="max-w-7xl mt-22 mx-auto space-y-6">

        {/* Page Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Code2 className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">CodePulse Compiler</h1>
          </div>
          <p className="text-gray-600 text-lg">Write, run, and analyze code complexity</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {/* Theme Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setEditorTheme('vs')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                editorTheme === 'vs' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Light Theme
            </button>
            <button
              onClick={() => setEditorTheme('vs-dark')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                editorTheme === 'vs-dark' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Dark Theme
            </button>
          </div>

          {/* Run Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleRunCode}
              disabled={loading}
              className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all flex items-center gap-2 ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? 'Running...' : <><PlayCircle className="w-6 h-6" /> Run Code</>}
            </button>
            
            <button
              onClick={handleAnalyzeComplexity}
              disabled={loading}
              className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all flex items-center gap-2 ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              Analyze Complexity
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-gray-600" />
            Language
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {languages.map((lang) => {
              const Icon = lang.icon;
              const isSelected = language === lang.name;
              return (
                <button
                  key={lang.name}
                  onClick={() => handleLanguageChange(lang.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : lang.colorClass}`} />
                  <span className="text-sm font-medium capitalize text-gray-700">{lang.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Editor with Monaco */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-[500px]">
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-800">
                {language.toUpperCase()} Editor
                <span className="ml-2 text-xs text-gray-500">
                  ({getMonacoLanguage().toUpperCase()})
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {editorTheme === 'vs-dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>
          
          <Editor
            height="100%"
            language={getMonacoLanguage()}
            value={code}
            onChange={handleEditorChange}
            theme={editorTheme}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: 'on',
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              parameterHints: { enabled: true },
              formatOnType: true,
              formatOnPaste: true,
              autoIndent: 'full',
              bracketPairColorization: { enabled: true },
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
              }
            }}
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading Editor...</span>
              </div>
            }
          />
        </div>

        {/* Complexity Analysis Panel */}
        {showAnalysis && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-200 bg-gray-50">
              <Activity className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-800">Complexity Analysis</span>
            </div>
            
            <div className="p-5">
              {analysis ? (
                analysis.error ? (
                  <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                    ❌ {analysis.error}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Execution Time</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-900">
                          {formatTime(analysis.execution_time)}
                        </div>
                        <div className="text-sm text-blue-600 mt-1">
                          Total runtime
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MemoryStick className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-purple-800">Memory Used</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-900">
                          {formatMemory(analysis.memory_used_bytes)}
                        </div>
                        <div className="text-sm text-purple-600 mt-1">
                          Peak: {formatMemory(analysis.memory_peak_bytes)}
                        </div>
                      </div>
                    </div>

                   
                    {/* Output Section */}
                    {analysis.stdout && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2">Program Output</h4>
                        <pre className="text-sm text-gray-700 bg-white p-3 rounded border font-mono">
                          {analysis.stdout}
                        </pre>
                      </div>
                    )}

                    {analysis.stderr && (
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Errors & Warnings</h4>
                        <pre className="text-sm text-red-700 bg-white p-3 rounded border font-mono">
                          {analysis.stderr}
                        </pre>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Analyzing code complexity...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input & Output */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-200 bg-gray-50">
              <Terminal className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-800">Program Input</span>
            </div>
            <textarea
              className="w-full h-32 p-4 font-mono text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Enter input here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-auto h-32">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-200 bg-gray-50">
              <Terminal className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-800">Program Output</span>
            </div>
            <div className="p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap">
              {error && <div className="text-red-600">{error}</div>}
              {output ? (
                output.split('\n').map((line, idx) => <div key={idx}>{line}</div>)
              ) : (
                <div className="text-gray-400 italic">Output will appear here after running code</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OnlineCompiler;