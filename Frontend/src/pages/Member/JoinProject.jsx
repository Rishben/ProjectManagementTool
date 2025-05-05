import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JoinProject() {
    const navigate = useNavigate();
    const { code, teamMemberId } = useParams();
  const [projectCode, setProjectCode] = useState(code);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Automatically set the project code if provided via URL
    if (code) {
      setProjectCode(code);
    }
  }, [code]);

  const handleJoin =async () => {
    if (!projectCode.trim()) {
      setError("Please enter a valid project code");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
        const response = await axios.post('http://localhost:3000/joinProject', { projectCode, teamMemberId });
        console.log(response.data);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || "Failed to join project. Please try again.");
      } finally {
        setIsLoading(false);
      }      
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Icon/Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Join Your Team</h1>
        </div>
        
        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {code && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Project code detected from your invitation link
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="projectCode" className="block text-sm font-medium text-gray-700 mb-1">
                Project Code
              </label>
              <input
                id="projectCode"
                type="text"
                value={projectCode}
                onChange={(e) => {
                  setProjectCode(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter the project code"
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
                  
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleJoin}
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </>
              ) : (
                'Join Project'
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Help Text */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Need help? Contact your team leader for the correct project code
          </p>
        </div>
      </div>
    </div>
  );
}

export default JoinProject;