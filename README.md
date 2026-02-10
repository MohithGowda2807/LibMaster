# LibMaster - Library Management System

A modern, full-stack library management system built with Spring Boot and React, featuring custom data structures for efficient book management, member tracking, and circulation control.

## ✨ Features

- 📚 **Book Management**: Add, search, and categorize books with real-time inventory tracking
- 👥 **Member Management**: Register and manage library members
- 🔄 **Circulation System**: Issue and return books with automated tracking
- ⏰ **Overdue Tracking**: Automatic fine calculation for overdue books
- 📋 **Reservation Queue**: FIFO queue system for unavailable books
- 📊 **Analytics Dashboard**: Real-time statistics and insights
- 🔍 **Advanced Search**: Prefix-based search using Trie data structure

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.3
- **Language**: Java 17+
- **Build Tool**: Maven
- **Data Structures**: Custom implementations (AVL Tree, Trie, MinHeap, Circular Queue, HashMap, LinkedList, Stack)

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.4.21
- **Styling**: Tailwind CSS 3.4.19
- **HTTP Client**: Axios 1.6.7
- **Routing**: React Router DOM 6.22.3
- **Animations**: Framer Motion 11.0.8

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- Git

### Backend Setup

```bash
cd backend
./mvnw clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

Backend will start on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
lib_mgmt_sys/
├── backend/
│   ├── src/
│   │   └── main/
│   │       └── java/com/library/
│   │           ├── controller/     # REST API endpoints
│   │           ├── service/        # Business logic
│   │           ├── model/          # Data models
│   │           └── ds/             # Custom data structures
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── services/      # API service layer
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book
- `GET /api/books/{id}` - Get book by ID
- `GET /api/books/search?q={query}` - Search books
- `GET /api/books/category/{category}` - Get books by category

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Register new member
- `GET /api/members/{id}` - Get member by ID
- `GET /api/members/{id}/details` - Get detailed member info

### Circulation
- `POST /api/issue` - Issue book to member
- `POST /api/return` - Return book
- `GET /api/overdue` - Get overdue books
- `POST /api/reserve` - Reserve a book
- `GET /api/reservations` - Get all reservations

## 🧮 Custom Data Structures

This project implements several data structures from scratch:

- **AVL Tree**: Self-balancing BST for O(log n) book lookups by ID
- **Trie**: Prefix tree for efficient title-based search
- **MinHeap**: Priority queue for fine management (highest fines first)
- **Circular Queue**: FIFO reservation queue for each book
- **HashMap**: Custom hash table for member storage and category indexing
- **LinkedList**: Primary storage for books and issue records
- **Stack**: Undo operation tracking

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set build command: `./mvnw clean package -DskipTests`
5. Set start command: `java -Dserver.port=$PORT -jar target/backend-0.0.1-SNAPSHOT.jar`

### Frontend (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory
3. Run: `vercel --prod`
4. Set environment variable: `VITE_API_URL=<your-backend-url>`

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Mohith Gowda

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React and Vite teams for modern frontend tooling
- Tailwind CSS for utility-first styling
