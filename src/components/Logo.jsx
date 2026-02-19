import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = "h-12 w-auto" }) => {
    return (
        <motion.div
            className={`flex items-center gap-3 ${className}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner Glow Cube */}
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center">
                    <span className="text-black font-black text-xl italic leading-none">C</span>
                </div>
                {/* Accent dots */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter text-white">
                    CREO<span className="text-primary">VATE</span>
                </span>
                <span className="text-[8px] font-bold tracking-[0.3em] text-gray-400 uppercase mt-1">
                    Design the Future
                </span>
            </div>
        </motion.div>
    );
};

export default Logo;
