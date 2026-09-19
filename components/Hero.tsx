import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { ArrowDown } from 'lucide-react';
import { CartoonBackground } from './CartoonBackground';

const letterVariants = {
  hidden: { y: 100, rotate: 10, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      damping: 8,
      stiffness: 150, // Bouncier
    },
  }),
};

const Title = ({ text, color = "text-black" }: { text: string; color?: string }) => {
  return (
    <div className="overflow-visible relative z-10 p-2">
      <div className="flex flex-wrap justify-center">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.2, rotate: Math.random() * 20 - 10, color: '#FF2D55' }}
            className={`text-6xl md:text-9xl font-black tracking-normal cursor-default select-none ${color} drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-center items-center z-10 overflow-hidden bg-transparent">
      <CartoonBackground />

      <div className="flex flex-col items-center z-20 p-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
          className="mb-8 bg-white border-2 border-black px-6 py-2 rounded-full neo-shadow"
        >
          <span className="font-bold text-black uppercase tracking-widest text-sm">✨ Open for Magic ✨</span>
        </motion.div>

        <Title text="CREATIVE" />
        <div className="-mt-1 md:-mt-4 relative z-10">
          {/* Outlined text in cartoon style is white fill with thick black stroke */}
          <Title text="DEVELOPER" color="text-outline-white text-white" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-6 md:mt-8 text-black/80 max-w-sm md:max-w-lg text-center text-lg md:text-xl font-medium leading-relaxed bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-black neo-shadow mx-4"
        >
          I make websites that go <b>boing</b>! Crafting interactive digital playgrounds with a pinch of chaos.
        </motion.p>

        <motion.div
          className="mt-8 md:mt-12 flex gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring' }}
        >
          <MagneticButton onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            See My Stuff
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ArrowDown size={40} strokeWidth={3} />
      </motion.div>
    </section>
  );
};
