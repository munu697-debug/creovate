import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FolderKanban, Mail, Settings, Plus, LogOut, Save, Trash2, ExternalLink } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [emails, setEmails] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', category: '', image: '' });
    const [editingId, setEditingId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('creovate_auth') === 'true');
    const [loginData, setLoginData] = useState({ user: '', pass: '' });
    const [settingsData, setSettingsData] = useState({ user: 'admin', pass: 'admin123' });
    const [error, setError] = useState('');

    // Recovery States
    const [recoveryStep, setRecoveryStep] = useState('login'); // login, phone, otp, reset
    const [recoveryPhone, setRecoveryPhone] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showSms, setShowSms] = useState(false);

    // SHA-256 Hashing Utility
    const hashPassword = async (password) => {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProject({ ...newProject, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const storedCreds = JSON.parse(localStorage.getItem('creovate_creds')) || { user: 'admin', pass: 'admin123' };

        // Check if stored password is plain text (fallback for migration) or hashed
        const inputHash = await hashPassword(loginData.pass);
        const isMatch = loginData.pass === storedCreds.pass || inputHash === storedCreds.pass;

        if (loginData.user === storedCreds.user && isMatch) {
            setIsLoggedIn(true);
            sessionStorage.setItem('creovate_auth', 'true');
            setError('');

            // Auto-migrate to hash if it wasn't
            if (loginData.pass === storedCreds.pass) {
                const hashedPass = await hashPassword(loginData.pass);
                localStorage.setItem('creovate_creds', JSON.stringify({ ...storedCreds, pass: hashedPass }));
            }
        } else {
            setError('Invalid credentials.');
        }
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        const hashedPass = await hashPassword(settingsData.pass);
        localStorage.setItem('creovate_creds', JSON.stringify({ ...settingsData, pass: hashedPass }));
        alert('Settings updated and password secured successfully!');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('creovate_auth');
    };

    const handleSendOtp = () => {
        if (recoveryPhone === '7012080297') {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(otp);
            setRecoveryStep('otp');
            setError('');
            setShowSms(true);
            setTimeout(() => setShowSms(false), 8000);
        } else {
            setError('Phone number not recognized.');
        }
    };

    const handleVerifyOtp = () => {
        if (enteredOtp === generatedOtp) {
            setRecoveryStep('reset');
            setError('');
        } else {
            setError('Invalid OTP code.');
        }
    };

    const handleResetPassword = async () => {
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        const hashedPass = await hashPassword(newPassword);
        const storedCreds = JSON.parse(localStorage.getItem('creovate_creds')) || { user: 'admin', pass: 'admin123' };
        localStorage.setItem('creovate_creds', JSON.stringify({ ...storedCreds, pass: hashedPass }));

        alert('Password reset successful! Please log in with your new password.');
        setRecoveryStep('login');
        setNewPassword('');
        setRecoveryPhone('');
    };

    useEffect(() => {
        const loadData = () => {
            const savedProjects = JSON.parse(localStorage.getItem('creovate_projects')) || [
                { id: 1, title: "EcoSmart Dashboard", category: "Full Stack Development", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
                { id: 2, title: "SecurePay Gateway", category: "Ethical Hacking / Fintech", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" },
                { id: 3, title: "Luxe UI Kit", category: "UI & UX Design", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop" },
                { id: 4, title: "Quantum CMS", category: "Web Development", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2010&auto=format&fit=crop" }
            ];
            const savedEmails = JSON.parse(localStorage.getItem('creovate_emails')) || [];
            const savedCreds = JSON.parse(localStorage.getItem('creovate_creds')) || { user: 'admin', pass: 'admin123' };

            setProjects(savedProjects);
            setEmails(savedEmails);
            setSettingsData(savedCreds);

            if (!localStorage.getItem('creovate_projects')) {
                localStorage.setItem('creovate_projects', JSON.stringify(savedProjects));
            }
            if (!localStorage.getItem('creovate_creds')) {
                localStorage.setItem('creovate_creds', JSON.stringify(savedCreds));
            }
        };

        loadData();

        const handleSync = (e) => {
            if (e.key === 'creovate_projects' || e.key === 'creovate_emails' || !e.key) {
                loadData();
            }
        };

        window.addEventListener('storage', handleSync);
        return () => window.removeEventListener('storage', handleSync);
    }, []);

    const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
        // Manually dispatch storage event for the same tab to listen
        window.dispatchEvent(new Event('storage'));
    };

    const handleSave = () => {
        if (!newProject.title || !newProject.image) return;

        let updatedProjects;
        if (editingId) {
            updatedProjects = projects.map(p => p.id === editingId ? { ...newProject, id: editingId } : p);
            setEditingId(null);
        } else {
            updatedProjects = [...projects, { ...newProject, id: Date.now() }];
        }

        setProjects(updatedProjects);
        saveToLocalStorage('creovate_projects', updatedProjects);
        setNewProject({ title: '', category: '', image: '' });
    };

    const startEdit = (project) => {
        setNewProject({ title: project.title, category: project.category, image: project.image });
        setEditingId(project.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteProject = (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const updatedProjects = projects.filter(p => p.id !== id);
        setProjects(updatedProjects);
        saveToLocalStorage('creovate_projects', updatedProjects);
    };

    const deleteEmail = (index) => {
        if (!confirm('Delete this message?')) return;
        const updatedEmails = emails.filter((_, i) => i !== index);
        setEmails(updatedEmails);
        saveToLocalStorage('creovate_emails', updatedEmails);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Simulated SMS Notification */}
                <AnimatePresence>
                    {showSms && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 20, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
                        >
                            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-2xl flex items-start gap-4 ring-1 ring-white/20">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black flex-shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm">Messages</span>
                                        <span className="text-[10px] text-gray-400">now</span>
                                    </div>
                                    <p className="text-sm text-gray-200">
                                        <span className="font-bold text-primary">Creovate Auth:</span> Your verification code is <span className="font-mono font-bold text-white tracking-widest">{generatedOtp}</span>. Do not share this with anyone.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-[#111] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

                    {recoveryStep === 'login' && (
                        <>
                            <div className="text-center space-y-4 mb-10">
                                <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Settings size={32} />
                                </div>
                                <h2 className="text-3xl font-bold">Admin Portal</h2>
                                <p className="text-gray-500 text-sm">Please sign in to manage your site.</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Username</label>
                                    <input
                                        required
                                        value={loginData.user}
                                        onChange={e => setLoginData({ ...loginData, user: e.target.value })}
                                        type="text"
                                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white"
                                    />
                                </div>
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Password</label>
                                    <input
                                        required
                                        value={loginData.pass}
                                        onChange={e => setLoginData({ ...loginData, pass: e.target.value })}
                                        type="password"
                                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setRecoveryStep('phone')}
                                        className="absolute right-4 bottom-4 text-[10px] font-bold text-primary hover:underline"
                                    >
                                        Forgot?
                                    </button>
                                </div>

                                {error && <p className="text-red-500 text-xs font-bold text-center animate-pulse">{error}</p>}

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-black font-bold py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                                >
                                    Sign In
                                </button>
                            </form>
                        </>
                    )}

                    {recoveryStep === 'phone' && (
                        <div className="space-y-8">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">Verification</h2>
                                <p className="text-gray-500 text-sm">Enter the phone number associated with your account.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Phone Number</label>
                                    <input
                                        type="text"
                                        value={recoveryPhone}
                                        onChange={e => setRecoveryPhone(e.target.value)}
                                        placeholder="7012080297"
                                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                <button
                                    onClick={handleSendOtp}
                                    className="w-full bg-primary text-black font-bold py-4 rounded-2xl"
                                >
                                    Send OTP
                                </button>
                                <button
                                    onClick={() => setRecoveryStep('login')}
                                    className="w-full text-gray-500 text-sm hover:text-white"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    )}

                    {recoveryStep === 'otp' && (
                        <div className="space-y-8">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">Enter OTP</h2>
                                <p className="text-gray-500 text-sm">A 6-digit code has been sent to {recoveryPhone}.</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between gap-2">
                                    <input
                                        type="text"
                                        maxLength="6"
                                        value={enteredOtp}
                                        onChange={e => setEnteredOtp(e.target.value)}
                                        placeholder="000000"
                                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white text-center text-2xl font-mono tracking-[1em]"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                <button
                                    onClick={handleVerifyOtp}
                                    className="w-full bg-primary text-black font-bold py-4 rounded-2xl"
                                >
                                    Verify Code
                                </button>
                                <button
                                    onClick={handleSendOtp}
                                    className="w-full text-primary text-xs font-bold uppercase tracking-widest"
                                >
                                    Resend Code
                                </button>
                            </div>
                        </div>
                    )}

                    {recoveryStep === 'reset' && (
                        <div className="space-y-8">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">New Password</h2>
                                <p className="text-gray-500 text-sm">Please set a secure new password.</p>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Create New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                <button
                                    onClick={handleResetPassword}
                                    className="w-full bg-primary text-black font-bold py-4 rounded-2xl"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors flex items-center justify-center gap-2">
                            <ExternalLink size={14} />
                            Back to Website
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col lg:flex-row">
            {/* Sidebar / Navigation */}
            <div className="w-full lg:w-64 bg-[#111] border-b lg:border-r border-white/5 flex lg:flex-col p-4 md:p-6 lg:gap-8 items-center lg:items-start justify-between lg:justify-start">
                <div className="flex items-center gap-3 px-2">
                    <img src="/our logo.png" alt="Creovate" className="h-20 md:h-28 w-auto object-contain shrink-0" />
                </div>

                <nav className="hidden lg:flex flex-col gap-2 w-full">
                    {[
                        { id: 'projects', label: 'Projects', icon: FolderKanban },
                        { id: 'emails', label: 'Emails', icon: Mail },
                        { id: 'settings', label: 'Settings', icon: Settings },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Mobile Tab Swiper */}
                <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 px-2 py-1">
                    {[
                        { id: 'projects', icon: FolderKanban },
                        { id: 'emails', icon: Mail },
                        { id: 'settings', icon: Settings },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-primary text-black' : 'text-gray-400 bg-white/5'}`}
                        >
                            <item.icon size={20} />
                        </button>
                    ))}
                </div>

                <div className="lg:mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block text-sm font-bold">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-10 overflow-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold capitalize">{activeTab} Management</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-xs md:text-sm">Welcome back, Admin</span>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full border border-white/10" />
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'projects' && (
                        <motion.div
                            key="projects-view"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 md:space-y-10"
                        >
                            {/* Add New Project Card */}
                            <div className="bg-[#111] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {editingId ? <Settings size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                                        <h3 className="text-lg md:text-xl font-bold">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                                    </div>
                                    {editingId && (
                                        <button
                                            onClick={() => {
                                                setEditingId(null);
                                                setNewProject({ title: '', category: '', image: '' });
                                            }}
                                            className="text-gray-500 hover:text-white text-[10px] md:text-sm font-bold uppercase tracking-widest"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Title</label>
                                        <input
                                            value={newProject.title}
                                            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                            type="text"
                                            placeholder="Project Name"
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Category</label>
                                        <input
                                            value={newProject.category}
                                            onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                                            type="text"
                                            placeholder="e.g. Web Development"
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Image URL</label>
                                            <input
                                                value={newProject.image}
                                                onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                                                type="text"
                                                placeholder="Unsplash URL"
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-xs"
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="w-full sm:flex-1">
                                                <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block text-center sm:text-left">Or Upload Local</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="w-full text-xs text-gray-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-primary file:text-black hover:file:bg-primary/80 cursor-pointer"
                                                />
                                            </div>
                                            {newProject.image && (
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-white/10 bg-black flex-shrink-0">
                                                    <img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="w-full sm:w-auto bg-primary text-black font-bold px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    {editingId ? 'Update' : 'Save'} Project
                                </button>
                            </div>

                            {/* Project List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {projects.map(project => (
                                    <div key={project.id} className="bg-[#111] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 flex gap-4 md:gap-6 items-center">
                                        <img src={project.image} alt="" className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl object-cover shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-base md:text-lg truncate">{project.title}</h4>
                                            <p className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider">{project.category}</p>
                                        </div>
                                        <div className="flex gap-1 md:gap-2">
                                            <button
                                                onClick={() => startEdit(project)}
                                                className="w-10 h-10 md:w-12 md:h-12 bg-white/5 text-gray-400 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                                            >
                                                <Settings size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteProject(project.id)}
                                                className="w-10 h-10 md:w-12 md:h-12 bg-red-500/10 text-red-500 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'emails' && (
                        <motion.div
                            key="emails-view"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-[#111] rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden shadow-2xl"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead className="bg-white/5 border-b border-white/5">
                                        <tr>
                                            <th className="px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                            <th className="px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                                            <th className="px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Message</th>
                                            <th className="px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {emails.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 md:px-8 py-8 md:py-10 text-center text-gray-500 italic text-sm">No submissions yet.</td>
                                            </tr>
                                        ) : (
                                            emails.map((email, idx) => (
                                                <tr key={idx} className="hover:bg-white/[0.02]">
                                                    <td className="px-6 md:px-8 py-4 md:py-6 font-bold text-sm">{email.name}</td>
                                                    <td className="px-6 md:px-8 py-4 md:py-6 text-primary text-xs md:text-sm font-medium">{email.email}</td>
                                                    <td className="px-6 md:px-8 py-4 md:py-6 text-gray-400 text-xs md:text-sm max-w-xs truncate">{email.message}</td>
                                                    <td className="px-6 md:px-8 py-4 md:py-6 text-right">
                                                        <button
                                                            onClick={() => deleteEmail(idx)}
                                                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'settings' && (
                        <motion.div
                            key="settings-view"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-xl mx-auto space-y-6 md:space-y-10"
                        >
                            <div className="bg-[#111] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 space-y-6 md:space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-xl md:text-2xl font-bold">Admin Settings</h3>
                                    <p className="text-gray-500 text-xs md:text-sm">Update your secure login credentials below.</p>
                                </div>

                                <form onSubmit={handleUpdateSettings} className="space-y-4 md:space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">New Username</label>
                                        <input
                                            required
                                            value={settingsData.user}
                                            onChange={e => setSettingsData({ ...settingsData, user: e.target.value })}
                                            type="text"
                                            className="w-full bg-black/50 border border-white/5 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 outline-none focus:border-primary transition-all text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">New Password</label>
                                        <input
                                            required
                                            value={settingsData.pass}
                                            onChange={e => setSettingsData({ ...settingsData, pass: e.target.value })}
                                            type="password"
                                            className="w-full bg-black/50 border border-white/5 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 outline-none focus:border-primary transition-all text-sm md:text-base"
                                        />
                                        <p className="text-[9px] md:text-[10px] text-gray-400 pl-2">Password will be securely hashed before saving.</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-black font-bold py-4 md:py-5 rounded-xl md:rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-primary/20 text-sm md:text-base"
                                    >
                                        <Save size={18} />
                                        Save Credentials
                                    </button>
                                </form>
                            </div>

                            <div className="p-6 md:p-8 border border-yellow-500/20 bg-yellow-500/5 rounded-2xl md:rounded-3xl space-y-3 md:space-y-4">
                                <h4 className="text-yellow-500 font-bold text-sm md:text-base flex items-center gap-2">
                                    <Settings size={18} />
                                    Security Note
                                </h4>
                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                    Changing your password will update the login requirement for this browser. Since this is a local demo, these credentials reside only on your device.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Admin;
