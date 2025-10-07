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
  FileText
} from 'lucide-react';

const languages = [
  { name: 'python', icon: FileCode, colorClass: 'text-green-500' },
  { name: 'cpp', icon: Cpu, colorClass: 'text-blue-500' },
  { name: 'java', icon: Coffee, colorClass: 'text-red-500' },
  { name: 'node', icon: Zap, colorClass: 'text-emerald-500' }
];

const placeholderCode = {
  python: `# Python example\na = int(input("Enter a: "))\nb = int(input("Enter b: "))\nprint(a+b)`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}`,
  java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a+b);\n    }\n}`,
  node: `const readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nlet input = [];\nrl.on('line', (line) => input.push(line))\n  .on('close', () => {\n    const [a, b] = input.map(Number);\n    console.log(a+b);\n  });`,
};

const OnlineCompiler = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(placeholderCode.python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(placeholderCode[lang]);
    setOutput('');
    setError('');
  };

  const handleClear = () => {
    setCode(placeholderCode[language]);
    setInput('');
    setOutput('');
    setError('');
  };

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/execute', {
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
    <p className="text-gray-600 text-lg">Write, run, and debug your code seamlessly</p>
  </div>

  {/* Run Button */}
  <div className="flex justify-end">
    <button
      onClick={handleRunCode}
      disabled={loading}
      className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all ${
        loading
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {loading ? 'Running...' : <div className="flex items-center gap-2"><PlayCircle className="w-6 h-6" /> Run Code</div>}
    </button>
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

  {/* Code Editor */}
  <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-[500px]">
    <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-2">
        <FileCode className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-semibold text-gray-800">{language.toUpperCase()} Editor</span>
      </div>
      <button
        onClick={handleClear}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Clear
      </button>
    </div>
    <textarea
      className="flex-1 w-full p-4 font-mono text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
      value={code}
      onChange={(e) => setCode(e.target.value)}
    />
  </div>

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
