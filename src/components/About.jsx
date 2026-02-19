import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center"
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                        Who we are <br />
                        <span className="text-gray-500">& what we stand for.</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Creovate is a collective of visionary developers, designers, and security experts dedicated to crafting digital experiences that are as'secure as they are stunning.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                <Target size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Our Mission</h4>
                                <p className="text-gray-500 text-sm">To empower businesses through cutting-edge technology and unparalleled design.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Our Vision</h4>
                                <p className="text-gray-500 text-sm">Setting the standard for excellence in digital transformation and cyber security.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative"
                >
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                        alt="Team working"
                        className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/5"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl shadow-xl hidden md:block">
                        <p className="text-black font-black text-4xl">10+</p>
                        <p className="text-black/80 text-sm font-bold uppercase tracking-wider">Years of Experience</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
