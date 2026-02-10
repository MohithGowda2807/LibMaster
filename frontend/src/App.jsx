import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Members from './pages/Members';
import Circulation from './pages/Circulation';
import Overdue from './pages/Overdue';
import Reservations from './pages/Reservations';
import SearchPage from './pages/SearchPage';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen font-sans antialiased text-slate-900">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/circulation" element={<Circulation />} />
            <Route path="/overdue" element={<Overdue />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
