// components/Header.jsx
import React from "react";
import { motion } from "framer-motion";
import { ExitIcon } from "@radix-ui/react-icons";

const Header = ({ handleLogout }) => {
  return (
    <div className="container mx-auto my-5 flex items-center justify-between">
      <nav>
        <h1 className="text-3xl font-bold">Team Leader Dashboard</h1>
        <p className="text-gray-500">Manage your teams and projects here</p>
      </nav>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
      >
        Logout <ExitIcon />
      </motion.button>
    </div>
  );
};

export default Header;