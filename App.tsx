import React, { Suspense, useEffect, useState } from 'react';
import { Cursor } from './components/ui/Cursor';
import { CursorTrails } from './components/ui/CursorTrails';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Work } from './components/Work';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => (
    <motion.div 
        className="fixed inset-0 bg-yellow-400 z-[10000] flex items-center justify-center flex-col border-b-[8px] border-black"
        initial={{ y: 0 }}
        exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
        <motion.div 
            className="text-6xl md:text-8xl font-black text-black"
            animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0] 
            }}
            transition={{ repeat: Infinity, duration: 0.5 }}
        >
            LOADING...
        </motion.div>
    </motion.div>
);

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <Cursor />
      <CursorTrails />
      
      <Navbar />

      <main className="relative w-full">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </>
  );
};

export default App;
