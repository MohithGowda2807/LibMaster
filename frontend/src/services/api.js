import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBooks = () => api.get('/books');
export const getBook = (id) => api.get(`/books/${id}`);
export const addBook = (book) => api.post('/books', book);
export const searchBooks = (query) => api.get(`/books/search?q=${query}`);
export const getBooksByCategory = (category) => api.get(`/books/category/${category}`);

export const getMembers = () => api.get('/members');
export const registerMember = (member) => api.post('/members', member);
export const getMember = (id) => api.get(`/members/${id}`);

export const issueBook = (bookId, memberId) => api.post(`/issue?bookId=${bookId}&memberId=${memberId}`);
export const returnBook = (bookId, memberId) => api.post(`/return?bookId=${bookId}&memberId=${memberId}`);

// Overdue &  Fines
export const getOverdueBooks = () => api.get('/overdue');

// Reservations
export const reserveBook = (bookId, memberId) =>
    api.post('/reserve', null, { params: { bookId, memberId } });
export const getReservations = () => api.get('/reservations');
export const getBookReservations = (bookId) => api.get(`/reservations/${bookId}`);

// Enhanced Member Details
export const getMemberDetails = (id) => api.get(`/members/${id}/details`);

export default api;
