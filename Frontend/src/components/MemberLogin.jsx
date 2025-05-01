import axios from "axios";
import { useContext, useState } from "react";
import viewContext from "../context/ViewContext";
import { useNavigate } from "react-router-dom";
const MemberLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { view, setView } = useContext(viewContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    teamCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:3000/teamMember/login', {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true
      });

      alert('Login successful!');
      navigate('/teamMemberHome');
      setFormData({
        email: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Team Member Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            className="text-green-600 hover:text-green-800 font-medium cursor-pointer"
            onClick={() => setView('memberRegister')}
          >
            Register
          </button>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Are you a team lead?{' '}
          <button
            className="text-green-600 hover:text-green-800 font-medium cursor-pointer"
            onClick={() => setView('teamLeadLogin')}
          >
            Team Lead Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default MemberLogin