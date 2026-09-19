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
                    <div className="bg-yellow-400 border-[3px] border-black p-2 inline-block rounded-lg neo-shadow mb-4 transform -rotate-2">
                        <h2 className="text-black font-black text-sm tracking-widest uppercase">02 — Who am I?</h2>
                    </div>
                    <h3 className="text-5xl md:text-6xl font-black leading-none mb-6">
                        Full Stack <br className="hidden md:block" /> Mindset, <br className="hidden md:block" />
                        <span className="text-[#FF2D55] drop-shadow-[2px_2px_0px_#000]">Proven.</span>
                    </h3>
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shan&backgroundColor=b6e3f4"
                        alt="Shan Patel Avatar"
                        className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-black bg-blue-200 neo-shadow-lg"
                    />
                </motion.div>

                <div className="w-full md:w-2/3">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 neo-shadow-lg mb-8 relative overflow-hidden"
                    >
                        <p className="text-xl md:text-3xl leading-relaxed font-bold text-black relative z-10">
                            Full-stack web developer specializing in <span className="text-[#5856D6] inline-block transform hover:scale-105 transition-transform cursor-pointer">Next.js</span>, <span className="text-[#5AC8FA] inline-block transform hover:scale-105 transition-transform cursor-pointer">React</span>, and <span className="text-[#FFD60A] inline-block transform hover:scale-105 transition-transform cursor-pointer bg-black px-2 py-0.5 rounded text-white">Node.js</span>.
                        </p>
                        <p className="mt-6 text-base md:text-lg text-gray-800 font-medium leading-relaxed relative z-10">
                            Experienced in building scalable, high-performance web applications, authentication systems, robust APIs, and responsive user interfaces. Skilled in end-to-end development, 3D interactive visualizations with Three.js, and seeking opportunities in Next.js or MERN-based environments.
                        </p>
                        {/* Decor */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 rounded-full border-[3px] border-black z-0 opacity-50" />
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                        {[
                            { label: "Experience", value: "fotonVR", color: "bg-[#FFD60A]" },
                            { label: "Projects", value: "10+ Done", color: "bg-[#5AC8FA]" },
                            { label: "B.E. CGPA", value: "7.74/10", color: "bg-[#FF2D55]" },
                            { label: "Tech Stack", value: "MERN / Next", color: "bg-[#5856D6]", text: "text-white" }
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
                                <h4 className={`text-2xl md:text-3xl font-black mb-1 ${stat.text || 'text-black'}`}>{stat.value}</h4>
                                <p className={`font-bold text-[10px] md:text-sm uppercase tracking-wide border-black ${stat.text || 'text-black/70'}`}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Work Experience Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 neo-shadow-lg mb-8 relative"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <div className="bg-[#FFD60A] border-2 border-black px-3 py-1 rounded-full text-xs font-black uppercase neo-shadow">
                                Work Experience
                            </div>
                            <span className="text-xs md:text-sm font-bold bg-black text-white px-3 py-1 rounded-full">
                                01/2025 – 03/2026 | Patan, Gujarat
                            </span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-black text-black">
                            Full Stack Developer <span className="text-[#5856D6]">@ fotonVR</span>
                        </h4>
                        <ul className="mt-4 space-y-3 text-gray-800 text-sm md:text-base font-medium">
                            <li className="flex items-start gap-2">
                                <span className="text-[#FF2D55] font-black text-lg leading-none mt-1">✦</span>
                                <span><strong>Role & Permissions:</strong> Engineered a robust Role and Permission System in the dynamic admin panel, enabling granular access control (view, edit, delete, publish) across multiple user roles, improving team efficiency and security.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#FF2D55] font-black text-lg leading-none mt-1">✦</span>
                                <span><strong>Dynamic Admin System:</strong> Contributed to a fully dynamic admin system that allows non-technical users to modify website pages, forms, and content in real time without direct code changes.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#FF2D55] font-black text-lg leading-none mt-1">✦</span>
                                <span><strong>3D Interactive Learning:</strong> Developed over 10+ 3D interactive learning activities using <strong>Three.js</strong>, visualizing physics concepts like Projectile Motion, Hall Effect, and Photoelectric Effect.</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Education & Achievement Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border-[3px] border-black rounded-2xl p-5 neo-shadow flex flex-col justify-between"
                        >
                            <div>
                                <div className="bg-[#5AC8FA] border-2 border-black px-3 py-0.5 rounded-full text-xs font-black uppercase neo-shadow inline-block mb-3">
                                    Education
                                </div>
                                <h5 className="text-lg font-black text-black leading-snug">Government Engineering College, Patan</h5>
                                <p className="text-sm font-bold text-[#5856D6] mt-1">B.E. in Computer Engineering</p>
                                <p className="text-xs font-bold text-gray-700 mt-1">CGPA: 7.74/10 • Sep 2021 – Jul 2025</p>
                                
                                <div className="mt-4 pt-3 border-t-2 border-black/10">
                                    <h6 className="text-xs font-black text-black">Eklavya School of Science, Patan</h6>
                                    <p className="text-xs font-semibold text-gray-600 mt-0.5">Higher Secondary School (82%) • Apr 2019 – May 2021</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border-[3px] border-black rounded-2xl p-5 neo-shadow flex flex-col justify-between"
                        >
                            <div>
                                <div className="bg-[#FF2D55] text-white border-2 border-black px-3 py-0.5 rounded-full text-xs font-black uppercase neo-shadow inline-block mb-3">
                                    Achievement
                                </div>
                                <h5 className="text-lg font-black text-black leading-snug">AI Saksham Program</h5>
                                <p className="text-sm font-bold text-gray-800 mt-1">
                                    Applied Cloud Computing for Software Development
                                </p>
                                <p className="text-xs font-medium text-gray-600 mt-1">
                                    A Microsoft CSR initiative by Edunet Foundation (2023–2024).
                                </p>
                            </div>
                            <div className="mt-4 bg-[#FFD60A] border-2 border-black rounded-xl p-2 text-center text-xs font-black uppercase neo-shadow">
                                ★ Cloud Computing Certified
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};