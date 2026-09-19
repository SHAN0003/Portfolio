import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { playPop } from '../utils/audio';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <div className="pointer-events-auto bg-white border-[3px] border-black rounded-full px-6 md:px-8 py-2 md:py-3 flex items-center gap-4 md:gap-8 neo-shadow-lg transform transition-transform">
          <motion.span 
              whileHover={{ scale: 1.1, rotate: -5 }}
              onMouseEnter={() => playPop(1.5)}
              className="text-lg md:text-2xl font-black tracking-tight cursor-pointer text-black select-none drop-shadow-sm whitespace-nowrap"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
          >
              SHAN PATEL
          </motion.span>
          
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