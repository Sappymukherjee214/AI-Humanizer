import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    TrendingDown,
    Activity,
    Zap,
    Target,
    BarChart3,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch analytics data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    // Process data for charts
    const dailyUsage = data.reduce((acc: any, item: any) => {
        const date = new Date(item.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const usageChartData = Object.keys(dailyUsage).map(date => ({
        date,
        count: dailyUsage[date]
    })).slice(-7);

    const modeUsage = data.reduce((acc: any, item: any) => {
        acc[item.mode] = (acc[item.mode] || 0) + 1;
        return acc;
    }, {});

    const modeChartData = Object.keys(modeUsage).map(mode => ({
        name: mode.charAt(0).toUpperCase() + mode.slice(1),
        value: modeUsage[mode]
    }));

    const COLORS = ['#6366f1', '#a855f7', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6'];

    const avgAiScore = data.length > 0
        ? data.reduce((acc, curr) => acc + (curr.aiProbabilityScore || 0), 0) / data.length
        : 0;

    const totalWords = data.reduce((acc, curr) => acc + (curr.originalText?.split(/\s+/).length || 0), 0);

    const stats = [
        {
            label: 'Total Humanizations',
            value: data.length,
            icon: <Activity className="text-indigo-500" />,
            trend: '+12%',
            increase: true
        },
        {
            label: 'Avg. AI Score',
            value: `${Math.round(avgAiScore)}%`,
            icon: <TrendingDown className="text-emerald-500" />,
            trend: '-8%',
            increase: false
        },
        {
            label: 'Words Processed',
            value: totalWords.toLocaleString(),
            icon: <Zap className="text-amber-500" />,
            trend: '+2.4k',
            increase: true
        },
        {
            label: 'Success Rate',
            value: '98.2%',
            icon: <Target className="text-rose-500" />,
            trend: '+0.5%',
            increase: true
        }
    ];

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 p-8 overflow-y-auto bg-slate-50/50"
        >
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Analytics</h1>
                        <p className="text-slate-500 mt-2">Detailed insights into your content humanization metrics</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
                        <Calendar size={16} />
                        Last 30 Days
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl">
                                    {stat.icon}
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.increase ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                    }`}>
                                    {stat.trend}
                                    <ArrowUpRight size={12} className={stat.increase ? '' : 'rotate-90'} />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Usage Over Time */}
                    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <BarChart3 className="text-indigo-500" />
                            <h2 className="text-xl font-bold text-slate-900">Usage Volume</h2>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={usageChartData}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Mode Preference */}
                    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <PieChart className="text-purple-500" />
                            <h2 className="text-xl font-bold text-slate-900">Mode Distribution</h2>
                        </div>
                        <div className="h-[300px] w-full flex flex-col md:flex-row items-center">
                            <div className="flex-1 w-full h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={modeChartData}
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {modeChartData.map((_entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-col gap-3 pr-8">
                                {modeChartData.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                        <span className="text-sm font-medium text-slate-600">{item.name}</span>
                                        <span className="text-sm font-bold text-slate-900">{Math.round((item.value / data.length) * 100)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score History Graph */}
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <Target className="text-emerald-500" />
                        <h2 className="text-xl font-bold text-slate-900">AI Score Trend</h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.slice(-20).reverse()}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="createdAt"
                                    tickFormatter={(str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                                <Tooltip
                                    labelFormatter={(str) => new Date(str).toLocaleString()}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="aiProbabilityScore"
                                    name="AI Detected %"
                                    stroke="#10b981"
                                    strokeWidth={4}
                                    dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;
