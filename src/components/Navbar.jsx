import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [hovered, setHovered] = React.useState(null);
    const links = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'Project', href: '#projects' },
        { name: 'About us', href: '#about' },
        { name: 'Contact us', href: '#contact-us' },
    ];

    return (
        <div className="fixed bottom-6 md:bottom-10 left-0 right-0 flex justify-center z-50 px-4 md:px-6">
            <motion.nav
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-black/60 backdrop-blur-2xl border border-white/10 py-1.5 md:py-2 px-1.5 md:px-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center overflow-x-auto no-scrollbar max-w-full"
                onMouseLeave={() => setHovered(null)}
            >
                <div className="flex items-center gap-1 md:gap-2 min-w-max">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => setHovered(link.name)}
                            className={`px-3 md:px-6 py-2 md:py-2.5 rounded-full text-[11px] md:text-sm font-medium transition-all duration-500 relative group shrink-0
                ${link.name === 'Home' ? 'text-white' : 'text-gray-400 hover:text-white'}
                ${hovered && hovered !== link.name ? 'opacity-40 blur-[1.5px]' : 'opacity-100'}`}
                        >
                            {link.name === 'Home' && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-primary/20 border border-primary/20 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                            {link.name !== 'Home' && (
                                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                            )}
                        </a>
                    ))}
                </div>
            </motion.nav>
        </div>
    );
};

export default Navbar;
