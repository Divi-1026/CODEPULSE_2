import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../axios';
import { Save, ArrowLeft, Plus, Trash2, Code, FileText, Play, Settings } from "lucide-react";

function UpdateProblem() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [problemcreator, setProblemcreator] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [tags, setTags] = useState("array");
  const [visibleTestcases, setVisibleTestcases] = useState([{ input: "", output: "", explanation: "" }]);
  const [referenceSolution, setReferenceSolution] = useState([{ language: "cpp", completecode: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing problem details
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axios.get(`https://codepulse-2-cdpc.onrender.com/problem/problemById/${problemId}`);
        setTitle(data.title);
        setDifficulty(data.difficulty);
        setProblemcreator(data.problemcreator);
        setTags(data.tags);
        setVisibleTestcases(data.visibletestcases || [{ input: "", output: "", explanation: "" }]);
        setReferenceSolution(data.referenceSolution || [{ language: "cpp", completecode: "" }]);
      } catch (err) {
        console.error(err);
        setError("Failed to load problem details");
      }
    };
    fetchProblem();
  }, [problemId]);

  const handleTestcaseChange = (index, field, value) => {
    const newTestcases = [...visibleTestcases];
    newTestcases[index][field] = value;
    setVisibleTestcases(newTestcases);
  };

  const handleSolutionChange = (index, field, value) => {
    const newSolutions = [...referenceSolution];
    newSolutions[index][field] = value;
    setReferenceSolution(newSolutions);
  };

  const addTestcase = () => setVisibleTestcases([...visibleTestcases, { input: "", output: "", explanation: "" }]);
  
  const removeTestcase = (index) => {
    if (visibleTestcases.length > 1) {
      setVisibleTestcases(visibleTestcases.filter((_, i) => i !== index));
    }
  };

  const addSolution = () => setReferenceSolution([...referenceSolution, { language: "cpp", completecode: "" }]);
  
  const removeSolution = (index) => {
    if (referenceSolution.length > 1) {
      setReferenceSolution(referenceSolution.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        title,
        difficulty,
        tags,
        visibletestcases: visibleTestcases,
        referenceSolution,
        problemcreator
      };

      await axios.put(`https://codepulse-2-cdpc.onrender.com/problem/update/${problemId}`, payload);
      setSuccess("Problem updated successfully!");
      setTimeout(() => {
        navigate(`/problem/${problemId}`);
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update problem");
    } finally {
      setLoading(false);
    }
  };

  const difficultyColors = {
    easy: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    hard: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <div className="min-h-screen mt-22 bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-8xl mx-auto px-4">
        {/* Header */}
        {/* <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6 text-white" />
                </button>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Update Problem</h1>
                  <p className="text-blue-100 mt-1">Edit problem details and test cases</p>
                </div>
              </div>
              <div className="text-white/80 text-sm bg-white/20 px-3 py-1 rounded-full">
                ID: {problemId?.slice(-8)}
              </div>
            </div>
          </div>
        </div> */}

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-6 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl mb-6 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Problem Title *
                </label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter problem title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Difficulty *
                </label>
                <div className="flex space-x-2">
                  {["easy", "medium", "hard"].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-all ${
                        difficulty === diff 
                          ? difficultyColors[diff] + ' scale-105'
                          : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
                      }`}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tags *
              </label>
              <select 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="array">Array</option>
                <option value="linkedlist">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">Dynamic Programming</option>
                <option value="tree">Tree</option>
                <option value="string">String</option>
              </select>
            </div>
          </div>

          {/* Visible Test Cases */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Play className="h-5 w-5 mr-2 text-green-600" />
                Visible Test Cases
              </h2>
              <button 
                type="button" 
                onClick={addTestcase}
                className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2 font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Add Test Case</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {visibleTestcases.map((tc, index) => (
                <div key={index} className="bg-gray-50 rounded-xl border border-gray-300 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg">Test Case {index + 1}</h3>
                    {visibleTestcases.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeTestcase(index)}
                        className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1 text-sm font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Input *</label>
                      <textarea 
                        value={tc.input} 
                        onChange={(e) => handleTestcaseChange(index, "input", e.target.value)} 
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                        placeholder="Enter test input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Output *</label>
                      <textarea 
                        value={tc.output} 
                        onChange={(e) => handleTestcaseChange(index, "output", e.target.value)} 
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                        placeholder="Enter expected output"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
                    <textarea 
                      value={tc.explanation || ""} 
                      onChange={(e) => handleTestcaseChange(index, "explanation", e.target.value)} 
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Optional explanation for the test case"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Solutions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Code className="h-5 w-5 mr-2 text-purple-600" />
                Reference Solutions
              </h2>
              <button 
                type="button" 
                onClick={addSolution}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center space-x-2 font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Add Solution</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {referenceSolution.map((sol, index) => (
                <div key={index} className="bg-gray-50 rounded-xl border border-gray-300 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg">Solution {index + 1}</h3>
                    {referenceSolution.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeSolution(index)}
                        className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1 text-sm font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                    <select 
                      value={sol.language} 
                      onChange={(e) => handleSolutionChange(index, "language", e.target.value)} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                      <option value="javascript">JavaScript</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complete Code *</label>
                    <textarea 
                      value={sol.completecode} 
                      onChange={(e) => handleSolutionChange(index, "completecode", e.target.value)} 
                      rows="8"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Enter complete solution code"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold flex items-center space-x-3 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Updating Problem...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Update Problem</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProblem;