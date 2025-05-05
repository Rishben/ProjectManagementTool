// components/Notification.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Notification = ({ notification }) => {
  return (
    <AnimatePresence>
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;