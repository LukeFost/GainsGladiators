import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick, children, className }) => {
  const [buttonState, setButtonState] = useState<'initial' | 'animating' | 'final'>('initial');

  const handleClick = useCallback(() => {
    setButtonState('animating');
    onClick();
  }, [onClick]);

  useEffect(() => {
    if (buttonState === 'animating') {
      const timer = setTimeout(() => {
        setButtonState('final');
      }, 1000); // Adjust this value to match the duration of your GIF
      return () => clearTimeout(timer);
    }
  }, [buttonState]);

  return (
    <AnimatePresence>
      {buttonState === 'initial' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
          className={className}
        >
          {children}
        </motion.button>
      )}
      {buttonState === 'animating' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img src="/ring_play.gif" alt="Animating" className="w-full h-full object-contain" />
        </motion.div>
      )}
      {buttonState === 'final' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img src="/stamp.png" alt="Stamped" className="w-full h-full object-contain" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
