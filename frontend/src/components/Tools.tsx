import { 
    Search, 
    ShieldCheck, 
    MessageSquare, 
    Copy, 
    UserCheck, 
    Bot, 
    RefreshCcw, 
    FileType, 
    FileText, 
    FileSearch, 
    CheckCircle, 
    Minimize2,
    Quote,
    Globe,
    BookOpen,
    Pencil,
    Book,
    Maximize2,
    Instagram,
    Mail,
    Video,
    Youtube,
    Facebook,
    ShoppingBag,
    Layout,
    GraduationCap,
    Send,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const tools = [
    { 
        id: 'researcher', 
        name: 'AI Researcher', 
        desc: 'An AI-powered research assistant designed to streamline the discovery and analysis of information', 
        icon: <Search className="text-blue-500" />, 
        badge: 'NEW',
        color: 'border-blue-200 ring-blue-50'
    },
    { 
        id: 'fact-checker', 
        name: 'Fact Checker', 
        desc: 'An AI-driven verification tool designed to enhance the accuracy and reliability of information.', 
        icon: <ShieldCheck className="text-indigo-500" />, 
    },
    { 
        id: 'chatbot', 
        name: 'AI Chatbot (like ChatGPT)', 
        desc: '', 
        icon: <MessageSquare className="text-blue-500" />,
        isChat: true
    },
    { 
        id: 'plagiarism', 
        name: 'Check Plagiarism', 
        desc: 'Discover originality with our quick plagiarism scanner. Ensure your work shines with uniqueness!', 
        icon: <Copy className="text-indigo-600" />, 
    },
    { 
        id: 'humanizer', 
        name: 'AI Text Humanizer', 
        desc: 'Turn your content into high quality text that is indistinguishable from human writing.', 
        icon: <UserCheck className="text-blue-600" />, 
    },
    { 
        id: 'detector', 
        name: 'AI Content Detector', 
        desc: 'Instantly scan text content and detect the AI written text in it.', 
        icon: <Bot className="text-indigo-500" />, 
    },
    { 
        id: 'paraphrase', 
        name: 'Paraphrase Text', 
        desc: 'Paraphrase your content in a different voice and style. Ideal for essays and short pieces of text.', 
        icon: <RefreshCcw className="text-blue-500" />, 
    },
    { 
        id: 'converter', 
        name: 'File Converter', 
        desc: 'Convert between PDF, Word, Excel, PowerPoint, images, and more', 
        icon: <FileType className="text-indigo-500" />, 
    },
    { 
        id: 'long-article', 
        name: 'Long Article (1,200+ Words)', 
        desc: 'Generate long premium articles with 1,000-2,000 words (5-10 min. reading time).', 
        icon: <FileText className="text-blue-700" />, 
    },
    { 
        id: 'analyze-file', 
        name: 'Analyze file', 
        desc: 'Provide PDF, DOC or TXT file and discuss it with AI.', 
        icon: <FileSearch className="text-blue-600" />, 
    },
    { 
        id: 'grammar', 
        name: 'Grammar Check', 
        desc: 'Identify and correct grammatical errors to improve clarity, conciseness, and credibility in any written work.', 
        icon: <CheckCircle className="text-blue-500" />, 
    },
    { 
        id: 'summarizer', 
        name: 'Text & PDF/DOC Summarizer', 
        desc: 'Shorten your content and present the key takeaways of a text.', 
        icon: <Minimize2 className="text-indigo-600" />, 
    },
    { 
        id: 'citation', 
        name: 'Citation Machine', 
        desc: 'Generate citations for your research papers, essays, and articles.', 
        icon: <Quote className="text-blue-500" />, 
    },
    { 
        id: 'analyze-website', 
        name: 'Analyze website', 
        desc: 'Paste a link and discuss it with AI.', 
        icon: <Globe className="text-indigo-600" />, 
    },
    { 
        id: 'medium-article', 
        name: 'Medium Article (~900 Words)', 
        desc: 'Premium quality SEO-friendly blog articles. Choose keywords, tone, CTAs, POV, and length.', 
        icon: <BookOpen className="text-blue-600" />, 
    },
    { 
        id: 'rewrite', 
        name: 'Rewrite Article', 
        desc: 'Paste an article. Automatically rewrite it with one click.', 
        icon: <Pencil className="text-indigo-500" />, 
    },
    { 
        id: 'essay', 
        name: 'Essay Writer', 
        desc: 'Premium quality SEO-friendly blog articles. Choose keywords, tone, CTAs, POV, and length.', 
        icon: <Book className="text-blue-500" />, 
    },
    { 
        id: 'extend', 
        name: 'Extend Text', 
        desc: 'Enhance your content with expansion. Perfect for reaching specific word counts or adding robustness to your text.', 
        icon: <Maximize2 className="text-blue-600" />, 
    },
    { 
        id: 'instagram', 
        name: 'Instagram Captions', 
        desc: 'Create unique captions to make your Instagram posts stand out from the crowd.', 
        icon: <Instagram className="text-pink-500" />, 
    },
    { 
        id: 'emails', 
        name: 'Emails', 
        desc: 'Professional-looking emails for daily situations. Suitable both for meeting reminder with customer or inquiry for trip reimbursement.', 
        icon: <Mail className="text-indigo-500" />, 
    },
    { 
        id: 'tiktok', 
        name: 'TikTok Video Scripts', 
        desc: 'Generate catchy and engaging scripts for TikTok videos, helping to grab your audience\'s attention.', 
        icon: <Video className="text-slate-900" />, 
    },
    {
        id: 'youtube-script',
        name: 'YouTube Script Generator',
        desc: 'Create full YouTube video scripts with a Hook, structured Main Content, and a CTA - optimized for audience retention.',
        icon: <Youtube className="text-red-600" />,
        badge: 'NEW',
        color: 'border-red-100 ring-red-50'
    },
    { 
        id: 'facebook', 
        name: 'Facebook Ad Copy', 
        desc: 'Easily craft highly engaging copy for your Facebook Ads\' Descriptions.', 
        icon: <Facebook className="text-blue-600" />, 
    },
    { 
        id: 'product', 
        name: 'Product Descriptions', 
        desc: 'Authentic product descriptions that engage, inspire, and persuade.', 
        icon: <ShoppingBag className="text-indigo-600" />, 
        color: 'border-blue-200 ring-blue-50'
    },
    { 
        id: 'google-ad', 
        name: 'Google Ad Copy', 
        desc: 'Convert visitors into customers with the best-performing Google Ad Copies.', 
        icon: <Layout className="text-blue-500" />, 
    },
    { 
        id: 'book-writer', 
        name: 'Book Writer (Chapter Format)', 
        desc: 'Unleash creativity with book chapter generation tool. Transform your ideas into captivating chapters!', 
        icon: <Sparkles className="text-amber-500" />, 
    },
    { 
        id: 'academic', 
        name: 'Get Academic Support', 
        desc: 'Explore and understand any topic within a specific field of study.', 
        icon: <GraduationCap className="text-indigo-600" />, 
    },
];

const Tools = ({ onSelectTool }: { onSelectTool: (tool: any) => void }) => {
    return (
        <div className="flex-grow p-8 overflow-y-auto bg-white">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Tools</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                    <motion.div
                        key={tool.id}
                        whileHover={{ y: -5 }}
                        onClick={() => onSelectTool(tool)}
                        className={`p-6 bg-white border ${tool.color ? tool.color : 'border-slate-100'} rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer relative group`}
                    >
                        {tool.badge && (
                            <span className="absolute top-4 right-4 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-lg animate-pulse">
                                {tool.badge}
                            </span>
                        )}

                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-colors">
                                    {tool.icon}
                                </div>
                                <h3 className="font-bold text-slate-800 leading-tight">{tool.name}</h3>
                            </div>

                            {tool.isChat ? (
                                <div className="mt-auto">
                                    <div className="bg-slate-50 rounded-full py-2 px-4 flex items-center justify-between border border-slate-100">
                                        <span className="text-slate-400 text-sm italic">Talk to AI</span>
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                            <Send size={14} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                                    {tool.desc}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Tools;
