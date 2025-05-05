// components/DeleteConfirmationDialog.jsx
import React from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons";

const DeleteConfirmationDialog = ({ isDeleting, setIsDeleting, confirmDeleteProject }) => {
  return (
    <Dialog.Root open={isDeleting} onOpenChange={setIsDeleting}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
            <div className="bg-red-100 p-2 rounded-lg">
              <TrashIcon className="w-5 h-5 text-red-600" />
            </div>
            Delete Project
          </Dialog.Title>

          <p className="mb-4">
            Are you sure you want to delete this project? This action
            cannot be undone.
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close asChild>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
            </Dialog.Close>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={confirmDeleteProject}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
            >
              <TrashIcon />
              Delete
            </motion.button>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full w-6 h-6 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteConfirmationDialog;