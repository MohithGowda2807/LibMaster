import React, { useEffect, useState } from 'react';
import { BarChart3, PieChart } from 'lucide-react';
import { getBooks, getMembers } from '../services/api';

const Analytics = () => {
    const [stats, setStats] = useState({
        categories: {},
        totalCopies: 0,
        totalIssued: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = (await getBooks()).data;

                const categories = {};
                let copies = 0;
                let issued = 0;

                books.forEach(book => {
                    categories[book.category] = (categories[book.category] || 0) + 1;
                    copies += book.totalCopies;
                    issued += book.timesIssued;
                });

                setStats({ categories, totalCopies: copies, totalIssued: issued });
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    // Simple manual charts using CSS widths
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
                <p className="text-slate-500 mt-1">Library usage statistics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-800">Books by Category</h3>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(stats.categories).map(([cat, count]) => {
                            const percentage = Math.round((count / (Object.values(stats.categories).reduce((a, b) => a + b, 0) || 1)) * 100);
                            return (
                                <div key={cat}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-slate-700">{cat}</span>
                                        <span className="text-slate-500">{count} books ({percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Popularity/Usage */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-800">Circulation Stats</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl text-center">
                            <p className="text-slate-500 text-sm mb-1">Total Inventory</p>
                            <h4 className="text-2xl font-bold text-slate-900">{stats.totalCopies}</h4>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl text-center">
                            <p className="text-slate-500 text-sm mb-1">Total Lifetime Issues</p>
                            <h4 className="text-2xl font-bold text-slate-900">{stats.totalIssued}</h4>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                        <p className="font-medium">Insight</p>
                        <p className="mt-1 opacity-80">
                            The library has a circulation ratio of {(stats.totalIssued / (stats.totalCopies || 1)).toFixed(2)} issues per book copy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
