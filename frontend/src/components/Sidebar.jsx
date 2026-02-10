import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, ArrowLeftRight, Search, BarChart3, Home, AlertTriangle, Clock } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/', icon: Home },
        { name: 'Books', path: '/books', icon: BookOpen },
        { name: 'Members', path: '/members', icon: Users },
        { name: 'Circulation', path: '/circulation', icon: ArrowLeftRight },
        { name: 'Overdue & Fines', path: '/overdue', icon: AlertTriangle },
        { name: 'Reservations', path: '/reservations', icon: Clock },
        { name: 'Search', path: '/search', icon: Search },
        { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 flex flex-col shadow-xl z-50">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">LibMaster</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 font-medium'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">System Status</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-green-400">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
