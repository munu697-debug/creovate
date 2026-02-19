import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllProjects = () => {
    const [projectList, setProjectList] = React.useState([]);

    React.useEffect(() => {
        const loadProjects = () => {
            const savedProjects = JSON.parse(localStorage.getItem('creovate_projects')) || [
                { title: "EcoSmart Dashboard", category: "Full Stack Development", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
                { title: "SecurePay Gateway", category: "Ethical Hacking / Fintech", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" },
                { title: "Luxe UI Kit", category: "UI & UX Design", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop" },
                { title: "Quantum CMS", category: "Web Development", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2010&auto=format&fit=crop" }
            ];
            setProjectList(savedProjects);
        };

        loadProjects();

        const handleStorageChange = (e) => {
            if (e.key === 'creovate_projects') {
                loadProjects();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.scrollTo(0, 0);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Background Glows */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <header className="container mx-auto px-6 lg:px-20 py-12 md:py-20 relative z-10">
                <Link to="/">
                    <motion.button
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6 md:mb-8 group"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-bold tracking-widest uppercase text-[10px] md:text-xs">Back to Home</span>
                    </motion.button>
                </Link>

                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 md:mb-6"
                    >
                        Our full <br />
                        <span className="text-primary italic">portfolio.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-base md:text-lg leading-relaxed"
                    >
                        Discover our complete collection of projects, ranging from AI applications to robust security systems and high-end UI kits.
                    </motion.p>
                </div>
            </header>

            <main className="container mx-auto px-6 lg:px-20 pb-24 md:pb-40 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {projectList.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/5"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-3 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">{project.category}</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">{project.title}</h3>
                                    <div className="w-10 md:w-12 h-1 bg-primary rounded-full mb-4 md:mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-3 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-6 md:translate-y-10 group-hover:translate-y-0"
                                    >
                                        View Project
                                        <ExternalLink size={14} className="md:w-4 md:h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* Subfooter */}
            <div className="bg-[#0c0c0c] py-16 md:py-20 border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Ready to start a project?</h2>
                    <Link to="/#contact-us">
                        <button className="bg-primary text-black font-bold px-8 md:px-12 py-4 md:py-5 rounded-full hover:scale-105 active:scale-95 transition-all text-sm md:text-base">
                            Get in Touch
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllProjects;
