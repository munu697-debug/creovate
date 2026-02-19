import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, ShieldCheck, Palette } from 'lucide-react';

const services = [
    {
        title: "Web Development",
        description: "Building robust, scalable, and high-performance websites tailored to your business needs.",
        icon: <Monitor className="text-primary" size={32} />
    },
    {
        title: "Full Stack Development",
        description: "End-to-end solutions combining powerful back-ends with dynamic front-end interfaces.",
        icon: <Cpu className="text-primary" size={32} />
    },
    {
        title: "Ethical Hacking",
        description: "Ensuring your digital assets are secure with comprehensive vulnerability assessments.",
        icon: <ShieldCheck className="text-primary" size={32} />
    },
    {
        title: "UI & UX Design",
        description: "Crafting intuitive and visually stunning interfaces that drive user engagement.",
        icon: <Palette className="text-primary" size={32} />
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-background relative">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-6 lg:px-20"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">What We Do</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">Professional Services</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-primary/20 hover:bg-[#151515] transition-all group cursor-pointer"
                        >
                            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>
                            <div className="w-10 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Services;
