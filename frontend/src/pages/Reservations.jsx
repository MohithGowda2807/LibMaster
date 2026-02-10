import React, { useEffect, useState } from 'react';
import { Clock, BookOpen, Users, XCircle } from 'lucide-react';
import { getReservations } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const res = await getReservations();
            // Group by bookId
            const grouped = {};
            res.data.forEach(r => {
                if (!grouped[r.bookId]) {
                    grouped[r.bookId] = [];
                }
                grouped[r.bookId].push(r);
            });
            setReservations(grouped);
        } catch (err) {
            console.error("Error fetching reservations", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Reservation Queue</h1>
                    <p className="text-slate-500 mt-1">Managed using CircularQueue data structure</p>
                </div>
                <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-bold">
                    {Object.keys(reservations).length} Books Reserved
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading reservations...</div>
            ) : Object.keys(reservations).length === 0 ? (
                <div className="text-center py-20 text-slate-500 bg-white rounded-2xl border border-slate-100">
                    <Clock className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg font-medium">No active reservations</p>
                    <p className="text-sm">Book reservations will appear here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {Object.entries(reservations).map(([bookId, queue], index) => (
                            <motion.div
                                key={bookId}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="w-5 h-5" />
                                            <div>
                                                <h3 className="font-bold">Book ID: {bookId}</h3>
                                                <p className="text-xs opacity-90">{queue.length} in queue</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                            Queue: {queue.length}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {queue.map((reservation, pos) => (
                                        <div
                                            key={`${reservation.memberId}-${pos}`}
                                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                    #{pos + 1}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">Member ID: {reservation.memberId}</p>
                                                    <p className="text-xs text-slate-500">
                                                        Reserved: {new Date(reservation.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            {pos === 0 && (
                                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                                                    Next
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Reservations;
