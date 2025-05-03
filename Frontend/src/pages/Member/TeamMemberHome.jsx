import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamMemberHome = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/teamMember/logout',
        {},
        { withCredentials: true }
      );
      // Success animation or delay before redirect
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error(err);
      // Optionally display an error message to the user
    }
  };

  return (
    <div>
      <h1>Team Member Home</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default TeamMemberHome;
