import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, BookOpen } from 'lucide-react';
import { searchBooks } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim()) {
                setLoading(true);
                try {
                    const res = await searchBooks(query);
                    setResults(res.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold text-slate-900">Search Collection</h1>
                <p className="text-slate-500 text-lg">
                    Find books by title, author, or ID using our <span className="text-indigo-600 font-semibold">Trie-based</span> instant search.
                </p>

                <div className="relative max-w-2xl mx-auto">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Start typing to search..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none text-lg shadow-sm"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                    {loading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {results.map((book) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-indigo-100 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-lg text-slate-400">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{book.title}</h3>
                                    <p className="text-slate-500 text-sm">by {book.author}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${book.availableCopies > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {book.availableCopies} / {book.totalCopies} Available
                                </span>
                                <p className="text-xs text-slate-400 mt-1">ID: {book.id} • {book.category}</p>
                            </div>
                        </motion.div>
                    ))}

                    {query && !loading && results.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 text-slate-400"
                        >
                            No books found matching "{query}"
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SearchPage;
