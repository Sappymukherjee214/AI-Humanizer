import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FileText,
    RotateCcw,
    Download,
    ShieldCheck,
    LayoutDashboard,
    Sparkles,
    Zap,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    Settings,
    Shield,
    Menu,
    Lock,
    LineChart as ChartLine
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import AuthModal from './components/AuthModal.tsx';
import History from './components/History.tsx';
import Analytics from './components/Analytics.tsx';
import Security from './components/Security.tsx';
import Tools from './components/Tools.tsx';
import LandingPage from './components/LandingPage.tsx';

const modes = [
    { id: 'academic', label: 'Academic', icon: '🎓' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'casual', label: 'Casual', icon: '☕' },
    { id: 'seo', label: 'SEO-Optimized', icon: '📈' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'balanced', label: 'Balanced', icon: '⚖️' },
];

function App() {
    const [inputText, setInputText] = useState('');
    const [humanizedText, setHumanizedText] = useState('');
    const [activeMode, setActiveMode] = useState('balanced');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [scores, setScores] = useState({ ai: 0, plagiarism: 0 });
    const [user, setUser] = useState<any>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [view, setView] = useState<'editor' | 'history' | 'analytics' | 'security' | 'tools' | 'landing'>('landing');
    const [selectedTool, setSelectedTool] = useState<any>(null);
    const [processStatus, setProcessStatus] = useState<'idle' | 'analyzing' | 'rewriting' | 'detecting'>('idle');
    const [copySuccess, setCopySuccess] = useState(false);
    const [isRefineMenuOpen, setIsRefineMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
        window.innerWidth >= 768 && window.innerWidth < 1024
    );

    const getPlaceholder = () => {
        if (!selectedTool) return "Paste text or drag & drop .pdf, .docx, .txt files here...";
        switch (selectedTool.id) {
            case 'researcher': return "Enter a topic or question you want to research in depth...";
            case 'fact-checker': return "Paste statements or claims you want me to verify...";
            case 'chatbot': return "Ask me anything! I'm here to help...";
            case 'plagiarism': return "Paste text to check for originality and get rewrite suggestions...";
            case 'detector': return "Paste text to analyze for AI-written patterns...";
            case 'paraphrase': return "Paste text you want me to paraphrase in a new style...";
            case 'grammar': return "Paste text with errors you want me to correct...";
            case 'summarizer': return "Paste a long text to get a concise summary...";
            case 'instagram': return "Tell me about your photo or video for a great caption...";
            case 'emails': return "Describe the context of the email you need to write...";
            case 'tiktok': return "What should the TikTok video be about? Describe the concept...";
            case 'youtube-script': return "Enter your YouTube video topic, target audience, and key talking points...";
            case 'product': return "Describe your product features and target audience...";
            case 'academic': return "Enter an academic topic you need support with...";
            default: return `Enter text for ${selectedTool.name}...`;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchProfile(token);
        }
    }, []);

    useEffect(() => {
    const handleResize = () => {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const isDesktop = window.innerWidth >= 1024;
        if (isTablet) {
            setIsSidebarCollapsed(true);
        } else if (isDesktop) {
            setIsSidebarCollapsed(false);
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const fetchProfile = async (token: string) => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Profile Fetch Error:', error);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const onDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        if (!file) return;

        setIsExtracting(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/extract', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setInputText(response.data.text);
        } catch (error: any) {
            console.error('Extraction Error:', error);
            alert(error.response?.data?.error || 'Failed to extract text from file');
        } finally {
            setIsExtracting(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt']
        },
        multiple: false
    });

    const handleHumanize = async () => {
        if (!inputText) return;

        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        setIsProcessing(true);
        setProcessStatus('analyzing');
        setHumanizedText('');

        try {
            const token = localStorage.getItem('token');
            // Simulate detailed steps for better UX
            setTimeout(() => setProcessStatus('rewriting'), 1500);

            const response = await axios.post('http://localhost:5000/api/humanize', {
                text: inputText,
                mode: activeMode,
                toolId: selectedTool?.id || 'humanizer'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProcessStatus('detecting');
            setTimeout(() => {
                setHumanizedText(response.data.humanized);
                setScores(response.data.scores);
                // Credits no longer exist on frontend
                setProcessStatus('idle');
                setIsProcessing(false);
            }, 1000);

        } catch (error: any) {
            console.error('Humanization Error:', error);
            alert(error.response?.data?.error || 'Failed to humanize text.');
            setIsProcessing(false);
            setProcessStatus('idle');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(humanizedText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleExport = async (format: 'pdf' | 'docx' | 'txt') => {
        if (!humanizedText) {
            alert('Please generate content first before exporting.');
            return;
        }

        try {
            const fileName = selectedTool 
                ? `${selectedTool.name.replace(/\s+/g, '_')}_Result` 
                : `Humanized_Content_${activeMode}`;

            const response = await axios.post('http://localhost:5000/api/export', {
                text: humanizedText,
                format: format,
                fileName: fileName
            }, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.${format}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            // Cleanup the URL object
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export Error:', error);
            alert('Failed to export. Please check if the server is running.');
        }
    };

    const handleRefine = async (refinementId: string) => {
        if (!humanizedText) return;
        
        setIsRefineMenuOpen(false);
        setIsProcessing(true);
        setProcessStatus('rewriting');
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/humanize', {
                text: humanizedText,
                mode: activeMode,
                toolId: refinementId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setHumanizedText(response.data.humanized);
            setScores(response.data.scores);
            setProcessStatus('idle');
            setIsProcessing(false);
        } catch (error) {
            console.error('Refinement Error:', error);
            setIsProcessing(false);
            setProcessStatus('idle');
            alert('Failed to refine content.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex overflow-hidden">
            {/* Success Toast */}
            {copySuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl flex items-center gap-3 border border-slate-800"
                >
                    <CheckCircle2 size={20} className="text-emerald-500" />
                    <span className="font-semibold">Text copied to clipboard!</span>
                </motion.div>
            )}

            {/* Sidebar */}
            {view !== 'landing' && (
                <motion.aside 
                    initial={false}
                    animate={{ width: isSidebarCollapsed ? 72 : 256 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="glass border-r border-slate-200/50 flex flex-col p-6 hidden md:flex z-20 overflow-hidden relative"
                >
                    <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} mb-10`}>
                        {!isSidebarCollapsed && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 cursor-pointer" 
                                onClick={() => setView('landing')}
                            >
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                                    <Sparkles size={18} className="text-white" />
                                </div>
                                <span className="font-bold text-xl tracking-tight whitespace-nowrap">HumanizerAI</span>
                            </motion.div>
                        )}
                        <button 
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className={`p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors ${isSidebarCollapsed ? '' : 'ml-2'}`}
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    <nav className="space-y-2 flex-grow">
                        {[
                            { id: 'editor', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                            { id: 'tools', label: 'Tools', icon: <Sparkles size={18} /> },
                            { id: 'history', label: 'History', icon: <RotateCcw size={18} /> },
                            { id: 'analytics', label: 'Analytics', icon: <ChartLine size={18} /> },
                            { id: 'security', label: 'Security', icon: <ShieldCheck size={18} /> },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id as any)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${view === item.id
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm border border-indigo-100'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
                                    } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                                title={isSidebarCollapsed ? item.label : ''}
                            >
                                <div className="shrink-0">{item.icon}</div>
                                {!isSidebarCollapsed && (
                                    <motion.span 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className={`mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3 ${isSidebarCollapsed ? 'items-center' : ''}`}>
                        {user ? (
                            <>
                                <div className={`flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden ${isSidebarCollapsed ? 'w-10 h-10 p-0 justify-center border-none bg-transparent' : ''}`}>
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                        {user.name?.[0] || user.email[0].toUpperCase()}
                                    </div>
                                    {!isSidebarCollapsed && (
                                        <div className="overflow-hidden flex-grow">
                                            <p className="text-xs font-semibold truncate leading-none mb-1">{user.name || 'User'}</p>
                                            <p className="text-[10px] text-emerald-500 font-medium">Free Access</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 ${isSidebarCollapsed ? 'p-2' : ''}`}
                                    title={isSidebarCollapsed ? 'Log out' : ''}
                                >
                                    <RotateCcw size={16} className={isSidebarCollapsed ? '' : 'hidden'} />
                                    {!isSidebarCollapsed && 'Log out'}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className={`flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all ${isSidebarCollapsed ? 'w-10 h-10 p-0' : 'px-4 py-3'}`}
                                title={isSidebarCollapsed ? 'Sign In' : ''}
                            >
                                <Lock size={18} className={isSidebarCollapsed ? '' : 'hidden'} />
                                {!isSidebarCollapsed && 'Sign In'}
                            </button>
                        )}
                    </div>
                </motion.aside>
            )}

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden relative">
                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    onSuccess={(u) => {
                        setUser(u);
                        setView('editor');
                    }}
                />


                {view === 'landing' ? (
                    <LandingPage onGetStarted={() => {
                        if (user) setView('editor');
                        else setIsAuthModalOpen(true);
                    }} />
                ) : view === 'history' ? (
                    <History onBack={() => setView('editor')} />
                ) : view === 'analytics' ? (
                    <Analytics />
                ) : view === 'security' ? (
                    <Security />
                ) : view === 'tools' ? (
                    <Tools onSelectTool={(tool) => {
                        setSelectedTool(tool);
                        setView('editor');
                    }} />
                ) : (
                    <>
                        {/* Top Navbar */}
                        <header className="h-16 px-8 flex items-center justify-between border-b border-slate-100 shrink-0">
                            <h1 className="text-lg font-bold flex items-center gap-2">
                                <Sparkles size={20} className="text-indigo-600" />
                                Humanize Content
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                    <button
                                        onClick={() => handleExport('pdf')}
                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all border-r border-slate-100 active:scale-95"
                                    >
                                        <Download size={14} />
                                        Export PDF
                                    </button>
                                    <button
                                        onClick={() => handleExport('docx')}
                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all border-r border-slate-100 active:scale-95"
                                    >
                                        <FileText size={14} />
                                        Export DOCX
                                    </button>
                                    <button
                                        onClick={() => handleExport('txt')}
                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all active:scale-95"
                                    >
                                        <FileText size={14} />
                                        Export TXT
                                    </button>
                                </div>
                                <button 
                                    onClick={() => setView('security')}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-all border border-transparent hover:border-slate-200"
                                >
                                    <Settings size={14} className="text-slate-500" />
                                </button>
                            </div>
                        </header>

                        {/* Dashboard Area */}
                        <div className="flex-grow p-8 overflow-y-auto space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                        {selectedTool ? selectedTool.name : 'AI Humanizer'}
                                    </h2>
                                    {selectedTool && (
                                        <button 
                                            onClick={() => setSelectedTool(null)}
                                            className="text-sm text-indigo-600 font-bold hover:underline text-left mt-1"
                                        >
                                            ← Switch back to AI Humanizer
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                                    {modes.map(mode => (
                                        <button
                                            key={mode.id}
                                            onClick={() => setActiveMode(mode.id)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMode === mode.id
                                                ? 'bg-white shadow-md text-indigo-700'
                                                : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                        >
                                            <span className="mr-2">{mode.icon}</span>
                                            {mode.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <div className="px-4 py-2 rounded-xl bg-orange-50 border border-orange-100 flex items-center gap-3">
                                        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">AI Score</span>
                                        <span className="text-xl font-bold text-orange-700">{scores.ai}%</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Plagiarism</span>
                                        <span className="text-xl font-bold text-blue-700">{scores.plagiarism}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-80px)] min-h-[500px]">
                                {/* Input Panel */}
                                <div className="flex flex-col gap-4 relative">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <FileText size={14} />
                                            Original Text
                                        </label>
                                        <div className="flex gap-2 text-xs font-medium text-slate-400">
                                            {inputText.length} chars | {inputText.split(/\s+/).filter(Boolean).length} words
                                        </div>
                                    </div>

                                    <div {...getRootProps()} className={`flex-grow relative group ${isDragActive ? 'ring-2 ring-indigo-500 ring-offset-2 rounded-2xl' : ''}`}>
                                        <input {...getInputProps()} />
                                        <textarea
                                            className={`w-full h-full p-6 text-slate-800 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-lg leading-relaxed placeholder:text-slate-300 ${isExtracting ? 'opacity-50 pointer-events-none' : ''}`}
                                            placeholder={getPlaceholder()}
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                        />

                                        {isDragActive && (
                                            <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-[2px] rounded-2xl flex items-center justify-center border-2 border-dashed border-indigo-600 z-10">
                                                <div className="bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
                                                    <Download size={24} className="text-indigo-600 animate-bounce" />
                                                    <span className="font-bold text-indigo-600 text-lg">Drop to extract text</span>
                                                </div>
                                            </div>
                                        )}

                                        {isProcessing && (
                                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center z-20 transition-all border border-indigo-200/50">
                                                <div className="relative">
                                                    <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Sparkles className="text-indigo-600 animate-pulse" size={20} />
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex flex-col items-center">
                                                    <p className="font-bold text-slate-700 capitalize">
                                                        {processStatus === 'analyzing' && 'Analyzing patterns...'}
                                                        {processStatus === 'rewriting' && 'Infusing human flow...'}
                                                        {processStatus === 'detecting' && 'Running final audit...'}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1">This may take a moment</p>
                                                </div>
                                            </div>
                                        )}

                                        {isExtracting && (
                                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center z-10 transition-all">
                                                <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin mb-4" />
                                                <p className="font-semibold text-slate-600">Extracting content...</p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleHumanize}
                                        disabled={isProcessing || !inputText}
                                        className="h-14 w-full bg-gradient-premium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98] transition-all overflow-hidden relative group"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Zap size={20} className="animate-pulse" />
                                                <span className="z-10 text-white">Processing Task...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                                                <span className="z-10 text-white">
                                                    {selectedTool ? `Run ${selectedTool.name}` : 'Run Humanizer'}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Output Panel */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 text-indigo-600">
                                            <CheckCircle2 size={14} />
                                            {selectedTool ? `${selectedTool.name} Output` : 'Humanized Output'}
                                        </label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleCopy}
                                                disabled={!humanizedText}
                                                className="text-xs text-indigo-600 hover:underline font-bold uppercase tracking-wider disabled:opacity-30 flex items-center gap-1"
                                            >
                                                Copy Text
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`flex-grow w-full p-6 text-slate-800 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-y-auto text-lg leading-relaxed relative ${!humanizedText ? 'bg-slate-50' : ''}`}>
                                        {humanizedText ? (
                                            <span className="animate-in fade-in duration-700">{humanizedText}</span>
                                        ) : (
                                            <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 opacity-50 space-y-4">
                                                <AlertCircle size={48} />
                                                <p>Wait for results after processing</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-14 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${humanizedText ? 'bg-green-500' : 'bg-slate-300'} animate-pulse`} />
                                            <span className="text-sm text-slate-600">
                                                {humanizedText ? (selectedTool ? 'Task successfully completed' : 'Content verified & humanized') : 'Ready to process'}
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <button 
                                                onClick={() => setIsRefineMenuOpen(!isRefineMenuOpen)}
                                                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                                            >
                                                {selectedTool ? 'Refine result' : 'Improve further'} <ChevronDown size={14} className={`transition-transform ${isRefineMenuOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {isRefineMenuOpen && (
                                                <>
                                                    <div 
                                                        className="fixed inset-0 z-40" 
                                                        onClick={() => setIsRefineMenuOpen(false)}
                                                    />
                                                    <div className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                        <div className="p-2 border-b border-slate-50">
                                                            <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Refinement</p>
                                                        </div>
                                                        <div className="p-1.5">
                                                            {[
                                                                { id: 'refine_human', label: 'Make more Human', icon: <Sparkles size={14}/> },
                                                                { id: 'refine_pro', label: 'Make Professional', icon: <Shield size={14}/> },
                                                                { id: 'refine_academic', label: 'Make Academic', icon: <FileText size={14}/> },
                                                                { id: 'refine_short', label: 'Shorten Content', icon: <AlertCircle size={14}/> },
                                                                { id: 'refine_expand', label: 'Expand Content', icon: <Download size={14}/> },
                                                            ].map((opt) => (
                                                                <button
                                                                    key={opt.id}
                                                                    onClick={() => handleRefine(opt.id)}
                                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all font-medium"
                                                                >
                                                                    <span className="text-slate-400">{opt.icon}</span>
                                                                    {opt.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
