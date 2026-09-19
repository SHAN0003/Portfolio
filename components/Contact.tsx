import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';
import { playBoing } from '../utils/audio';

export const Contact: React.FC = () => {
    return (
        <section id="contact" className="relative z-10 py-20 md:py-32 px-4 md:px-12 bg-[#FFFDF5] overflow-hidden">

            <div className="max-w-4xl mx-auto relative z-20 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#FFD60A] border-[3px] md:border-[4px] border-black p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] neo-shadow-lg relative"
                >
                    <h2 className="text-5xl md:text-8xl font-black mb-6 md:mb-8 leading-none text-black">
                        SAY HELLO!
                    </h2>
                    <p className="text-lg md:text-2xl text-black font-bold mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                        Looking for a full-stack engineer or have an exciting project? <br className="hidden md:block" />
                        Let's build something remarkable together.
                    </p>

                    <MagneticButton
                        variant='secondary'
                        className="bg-white hover:bg-gray-100 text-black border-[3px] border-black text-lg md:text-xl py-3 md:py-4"
                        onClick={() => window.location.href = 'mailto:shaanpatel5750@gmail.com'}
                    >
                        Shoot me an Email
                    </MagneticButton>

                    <p className="mt-6 font-black text-sm md:text-base text-black bg-white/60 inline-block px-4 py-1.5 rounded-full border-2 border-black neo-shadow">
                        📍 Patan, Gujarat &nbsp;•&nbsp; ✉️ shaanpatel5750@gmail.com &nbsp;•&nbsp; 📞 +91 9265566265
                    </p>

                    {/* Decorative Corner Elements */}
                    <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 bg-[#5AC8FA] border-[3px] border-black rounded-full" />
                    <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-8 h-8 md:w-12 md:h-12 bg-[#FF2D55] border-[3px] border-black rounded-full" />
                </motion.div>

                <div className="mt-16 md:mt-24 flex justify-center flex-wrap gap-4 md:gap-6">
                    {[
                        { icon: Github, href: 'https://github.com/SHAN0003', label: 'GitHub', color: 'bg-[#1c1c1e]', text: 'text-white' },
                        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'bg-[#0077b5]', text: 'text-white' },
                        { icon: Phone, href: 'tel:9265566265', label: 'Phone', color: 'bg-[#10b981]', text: 'text-white' },
                        { icon: Mail, href: 'mailto:shaanpatel5750@gmail.com', label: 'Email', color: 'bg-[#FF2D55]', text: 'text-white' }
                    ].map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                            onMouseEnter={() => playBoing()}
                            aria-label={item.label}
                            className={`p-3 md:p-4 rounded-full border-[3px] border-black ${item.color} ${item.text} transition-transform neo-shadow-hover`}
                            data-cursor-hover
                        >
                            <item.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                        </motion.a>
                    ))}
                </div>

                <footer className="mt-20 md:mt-32 text-black font-bold text-xs md:text-sm flex flex-col md:flex-row justify-between items-center border-t-[3px] border-black pt-8 gap-4">
                    <p className="uppercase tracking-wider">&copy; {new Date().getFullYear()} SHAN PATEL. ALL RIGHTS RESERVED.</p>
                    <p className="bg-black text-white px-3 py-1 rounded-full">
                        FULL STACK DEVELOPER
                    </p>
                </footer>
            </div>
        </section>
    );
};