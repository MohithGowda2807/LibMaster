import React, { useEffect, useState } from 'react';
import { Plus, Users, UserPlus, Mail, Phone, Calendar, BookOpen, Clock, X } from 'lucide-react';
import { getMembers, registerMember, getMemberDetails } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const [newMember, setNewMember] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await getMembers();
            setMembers(res.data);
        } catch (err) {
            console.error("Error fetching members", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Mobile Number Validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(newMember.phone)) {
            alert("Please enter a valid Indian mobile number (10 digits, starting with 6-9)");
            return;
        }

        try {
            await registerMember(newMember);
            setShowModal(false);
            setNewMember({ name: '', email: '', phone: '' });
            fetchMembers();
        } catch (err) {
            alert("Failed to register member");
        }
    };

    const handleMemberClick = async (memberId) => {
        setDetailLoading(true);
        setShowDetailModal(true);
        try {
            const res = await getMemberDetails(memberId);
            setSelectedMemberDetails(res.data);
        } catch (err) {
            console.error("Failed to fetch member details", err);
            alert("Failed to load member details");
            setShowDetailModal(false);
        } finally {
            setDetailLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Member Directory</h1>
                    <p className="text-slate-500 mt-1">Manage library patrons</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm shadow-emerald-200"
                >
                    <UserPlus className="w-5 h-5" />
                    <span>Register Member</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading directory...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {members.map((member) => (
                            <motion.div
                                key={member.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => handleMemberClick(member.id)}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                                    <p className="text-slate-500 text-sm">{member.email}</p>
                                    <p className="text-slate-400 text-xs mt-1">ID: {member.id}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Register Member Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Register New Member</h2>
                        </div>
                        <form onSubmit={handleRegister} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={newMember.name}
                                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={newMember.email}
                                    onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={newMember.phone}
                                    onChange={e => setNewMember({ ...newMember, phone: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 mt-6 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Member Details Modal */}
            {showDetailModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                            <div>
                                <h2 className="text-2xl font-bold">Member Details</h2>
                                <p className="text-emerald-50 text-sm">Complete profile and activity</p>
                            </div>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="p-2 hover:bg-white/20 rounded-lg transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {detailLoading ? (
                            <div className="p-20 text-center text-slate-500">Loading member details...</div>
                        ) : selectedMemberDetails ? (
                            <div className="p-6 space-y-6">
                                {/* Personal Info */}
                                <div className="bg-slate-50 p-6 rounded-xl">
                                    <h3 className="font-bold text-lg text-slate-800 mb-4">Personal Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-emerald-600" />
                                            <div>
                                                <p className="text-xs text-slate-500">Name</p>
                                                <p className="font-semibold text-slate-800">{selectedMemberDetails.member?.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-emerald-600" />
                                            <div>
                                                <p className="text-xs text-slate-500">Email</p>
                                                <p className="font-semibold text-slate-800">{selectedMemberDetails.member?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-emerald-600" />
                                            <div>
                                                <p className="text-xs text-slate-500">Phone</p>
                                                <p className="font-semibold text-slate-800">{selectedMemberDetails.member?.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-emerald-600" />
                                            <div>
                                                <p className="text-xs text-slate-500">Member Since</p>
                                                <p className="font-semibold text-slate-800">
                                                    {selectedMemberDetails.member?.registrationDate ?
                                                        new Date(selectedMemberDetails.member.registrationDate).toLocaleDateString() :
                                                        'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Issued Books */}
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-indigo-600" />
                                        Currently Issued Books ({selectedMemberDetails.issuedBooks?.length || 0})
                                    </h3>
                                    {selectedMemberDetails.issuedBooks && selectedMemberDetails.issuedBooks.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedMemberDetails.issuedBooks.map((bookInfo, idx) => (
                                                <div key={idx} className={`p-4 rounded-lg border-2 ${bookInfo.isOverdue ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-bold text-slate-900">{bookInfo.book?.title}</h4>
                                                            <p className="text-sm text-slate-600">by {bookInfo.book?.author}</p>
                                                        </div>
                                                        {bookInfo.isOverdue && (
                                                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                                Overdue
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-3 flex gap-4 text-sm">
                                                        <div>
                                                            <span className="text-slate-500">Issued: </span>
                                                            <span className="font-medium">{new Date(bookInfo.issueDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">Due: </span>
                                                            <span className={`font-medium ${bookInfo.isOverdue ? 'text-red-600' : ''}`}>
                                                                {new Date(bookInfo.dueDate).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 text-sm bg-slate-50 p-4 rounded-lg">No books currently issued</p>
                                    )}
                                </div>

                                {/* Reservations */}
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-purple-600" />
                                        Active Reservations ({selectedMemberDetails.reservations?.length || 0})
                                    </h3>
                                    {selectedMemberDetails.reservations && selectedMemberDetails.reservations.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedMemberDetails.reservations.map((reservation, idx) => (
                                                <div key={idx} className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold text-slate-900">Book ID: {reservation.bookId}</p>
                                                            <p className="text-sm text-slate-600">
                                                                Reserved: {new Date(reservation.timestamp).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 text-sm bg-slate-50 p-4 rounded-lg">No active reservations</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="p-20 text-center text-slate-500">No data available</div>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Members;
