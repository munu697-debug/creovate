import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email us",
            value: "creovatehub.design@gmail.com",
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call us",
            value: "(7012083297)",
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Our location",
            value: "Edarikkode, Kottakkal, Kerala, India",
        },
    ];

    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
    const [status, setStatus] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        // Save to localStorage
        const existingEmails = JSON.parse(localStorage.getItem('creovate_emails')) || [];
        const updatedEmails = [...existingEmails, { ...formData, date: new Date().toISOString() }];
        localStorage.setItem('creovate_emails', JSON.stringify(updatedEmails));

        // Trigger mailto
        const subject = encodeURIComponent(`New Inquiry from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:creovatehub.design@gmail.com?subject=${subject}&body=${body}`;

        setFormData({ name: '', email: '', message: '' });
        setStatus('Message sent successfully!');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section id="contact-us" className="min-h-screen relative bg-black overflow-hidden py-16 md:py-32 px-6 lg:px-20">
            {/* Background Watermark/Aesthetics */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <h2 className="text-[10rem] md:text-[25rem] font-bold text-white/[0.02] tracking-tighter uppercase select-none">
                    CONTACT
                </h2>
            </div>

            {/* Top Gradient/Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] md:h-[300px] bg-primary/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

            {/* Techy Line Decorations */}
            <div className="absolute top-40 left-0 w-32 md:w-64 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 hidden md:block" />
            <div className="absolute top-80 right-0 w-40 md:w-80 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent -rotate-12 hidden md:block" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center"
            >
                {/* Left Side: Info */}
                <div className="space-y-8 md:space-y-12">
                    <div className="space-y-4 md:space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400"
                        >
                            <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            </div>
                            Contact
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                        >
                            Get in touch
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-sm md:text-lg max-w-md leading-relaxed"
                        >
                            Have questions or ready to transform your business with AI automation?
                        </motion.p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        {contactInfo.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="group p-4 md:p-6 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-2xl md:rounded-3xl flex items-center justify-between transition-all duration-500 cursor-pointer"
                            >
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-white group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500">
                                        <div className="scale-75 md:scale-100">{item.icon}</div>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-gray-500 text-[10px] md:text-sm font-medium">{item.title}</h4>
                                        <p className="text-white text-xs md:text-base font-medium mt-0.5 truncate max-w-[150px] sm:max-w-none">{item.value}</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 md:w-10 md:h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:rotate-45 shrink-0">
                                    <ArrowUpRight size={16} className="md:w-5 md:h-5" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Form Background Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] md:rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

                    <div className="relative p-1 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-3xl">
                        <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-6 md:space-y-8 bg-black/40 rounded-[1.8rem] md:rounded-[2.2rem]">
                            <div className="space-y-4 md:space-y-6">
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest pl-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-white placeholder:text-gray-700 focus:outline-none focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest pl-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter your email"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-white placeholder:text-gray-700 focus:outline-none focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest pl-2">Message</label>
                                    <textarea
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can we help?"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-white placeholder:text-gray-700 focus:outline-none focus:border-primary transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white text-black font-bold py-4 md:py-5 rounded-xl md:rounded-2xl hover:bg-primary transition-colors duration-500 shadow-2xl shadow-primary/20 text-sm md:text-base"
                            >
                                {status || 'Submit'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;
