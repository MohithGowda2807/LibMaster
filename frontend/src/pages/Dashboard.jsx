import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBooks, getMembers } from '../services/api';

const StatCard = ({ icon: Icon, title, value, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalMembers: 0,
        activeIssues: 12, // Mock data for now
        overdueBooks: 5,  // Mock data for now
    });

    useEffect(() => {
        // Fetch real stats
        const fetchData = async () => {
            try {
                const booksRes = await getBooks();
                const membersRes = await getMembers();
                setStats(prev => ({
                    ...prev,
                    totalBooks: booksRes.data.length,
                    totalMembers: membersRes.data.length
                }));
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Overview of library operations</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={BookOpen}
                    title="Total Books"
                    value={stats.totalBooks}
                    color="bg-blue-500"
                    delay={0}
                />
                <StatCard
                    icon={Users}
                    title="Total Members"
                    value={stats.totalMembers}
                    color="bg-emerald-500"
                    delay={0.1}
                />
                <StatCard
                    icon={Clock}
                    title="Active Issues"
                    value={stats.activeIssues}
                    color="bg-indigo-500"
                    delay={0.2}
                />
                <StatCard
                    icon={AlertTriangle}
                    title="Overdue Books"
                    value={stats.overdueBooks}
                    color="bg-rose-500"
                    delay={0.3}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                >
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                    JM
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">John Mayer borrowed "Clean Code"</p>
                                    <p className="text-xs text-slate-400">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                >
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/books')}
                            className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left border border-slate-200"
                        >
                            <BookOpen className="w-6 h-6 text-indigo-600 mb-2" />
                            <p className="font-semibold text-slate-800">Add New Book</p>
                            <p className="text-xs text-slate-500">Register new arrival</p>
                        </button>
                        <button
                            onClick={() => navigate('/members')}
                            className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left border border-slate-200"
                        >
                            <Users className="w-6 h-6 text-emerald-600 mb-2" />
                            <p className="font-semibold text-slate-800">Register Member</p>
                            <p className="text-xs text-slate-500">New library user</p>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
