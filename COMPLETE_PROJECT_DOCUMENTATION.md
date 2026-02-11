# LibMaster - Complete Project Documentation

**Academic Year:** 2025-2026  
**Course:** Data Structures Laboratory  
**Project Type:** Full-Stack Library Management System  
**Technology Stack:** Spring Boot 3.2.3 + React 18 + Vite + Tailwind CSS  
**Data Structures Implemented:** 7 Custom Structures  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technical Specifications](#technical-specifications)
4. [Data Structures Implementation](#data-structures-implementation)
5. [Features & Functionality](#features--functionality)
6. [System Architecture](#system-architecture)
7. [Implementation Details](#implementation-details)
8. [API Documentation](#api-documentation)
9. [Time Complexity Analysis](#time-complexity-analysis)
10. [Syllabus Coverage](#syllabus-coverage)
11. [User Interface](#user-interface)
12. [Setup & Installation](#setup--installation)
13. [Deployment](#deployment)
14. [Testing & Validation](#testing--validation)
15. [Future Enhancements](#future-enhancements)
16. [Conclusion](#conclusion)

---

## Executive Summary

LibMaster is a modern, full-stack library management system that demonstrates practical implementation of multiple data structures in a real-world web application. The system manages books, members, circulation operations, fine calculations, and reservation queues - all while leveraging different data structures for optimal performance.

### Key Highlights

- **7 Custom Data Structures** implemented from scratch
- **RESTful API** with Spring Boot backend
- **Modern React Frontend** with Tailwind CSS
- **Real-time Operations** with O(1) and O(log n) performance
- **Production Deployment** on Render (backend) and Vercel (frontend)
- **Complete CRUD Operations** for books and members
- **Automated Fine Calculation** for overdue books
- **Advanced Search** with Trie-based autocomplete
- **100% Syllabus Coverage** (Units I-V)

---

## Project Overview

### Motivation

Modern libraries require efficient management of thousands of books and members, with operations requiring fast search, organized queuing, and priority-based handling. This project demonstrates how appropriate data structure selection dramatically improves system performance in a web-based environment.

### Objectives

1. **Implement** core data structures from syllabus in a modern web application
2. **Demonstrate** efficiency gains through proper DS selection
3. **Integrate** multiple structures working cohesively via REST API
4. **Provide** professional React UI for library operations
5. **Deploy** to production infrastructure

### Problem Statement

Traditional library management faces challenges:
- **Slow searches** in large book collections
- **Inefficient member lookup** during borrowing
- **Manual priority** for overdue books
- **Poor organization** of waiting lists
- **Scalability issues** with client-server architecture

### Our Solution

Strategic use of data structures with modern web architecture:
- **CustomHashMap** → O(1) member & category lookup
- **AVL Tree** → O(log n) guaranteed book search
- **MinHeap (Priority Queue)** → Automatic overdue prioritization
- **Trie** → Intelligent autocomplete search
- **Circular Queue** → Fair FIFO reservation system
- **REST API** → Stateless, scalable backend
- **React SPA** → Fast, responsive user interface

---

## Technical Specifications

### Backend Stack

**Framework:** Spring Boot 3.2.3  
**Language:** Java 17  
**Build Tool:** Maven 3.8+  
**Architecture:** RESTful API with custom data structures  
**Deployment:** Render (Cloud Platform)  

**Dependencies:**
- `spring-boot-starter-web` - REST API support
- `spring-boot-starter-validation` - Input validation
- `spring-boot-starter-test` - Testing framework

### Frontend Stack

**Framework:** React 18.2.0  
**Build Tool:** Vite 5.4.21  
**Styling:** Tailwind CSS 3.4.19  
**HTTP Client:** Axios 1.6.7  
**Routing:** React Router DOM 6.22.3  
**Animations:** Framer Motion 11.0.8  
**Icons:** Lucide React 0.344.0  
**Deployment:** Vercel  

### System Requirements

**Minimum:**
- Java Runtime Environment (JRE) 17
- Node.js 16+
- 512 MB RAM
- 100 MB disk space

**Recommended:**
- Java Development Kit (JDK) 17+
- Node.js 18+
- 2 GB RAM
- 500 MB disk space

### Technology Architecture

```
┌─────────────────────────────────────────┐
│     Frontend (React + Vite)             │
│     Tailwind CSS + Framer Motion        │
├─────────────────────────────────────────┤
│     HTTP/REST Communication (Axios)     │
├─────────────────────────────────────────┤
│     Backend (Spring Boot)               │
│     REST Controllers + Service Layer    │
├─────────────────────────────────────────┤
│     Custom Data Structures Layer        │
│  AVL | Trie | Heap | Queue | HashMap   │
│  LinkedList | Stack | BST              │
├─────────────────────────────────────────┤
│     Model Layer                         │
│  Book | Member | IssueRecord | Etc.    │
└─────────────────────────────────────────┘
```

---

## Data Structures Implementation

### 1. CustomHashMap - Member & Category Management

**File:** `CustomHashMap.java`

**Purpose:**  
Generic hash map implementation for O(1) member lookup and category indexing.

**Implementation Details:**

```java
public class CustomHashMap<K, V> {
    private static final int DEFAULT_CAPACITY = 16;
    private static final float LOAD_FACTOR = 0.75f;
    
    private Entry<K, V>[] table;
    private int size = 0;
    
    // Hash Function
    private int hash(K key) {
        return Math.abs(key.hashCode()) % table.length;
    }
    
    // Separate Chaining for collision resolution
    private static class Entry<K, V> {
        K key;
        V value;
        Entry<K, V> next;
    }
}
```

**Collision Resolution:** Separate Chaining (linked list per bucket)

**Use Cases:**
- Store members by ID → O(1) lookup
- Index books by category → O(1) category filter
- Track reservations per book → O(1) access

**Advantages:**
- Constant time operations on average
- Dynamic resizing capability
- Generic implementation (reusable)

**Real-World Justification:**  
"When a member arrives to borrow a book, system needs instant ID lookup from thousands of members - hash map provides this in O(1) time vs O(n) linear search."

---

### 2. AVL Tree - Balanced Book Search

**File:** `AVLTree.java`

**Purpose:**  
Self-balancing binary search tree for guaranteed O(log n) book lookups.

**Implementation Details:**

```java
class Node {
    int key;        // Book ID
    Book value;
    int height;
    Node left, right;
}

// Balance Factor
balanceFactor = height(left) - height(right)
AVL Property: |balanceFactor| ≤ 1

// Four Rotation Cases
- Left-Left → Right Rotation
- Right-Right → Left Rotation  
- Left-Right → Left + Right Rotation
- Right-Left → Right + Left Rotation
```

**Self-Balancing Mechanism:**  
After every insertion, tree checks balance factor at each node and performs rotations to maintain height balance.

**Operations:**
- Insert: O(log n) guaranteed
- Search: O(log n) guaranteed
- In-order traversal: O(n)

**Comparison with BST:**

| Scenario | BST Worst Case | AVL Guarantee |
|----------|---------------|---------------|
| Sequential insertion | O(n) | O(log n) |
| Search | O(n) | O(log n) |
| Height | n | log n |

**Real-World Justification:**  
"If library adds books with ascending IDs (101, 102, 103...), regular BST degenerates to linked list with O(n) search. AVL automatically rebalances, maintaining O(log n) performance."

---

### 3. Binary Search Tree (BST) - Basic Book Index

**File:** `BinarySearchTree.java`

**Purpose:**  
Demonstrates fundamental tree-based search (educational comparison with AVL).

**Implementation:**

```java
class Node {
    int key;
    Book value;
    Node left, right;
}

// Search Algorithm
- If key < node.key → search left
- If key > node.key → search right
- If key == node.key → found
```

**Operations:**
- Insert: O(log n) average, O(n) worst
- Search: O(log n) average, O(n) worst

**Use Cases:**
- Demonstrates basic tree concepts
- Educational comparison with AVL performance
- Sorted book listing (in-order traversal)

---

### 4. MinHeap - Priority Queue for Fines

**File:** `MinHeap.java`

**Purpose:**  
Priority queue implementation to automatically sort overdue books by fine amount (highest fine = highest priority).

**Implementation:**

```java
public class MinHeap<T extends Comparable<T>> {
    private T[] heap;
    private int size;
    
    // Heap Property: parent <= children
    // Array representation: parent at i, children at 2i+1 and 2i+2
    
    public void insert(T element) {
        heap[size++] = element;
        heapifyUp(size - 1);
    }
    
    public T extractMin() {
        T min = heap[0];
        heap[0] = heap[--size];
        heapifyDown(0);
        return min;
    }
}
```

**Heap Structure:**
```
        [₹25]          (Lowest fine)
       /     \
   [₹75]     [₹50]
   /   \     /
[₹100][₹150][₹200]
```

**Operations:**
- Insert: O(log n)
- Extract Min: O(log n)
- Peek Min: O(1)

**Application:**  
`OverdueRecord` objects are inserted into heap with `compareTo()` based on fine amount. Extracting from heap gives books sorted by urgency (highest fines first).

**Real-World Justification:**  
"Librarian needs to contact members with highest overdue fines first. Min-heap automatically keeps most urgent cases at top, no manual sorting needed."

---

### 5. Trie - Book Title Autocomplete

**File:** `Trie.java`

**Purpose:**  
Prefix-based search tree for efficient title autocomplete functionality.

**Implementation:**

```java
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEndOfWord;
    Book book;  // Store book reference at word end
}

// Example: "Harry Potter"
root
 └─ h
     └─ a
         └─ r
             └─ r
                 └─ y
                     └─ [END: Book ref]
```

**Operations:**
- Insert: O(m) where m = title length
- Search prefix: O(p) where p = prefix length
- Autocomplete: O(p + k) where k = number of results

**Use Cases:**
- Type "Ha" → suggests "Harry Potter", "Hard Times"
- Partial title search
- Smart search suggestions

**Real-World Justification:**  
"Users rarely remember exact book titles. Trie enables Google-like search suggestions where typing few letters shows matching books instantly, providing better UX than exact match search."

---

### 6. CircularQueue - Reservation System

**File:** `CircularQueue.java`

**Purpose:**  
FIFO queue for fair book reservation waiting lists.

**Implementation:**

```java
public class CircularQueue<T> {
    private T[] queue;
    private int front = 0;
    private int rear = 0;
    private int size = 0;
    private int capacity;
    
    // Circular wrapping
    public void enqueue(T element) {
        queue[rear] = element;
        rear = (rear + 1) % capacity;
        size++;
    }
    
    public T dequeue() {
        T element = queue[front];
        front = (front + 1) % capacity;
        size--;
        return element;
    }
}
```

**Operations:**
- Enqueue: O(1)
- Dequeue: O(1)
- isEmpty: O(1)

**Use Cases:**
- All book copies issued → add members to queue
- Book returned → auto-issue to first person in queue
- Fair allocation (FIFO - no queue jumping)

**Real-World Justification:**  
"When bestseller has all copies issued, members reserve in order. CircularQueue ensures first come first served - fair and efficient with optimal space usage."

---

### 7. CustomStack - Operation Tracking

**File:** `CustomStack.java`

**Purpose:**  
LIFO structure for tracking recent operations (audit/undo capability).

**Implementation:**

```java
public class CustomStack<T> {
    private T[] stack;
    private int top = -1;
    
    public void push(T element) {
        stack[++top] = element;
    }
    
    public T pop() {
        return stack[top--];
    }
}
```

**Operations:**
- Push: O(1)
- Pop: O(1)
- Peek: O(1)

**Use Cases:**
- Track issue operations
- Store action logs
- Potential undo functionality

---

### 8. CustomLinkedList - Primary Storage

**File:** `CustomLinkedList.java`

**Purpose:**  
Generic singly linked list for dynamic linear storage.

**Implementation:**

```java
public class CustomLinkedList<T> {
    private class Node {
        T data;
        Node next;
    }
    
    private Node head;
    private int size = 0;
}
```

**Operations:**
- Add: O(1) at head, O(n) at tail
- Remove: O(n)
- Search: O(n)
- toList(): O(n) conversion to ArrayList

**Use Cases:**
- Primary book storage
- Issue record storage
- Category bucket storage in hash table

---

## Features & Functionality

### Module 1: Book Management

#### 1.1 Add Book
**Data Structures Used:** CustomLinkedList, AVL Tree, Trie, CustomHashMap

**API Endpoint:** `POST /api/books`

**Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Tech",
  "totalCopies": 5,
  "availableCopies": 5
}
```

**Process:**
1. Validate input (non-empty title/author)
2. Auto-generate book ID (101, 102, 103...)
3. Insert into:
   - LinkedList (primary storage) → O(1)
   - AVL Tree (search index by ID) → O(log n)
   - Trie (title autocomplete) → O(m)
   - CategoryIndex HashMap → O(1)

**Response:** Book object with assigned ID

#### 1.2 Get All Books
**API Endpoint:** `GET /api/books`

**Response:** Array of all books from linked list traversal

#### 1.3 Get Book by ID
**API Endpoint:** `GET /api/books/{id}`

**Process:** AVL tree search → O(log n)

#### 1.4 Search Books
**API Endpoint:** `GET /api/books/search?q={query}`

**Process:**
1. If query is numeric → try AVL search by ID
2. Else → Trie prefix search for title match

**Time:** O(log n) for ID, O(p + k) for title

#### 1.5 Get Books by Category
**API Endpoint:** `GET /api/books/category/{category}`

**Process:** HashMap lookup → O(1) to find category bucket

---

### Module 2: Member Management

#### 2.1 Register Member
**Data Structure:** CustomHashMap

**API Endpoint:** `POST /api/members`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

**Process:**
1. Validate phone number (Indian format: 10 digits starting with 6-9)
2. Check for duplicate email/phone → O(n) iteration
3. Auto-generate member ID
4. Store in HashMap → O(1)
5. Set registration date to current date

**Member Structure:**
```java
class Member {
    int id;
    String name, email, phone;
    LocalDate registrationDate;
    List<Integer> currentBorrowedBooks;
    double pendingFines;
}
```

#### 2.2 Get All Members
**API Endpoint:** `GET /api/members`

**Response:** List of all registered members

#### 2.3 Get Member Details
**API Endpoint:** `GET /api/members/{id}/details`

**Response:**
```json
{
  "member": { /* member object */ },
  "issuedBooks": [
    {
      "book": { /* book object */ },
      "issueDate": "2026-01-15",
      "dueDate": "2026-01-29",
      "isOverdue": false
    }
  ],
  "reservations": [ /* reservation objects */ ]
}
```

---

### Module 3: Circulation System

#### 3.1 Issue Book
**API Endpoint:** `POST /api/issue?bookId={id}&memberId={id}`

**Multi-Step Process:**

```java
1. Validate member ID → O(1) HashMap lookup
2. Validate book ID → O(log n) AVL search
3. Check if member already has this book
4. Check book availability:
   If availableCopies > 0:
     - Decrease availableCopies
     - Increment timesIssued
     - Add to member's borrowedBooks list
     - Create IssueRecord (issueDate=today, dueDate=today+14)
     - Push action to stack
     - Response: "Book issued. Due: YYYY-MM-DD"
   Else:
     - Add to CircularQueue for this book
     - Response: "Added to queue. Position: X"
```

**Business Rules:**
- 14-day loan period
- One member cannot borrow same book twice simultaneously
- Auto-queue if unavailable

#### 3.2 Return Book
**API Endpoint:** `POST /api/return?bookId={id}&memberId={id}`

**Process:**

```java
1. Validate member and book
2. Check if member has this book
3. Remove from member's borrowedBooks
4. Mark IssueRecord as returned
5. Check if overdue:
   If dueDate < today:
     - Calculate: daysOverdue = today - dueDate
     - Calculate: fine = daysOverdue × ₹5
     - Add fine to member.pendingFines
     - Insert OverdueRecord into MinHeap
6. Increase book.availableCopies
7. Check reservation queue for this book:
   If queue not empty:
     - Dequeue next reservation
     - Auto-issue book to that member
     - Response: "Returned and auto-issued to Member X"
   Else:
     - Response: "Book returned successfully"
```

**Fine Calculation:**
```
daysOverdue = currentDate - dueDate
fine = daysOverdue × ₹5.0
```

---

### Module 4: Overdue & Fines

#### 4.1 Get Overdue Books
**API Endpoint:** `GET /api/overdue`

**Data Structure:** MinHeap

**Process:**
1. Reset MinHeap
2. Iterate all IssueRecords
3. For each unreturned record where dueDate < today:
   - Calculate daysOverdue and fine
   - Create OverdueRecord object
   - Insert into MinHeap (heap sorts by fine amount)
4. Extract all from heap (sorted output)

**OverdueRecord Structure:**
```java
class OverdueRecord implements Comparable<OverdueRecord> {
    int bookId, memberId;
    String memberName, bookTitle;
    int daysOverdue;
    double fine;
    
    // Compare by fine (descending) for min-heap
    public int compareTo(OverdueRecord other) {
        return Double.compare(other.fine, this.fine);
    }
}
```

**Result:** List sorted by fine amount (highest first)

---

### Module 5: Reservation Management

#### 5.1 Reserve Book
**API Endpoint:** `POST /api/reserve?bookId={id}&memberId={id}`

**Process:**
1. Check if book exists
2. If book available → "Book available, please issue directly"
3. Else → add to CircularQueue for this bookId

**Queue Management:**
- Each book has its own CircularQueue (capacity: 20)
- Stored in HashMap<BookId, CircularQueue<Reservation>>

#### 5.2 Get All Reservations
**API Endpoint:** `GET /api/reservations`

**Process:**
1. Iterate all queues in HashMap
2. Dequeue all items (store temporarily)
3. Re-enqueue to preserve queue
4. Return combined list

#### 5.3 Get Reservations for Book
**API Endpoint:** `GET /api/reservations/{bookId}`

**Process:** Similar to above but for single book's queue

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│             Client Browser                          │
│        (React SPA + Tailwind CSS)                   │
└─────────────────────────────────────────────────────┘
                       │ HTTP/REST
                       ├─ GET /api/books
                       ├─ POST /api/books
                       ├─ POST /api/issue
                       └─ ... other endpoints
                       ▼
┌─────────────────────────────────────────────────────┐
│          Spring Boot Application                    │
│          (Port 8080 or $PORT)                       │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │  LibraryController (@RestController)        │   │
│  │  - @PostMapping, @GetMapping endpoints      │   │
│  └─────────────────────────────────────────────┘   │
│                     │                               │
│  ┌─────────────────────────────────────────────┐   │
│  │  LibraryService (@Service)                  │   │
│  │  - Business logic                           │   │
│  │  - Data structure orchestration             │   │
│  └─────────────────────────────────────────────┘   │
│                     │                               │
│  ┌─────────────────────────────────────────────┐   │
│  │  Custom Data Structures Layer               │   │
│  │  CustomLinkedList | AVL | Trie | MinHeap   │   │
│  │  CustomHashMap | CircularQueue | Stack     │   │
│  └─────────────────────────────────────────────┘   │
│                     │                               │
│  ┌─────────────────────────────────────────────┐   │
│  │  Model Layer                                │   │
│  │  Book | Member | IssueRecord | etc.        │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Backend Directory Structure

```
backend/
├── src/
│   └── main/
│       └── java/com/library/
│           ├── controller/
│           │   └── LibraryController.java  (REST endpoints)
│           ├── service/
│           │   └── LibraryService.java     (Business logic)
│           ├── model/
│           │   ├── Book.java
│           │   ├── Member.java
│           │   ├── IssueRecord.java
│           │   ├── OverdueRecord.java
│           │   └── Reservation.java
│           ├── ds/  (Custom Data Structures)
│           │   ├── AVLTree.java
│           │   ├── BinarySearchTree.java
│           │   ├── CircularQueue.java
│           │   ├── CustomHashMap.java
│           │   ├── CustomLinkedList.java
│           │   ├── CustomStack.java
│           │   ├── MinHeap.java
│           │   └── Trie.java
│           ├── config/
│           │   └── CorsConfig.java  (CORS configuration)
│           └── LibraryApplication.java  (Main @SpringBootApplication)
└── pom.xml  (Maven dependencies)
```

### Frontend Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Sidebar.jsx  (Navigation sidebar)
│   ├── pages/
│   │   ├── Dashboard.jsx      (Home - statistics)
│   │   ├── Books.jsx          (Book management)
│   │   ├── Members.jsx        (Member management)
│   │   ├── Circulation.jsx    (Issue/Return)
│   │   ├── Overdue.jsx        (Fine management)
│   │   ├── Reservations.jsx   (Queue management)
│   │   ├── SearchPage.jsx     (Advanced search)
│   │   └── Analytics.jsx      (Reports & charts)
│   ├── services/
│   │   └── api.js  (Axios HTTP client)
│   ├── App.jsx     (Router setup)
│   └── main.jsx    (React entry point)
├── public/
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Data Flow: Issue Book Example

```
User clicks "Issue Book" button
    ↓
React Component (Circulation.jsx)
    ↓
api.issueBook(bookId, memberId) via Axios
    ↓
POST /api/issue?bookId=101&memberId=1
    ↓
LibraryController.issueBook()
    ↓
LibraryService.issueBook()
    ├─ members.get(memberId)           → O(1) HashMap
    ├─ bookIndex.search(bookId)        → O(log n) AVL
    ├─ Check availableCopies > 0
    ├─ If yes:
    │   ├─ Update book/member
    │   ├─ Create IssueRecord
    │   └─ Push to stack
    └─ If no:
        └─ queue.enqueue(reservation)  → O(1) CircularQueue
    ↓
Return success message
    ↓
React component updates UI
```

---

## API Documentation

### Base URL

**Local Development:** `http://localhost:8080/api`  
**Production:** `https://your-app.onrender.com/api`

### Book Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/books` | Add new book | Book object | Book with ID |
| GET | `/books` | Get all books | - | Book array |
| GET | `/books/{id}` | Get book by ID | - | Book object |
| GET | `/books/search?q={query}` | Search books | - | Book array |
| GET | `/books/category/{category}` | Filter by category | - | Book array |

### Member Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/members` | Register member | Member object | Member with ID |
| GET | `/members` | Get all members | - | Member array |
| GET | `/members/{id}` | Get member | - | Member object |
| GET | `/members/{id}/details` | Get detailed info | - | Extended info |

### Circulation Endpoints

| Method | Endpoint | Description | Parameters | Response |
|--------|----------|-------------|------------|----------|
| POST | `/issue` | Issue book | bookId, memberId | Success message |
| POST | `/return` | Return book | bookId, memberId | Success message |
| GET | `/overdue` | Get overdue books | - | OverdueRecord array |
| POST | `/reserve` | Reserve book | bookId, memberId | Success message |
| GET | `/reservations` | All reservations | - | Reservation array |
| GET | `/reservations/{bookId}` | Book's queue | - | Reservation array |

### CORS Configuration

**File:** `CorsConfig.java`

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:5173",
                    "https://your-frontend.vercel.app"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

---

## Time Complexity Analysis

### Operations Comparison

| Operation | Without DS Optimization | With Our Implementation | Complexity Improvement |
|-----------|------------------------|------------------------|----------------------|
| Find member | O(n) linear scan | O(1) CustomHashMap | **n× faster** |
| Search book by ID | O(n) linear scan | O(log n) AVL Tree | **Much faster** |
| Category filter | O(n) scan all books | O(1) hash bucket | **n× faster** |
| Get highest fine | O(n) + O(n log n) sort | O(1) MinHeap peek | **Very efficient** |
| Title autocomplete | O(n × m) compare all | O(p + k) Trie | **Extremely efficient** |
| Reserve book | O(1) list append | O(1) CircularQueue | **Same, better organized** |

### Individual Operations

**Book Management:**
- Add book: O(1) LinkedList + O(log n) AVL + O(m) Trie + O(1) HashMap = **O(log n + m)**
- Search by ID: **O(log n)** (AVL Tree)
- Search by title: **O(p + k)** where p = prefix length, k = results (Trie)
- Get by category: **O(1)** (HashMap lookup)

**Member Management:**
- Register: **O(1)** (HashMap insert)
- Lookup: **O(1)** (HashMap get)
- Get all: **O(n)** (iterate values)

**Circulation:**
- Issue book: O(1) + O(log n) = **O(log n)**
- Return book: O(1) + O(log n) + O(log n) heap = **O(log n)**
- Reserve: **O(1)** (CircularQueue enqueue)

**Fine Management:**
- Get overdue: O(k log k) where k = overdue count = **O(k log k)**
- Sorted by priority: Automatic via MinHeap

### Space Complexity

| Data Structure | Space | Justification |
|---------------|-------|---------------|
| CustomLinkedList | O(n) | n books + k issue records |
| AVL Tree | O(n) | n book references |
| CustomHashMap | O(n + m) | n members + m categories |
| Trie | O(ALPHABET × n × m) | Worst case, typically less |
| MinHeap | O(k) | k overdue books |
| CircularQueue | O(r × b) | r reservations × b books |
| CustomStack | O(s) | s operations logged |

**Total:** O(n) where n = number of books (dominant factor)

---

## Syllabus Coverage

### Unit-I: Stacks, Queues, Recursion

✅ **Stack** - `CustomStack.java`
- Implementation: Generic array-based stack
- Application: Operation logging/tracking
- Operations: push(), pop(), isEmpty(), isFull()
- Time: O(1) for all operations

✅ **Queue** - `CircularQueue.java`
- Implementation: Circular array queue
- Application: Book reservation FIFO system
- Operations: enqueue(), dequeue(), isEmpty(), isFull()
- Time: O(1) for all operations
- **Circular advantage:** Optimal space usage, no shifting needed

✅ **Recursion** - Used throughout
- Tree traversals (AVL in-order)
- Demonstrates call stack mechanism

---

### Unit-II: Linked Lists

✅ **Singly Linked List** - `CustomLinkedList.java`
- Generic implementation: `CustomLinkedList<T>`
- Operations: add(), remove(), search(), toList()
- Application: Primary book storage, issue records
- Dynamic memory allocation

✅ **Dynamic Memory** - Java automatic
- Object creation: `new` operator
- Garbage collection: automatic cleanup

---

### Unit-III: Trees

✅ **Binary Search Tree** - `BinarySearchTree.java`
- Operations: insert, search, traversal
- Application: Book indexing (educational comparison)
- Demonstrates BST advantages/limitations

✅ **AVL Tree** - `AVLTree.java` ⭐
- Self-balancing BST
- All 4 rotation cases implemented:
  - Left-Left (LL) → Right Rotation
  - Right-Right (RR) → Left Rotation
  - Left-Right (LR) → Left then Right
  - Right-Left (RL) → Right then Left
- Balance factor tracking: height(left) - height(right)
- **Guaranteed O(log n)** for all operations
- Application: Primary book search index

---

### Unit-IV: Heaps & Priority Queues

✅ **Min-Heap** - `MinHeap.java`
- Generic implementation: `MinHeap<T extends Comparable<T>>`
- Array-based representation
- Operations: insert(), extractMin(), heapifyUp(), heapifyDown()
- Time: O(log n) for insert/extract, O(1) for peek
- Application: Priority queue for fine management

✅ **Heap Sort** - Demonstrated in getOverdueBooks()
- Extract all elements from heap in sorted order
- Time complexity: O(n log n)

✅ **Priority Queue** - Overdue book prioritization
- Automatically maintains sorted order by fine amount
- No manual sorting required

---

### Unit-V: Advanced Trees & Hashing

✅ **Trie** - `Trie.java`
- Prefix tree for string search
- Node structure: Map<Character, TrieNode>
- Operations: insert(O(m)), searchPrefix(O(p + k))
- Application: Book title autocomplete
- **Huge advantage** over naive string matching

✅ **Hashing** - `CustomHashMap.java`
- Generic hash table: `CustomHashMap<K, V>`
- Hash function: `key.hashCode() % capacity`
- Collision resolution: **Separate chaining** (linked list per bucket)
- Dynamic resizing: Load factor = 0.75
- Applications:
  - Member storage (O(1) lookup)
  - Category indexing (O(1) filter)
  - Reservation queues per book

**Coverage: 10/10 essential topics = 100%** ✅

Topics not implemented (not required for library system):
- ❌ Graph algorithms (not applicable)
- ❌ B+ Trees (beyond scope)
- ❌ Red-Black Trees (AVL sufficient)

---

## User Interface

### Technology: React 18 + Tailwind CSS

**Routing:** React Router DOM with 8 pages  
**State Management:** React hooks (useState, useEffect)  
**HTTP Client:** Axios  
**Animations:** Framer Motion  
**Icons:** Lucide React  

### Page Organization

**🏠 Dashboard** (`/`)
- Real-time statistics cards
- Total books, members, issued books
- Quick action buttons
- Recent activity feed

**📚 Books** (`/books`)
- Add new book form
- Book list with card display
- Search and filter options
- Edit/delete functionality (future)

**👥 Members** (`/members`)
- Member registration form
- Member directory
- Detailed member view with borrowed books
- Pending fines display

**🔄 Circulation** (`/circulation`)
- Issue book interface
- Return book interface
- Active loans display
- Reservation creation

**⏰ Overdue** (`/overdue`)
- Overdue books table (sorted by fine)
- Days overdue calculation
- Fine amount display
- Member contact information

**📋 Reservations** (`/reservations`)
- All reservations list
- Filter by book
- Queue position display
- Auto-issue notification

**🔍 Search** (`/search`)
- Multi-criteria search
- ID search (AVL)
- Title search (Trie autocomplete)
- Category filter (HashMap)
- Real-time results

**📊 Analytics** (`/analytics`)
- Charts and graphs
- Most issued books
- Category distribution
- Member activity stats

### Design Features

**Modern UI:**
- Clean, minimalist design
- Gradient backgrounds
- Card-based layouts
- Responsive grid systems

**Tailwind CSS Classes:**
```jsx
<div className="bg-gradient-to-br from-blue-500 to-purple-600 
                rounded-lg shadow-lg p-6 transform hover:scale-105 
                transition-all duration-200">
```

**Framer Motion Animations:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

**Color Scheme:**
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Component Structure

**Sidebar.jsx:**
- Fixed left navigation (64 width)
- React Router NavLink components
- Active link highlighting
- Icons from Lucide React

**Page Components:**
- Consistent header structure
- Action buttons (top-right)
- Content area with cards/tables
- Form modals (future enhancement)

---

## Setup & Installation

### Prerequisites

**Backend:**
```bash
# Check Java installation
java -version
# Should show: openjdk version "17" or higher

# Maven (optional, wrapper included)
mvn -version
```

**Frontend:**
```bash
# Check Node.js
node -v
# Should show: v16 or higher

# npm
npm -v
```

### Local Development Setup

#### 1. Clone Repository

```bash
cd c:\Users\mohit\OneDrive\Desktop
git clone <repository-url> lib_mgmt_sys
cd lib_mgmt_sys
```

#### 2. Backend Setup

```bash
cd backend

# Option 1: Using Maven Wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# Option 2: Using installed Maven
mvn clean install
mvn spring-boot:run

# Backend starts on http://localhost:8080
```

**Verify Backend:**
```bash
curl http://localhost:8080/api/books
# Should return JSON array (sample books)
```

#### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend starts on http://localhost:5173
```

**Verify Frontend:**
- Open browser: http://localhost:5173
- Should see LibMaster dashboard

### Environment Variables

**Frontend** (`.env.local`):
```
VITE_API_URL=http://localhost:8080/api
```

**Production:**
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Build for Production

**Backend:**
```bash
cd backend
./mvnw clean package -DskipTests
# Creates: target/backend-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Creates: dist/ folder with optimized files
```

---

## Deployment

### Backend Deployment (Render)

**Platform:** [Render](https://render.com)  
**Type:** Web Service  

**Steps:**

1. **Create New Web Service**
   - Connect GitHub repository
   - Select `backend` directory

2. **Build Configuration**
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -Dserver.port=$PORT -jar target/backend-0.0.1-SNAPSHOT.jar`
   - **Environment:** Java 17

3. **Environment Variables**
   - `PORT`: Auto-set by Render
   - `JAVA_TOOL_OPTIONS`: `-Xmx512m` (optional, limit memory)

4. **Deploy**
   - Auto-deploys on git push
   - URL: `https://your-app.onrender.com`

**Health Check Endpoint:** `/api/books`

---

### Frontend Deployment (Vercel)

**Platform:** [Vercel](https://vercel.com)  
**Type:** Static Site  

**Steps:**

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel --prod
```

3. **Configure Environment**
   - Dashboard → Settings → Environment Variables
   - Add `VITE_API_URL` = `https://your-backend.onrender.com/api`

4. **Redeploy**
```bash
vercel --prod
```

**Production URL:** `https://your-app.vercel.app`

---

### CORS Configuration

Update `backend/src/main/java/com/library/config/CorsConfig.java`:

```java
.allowedOrigins(
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
)
```

Redeploy backend after updating.

---

## Testing & Validation

### Test Scenarios

#### Scenario 1: Complete Book Lifecycle

```
1. Add Book
   POST /api/books
   Body: {"title": "Test Book", "author": "Test Author", 
          "category": "Fiction", "totalCopies": 3}
   Expected: ✅ Book added with ID 101+ 
   Verification: Check AVL (GET /api/books/101), 
                 Trie (search "Test"), 
                 Category (GET /api/books/category/Fiction)

2. Search Book
   GET /api/books/search?q=Test
   Expected: ✅ Book appears in results (Trie search)

3. Search by ID
   GET /api/books/101
   Expected: ✅ Book details (AVL search, O(log n))

4. Get by Category
   GET /api/books/category/Fiction
   Expected: ✅ Test Book in list (HashMap, O(1))
```

#### Scenario 2: Issue/Return with Overdue

```
1. Register Member
   POST /api/members
   Body: {"name": "John", "email": "john@test.com", "phone": "9876543210"}
   Expected: ✅ Member created with ID

2. Issue Book
   POST /api/issue?bookId=101&memberId=1
   Expected: ✅ "Book issued. Due: [date+14 days]"
   Verification: book.availableCopies decreased
                member.currentBorrowedBooks includes 101

3. Check Member Details
   GET /api/members/1/details
   Expected: ✅ Shows 1 issued book with due date

4. Return Book (simulate after due date)
   POST /api/return?bookId=101&memberId=1
   Expected: ✅ "Book returned successfully"
   If overdue: Fine calculated (days × ₹5)

5. Check Overdue
   GET /api/overdue
   Expected: ✅ List sorted by fine amount (MinHeap)
```

#### Scenario 3: Reservation Queue

```
1. Issue all copies of book ID 102 (assume 2 copies)
   Issue to member 1: ✅
   Issue to member 2: ✅
   book.availableCopies = 0

2. Try to issue again (member 3)
   POST /api/issue?bookId=102&memberId=3
   Expected: ✅ "Added to queue. Position: 1"
   Verification: CircularQueue has 1 item

3. Another member reserves
   POST /api/reserve?bookId=102&memberId=4
   Expected: ✅ "Queue position: 2"

4. Member 1 returns book
   POST /api/return?bookId=102&memberId=1
   Expected: ✅ "Returned and auto-issued to Member 3"
   Verification: Member 3 now has book, queue size = 1

5. Check remaining reservations
   GET /api/reservations/102
   Expected: ✅ Only Member 4 in queue
```

#### Scenario 4: Data Structure Performance

**AVL Balance Verification:**
```
Add books with sequential IDs: 101, 102, 103... 110
Manually verify AVL tree remains balanced (height ≤ log₂(n) + 1)
Without AVL: BST would degenerate to linked list (height = 10)
With AVL: Height should be ~4
```

**HashMap Performance:**
```
Add 1000 members
Time member lookup: Should be O(1) regardless of member ID
Compare: Linear search would require avg 500 iterations
HashMap: 1-2 iterations (depending on collisions)
```

**Trie Autocomplete:**
```
Add 100 books
Search "Ha" → Returns all titles starting with "Ha"
Time: O(2 + k) where k = results
Compare to naive: O(100 × title_length)
```

### Edge Cases Handled

✅ **Empty inputs:** Validation in controller  
✅ **Duplicate emails/phones:** Check before registration  
✅ **Invalid phone format:** Regex validation `^[6-9]\d{9}$`  
✅ **Issue same book twice:** Check currentBorrowedBooks  
✅ **Return book not borrowed:** Validation check  
✅ **Queue full:** CircularQueue capacity check (20)  
✅ **Non-existent IDs:** Null checks, error messages  

---

## Future Enhancements

### Phase 1: Enhanced Features

**Authentication & Authorization:**
- JWT-based login system
- User roles: Admin, Librarian, Member
- Protected routes
- Session management

**Database Integration:**
- Replace in-memory structures with persistent storage
- Options: PostgreSQL, MongoDB
- Spring Data JPA integration
- Maintain custom DS for indexing/caching

**Advanced Search:**
- Full-text search (Elasticsearch)
- Multi-field filters
- Fuzzy matching
- Search history

### Phase 2: UI/UX Improvements

**Design:**
- Dark mode toggle
- Mobile-responsive design
- Progressive Web App (PWA)
- Offline support

**Features:**
- Real-time notifications (WebSocket)
- Email notifications for due dates
- SMS alerts for overdue
- Export reports (PDF, Excel)
- Print library card

### Phase 3: Analytics & Reporting

**Dashboards:**
- Interactive charts (Chart.js, Recharts)
- Borrowing trends over time
- Popular books/categories
- Member activity heatmap
- Revenue from fines

**AI/ML:**
- Book recommendation system
- Demand forecasting
- Auto-categorization using NLP

### Phase 4: Advanced Data Structures

**Additional DS:**
- B+ Tree for disk-based indexing
- Bloom Filter for existence checks
- Skip List for alternative to AVL
- Graph for "users who borrowed X also borrowed Y" recommendations

**Optimization:**
- Caching layer (Redis)
- Database query optimization
- Lazy loading
- Pagination for large datasets

### Phase 5: Modern Features

**Hardware Integration:**
- Barcode scanner support
- QR code generation for books
- RFID tag reading
- Self-checkout kiosks

**Digital Library:**
- E-book support
- PDF viewer integration
- DRM management
- Reading progress tracking

---

## Conclusion

### Project Achievements

✅ **Modern Full-Stack Application:** Production-grade web app with REST API  
✅ **7 Custom Data Structures:** All implemented from scratch in Java  
✅ **Optimal Performance:** O(1) hash lookups, O(log n) tree searches  
✅ **Real-World Application:** Actual library management functionality  
✅ **Professional UI:** Modern React interface with Tailwind CSS  
✅ **Production Deployment:** Live on Render + Vercel  
✅ **Complete Syllabus Coverage:** 100% of essential DS topics  
✅ **Scalable Architecture:** Clean separation of concerns  

### Learning Outcomes

**Technical Skills:**
1. **Data Structures:** Deep understanding of when and why to use each structure
2. **Spring Boot:** RESTful API development, dependency injection, service layer
3. **React:** Component-based UI, hooks, routing, state management
4. **Full-Stack Integration:** CORS, API design, client-server communication
5. **Deployment:** Cloud platforms (Render, Vercel), CI/CD concepts

**Software Engineering:**
- Clean code principles
- Modular architecture
- API design best practices
- Version control with Git
- Production deployment

### Key Takeaways

**Right Data Structure Matters:**
- CustomHashMap: Member lookup from O(n) to O(1)
- AVL Tree: Guaranteed O(log n) vs worst-case O(n) in BST
- MinHeap: Auto-sorted overdue books vs manual sort O(n log n)
- Trie: Autocomplete in O(p + k) vs naive O(n × m)
- CircularQueue: FIFO fairness with O(1) operations

**Integration Excellence:**
- Same book exists in 4 structures serving different purposes
- Synergy: Fast ID search (AVL) + Fast category filter (HashMap) + Smart autocomplete (Trie) + Primary storage (LinkedList)
- Each structure optimizes specific operations

**Modern Web vs Desktop:**
- Stateless REST API enables multiple clients
- React SPA provides smooth user experience
- Cloud deployment ensures 24/7 availability
- Modular architecture allows independent scaling

**Real-World Application:**
- Library context makes abstract DS concepts tangible
- Easy to explain and justify choices to non-technical users
- Practical experience beyond theoretical knowledge

---

## References & Resources

### Documentation

- **Spring Boot:** https://spring.io/projects/spring-boot
- **Spring Framework:** https://docs.spring.io/spring-framework/reference/
- **React:** https://react.dev/
- **Vite:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs

### Tools

- **Java SE 17:** https://docs.oracle.com/en/java/javase/17/
- **Maven:** https://maven.apache.org/guides/
- **Node.js:** https://nodejs.org/docs/
- **Git:** https://git-scm.com/doc

### Deployment

- **Render:** https://render.com/docs
- **Vercel:** https://vercel.com/docs

### Learning Resources

- **Data Structures:** Introduction to Algorithms (CLRS)
- **Spring Boot:** Spring Boot in Action
- **React:** Official React Tutorial
- **REST API:** RESTful Web Services

---

## Project Metadata

**Project Name:** LibMaster  
**Repository:** MohithGowda2807/LibMaster  
**Academic Year:** 2025-2026  
**Course:** Data Structures Laboratory  
**Institution:** [Your Institution]  
**Author:** Mohith Gowda  

**Statistics:**
- **Backend:** 17 Java files, ~2000 lines of code
- **Frontend:** 12 JSX files, ~1500 lines of code
- **Total:** ~3500 lines of code
- **Data Structures:** 7 custom implementations
- **API Endpoints:** 15+ REST endpoints
- **UI Pages:** 8 React pages

**Development Timeline:**
- Planning & Design: 1 week
- Backend Development: 2 weeks
- Frontend Development: 2 weeks
- Testing & Deployment: 1 week
- **Total:** ~6 weeks

---

## Appendix A: Quick Command Reference

### Backend

```bash
# Compile and run
./mvnw clean install
./mvnw spring-boot:run

# Build JAR
./mvnw clean package

# Run JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar

# Custom port
java -Dserver.port=9090 -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Deployment

```bash
# Vercel deployment
vercel --prod

# Check deployment
curl https://your-app.vercel.app
```

---

## Appendix B: API Response Examples

### GET /api/books

```json
[
  {
    "id": 101,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "totalCopies": 5,
    "availableCopies": 3,
    "timesIssued": 124
  },
  {
    "id": 102,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "Tech",
    "totalCopies": 3,
    "availableCopies": 2,
    "timesIssued": 45
  }
]
```

### GET /api/members/1/details

```json
{
  "member": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "registrationDate": "2026-01-15",
    "currentBorrowedBooks": [101, 105],
    "pendingFines": 25.50
  },
  "issuedBooks": [
    {
      "book": { "id": 101, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
      "issueDate": "2026-01-20",
      "dueDate": "2026-02-03",
      "isOverdue": false
    },
    {
      "book": { "id": 105, "title": "Data Structures", "author": "Lafore" },
      "issueDate": "2026-01-10",
      "dueDate": "2026-01-24",
      "isOverdue": true
    }
  ],
  "reservations": []
}
```

### GET /api/overdue

```json
[
  {
    "bookId": 105,
    "memberId": 1,
    "memberName": "John Doe",
    "bookTitle": "Data Structures",
    "daysOverdue": 18,
    "fine": 90.0
  },
  {
    "bookId": 103,
    "memberId": 5,
    "memberName": "Jane Smith",
    "bookTitle": "Python Basics",
    "daysOverdue": 5,
    "fine": 25.0
  }
]
```

---

**End of Documentation**

*This comprehensive document covers all aspects of the LibMaster Library Management System for academic reporting, presentations, and evaluation purposes.*

**Last Updated:** February 2026  
**Version:** 2.0  
**Format:** Markdown
