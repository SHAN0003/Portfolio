import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, ExternalLink, X, Send, Sparkles } from 'lucide-react';
import { playPop, playBoing } from '../../utils/audio';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  email = 'shaanpatel5750@gmail.com',
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
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
      playPop(1.5);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  const mailtoUrl = `mailto:${email}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playPop(0.8);
              onClose();
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF5] border-[4px] border-black rounded-[2.5rem] p-6 md:p-8 max-w-lg w-full neo-shadow-lg relative z-10 text-left overflow-hidden"
          >
            {/* Corner Decorative circles */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#5AC8FA] border-2 border-black rounded-full pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#FFD60A] border-2 border-black rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => {
                playPop(0.8);
                onClose();
              }}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border-[2.5px] border-black bg-white hover:bg-[#FF2D55] hover:text-white flex items-center justify-center transition-all neo-shadow cursor-pointer"
              aria-label="Close"
              data-cursor-hover
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#FF2D55] text-white border-2 border-black px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 neo-shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-black leading-tight mb-2">
              SAY HELLO!
            </h3>
            <p className="text-black/80 font-bold text-sm md:text-base mb-6">
              Pick your preferred way to reach out, or copy my email address:
            </p>

            {/* Email Address Card */}
            <div className="bg-[#FFD60A] border-[3px] border-black rounded-2xl p-3 md:p-4 mb-6 flex items-center justify-between gap-3 neo-shadow">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="font-black text-sm md:text-base text-black truncate select-all">
                  {email}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className={`px-3.5 py-2 rounded-xl border-2 border-black font-extrabold text-xs md:text-sm flex items-center gap-1.5 transition-all neo-shadow-hover shrink-0 cursor-pointer ${
                  copied
                    ? 'bg-[#34C759] text-white'
                    : 'bg-white hover:bg-gray-100 text-black'
                }`}
                data-cursor-hover
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={3} />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" strokeWidth={2.5} />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* Gmail Action (Recommended) */}
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playBoing()}
                className="group flex items-center justify-between p-4 bg-[#5AC8FA] hover:bg-[#45b7e8] border-[3px] border-black rounded-2xl font-black text-black transition-all neo-shadow-hover cursor-pointer"
                data-cursor-hover
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center group-hover:rotate-6 transition-transform shrink-0">
                    <Send className="w-5 h-5 text-black" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <div className="text-base md:text-lg leading-tight">Open in Gmail</div>
                    <div className="text-xs font-bold text-black/70">Compose in browser (100% reliable)</div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              </a>

              {/* Default Mail Client Action */}
              <a
                href={mailtoUrl}
                onClick={() => playBoing()}
                className="group flex items-center justify-between p-4 bg-white hover:bg-gray-100 border-[3px] border-black rounded-2xl font-black text-black transition-all neo-shadow-hover cursor-pointer"
                data-cursor-hover
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFD60A] border-2 border-black flex items-center justify-center group-hover:rotate-6 transition-transform shrink-0">
                    <Mail className="w-5 h-5 text-black" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <div className="text-base md:text-lg leading-tight">Default Mail App</div>
                    <div className="text-xs font-bold text-black/70">Outlook, Apple Mail, Windows Mail</div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 shrink-0" strokeWidth={2.5} />
              </a>
            </div>

            {/* Micro Helper Note */}
            <div className="mt-5 text-center">
              <span className="text-xs font-bold text-black/60">
                ✨ Email address copied to clipboard automatically!
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
