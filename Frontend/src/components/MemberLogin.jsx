import axios from "axios";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon, Lock, MailIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import viewContext from "../context/ViewContext";

const MemberLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { view, setView } = useContext(viewContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/teamMember/login', {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true
      });

      // Success animation before redirect
      setTimeout(() => {
        navigate('/teamMemberHome');
        setFormData({
          email: '',
          password: '',
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-100"
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Sign in to your team member account</p>
      </motion.div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm font-medium"
        >
          {error}
        </motion.div>
      )}
      
      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </motion.div>
        
        <motion.div className="mb-6" variants={itemVariants}>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </motion.div>
        
        <motion.button
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center"
          type="submit"
          disabled={loading}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>
      </motion.form>
      
      <motion.div 
        className="mt-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-sm text-gray-600 mb-3" variants={itemVariants}>
          Don't have an account?{' '}
          <motion.button
            className="text-green-600 hover:text-green-800 font-medium cursor-pointer"
            onClick={() => setView('memberRegister')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </motion.p>
        <motion.p className="text-sm text-gray-600" variants={itemVariants}>
          Are you a team lead?{' '}
          <motion.button
            className="text-green-600 hover:text-green-800 font-medium cursor-pointer"
            onClick={() => setView('teamLeadLogin')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Team Lead Login
          </motion.button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default MemberLogin;