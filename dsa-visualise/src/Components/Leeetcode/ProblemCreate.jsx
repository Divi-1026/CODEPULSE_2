import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2, Code, FileText, Play, Save } from 'lucide-react';

const ProblemCreate = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    tags: 'array',
    visibletestcases: [{ input: '', output: '', explanation: '' }],
    hiddentestacases: [{ input: '', output: '' }],
    startcode: [
      { language: 'C++', initialcode: '' },
      { language: 'Java', initialcode: '' },
      { language: 'JavaScript', initialcode: '' }
    ],
    referenceSolution: [
      { language: 'C++', completecode: '' },
      { language: 'Java', completecode: '' },
      { language: 'JavaScript', completecode: '' }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const difficultyOptions = ['easy', 'medium', 'hard'];
  const tagOptions = ['array', 'linkedlist', 'graph', 'dp'];
  const languages = ['C++', 'Java', 'JavaScript'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestCaseChange = (index, field, value, type = 'visible') => {
    const key = type === 'visible' ? 'visibletestcases' : 'hiddentestacases';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].map((testCase, i) => 
        i === index ? { ...testCase, [field]: value } : testCase
      )
    }));
  };

  const handleCodeChange = (index, field, value, type = 'startcode') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addTestCase = (type = 'visible') => {
    const key = type === 'visible' ? 'visibletestcases' : 'hiddentestacases';
    const newTestCase = type === 'visible' 
      ? { input: '', output: '', explanation: '' }
      : { input: '', output: '' };
    
    setFormData(prev => ({
      ...prev,
      [key]: [...prev[key], newTestCase]
    }));
  };

  const removeTestCase = (index, type = 'visible') => {
    const key = type === 'visible' ? 'visibletestcases' : 'hiddentestacases';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!formData.title.trim()) {
        setMessage('Title is required');
        setLoading(false);
        return;
      }

      if (!formData.description.trim()) {
        setMessage('Description is required');
        setLoading(false);
        return;
      }

      for (let i = 0; i < formData.visibletestcases.length; i++) {
        const tc = formData.visibletestcases[i];
        if (!tc.input.trim() || !tc.output.trim() || !tc.explanation.trim()) {
          setMessage(`Visible Test Case ${i + 1}: Input, Output, and Explanation are required`);
          setLoading(false);
          return;
        }
      }

      for (let i = 0; i < formData.hiddentestacases.length; i++) {
        const tc = formData.hiddentestacases[i];
        if (!tc.input.trim() || !tc.output.trim()) {
          setMessage(`Hidden Test Case ${i + 1}: Input and Output are required`);
          setLoading(false);
          return;
        }
      }

      const filteredStartCode = formData.startcode.filter(
        (s) => s.initialcode && s.initialcode.trim() !== ''
      );

      const filteredReferenceSolutions = formData.referenceSolution.filter(
        (r) => r.completecode && r.completecode.trim() !== ''
      );

      if (filteredReferenceSolutions.length === 0) {
        setMessage('At least one reference solution is required');
        setLoading(false);
        return;
      }

      const finalData = {
        ...formData,
        startcode: filteredStartCode,
        referenceSolution: filteredReferenceSolutions,
        createdBy: user?._id || 'unknown'
      };

      console.log('Final data sent to backend:', finalData);

      const response = await axios.post('https://codepulse-2-cdpc.onrender.com/problem/create', finalData);

      if (response.status === 201) {
        setMessage('✅ Problem created successfully!');
        setTimeout(() => {
          setFormData({
            title: '',
            description: '',
            difficulty: 'easy',
            tags: 'array',
            visibletestcases: [{ input: '', output: '', explanation: '' }],
            hiddentestacases: [{ input: '', output: '' }],
            startcode: [
              { language: 'C++', initialcode: '' },
              { language: 'Java', initialcode: '' },
              { language: 'JavaScript', initialcode: '' }
            ],
            referenceSolution: [
              { language: 'C++', completecode: '' },
              { language: 'Java', completecode: '' },
              { language: 'JavaScript', completecode: '' }
            ]
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating problem:', error);
      setMessage(error.response?.data || 'Error creating problem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-22 bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-8xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Code className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Create New Problem</h1>
                <p className="text-blue-100 mt-1">Design a comprehensive coding challenge</p>
              </div>
            </div>
          </div> */}

          <div className="p-8">
            {message && (
              <div className={`p-4 rounded-xl mb-8 border-2 ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border-green-200' 
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    message.includes('✅') ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  {message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
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
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter problem title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Difficulty *
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      {difficultyOptions.map(diff => (
                        <option key={diff} value={diff}>
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tags *
                  </label>
                  <select
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {tagOptions.map(tag => (
                      <option key={tag} value={tag}>
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Problem Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe the problem in detail. Include constraints, examples, and any relevant information."
                    required
                  />
                </div>
              </div>

              {/* Visible Test Cases */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Play className="h-5 w-5 mr-2 text-green-600" />
                    Visible Test Cases *
                  </h2>
                  <button
                    type="button"
                    onClick={() => addTestCase('visible')}
                    className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Test Case</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  {formData.visibletestcases.map((testCase, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-300 p-6 hover:border-green-400 transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-900 text-lg">Test Case {index + 1}</h4>
                        {formData.visibletestcases.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTestCase(index, 'visible')}
                            className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1 text-sm font-medium"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Input *</label>
                          <textarea
                            value={testCase.input}
                            onChange={(e) => handleTestCaseChange(index, 'input', e.target.value, 'visible')}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono bg-gray-50"
                            placeholder="nums = [2,7,11,15], target = 9"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Output *</label>
                          <textarea
                            value={testCase.output}
                            onChange={(e) => handleTestCaseChange(index, 'output', e.target.value, 'visible')}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono bg-gray-50"
                            placeholder="[0,1]"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Explanation *</label>
                        <textarea
                          value={testCase.explanation}
                          onChange={(e) => handleTestCaseChange(index, 'explanation', e.target.value, 'visible')}
                          rows="2"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                          placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden Test Cases */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Play className="h-5 w-5 mr-2 text-purple-600" />
                    Hidden Test Cases *
                  </h2>
                  <button
                    type="button"
                    onClick={() => addTestCase('hidden')}
                    className="px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center space-x-2 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Test Case</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  {formData.hiddentestacases.map((testCase, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-300 p-6 hover:border-purple-400 transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-900 text-lg">Hidden Test {index + 1}</h4>
                        {formData.hiddentestacases.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTestCase(index, 'hidden')}
                            className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1 text-sm font-medium"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Input *</label>
                          <textarea
                            value={testCase.input}
                            onChange={(e) => handleTestCaseChange(index, 'input', e.target.value, 'hidden')}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono bg-gray-50"
                            placeholder="nums = [3,2,4], target = 6"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Output *</label>
                          <textarea
                            value={testCase.output}
                            onChange={(e) => handleTestCaseChange(index, 'output', e.target.value, 'hidden')}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono bg-gray-50"
                            placeholder="[1,2]"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Starter Code */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-600" />
                  Starter Code
                </h2>
                <div className="space-y-6">
                  {formData.startcode.map((code, index) => (
                    <div key={code.language} className="bg-white rounded-xl border border-gray-300 p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg">{code.language}</h4>
                      <textarea
                        value={code.initialcode}
                        onChange={(e) => handleCodeChange(index, 'initialcode', e.target.value, 'startcode')}
                        rows="8"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-gray-50"
                        placeholder={`Enter starter code for ${code.language}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Reference Solution */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Reference Solution *
                </h2>
                <p className="text-gray-600 mb-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
                  Reference solutions will be tested against all test cases. At least one solution is required.
                </p>
                <div className="space-y-6">
                  {formData.referenceSolution.map((solution, index) => (
                    <div key={solution.language} className="bg-white rounded-xl border border-gray-300 p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg">{solution.language} *</h4>
                      <textarea
                        value={solution.completecode}
                        onChange={(e) => handleCodeChange(index, 'completecode', e.target.value, 'referenceSolution')}
                        rows="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-gray-50"
                        placeholder={`Enter complete working solution for ${solution.language}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
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
                      <span>Creating Problem...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>Create Problem</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCreate;