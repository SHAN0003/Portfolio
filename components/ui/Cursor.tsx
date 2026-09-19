import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Bouncy spring
  const springConfig = { damping: 15, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-cursor-hover]')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center hidden md:flex"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    >
      {/* Cartoon Cursor Body */}
      <motion.div
        className="w-full h-full rounded-full border-[3px] border-black bg-yellow-400 neo-shadow"
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
          backgroundColor: hovered ? '#FF2D55' : '#FFD60A',
          rotate: hovered ? 45 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
    </motion.div>
  );
};
