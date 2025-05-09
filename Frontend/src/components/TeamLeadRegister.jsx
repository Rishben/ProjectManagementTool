import axios from "axios";
import { motion } from "framer-motion";
import { CheckIcon, EyeIcon, EyeOffIcon, Lock, MailIcon, UserIcon, UsersIcon } from "lucide-react";
import { useContext, useState } from "react";
import viewContext from "../context/LoginView/ViewContext";

const TeamLeadRegister = () => {
  const { view, setView } = useContext(viewContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Check if passwords match when either password field changes
    if (name === "password" || name === "confirmPassword") {
      if (name === "password") {
        setPasswordsMatch(value === formData.confirmPassword || formData.confirmPassword === "");
      } else {
        setPasswordsMatch(value === formData.password || value === "");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/teamLeader/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Success animation before redirect
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setView("teamLeadLogin");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        <div className="flex justify-center mb-4">
          <motion.div 
            className="p-3 bg-blue-100 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            <UsersIcon className="h-8 w-8 text-blue-600" />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Team</h2>
        <p className="text-gray-500">Register as a team leader</p>
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
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              type="text"
              id="name"
              name="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </motion.div>
        
        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              type="email"
              id="email"
              name="email"
              placeholder="team.lead@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </motion.div>
        
        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          <p className="text-xs text-gray-500 mt-1 ml-1">
            Create a strong password with at least 8 characters
          </p>
        </motion.div>
        
        <motion.div className="mb-6" variants={itemVariants}>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                formData.confirmPassword && !passwordsMatch 
                  ? "border-red-300 bg-red-50" 
                  : formData.confirmPassword && passwordsMatch
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300"
              }`}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {formData.confirmPassword && (
                <span className="mr-2">
                  {passwordsMatch ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-red-500 text-sm"
                    >
                      ✗
                    </motion.span>
                  )}
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
        
        <motion.button
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center"
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
          {loading ? "Creating Team..." : "Create Team Account"}
        </motion.button>
      </motion.form>
      
      <motion.div 
        className="mt-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-sm text-gray-600 mb-3" variants={itemVariants}>
          Already have an account?{" "}
          <motion.button
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            onClick={() => setView("teamLeadLogin")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.p>
        <motion.p className="text-sm text-gray-600" variants={itemVariants}>
          Are you a team member?{" "}
          <motion.button
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            onClick={() => setView("memberRegister")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Member Registration
          </motion.button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default TeamLeadRegister;