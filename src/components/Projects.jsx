import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
    {
        title: "EcoSmart Dashboard",
        category: "Full Stack Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "SecurePay Gateway",
        category: "Ethical Hacking / Fintech",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Luxe UI Kit",
        category: "UI & UX Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Quantum CMS",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2010&auto=format&fit=crop",
    }
];

const Projects = () => {
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

        // Listen for changes in other tabs
        const handleStorageChange = (e) => {
            if (e.key === 'creovate_projects') {
                loadProjects();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom events from the same tab if needed
        // but localStorage standardizes this across tabs.

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <section id="projects" className="py-20 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-6 lg:px-20"
            >
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-primary font-bold tracking-wider uppercase">Our Work</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Latest Projects</h2>
                    </div>
                    <Link to="/projects">
                        <button className="text-primary hover:underline font-semibold flex items-center gap-2">
                            View All Projects <span>→</span>
                        </button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {projectList.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-3xl cursor-pointer"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-primary text-sm font-bold mb-2">{project.category}</span>
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <div className="w-12 h-1 bg-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
