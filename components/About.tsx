import React from 'react';
import { motion } from 'framer-motion';
import { playBoing } from '../utils/audio';

export const About: React.FC = () => {
    return (
        <section id="about" className="relative z-10 py-20 md:py-32 px-4 md:px-12 bg-[#FFFDF5] overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50, rotate: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/3 md:sticky md:top-32 flex flex-col items-center md:items-start text-center md:text-left"
                >
                    <div className="bg-yellow-400 border-[3px] border-black px-3 py-1.5 inline-flex items-center gap-2 rounded-xl neo-shadow mb-4 transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D55] animate-ping inline-block" />
                        <h2 className="text-black font-black text-xs md:text-sm tracking-widest uppercase">02 // The Mission</h2>
                    </div>
                    <h3 className="text-5xl md:text-6xl font-black leading-[1.02] mb-6">
                        Making <br className="hidden md:block" /> the web <br className="hidden md:block" />
                        <span className="text-[#FF2D55] drop-shadow-[3px_3px_0px_#000]">Fun again.</span>
                    </h3>
                    <div className="relative group">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={() => playBoing()}
                            className="w-44 h-44 md:w-52 md:h-52 rounded-3xl border-[3.5px] border-black bg-yellow-300 neo-shadow-lg overflow-hidden relative cursor-pointer"
                        >
                            <img
                                src="/avatar.jpeg"
                                alt="Avatar"
                                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                            />
                        </motion.div>

                        {/* Interactive floating pill sticker */}
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="absolute -bottom-3 -right-2 bg-[#5AC8FA] border-[2.5px] border-black px-3 py-1 rounded-full neo-shadow text-black font-black text-xs uppercase transform rotate-6 pointer-events-none"
                        >
                            IN BUILD MODE
                        </motion.div>

                        {/* Status chip */}
                        <div className="absolute -top-2 -left-2 bg-white border-[2.5px] border-black px-2.5 py-0.5 rounded-full neo-shadow flex items-center gap-1.5 pointer-events-none">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-black">Hey, It's Me!</span>
                        </div>
                    </div>
                </motion.div>

                <div className="w-full md:w-2/3">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 neo-shadow-lg mb-12 relative overflow-hidden"
                    >
                        <p className="text-xl md:text-3xl leading-relaxed font-bold text-black relative z-10">
                            I am a multidisciplinary developer obsessed with the sweet spot between <span className="text-[#5AC8FA] inline-block transform hover:scale-110 transition-transform cursor-pointer">design</span> and <span className="text-[#FFD60A] inline-block transform hover:scale-110 transition-transform cursor-pointer">technology</span>.
                        </p>
                        <p className="mt-6 text-lg md:text-xl text-gray-700 font-medium leading-relaxed relative z-10">
                            Basically, I write code that draws pictures. I believe the web should be fun, loud, and a little bit weird. If it doesn't make you smile, I'm refactoring it.
                        </p>
                        {/* Decor */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 rounded-full border-[3px] border-black z-0 opacity-50" />
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {[
                            { label: "Experience", value: "1+ Year", color: "bg-[#FFD60A]" },
                            { label: "Boring UIs", value: "Zero", color: "bg-[#5AC8FA]" },
                            { label: "Pixel Perfect", value: "100%", color: "bg-[#FF2D55]" },
                            { label: "Builder Mode", value: "24/7", color: "bg-[#5856D6]", text: "text-white" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + (i * 0.1) }}
                                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                                onMouseEnter={() => playBoing()}
                                className={`p-4 md:p-6 border-[3px] border-black rounded-2xl neo-shadow ${stat.color} flex flex-col items-center justify-center text-center`}
                            >
                                <h4 className={`text-2xl md:text-4xl font-black mb-1 ${stat.text || 'text-black'}`}>{stat.value}</h4>
                                <p className={`font-bold text-[10px] md:text-sm uppercase tracking-wide border-black ${stat.text || 'text-black/70'}`}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};