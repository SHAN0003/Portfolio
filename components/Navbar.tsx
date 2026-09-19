import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { playPop } from '../utils/audio';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isBooping, setIsBooping] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const handleLogoClick = () => {
    playPop(1.8);
    setIsBooping(true);
    setTimeout(() => setIsBooping(false), 400);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  }

  const navItems = ['Work', 'About', 'Skills', 'Contact'];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -120 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:p-6 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white border-[3px] border-black rounded-full px-5 md:px-7 py-2 md:py-2.5 flex items-center gap-3 md:gap-7 neo-shadow-lg transform transition-transform">
          {/* Creative Mature Designer Logo & Brand */}
          <div className="relative">
            {/* Sleek Tooltip on Hover */}
            <AnimatePresence>
              {isLogoHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.7, rotate: -4 }}
                  animate={{ opacity: 1, y: -40, scale: 1, rotate: -2 }}
                  exit={{ opacity: 0, y: 2, scale: 0.7, transition: { duration: 0.12 } }}
                  transition={{ type: "spring", stiffness: 450, damping: 18 }}
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap bg-black text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 mt-1 rounded-full border-2 border-black neo-shadow flex items-center gap-1.5 shadow-[2px_2px_0px_#FFD60A]"
                >
                  <span>TOP</span>
                  <span className="text-[#FFD60A]">✦</span>
                  {/* Tooltip pointer */}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onHoverStart={() => {
                setIsLogoHovered(true);
                playPop(1.5);
              }}
              onHoverEnd={() => setIsLogoHovered(false)}
              onClick={handleLogoClick}
              className="flex items-center gap-2 cursor-pointer select-none outline-none group"
              data-cursor-hover
              aria-label="Home / Shan"
            >
              {/* Mature Creative Mascot Face */}
              <motion.div
                animate={
                  isBooping
                    ? {
                      scale: [1, 0.9, 1.1, 1],
                      rotate: [0, -6, 6, 0],
                    }
                    : isLogoHovered
                      ? { rotate: [-3, 3, -3], transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } }
                      : { rotate: 0 }
                }
                transition={{ duration: 0.35 }}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#FFD60A] border-[2.5px] border-black flex items-center justify-center relative neo-shadow overflow-hidden group-hover:bg-[#FFE033] transition-colors shrink-0"
              >
                {/* Sleek Designer Shades */}
                <div className="relative z-10 flex items-center justify-center -mt-0.5">
                  {/* Left Lens */}
                  <div className="w-3.5 h-2.5 bg-black rounded-[2px] rounded-b-md relative overflow-hidden flex items-center shadow-sm">
                    <motion.div
                      animate={isLogoHovered ? { x: [-12, 18] } : { x: -12 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-1.5 h-6 bg-white/80 -rotate-25 absolute"
                    />
                  </div>

                  {/* Bridge */}
                  <div className="w-1 h-[2px] bg-black -mt-0.5" />

                  {/* Right Lens */}
                  <div className="w-3.5 h-2.5 bg-black rounded-[2px] rounded-b-md relative overflow-hidden flex items-center shadow-sm">
                    <motion.div
                      animate={isLogoHovered ? { x: [-12, 18] } : { x: -12 }}
                      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.04 }}
                      className="w-1.5 h-6 bg-white/80 -rotate-25 absolute"
                    />
                  </div>
                </div>

                {/* Confident Smirk / Smile */}
                <motion.div
                  animate={isLogoHovered ? { scaleX: 1.25, y: -0.5 } : { scaleX: 1, y: 0 }}
                  className="w-2.5 h-1 border-b-[2px] border-black rounded-b-full absolute bottom-2 left-1/2 -translate-x-1/2"
                />
              </motion.div>

              {/* Bold Cartoon Name Badge with Star */}
              <div className="flex items-center gap-1">
                <span className="text-xl md:text-2xl font-black tracking-tight text-black group-hover:text-[#1c1c1e] transition-colors">
                  SHAN
                </span>
                <motion.span
                  animate={{
                    rotate: isLogoHovered ? 180 : 0,
                    scale: isLogoHovered ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="text-[#FF2D55] text-sm md:text-base font-black inline-block leading-none"
                >
                  ✦
                </motion.span>
              </div>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="w-[2px] h-6 bg-black/10 hidden md:block" />

          <div className="hidden md:flex gap-2 lg:gap-4">
            {navItems.map((item, i) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => playPop()}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`
                          text-base lg:text-lg font-bold uppercase transition-all px-3 lg:px-4 py-1 rounded-full border-2 border-transparent hover:border-black hover:bg-[var(--c-yellow)] hover:neo-shadow
                          ${i % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'}
                      `}
                data-cursor-hover
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-[45] md:hidden bg-white border-[3px] border-black rounded-3xl p-6 neo-shadow-lg flex flex-col gap-4"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-2xl font-black uppercase text-left py-2 border-b-2 border-black/5 last:border-0 flex justify-between items-center"
              >
                {item}
                <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-yellow-400' : 'bg-pink-500'}`} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};