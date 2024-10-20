import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SwordsAnimation: React.FC = () => {
  const [animationState, setAnimationState] = useState<'playing' | 'finished'>('playing');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState('finished');
    }, 4000); // Adjust this value to match twice the duration of your GIF

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {animationState === 'playing' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          exit={{ opacity: 0 }}
          className="flex justify-center"
        >
          <img src="/SwordClash.gif" alt="Swords Animation" className="w-1/2 h-auto" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <img src="/SwordTogether.png" alt="Static Sword" className="w-1/2 h-auto" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
