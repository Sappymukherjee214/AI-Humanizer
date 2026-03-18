import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Clock,
    Download,
    FileText,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const History = ({ onBack }: { onBack: () => void }) => {
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHistory(response.data);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredHistory = history.filter(item =>
        item.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.humanizedText.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownload = async (item: any, type: string) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/export/${type}`, {
                text: item.humanizedText
            }, { responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `humanized_${item.id.substring(0, 8)}.${type}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert('Failed to download file');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 p-8 overflow-y-auto bg-white"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Clock className="w-8 h-8 text-indigo-600" />
                            History
                        </h1>
                        <p className="text-slate-500 mt-2">View and manage your past AI tasks and humanizations</p>
                    </div>
                    <button
                        onClick={onBack}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
                    >
                        Return to Editor
                    </button>
                </div>

                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search through history..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
                    </div>
                ) : filteredHistory.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg font-medium">No history entries found yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredHistory.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className="bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 p-6 rounded-3xl transition-all group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${(item.aiProbabilityScore || 0) < 20 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            SCORE: {Math.round(item.aiProbabilityScore || 0)}%
                                        </div>
                                        <div className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {item.mode}
                                        </div>
                                        <span className="text-slate-400 text-xs font-medium">
                                            {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDownload(item, 'pdf')}
                                            className="p-2.5 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 rounded-xl transition-all"
                                            title="Download PDF"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(item, 'docx')}
                                            className="p-2.5 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 rounded-xl transition-all"
                                            title="Download DOCX"
                                        >
                                            <FileText className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-3">Input Content</p>
                                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                                            {item.originalText}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-50">
                                        <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest mb-3">AI Result / Analysis</p>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-slate-800 text-sm leading-relaxed line-clamp-4">
                                                {item.humanizedText}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default History;
