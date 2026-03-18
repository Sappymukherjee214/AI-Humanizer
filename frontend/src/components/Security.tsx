import { useState } from 'react';
import { 
    Shield, 
    Lock, 
    Eye, 
    Trash2, 
    AlertTriangle, 
    Key,
    Smartphone,
    Eraser,
    Share2,
    Download,
    Bell,
    Database,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Security = () => {
    const [isPasswordChanging, setIsPasswordChanging] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    
    // Privacy States
    const [privacyMode, setPrivacyMode] = useState(true);
    const [autoDeleteDays, setAutoDeleteDays] = useState('30');
    const [notifs, setNotifs] = useState({ email: true, sms: false });
    const [isSaving, setIsSaving] = useState(false);

    const handleAction = (action: string) => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert(`${action} successful!`);
        }, 800);
    };

    const privacyItems = [
        { 
            id: 'privacy-mode',
            icon: <Eye size={20} />, 
            title: 'Privacy Mode', 
            desc: 'Hide your account from public search',
            details: (
                <div className="pt-4 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                        <span className="text-sm font-medium">Profile Visibility</span>
                        <button 
                            onClick={() => setPrivacyMode(!privacyMode)}
                            className={`w-10 h-5 rounded-full relative transition-all ${privacyMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${privacyMode ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 px-1">When enabled, your profile and activity history are invisible to search engines and other users.</p>
                </div>
            )
        },
        { 
            id: 'session-logging',
            icon: <Lock size={20} />, 
            title: 'Session Logging', 
            desc: 'Record all login attempts and locations',
            details: (
                <div className="pt-4 space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase">Recent Sessions</div>
                    {[
                        { device: 'iPhone 15 Pro', loc: 'New York, USA', time: 'Active Now' },
                        { device: 'MacBook Pro 16"', loc: 'London, UK', time: '2h ago' }
                    ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center text-sm p-2">
                            <div>
                                <p className="font-bold text-slate-800">{s.device}</p>
                                <p className="text-xs text-slate-500">{s.loc}</p>
                            </div>
                            <span className="text-xs font-medium text-indigo-600">{s.time}</span>
                        </div>
                    ))}
                    <button 
                        onClick={() => handleAction('Sign out request')}
                        className="w-full py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 mt-2"
                    >
                        Sign out all other devices
                    </button>
                </div>
            )
        },
        { 
            id: 'auto-delete',
            icon: <Eraser size={20} />, 
            title: 'Auto-Delete History', 
            desc: 'Automatically clear history after set period',
            details: (
                <div className="pt-4 flex items-center gap-2">
                    <select 
                        value={autoDeleteDays}
                        onChange={(e) => setAutoDeleteDays(e.target.value)}
                        className="flex-grow p-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="30">After 30 days</option>
                        <option value="90">After 90 days</option>
                        <option value="never">Never</option>
                    </select>
                    <button 
                        onClick={() => handleAction('Policy update')}
                        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        Apply
                    </button>
                </div>
            )
        },
        { 
            id: 'metadata',
            icon: <Database size={20} />, 
            title: 'Metadata Scrubbing', 
            desc: 'Remove document metadata before AI processing',
            details: (
                <div className="pt-4">
                    <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                        <div className="p-2 bg-white text-indigo-600 rounded-xl shadow-sm"><Shield size={16}/></div>
                        <p className="text-xs text-indigo-900 leading-relaxed font-medium">This automatically removes EXIF, authorship, and location data from uploaded PDF/Docx files to ensure your original documents remain private.</p>
                    </div>
                </div>
            )
        },
        { 
            id: 'third-party',
            icon: <Share2 size={20} />, 
            title: 'Third-Party Access', 
            desc: 'Manage external API and tool integrations',
            details: (
                <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="Drive" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Google Drive</span>
                        </div>
                        <button 
                            onClick={() => handleAction('Revoke access')}
                            className="text-xs font-bold text-red-500 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-all"
                        >
                            Revoke
                        </button>
                    </div>
                </div>
            )
        },
        { 
            id: 'export',
            icon: <Download size={20} />, 
            title: 'Export Account Data', 
            desc: 'Download a complete copy of your data',
            details: (
                <div className="pt-4">
                    <button 
                        onClick={() => handleAction('Export request')}
                        className="w-full flex items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-200"
                    >
                        <Download size={18} />
                        Request Data Export (.json)
                    </button>
                </div>
            )
        },
        { 
            id: 'alerts',
            icon: <Bell size={20} />, 
            title: 'Security Alerts', 
            desc: 'Get notified of unusual account activity',
            details: (
                <div className="pt-4 space-y-4">
                    <label className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
                        <input 
                            type="checkbox" 
                            checked={notifs.email} 
                            onChange={() => setNotifs({...notifs, email: !notifs.email})}
                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="text-sm font-medium text-slate-700">Email notifications</span>
                    </label>
                    <label className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
                        <input 
                            type="checkbox" 
                            checked={notifs.sms} 
                            onChange={() => setNotifs({...notifs, sms: !notifs.sms})}
                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="text-sm font-medium text-slate-700">SMS alerts (Phone required)</span>
                    </label>
                </div>
            )
        },
    ];

    const securityStats = [
        { label: 'Privacy Score', value: 'Excellent', color: 'text-emerald-500' },
        { label: 'Data Encryption', value: 'AES-256', color: 'text-indigo-500' },
        { label: 'Last Login', value: '2 mins ago', color: 'text-slate-500' },
    ];

    return (
        <div className="flex-grow p-8 overflow-y-auto bg-[#f8fafc]">
            <header className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Security Settings</h1>
                </div>
                <p className="text-slate-500">Manage your account security, privacy, and data protection.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Security Controls */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Password Section */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                                    <Key size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Password</h2>
                                    <p className="text-sm text-slate-500">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsPasswordChanging(!isPasswordChanging)}
                                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold transition-all"
                            >
                                {isPasswordChanging ? 'Cancel' : 'Change Password'}
                            </button>
                        </div>

                        {isPasswordChanging && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 pt-4 border-t border-slate-100"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Current Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">New Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <button 
                                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
                                    disabled={isSaving}
                                    onClick={() => handleAction('Password update')}
                                >
                                    {isSaving ? 'Updating...' : 'Update Password'}
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* 2FA Section */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h2>
                                    <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    setTwoFactorEnabled(!twoFactorEnabled);
                                    handleAction(twoFactorEnabled ? '2FA disabled' : '2FA enabled');
                                }}
                                className={`w-14 h-8 rounded-full relative transition-all ${twoFactorEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${twoFactorEnabled ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Data & Privacy */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Data & Privacy</h2>
                        <div className="space-y-4">
                            {privacyItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className={`p-4 bg-slate-50 rounded-2xl group transition-all cursor-pointer border ${expandedItem === item.id ? 'border-indigo-200 bg-indigo-50/30' : 'border-transparent hover:bg-slate-100'}`}
                                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-slate-600">
                                            <div className="p-2.5 bg-white rounded-xl shadow-sm group-hover:text-indigo-600 transition-colors">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 mb-0.5">{item.title}</p>
                                                <p className="text-xs text-slate-500">{item.desc}</p>
                                            </div>
                                        </div>
                                        <ChevronRight 
                                            size={20} 
                                            className={`text-slate-300 transition-transform duration-300 ${expandedItem === item.id ? 'rotate-90 text-indigo-500' : 'group-hover:text-slate-500'}`} 
                                        />
                                    </div>
                                    
                                    {expandedItem === item.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-t border-slate-100 mt-4">
                                                {item.details}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-8">
                    {/* Security Health */}
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold">Security Health</h3>
                            <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
                                Good
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Threat protection</span>
                                <span className="font-bold">Active</span>
                            </div>
                            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full w-4/5 bg-emerald-500" />
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                <AlertTriangle size={18} className="text-amber-400 shrink-0" />
                                <p className="text-xs leading-relaxed text-slate-300">
                                    Your password hasn't been changed for a while. Consider updating it.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status List */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                        {securityStats.map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Danger Zone */}
                    <button 
                        onClick={() => {
                            if (window.confirm('Are you absolutely sure you want to delete your account? This action is permanent.')) {
                                handleAction('Account deletion');
                            }
                        }}
                        className="w-full p-6 bg-red-50 hover:bg-red-100 border border-red-100 rounded-3xl flex items-center justify-between group transition-all"
                    >
                        <div className="flex items-center gap-4 text-red-600">
                            <Trash2 size={24} />
                            <div className="text-left">
                                <p className="font-bold">Delete Account</p>
                                <p className="text-xs text-red-400">Permanently erase your data</p>
                            </div>
                        </div>
                        <ChevronRight size={20} className="text-red-200 group-hover:text-red-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Security;
