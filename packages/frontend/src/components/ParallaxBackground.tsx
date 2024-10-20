import React, { useEffect, useRef, ReactNode } from 'react';

interface ParallaxBackgroundProps {
  children: ReactNode;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ children }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate the percentage of mouse position
      const moveX = (clientX / innerWidth) * 10; // 10px max movement
      const moveY = (clientY / innerHeight) * 10; // 10px max movement

      // Apply the movement
      backgroundRef.current.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="bg-background min-h-screen">
      {children}
    </div>
  );
};

export default ParallaxBackground;
