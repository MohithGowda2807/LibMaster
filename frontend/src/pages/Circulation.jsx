import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle, XCircle } from 'lucide-react';
import { issueBook, returnBook } from '../services/api';
import { motion } from 'framer-motion';

const Circulation = () => {
    const [bookId, setBookId] = useState('');
    const [memberId, setMemberId] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const handleIssue = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(false);
        try {
            const res = await issueBook(bookId, memberId);
            setMessage(res.data);
            if (res.data.includes('not found') || res.data.includes('unavailable')) {
                setError(true);
            }
        } catch (err) {
            setMessage("Transaction failed");
            setError(true);
        }
    };

    const handleReturn = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(false);
        try {
            const res = await returnBook(bookId, memberId);
            setMessage(res.data);
            if (res.data.includes('Invalid') || res.data.includes('does not have')) {
                setError(true);
            }
        } catch (err) {
            setMessage("Transaction failed");
            setError(true);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Circulation Desk</h1>
                <p className="text-slate-500 mt-1">Issue and return books</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Book ID</label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-mono"
                                placeholder="e.g. 101"
                                value={bookId}
                                onChange={e => setBookId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Member ID</label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-mono"
                                placeholder="e.g. 1"
                                value={memberId}
                                onChange={e => setMemberId(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleIssue}
                            disabled={!bookId || !memberId}
                            className="flex-1 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Issue Book
                        </button>
                        <button
                            onClick={handleReturn}
                            disabled={!bookId || !memberId}
                            className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Return Book
                        </button>
                    </div>
                </div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                            }`}
                    >
                        {error ? <XCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                        <p className="font-medium">{message}</p>
                    </motion.div>
                )}
            </div>

            <div className="text-center text-sm text-slate-400">
                <p>System automatically checks reservations and fines.</p>
            </div>
        </div>
    );
};

export default Circulation;
