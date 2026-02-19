import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-20 py-8 flex justify-between items-center pointer-events-none">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="pointer-events-auto"
            >
                <a href="/">
                    <img
                        src="/our logo.png"
                        alt="CREOVATE"
                        className="h-24 md:h-32 w-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                </a>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="pointer-events-auto"
            >
                <a href="#contact-us">
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group font-medium text-sm shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                        Contact us
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                            <ArrowUpRight size={14} />
                        </div>
                    </button>
                </a>
            </motion.div>
        </header>
    );
};

export default Header;
