import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
    const [index, setIndex] = useState(0);

    const content = [
        {
            leftHeading: ["Designing", "the Future."],
            rightHeading: ["On", "the Point."],
            description: "We assist our clients in integrating superior cyber security, seamless web development, and intuitive UI/UX design into their digital transformation.",
            tagLeft: "Web Development",
            tagRight: "UI & UX Design"
        },
        {
            leftHeading: ["Securing", "the Future."],
            rightHeading: ["Defense", "On Demand."],
            description: "We assist our clients in integrating superior cyber security, seamless web development, and intuitive UI/UX design into their digital transformation.",
            tagLeft: "Cyber Security",
            tagRight: "UI & UX Design"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev === 0 ? 1 : 0));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 lg:px-20 pt-40 pb-32">
            {/* Background Decorative Glows */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] opacity-40"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] opacity-30"></div>
            </div>

            <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">

                {/* Left Content */}
                <div className="space-y-6 md:space-y-8 min-h-[300px] md:min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`left-tag-${index}`}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex items-center gap-3 text-primary font-bold tracking-[0.15em] text-[10px] uppercase"
                        >
                            <span className="w-1.5 h-5 bg-primary rounded-full"></span>
                            {content[index].tagLeft}
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`left-h1-${index}`}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight"
                        >
                            <span className="text-white block">{content[index].leftHeading[0]}</span>
                            <span className="text-gray-600 block mt-4 md:mt-8">{content[index].leftHeading[1]}</span>
                        </motion.h1>
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pt-4"
                    >
                        <a href="#contact-us">
                            <button className="bg-[#e5e7eb] hover:bg-white text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-4 transition-all duration-300 group shadow-lg">
                                <span className="text-sm md:text-base">Contact us</span>
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#009fb7] rounded-full flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowUpRight size={14} className="md:w-[18px] md:h-[18px]" />
                                </div>
                            </button>
                        </a>
                    </motion.div>
                </div>

                {/* Right Content */}
                <div className="text-left lg:text-right space-y-6 md:space-y-8 min-h-[300px] md:min-h-[400px] relative lg:mt-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`right-tag-${index}`}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex items-center gap-3 justify-start lg:justify-end text-primary font-bold tracking-[0.15em] text-[10px] uppercase"
                        >
                            {content[index].tagRight}
                            <span className="w-1.5 h-5 bg-primary rounded-full"></span>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={`right-h2-${index}`}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[0.9] tracking-tight inline-flex flex-col items-start lg:items-end w-full"
                        >
                            <span className="text-primary block drop-shadow-[0_0_10px_rgba(0,240,255,0.2)]">{content[index].rightHeading[0]}</span>
                            <span className="text-primary/70 block">{content[index].rightHeading[1]}</span>
                        </motion.h2>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`desc-${index}`}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="max-w-md lg:ml-auto"
                        >
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                                {content[index].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Hero;
