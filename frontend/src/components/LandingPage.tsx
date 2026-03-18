import { useState } from 'react';
import { 
    Sparkles, 
    ArrowRight, 
    CheckCircle2, 
    ChevronDown, 
    Shield, 
    Zap, 
    FileText, 
    Globe, 
    MessageSquare, 
    Layout, 
    PenTool,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "How does the AI Humanizer work?",
            a: "Our AI Humanizer uses advanced linguistic modeling to analyze AI-generated text and rewrite it with human-like variability, emotional resonance, and natural sentence structures. This ensures the content bypasses AI detectors while remaining high-quality."
        },
        {
            q: "Is it safe to use for academic purposes?",
            a: "Yes, our Academic mode is specifically designed to maintain scholarly integrity while improving the flow and readability of your research. We prioritize original expression and high-quality vocabulary."
        },
        {
            q: "Which AI models do you support?",
            a: "We support content from all major LLMs including GPT-4, Claude, Gemini, and others. Our tools are model-agnostic and focus on the linguistic patterns of the text regardless of the source."
        },
        {
            q: "Does it help with SEO rankings?",
            a: "Absolutely. Search engines prioritize 'helpful content' that reads naturally. By humanizing your AI drafts, you ensure your content meets the high standards of expertise and readability that Google looks for."
        }
    ];

    const tools = [
        { icon: <PenTool className="text-blue-500" />, name: "AI Humanizer", desc: "Convert AI text into human-quality writing." },
        { icon: <Search className="text-indigo-500" />, name: "Fact Checker", desc: "Verify claims and ensure data accuracy." },
        { icon: <Shield className="text-emerald-500" />, name: "Plagiarism Remover", desc: "Ensure your content is 100% unique." },
        { icon: <MessageSquare className="text-purple-500" />, name: "AI Chatbot", desc: "Interactive assistance for any query." },
        { icon: <FileText className="text-orange-500" />, name: "Essay Writer", desc: "Structure and draft academic essays." },
        { icon: <Layout className="text-pink-500" />, name: "Content Planner", desc: "Organize your content strategy easily." },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                            <Sparkles size={22} className="text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600">
                            HumanizerAI
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#tools" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Tools</a>
                        <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">FAQ</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onGetStarted} className="px-6 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                            Login
                        </button>
                        <button onClick={onGetStarted} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">
                            Get Started Free
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 opacity-40">
                    <img 
                        src="/landing_hero_bg.png" 
                        alt="Decorative background" 
                        className="w-[1000px] h-auto object-contain"
                    />
                </div>
                
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100">
                            <Zap size={14} className="animate-pulse" />
                            Next-Gen AI Writing Suite
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                            Write with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-300% animate-gradient">Human Spirit.</span><br />
                            Powered by AI.
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-12">
                            The ultimate suite for content creation. From humanizing AI text to scholarly essays, 
                            discover 26+ specialized tools designed to elevate your writing.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button 
                                onClick={onGetStarted}
                                className="group w-full sm:w-auto px-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                Start Humanizing Now
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-8 py-5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg transition-all shadow-sm">
                                View Demo
                            </button>
                        </div>
                        
                        {/* Trust Badges */}
                        <div className="mt-20 pt-10 border-t border-slate-100">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by writers from</p>
                            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                                <span className="text-2xl font-bold">Stanford</span>
                                <span className="text-2xl font-bold">OXFORD</span>
                                <span className="text-2xl font-bold">Harvard</span>
                                <span className="text-2xl font-bold">Berkeley</span>
                                <span className="text-2xl font-bold">MIT</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tools Grid Section */}
            <section id="tools" className="py-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">A Tool for Every Task</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Explore our suite of 26+ specialized AI tools designed to make your workflow 10x faster.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tools.map((tool, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -5 }}
                                onClick={onGetStarted}
                                className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-50 hover:border-indigo-100 transition-all cursor-pointer group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                                    {tool.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{tool.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                        <button 
                            onClick={onGetStarted}
                            className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            Explore all 26+ tools <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature Demo Section */}
            <section id="features" className="py-24 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl w-fit mb-6">
                                <Zap size={24} />
                            </div>
                            <h2 className="text-4xl font-black mb-6 leading-tight">
                                Transform AI Text into<br /> 
                                <span className="text-indigo-600 font-serif italic">Indistinguishable</span> Human Writing.
                            </h2>
                            <ul className="space-y-6 mb-10">
                                {[
                                    { title: "Bypass AI Detection", desc: "99% Success rate against GPTZero, Originality.ai, and more." },
                                    { title: "SEO Friendly", desc: "Maintains keyword density while improving natural readability." },
                                    { title: "Plagiarism Free", desc: "Generates completely unique, scholarly original content." }
                                ].map((feature, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="text-emerald-500" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{feature.title}</p>
                                            <p className="text-sm text-slate-500">{feature.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={onGetStarted}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
                            >
                                Try Humanizer for Free
                            </button>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-[3rem] -z-10 blur-2xl opacity-50"></div>
                            <div className="bg-white border border-slate-200 rounded-[3rem] shadow-2xl overflow-hidden">
                                <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black tracking-widest text-slate-400 uppercase">Input Sample</div>
                                </div>
                                <div className="p-8">
                                    <p className="text-slate-400 line-through mb-4 italic opacity-60">"The quick brown fox jumps over the lazy dog. AI text often follows predictable patterns and lacks the emotional depth and linguistic variance typically found in human communication..."</p>
                                    <div className="h-px bg-slate-100 my-8 flex items-center justify-center">
                                        <div className="bg-white px-4 text-indigo-500"><Zap size={16} /></div>
                                    </div>
                                    <p className="text-slate-900 font-medium leading-relaxed">
                                        <span className="text-indigo-600 font-bold">"Effective storytelling</span> bridges the gap between raw information and meaningful human connection. While AI can process data, our platform ensures your voice retains its <span className="bg-indigo-50 px-1 rounded text-indigo-700">unique fingerprint</span>, blending technical precision with authentic, soulful expression."
                                    </p>
                                </div>
                                <div className="p-4 bg-indigo-600 flex items-center justify-between">
                                    <span className="text-white text-xs font-bold">AI PROBABILITY: <span className="text-emerald-300">2%</span></span>
                                    <span className="text-white/70 text-xs font-medium">Verified by Anti-AI Algorithm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Common Questions</h2>
                        <p className="text-slate-500 text-lg">Everything you need to know about HumanizerAI.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div 
                                key={i}
                                className={`border rounded-3xl transition-all duration-300 ${expandedFaq === i ? 'border-indigo-200 bg-indigo-50/20' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                            >
                                <button 
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full text-left p-6 md:p-8 flex items-center justify-between"
                                >
                                    <span className={`text-lg font-bold ${expandedFaq === i ? 'text-indigo-600' : 'text-slate-800'}`}>{faq.q}</span>
                                    <ChevronDown className={`transition-transform duration-300 ${expandedFaq === i ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} size={20} />
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-600 leading-relaxed text-sm md:text-base">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <span className="font-bold text-xl tracking-tight">HumanizerAI</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Premium AI writing tools for the modern creator. Bypass detectors, improve flow, and stay unique.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors"><Globe size={18} /></div>
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors"><Zap size={18} /></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Products</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white cursor-pointer transition-colors">AI Humanizer</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Fact Checker</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Plagiarism Detection</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Essay Helper</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Support</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                                <li className="hover:text-white cursor-pointer transition-colors">API Documentation</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
                        <p>© 2026 HumanizerAI. All rights reserved.</p>
                        <div className="flex gap-8">
                            <span>Status: Operational</span>
                            <span>Region: Global</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
