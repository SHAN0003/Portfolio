import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { playPop } from '../../utils/audio';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const MagneticButton: React.FC<Props> = ({ children, className = '', onClick, variant = 'primary' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseEnter = () => {
      playPop(variant === 'primary' ? 1 : 0.8);
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-block px-8 py-4 font-bold text-xl border-[3px] border-black rounded-full transition-all duration-200 neo-shadow-hover";
  const variants = {
      primary: "bg-yellow-400 text-black hover:bg-yellow-300",
      secondary: "bg-white text-black hover:bg-gray-50"
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 10, mass: 0.5 }}
      className="inline-block"
    >
      <button 
        onClick={onClick}
        data-cursor-hover
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
         {children}
      </button>
    </motion.div>
  );
};
