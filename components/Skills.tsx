import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Next.js", "React.js", "Node.js", "MongoDB",
  "Three.js", "Express.js", "JavaScript", "Tailwind CSS",
  "Git & GitHub", "Postman", "Framer Motion", "REST APIs"
];

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ children, reverse = false }) => {
  return (
    <div className="relative flex overflow-hidden py-6 bg-white border-y-[3px] border-black transform -skew-y-2 my-8">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative z-10 py-20 md:py-32 overflow-hidden bg-[#5AC8FA]">

      <div className="relative z-10 mb-8 md:mb-12 px-4 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-block bg-white border-[3px] border-black px-4 md:px-6 py-2 rounded-full neo-shadow mb-6">
          <h2 className="text-3xl md:text-6xl font-black text-black uppercase">MY TOOLKIT</h2>
        </div>
        <p className="text-white font-bold text-lg md:text-xl drop-shadow-[2px_2px_0px_#000]">Weapons of Mass Creation</p>
      </div>

      <div className="flex flex-col gap-0">
        <Marquee>
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center">
              <span
                className="text-6xl md:text-9xl font-black text-transparent text-outline mx-4 md:mx-8 uppercase hover:text-[#FFD60A] transition-colors duration-200"
                style={{ WebkitTextStroke: '2px black' }}
              >
                {skill}
              </span>
              <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black block" />
            </div>
          ))}
        </Marquee>

        <Marquee reverse>
          {skills.slice().reverse().map((skill, i) => (
            <div key={i} className="flex items-center">
              <span
                className="text-6xl md:text-9xl font-black text-black mx-4 md:mx-8 uppercase hover:text-white transition-colors duration-200"
                style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}
              >
                {skill}
              </span>
              {/* Star Shape Divider */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12 text-black">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Floating Sticker Decor */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [5, 10, 5] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-10 left-4 md:top-20 md:left-10 w-20 h-20 md:w-24 md:h-24 bg-[#FFD60A] rounded-full border-[3px] border-black z-20 flex items-center justify-center font-black text-[10px] md:text-xs transform -rotate-12 neo-shadow"
      >
        100% FUN
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [-5, -10, -5] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-10 right-4 md:bottom-20 md:right-10 w-24 h-24 md:w-32 md:h-32 bg-[#FF2D55] rounded-full border-[3px] border-black z-20 flex items-center justify-center font-black text-white text-center leading-none p-2 transform rotate-12 neo-shadow text-xs md:text-base"
      >
        PIXEL PERFECT
      </motion.div>
    </section>
  );
};