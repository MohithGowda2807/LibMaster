import React, { useEffect, useState } from 'react';
import { Plus, Search, Book as BookIcon, ArrowLeftRight, Clock } from 'lucide-react';
import { getBooks, addBook, searchBooks, getBookReservations } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [bookDetails, setBookDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    // New Book Form State
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        category: '',
        totalCopies: 1,
        availableCopies: 1
    });

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res = await getBooks();
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchBooks();
            return;
        }
        setLoading(true);
        try {
            const res = await searchBooks(searchQuery);
            setBooks(res.data);
        } catch (err) {
            console.error("Search failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await addBook({ ...newBook, availableCopies: newBook.totalCopies });
            setShowModal(false);
            setNewBook({ title: '', author: '', category: '', totalCopies: 1, availableCopies: 1 });
            fetchBooks();
        } catch (err) {
            alert("Failed to add book");
        }
    };

    const handleBookClick = async (book) => {
        setSelectedBook(book);
        setShowDetailModal(true);
        setDetailsLoading(true);
        try {
            // In a real app we might fetch more details, but for now we use the book object
            // and maybe fetch its reservations
            const reservationsRes = await getBookReservations(book.id);
            setBookDetails({
                ...book,
                reservations: reservationsRes.data
            });
        } catch (err) {
            console.error("Failed to fetch book details", err);
            setBookDetails({ ...book, reservations: [] });
        } finally {
            setDetailsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Book Collection</h1>
                    <p className="text-slate-500 mt-1">Manage library inventory</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm shadow-indigo-200"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Book</span>
                </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            {/* Books Grid */}
            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading library data...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {books.map((book) => (
                            <motion.div
                                key={book.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => handleBookClick(book)}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <BookIcon className="w-6 h-6" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.availableCopies > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1">{book.title}</h3>
                                <p className="text-slate-500 text-sm mb-4">by {book.author}</p>

                                <div className="flex justify-between items-center text-sm text-slate-400 pt-4 border-t border-slate-50">
                                    <span>ID: {book.id}</span>
                                    <span>{book.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Add Book Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Add New Book</h2>
                        </div>
                        <form onSubmit={handleAddBook} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={newBook.title}
                                    onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={newBook.author}
                                    onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={newBook.category}
                                        onChange={e => setNewBook({ ...newBook, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Copies</label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={newBook.totalCopies}
                                        onChange={e => setNewBook({ ...newBook, totalCopies: parseInt(e.target.value) })}
                                    />
                                </div>
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
                                    className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                                >
                                    Save Book
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
            {/* Book Detail Modal */}
            <AnimatePresence>
                {showDetailModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-8 text-white relative">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <Plus className="w-5 h-5 rotate-45" />
                                </button>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                        <BookIcon className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedBook?.title}</h2>
                                        <p className="text-indigo-100">Book ID: #{selectedBook?.id}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                {detailsLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-slate-500 font-medium tracking-wide">Fetching book details...</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Core Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Author & Category</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-xs text-slate-500 mb-1">Author</p>
                                                        <p className="font-semibold text-slate-900">{bookDetails?.author}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 mb-1">Category</p>
                                                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                                                            {bookDetails?.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Inventory Status</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-slate-500 mb-1">Total Copies</p>
                                                        <p className="text-2xl font-bold text-slate-900">{bookDetails?.totalCopies}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 mb-1">Available</p>
                                                        <p className={`text-2xl font-bold ${bookDetails?.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {bookDetails?.availableCopies}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Usage Stats */}
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Engagement Statistics</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                                                        <ArrowLeftRight className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Times Issued</p>
                                                        <p className="text-xl font-bold text-slate-900">{bookDetails?.timesIssued || 0}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                                        <Clock className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Active Reservations</p>
                                                        <p className="text-xl font-bold text-slate-900">{bookDetails?.reservations?.length || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reservations Tab */}
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                Current Reservation Queue
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                                                    {bookDetails?.reservations?.length || 0}
                                                </span>
                                            </h3>
                                            {bookDetails?.reservations && bookDetails.reservations.length > 0 ? (
                                                <div className="space-y-3">
                                                    {bookDetails.reservations.map((res, index) => (
                                                        <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                                                                    {index + 1}
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-slate-900">Member ID: #{res.memberId}</p>
                                                                    <p className="text-xs text-slate-400">Reserved on {new Date(res.timestamp).toLocaleDateString()}</p>
                                                                </div>
                                                            </div>
                                                            {index === 0 && (
                                                                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase tracking-wider">
                                                                    Next in line
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-6 bg-slate-50 rounded-xl text-slate-400 text-sm italic">
                                                    No active reservations for this book.
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Books;
