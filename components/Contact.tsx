import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { Mail, Github, Linkedin, Check, Sparkles, ArrowUp, Heart } from 'lucide-react';
import { playBoing, playPop } from '../utils/audio';
import { EmailModal } from './ui/EmailModal';

export const Contact: React.FC = () => {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const email = 'shaanpatel5750@gmail.com';

    const handleEmailClick = async () => {
        playBoing();
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Clipboard copy failed:', err);
        }

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setIsEmailModalOpen(true);
    };

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
                    <p className="text-lg md:text-2xl text-black font-bold mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                        Got a crazy idea? Want to build something fun? <br className="hidden md:block" />
                        Let's make the internet weird again.
                    </p>

                    <MagneticButton
                        variant='secondary'
                        className="bg-white hover:bg-gray-100 text-black border-[3px] border-black text-lg md:text-xl py-3 md:py-4"
                        onClick={handleEmailClick}
                    >
                        Shoot me an Email
                    </MagneticButton>

                    {/* Decorative Corner Elements */}
                    <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 bg-[#5AC8FA] border-[3px] border-black rounded-full" />
                    <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-8 h-8 md:w-12 md:h-12 bg-[#FF2D55] border-[3px] border-black rounded-full" />
                </motion.div>

                <div className="mt-16 md:mt-24 flex justify-center flex-wrap gap-4 md:gap-6">
                    <motion.a
                        href="https://github.com/SHAN0003"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                        onMouseEnter={() => playBoing()}
                        className="p-3 md:p-4 rounded-full border-[3px] border-black bg-[#1c1c1e] text-white transition-transform neo-shadow-hover"
                        data-cursor-hover
                    >
                        <Github className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/shanpatel3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                        onMouseEnter={() => playBoing()}
                        className="p-3 md:p-4 rounded-full border-[3px] border-black bg-[#0077b5] text-white transition-transform neo-shadow-hover"
                        data-cursor-hover
                    >
                        <Linkedin className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                    </motion.a>

                    <motion.button
                        type="button"
                        onClick={handleEmailClick}
                        aria-label="Send Email / shaanpatel5750@gmail.com"
                        whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                        onMouseEnter={() => playBoing()}
                        className="p-3 md:p-4 rounded-full border-[3px] border-black bg-[#FF2D55] text-white transition-transform neo-shadow-hover cursor-pointer"
                        data-cursor-hover
                    >
                        <Mail className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                    </motion.button>
                </div>

                <footer className="mt-20 md:mt-32 border-t-[3px] border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left: Personalized Creative Credit */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs md:text-sm font-black text-black">
                        <span>&copy; {new Date().getFullYear()}</span>
                        <span>•</span>
                        <span>Created by</span>
                        {/* <span>Crafted with</span>
                        <motion.span
                            animate={{ scale: [1, 1.25, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="inline-flex items-center justify-center align-middle"
                            title="Love & Chaos"
                        >
                            <Heart className="w-4 h-4 fill-[#FF2D55] text-black drop-shadow-[1.5px_1.5px_0px_#000]" strokeWidth={2.5} />
                        </motion.span>
                        <span>by</span> */}
                        <motion.a
                            href="https://github.com/SHAN0003"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.08, rotate: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={() => playPop(1.5)}
                            className="inline-flex items-center gap-1.5 bg-[#FFD60A] text-black px-3 py-1 rounded-full border-2 border-black neo-shadow hover:bg-[#FFE033] transition-colors cursor-pointer select-none"
                            data-cursor-hover
                        >
                            <span className="tracking-wide">SHAN PATEL</span>
                            <Sparkles className="w-3.5 h-3.5 text-black" />
                        </motion.a>
                    </div>

                    {/* Right: Live Status Badge & Back to Top */}
                    <div className="flex items-center flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-2 bg-[#E8F5E9] border-2 border-black px-3 py-1 rounded-full text-xs font-black text-emerald-900 neo-shadow">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>AVAILABLE FOR WORK</span>
                        </div>

                        <motion.button
                            onClick={() => {
                                playPop(1.2);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Back to Top"
                            className="bg-black hover:bg-neutral-800 text-white px-3.5 py-1.5 rounded-full border-2 border-black neo-shadow text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
                            data-cursor-hover
                        >
                            <span>BACK TO TOP</span>
                            <ArrowUp className="w-3.5 h-3.5" strokeWidth={3} />
                        </motion.button>
                    </div>
                </footer>
            </div>

            {/* Email Contact Options Modal */}
            <EmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                email={email}
            />

            {/* Copied to Clipboard Floating Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[99999] bg-[#FFD60A] border-[3px] border-black rounded-2xl px-5 py-3.5 neo-shadow-lg flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-black" strokeWidth={3} />
                        </div>
                        <div className="text-left">
                            <p className="font-black text-xs md:text-sm text-black">EMAIL COPIED!</p>
                            <p className="text-[11px] md:text-xs font-bold text-gray-800">{email}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};