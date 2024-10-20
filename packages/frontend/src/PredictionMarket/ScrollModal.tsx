import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ScrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ScrollModal: React.FC<ScrollModalProps> = ({ isOpen, onClose, children }) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimationComplete(false);
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, 1000); // Adjust this value to match the duration of your GIF
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-xl h-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0">
          <img
            src={isAnimationComplete ? "/Scroll_Open.png" : "/scroll_1.gif"}
            alt="Scroll Animation"
            className="w-full h-full object-contain"
          />
        </div>
        <AnimatePresence>
          {isAnimationComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center justify-between h-full py-16 px-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-black">Modal Content</h2>
              <div className="flex-grow flex flex-col items-center justify-center text-black">
                {children}
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
