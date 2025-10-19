import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  FileText, 
  Filter,
  Calendar,
  RefreshCw
} from "lucide-react";

function ManageProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterTag, setFilterTag] = useState("all");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axios.get("https://codepulse-2-cdpc.onrender.com/problem/getAllProblem");
        // Ensure all problems have required fields with fallbacks
        const safeData = data.map(problem => ({
          ...problem,
          title: problem.title || 'Untitled Problem',
          description: problem.description || '',
          difficulty: problem.difficulty || 'easy',
          tags: problem.tags || 'array',
          createdAt: problem.createdAt || new Date().toISOString(),
          updatedAt: problem.updatedAt || new Date().toISOString()
        }));
        setProblems(safeData);
      } catch (err) {
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;

    try {
      await axios.delete(`https://codepulse-2-cdpc.onrender.com/problem/delete/${id}`);
      // Remove deleted problem from state
      setProblems(prev => prev.filter(problem => problem._id !== id));
      alert("Problem deleted successfully!");
    } catch (error) {
      console.error("Error deleting problem:", error);
      alert("Failed to delete problem. Try again.");
    }
  };

  // Safe filtering with fallbacks for missing fields
  const filteredProblems = problems.filter(problem => {
    try {
      const safeTitle = problem.title?.toLowerCase() || '';
      const safeDescription = problem.description?.toLowerCase() || '';
      const safeDifficulty = problem.difficulty || 'easy';
      const safeTags = problem.tags || 'array';
      
      const matchesSearch = searchTerm === '' || 
        safeTitle.includes(searchTerm.toLowerCase()) ||
        safeDescription.includes(searchTerm.toLowerCase());
      
      const matchesDifficulty = filterDifficulty === "all" || safeDifficulty === filterDifficulty;
      const matchesTag = filterTag === "all" || safeTags === filterTag;
      
      return matchesSearch && matchesDifficulty && matchesTag;
    } catch (error) {
      console.error('Error filtering problem:', error, problem);
      return false; // Skip problematic problems
    }
  });

  // Get unique tags and difficulties for filters with safe access
  const uniqueTags = [...new Set(problems.map(p => p.tags || 'array'))];
  const uniqueDifficulties = [...new Set(problems.map(p => p.difficulty || 'easy'))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 rounded-9xl py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-22 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-blue-600" />
         <center>  <h1 className="text-4xl text-center font-bold text-gray-900">Manage Problems</h1></center> 
          </div>
          <p className="text-gray-600 ml-11">Create, edit, and manage coding challenges</p>
        </div>

        {/* Stats and Actions */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-2">{problems.length}</div>
            <div className="text-gray-600">Total Problems</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {problems.filter(p => (p.difficulty || 'easy') === 'easy').length}
            </div>
            <div className="text-gray-600">Easy Problems</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {problems.filter(p => (p.difficulty || 'easy') === 'medium').length}
            </div>
            <div className="text-gray-600">Medium Problems</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {problems.filter(p => (p.difficulty || 'easy') === 'hard').length}
            </div>
            <div className="text-gray-600">Hard Problems</div>
          </div>
        </div> */}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Problems
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 pl-11 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <div className="relative">
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full px-4 pl-11 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Difficulties</option>
                  {uniqueDifficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <div className="relative">
                <select
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="w-full px-4 pl-11 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Tags</option>
                  {uniqueTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-gray-600 flex items-center">
              <span>Showing {filteredProblems.length} of {problems.length} problems</span>
            </div>
            <Link
              to="/problem/create"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Problem
            </Link>
          </div>
        </div>

        {/* Problems Grid */}
        {filteredProblems.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterDifficulty !== 'all' || filterTag !== 'all' 
                ? "Try adjusting your search or filters"
                : "Get started by creating your first problem"
              }
            </p>
            {(searchTerm || filterDifficulty !== 'all' || filterTag !== 'all') ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterDifficulty('all');
                  setFilterTag('all');
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300 flex items-center mx-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
            ) : (
              <Link
                to="/problem/create"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium inline-flex items-center shadow-sm mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Problem
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <ProblemCard 
                key={problem._id} 
                problem={problem} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Separate component for individual problem cards with error boundary
const ProblemCard = ({ problem, onDelete }) => {
  try {
    const safeTitle = problem.title || 'Untitled Problem';
    const safeDescription = problem.description || 'No description available';
const safeDifficulty = (problem.difficulty || 'easy').charAt(0).toUpperCase() + (problem.difficulty || 'easy').slice(1);
    const safeTags = problem.tags || 'array';
    const safeCreatedAt = problem.createdAt ? new Date(problem.createdAt).toLocaleDateString() : 'Unknown';
    const safeUpdatedAt = problem.updatedAt ? new Date(problem.updatedAt).toLocaleDateString() : 'Unknown';
    const safeId = problem._id ? problem._id.slice(-6) : 'N/A';

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-all duration-300 hover:shadow-lg group">
        {/* Problem Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {safeTitle}
            </h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyBadgeColor(safeDifficulty)}`}>
              {safeDifficulty}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {safeDescription}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs border border-gray-200">
              {safeTags}
            </span>
            {/* <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs border border-gray-200">
              ID: {safeId}
            </span> */}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-gray-50">
          <div className="flex space-x-3">
            <Link
              to={`/problem/update/${problem._id}`}
              className="flex-1 px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium flex items-center justify-center shadow-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
            
            <button
              onClick={() => onDelete(problem._id)}
              className="flex-1 px-4 py-2 bg-red-600/85 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center shadow-sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
          
          {/* <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Created: {safeCreatedAt}
            </span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Updated: {safeUpdatedAt}
            </span>
          </div> */}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering problem card:', error, problem);
    return (
      <div className="bg-white rounded-xl border border-red-300 p-6 shadow-sm">
        <div className="text-red-600 text-sm flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Error displaying problem. ID: {problem._id || 'Unknown'}
        </div>
      </div>
    );
  }
};

const getDifficultyBadgeColor = (difficulty) => {
  if (!difficulty) return "bg-gray-200 text-gray-700";

  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800 border border-green-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "hard":
      return "bg-red-100 text-red-800 border border-red-200";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export default ManageProblems;