import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const usefulLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'About Us', href: '#about' },
        { name: 'Portfolio', href: '/projects' },
        { name: 'Contact', href: '#contact-us' },
        { name: 'Admin Portal', href: '/admin' },
    ];

    const footerLinks = [
        { name: 'Home', href: '#' },
        { name: 'Terms', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Policy', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    return (
        <footer className="bg-[#121212] pt-16 mt-20 relative overflow-hidden">
            {/* Top Info Bar */}
            <div className="container mx-auto px-6 lg:px-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-10 bg-[#1a1a1a] rounded-3xl border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-5 group cursor-pointer">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold tracking-wide">Find us</h4>
                            <p className="text-gray-500 text-sm mt-1">Edarikkode, Kottakkal, Kerala, India</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 group cursor-pointer border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold tracking-wide">Call us</h4>
                            <p className="text-gray-500 text-sm mt-1">7012083297</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 group cursor-pointer border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold tracking-wide">Mail us</h4>
                            <p className="text-gray-500 text-sm mt-1">creovatehub.desgin@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="container mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-white/5">
                {/* Column 1: Brand & About */}
                <div className="space-y-8">
                    <div className="flex items-center gap-2">
                        <img src="/our logo.png" alt="Creovate" className="h-20 w-auto object-contain" />
                    </div>
                    <p className="text-gray-500 leading-relaxed max-w-sm">
                        Empowering your business with cutting-edge AI automation, secure development, and stunning digital experiences designed for the future.
                    </p>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg border-l-4 border-primary pl-4">Follow us</h4>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-10 h-10 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Column 2: Links */}
                <div className="space-y-8">
                    <h4 className="text-white font-bold text-xl border-l-4 border-primary pl-4">Useful Links</h4>
                    <ul className="grid grid-cols-2 gap-y-4">
                        {usefulLinks.map((link, i) => (
                            <li key={i}>
                                <a href={link.href} className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Subscribe */}
                <div className="space-y-8">
                    <h4 className="text-white font-bold text-xl border-l-4 border-primary pl-4">Subscribe</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Don't miss to subscribe to our new feeds, kindly fill the form below.
                    </p>
                    <div className="relative group">
                        <input
                            type="email"
                            id="footer-subscribe-email"
                            placeholder="Email Address"
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 text-white pr-16 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                        />
                        <button
                            onClick={() => {
                                const email = document.getElementById('footer-subscribe-email').value;
                                if (email) {
                                    window.location.href = `mailto:creovatehub.desgin@gmail.com?subject=Newsletter Subscription&body=I would like to subscribe with: ${email}`;
                                }
                            }}
                            className="absolute right-2 top-2 bottom-2 w-12 bg-primary hover:bg-white text-black rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 active:scale-95"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="bg-[#0a0a0a] py-8 border-t border-white/5">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-500 text-sm">
                            © 2026 Creovate AI. All rights reserved.
                        </p>
                        <div className="flex items-center gap-8 text-gray-400 text-sm">
                            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                            <a href="/admin" className="hover:text-primary transition-colors border-l border-white/10 pl-8">Admin Access</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
