import React, { useEffect, useState } from 'react';
import { AlertTriangle, Calendar, DollarSign, User, BookOpen } from 'lucide-react';
import { getOverdueBooks } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Overdue = () => {
    const [overdueRecords, setOverdueRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOverdueBooks();
    }, []);

    const fetchOverdueBooks = async () => {
        setLoading(true);
        try {
            const res = await getOverdueBooks();
            setOverdueRecords(res.data);
        } catch (err) {
            console.error("Error fetching overdue books", err);
        } finally {
            setLoading(false);
        }
    };

    const getSeverityColor = (daysOverdue) => {
        if (daysOverdue > 10) return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-500' };
        if (daysOverdue > 5) return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-500' };
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-500' };
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Overdue Books & Fines</h1>
                    <p className="text-slate-500 mt-1">Managed priority queue using MinHeap</p>
                </div>
                <div className="bg-rose-100 text-rose-700 px-4 py-2 rounded-lg font-bold">
                    ₹{overdueRecords.reduce((sum, r) => sum + r.fine, 0).toFixed(2)} Total Fines
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading overdue records...</div>
            ) : overdueRecords.length === 0 ? (
                <div className="text-center py-20 text-slate-500 bg-white rounded-2xl border border-slate-100">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                    <p className="text-lg font-medium">No overdue books!</p>
                    <p className="text-sm">All books are returned on time.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {overdueRecords.map((record, index) => {
                            const colors = getSeverityColor(record.daysOverdue);
                            return (
                                <motion.div
                                    key={`${record.bookId}-${record.memberId}`}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`${colors.bg} border ${colors.border} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4 flex-1">
                                            <div className={`p-3 rounded-xl ${colors.badge} flex-shrink-0`}>
                                                <AlertTriangle className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className={`font-bold text-lg ${colors.text}`}>{record.bookTitle}</h3>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${colors.badge} text-white font-medium`}>
                                                        {record.daysOverdue} days overdue
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mt-3">
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <User className="w-4 h-4" />
                                                        <span>{record.memberName} (ID: {record.memberId})</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <BookOpen className="w-4 h-4" />
                                                        <span>Book ID: {record.bookId}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold ${colors.text}`}>
                                                ₹{record.fine.toFixed(2)}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">₹5/day</div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Overdue;
