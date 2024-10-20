import { motion } from "framer-motion";
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
        className="relative w-full max-w-lg max-h-[500px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0">
          <img
            src={isAnimationComplete ? "/Scroll_Open.png" : "/scroll_1.gif"}
            alt="Scroll Animation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 p-8">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
