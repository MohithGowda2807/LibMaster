package com.library.service;

import com.library.ds.*;
import com.library.model.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.time.LocalDate;

@Service
public class LibraryService {

    // 1. Primary Book Storage
    private CustomLinkedList<Book> books = new CustomLinkedList<>();

    // 2. Member Storage & Indexes
    private CustomHashMap<Integer, Member> members = new CustomHashMap<>();
    private CustomHashMap<String, CustomLinkedList<Book>> categoryIndex = new CustomHashMap<>();

    // 3. Search Indexes
    private AVLTree bookIndex = new AVLTree();
    private Trie titleTrie = new Trie();

    // 4. Queues & Heaps
    private MinHeap<OverdueRecord> fineQueue = new MinHeap<>(100);
    private CustomHashMap<Integer, CircularQueue<Reservation>> reservationsByBook = new CustomHashMap<>();
    private CustomStack<String> undoStack = new CustomStack<>(); // Storing action logs for now
    
    // 5. Issue Tracking
    private CustomLinkedList<IssueRecord> issueRecords = new CustomLinkedList<>();

    private int nextBookId = 101;
    private int nextMemberId = 1;

    public LibraryService() {
        // Seed some data
        addBook(new Book(0, "The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 5, 5, 0));
        addBook(new Book(0, "Clean Code", "Robert C. Martin", "Tech", 3, 3, 0));
        addBook(new Book(0, "Data Structures", "Robert Lafore", "Education", 2, 2, 0));
    }

    // --- Book Operations ---

    public Book addBook(Book book) {
        book.setId(nextBookId++);
        books.add(book);
        
        // Update Indexes
        bookIndex.insert(book.getId(), book);
        titleTrie.insert(book.getTitle(), book);
        
        // Category Index
        if (!categoryIndex.containsKey(book.getCategory())) {
            categoryIndex.put(book.getCategory(), new CustomLinkedList<>());
        }
        categoryIndex.get(book.getCategory()).add(book);
        
        return book;
    }

    public List<Book> getAllBooks() {
        return books.toList();
    }

    public Book getBookById(int id) {
        return bookIndex.search(id);
    }
    
    public List<Book> searchBooks(String query) {
        // Try exact ID match if numeric
        try {
            int id = Integer.parseInt(query);
            Book b = getBookById(id);
            if (b != null) return List.of(b);
        } catch (NumberFormatException ignored) {}

        // Try Trie prefix search
        return titleTrie.searchPrefix(query);
    }

    // --- Member Operations ---

    public Member registerMember(Member member) {
        member.setId(nextMemberId++);
        members.put(member.getId(), member);
        return member;
    }

    public Member getMember(int id) {
        return members.get(id);
    }
    
    public List<Member> getAllMembers() {
        return members.values();
    }

    // --- Circulation ---

    public String issueBook(int bookId, int memberId) {
        Book book = bookIndex.search(bookId);
        Member member = members.get(memberId);

        if (book == null) return "Book not found";
        if (member == null) return "Member not found";

        if (book.getAvailableCopies() > 0) {
            book.setAvailableCopies(book.getAvailableCopies() - 1);
            book.setTimesIssued(book.getTimesIssued() + 1);
            member.getCurrentBorrowedBooks().add(bookId);
            
            // Create issue record with 14-day due date
            LocalDate issueDate = LocalDate.now();
            LocalDate dueDate = issueDate.plusDays(14);
            IssueRecord record = new IssueRecord(bookId, memberId, issueDate, dueDate);
            issueRecords.add(record);
            
            undoStack.push("ISSUED: " + bookId + " to " + memberId);
            return "Book issued successfully. Due date: " + dueDate;
        } else {
            // Add to reservation queue for this specific book
            if (!reservationsByBook.containsKey(bookId)) {
                reservationsByBook.put(bookId, new CircularQueue<>(20));
            }
            
            try {
                CircularQueue<Reservation> queue = reservationsByBook.get(bookId);
                queue.enqueue(new Reservation(bookId, memberId, java.time.LocalDateTime.now()));
                return "Book unavailable. Added to reservation queue (Position: " + queue.size() + ")";
            } catch (Exception e) {
                return "Book unavailable and Reservation Queue is full.";
            }
        }
    }

    public String returnBook(int bookId, int memberId) {
        Book book = bookIndex.search(bookId);
        Member member = members.get(memberId);

        if (book == null || member == null) return "Invalid ID";

        if (member.getCurrentBorrowedBooks().contains(bookId)) {
            member.getCurrentBorrowedBooks().remove(Integer.valueOf(bookId));
            book.setAvailableCopies(book.getAvailableCopies() + 1);
            
            // Mark issue record as returned
            for (IssueRecord record : issueRecords.toList()) {
                if (record.getBookId() == bookId && record.getMemberId() == memberId && !record.isReturned()) {
                    record.setReturned(true);
                    break;
                }
            }
            
            // Check reservation queue and auto-assign to next person
            CircularQueue<Reservation> queue = reservationsByBook.get(bookId);
            if (queue != null && !queue.isEmpty()) {
                try {
                    Reservation next = queue.dequeue();
                    // Auto-issue to next person in queue
                    String result = issueBook(bookId, next.getMemberId());
                    return "Book returned and auto-issued to next reservation (Member " + next.getMemberId() + ")";
                } catch (Exception e) {
                    // Queue was empty, no action needed
                }
            }
            
            return "Book returned successfully";
        }
        return "Member does not have this book";
    }
    
    
    // --- Overdue & Fines Management ---
    
    public List<OverdueRecord> getOverdueBooks() {
        fineQueue = new MinHeap<>(100); // Reset heap
        LocalDate today = LocalDate.now();
        
        for (IssueRecord record : issueRecords.toList()) {
            if (!record.isReturned() && record.getDueDate().isBefore(today)) {
                long daysOverdue = java.time.temporal.ChronoUnit.DAYS.between(record.getDueDate(), today);
                double fine = daysOverdue * 5.0; // ₹5 per day
                
                Book book = bookIndex.search(record.getBookId());
                Member member = members.get(record.getMemberId());
                
                OverdueRecord overdueRecord = new OverdueRecord(
                    record.getBookId(),
                    record.getMemberId(),
                    member != null ? member.getName() : "Unknown",
                    book != null ? book.getTitle() : "Unknown",
                    (int) daysOverdue,
                    fine
                );
                fineQueue.insert(overdueRecord);
            }
        }
        
        // Extract all from heap (sorted by priority - highest fine first)
        List<OverdueRecord> result = new ArrayList<>();
        while (!fineQueue.isEmpty()) {
            result.add(fineQueue.extractMin());
        }
        return result;
    }
    
    // --- Reservation Management ---
    
    public String reserveBook(int bookId, int memberId) {
        Book book = bookIndex.search(bookId);
        if (book == null) return "Book not found";
        if (book.getAvailableCopies() > 0) return "Book is available, please issue directly";
        
        if (!reservationsByBook.containsKey(bookId)) {
            reservationsByBook.put(bookId, new CircularQueue<>(20));
        }
        
        try {
            CircularQueue<Reservation> queue = reservationsByBook.get(bookId);
            queue.enqueue(new Reservation(bookId, memberId, java.time.LocalDateTime.now()));
            return "Reserved successfully. Queue position: " + queue.size();
        } catch (Exception e) {
            return "Reservation queue is full for this book";
        }
    }
    
    public List<Reservation> getAllReservations() {
        List<Reservation> all = new ArrayList<>();
        for (Integer bookId : reservationsByBook.keySet()) {
            CircularQueue<Reservation> queue = reservationsByBook.get(bookId);
            // Extract and re-add to preserve queue
            List<Reservation> temp = new ArrayList<>();
            while (!queue.isEmpty()) {
                try {
                    Reservation r = queue.dequeue();
                    temp.add(r);
                } catch (Exception e) {
                    break;
                }
            }
            // Re-enqueue
            for (Reservation r : temp) {
                try {
                    queue.enqueue(r);
                    all.add(r);
                } catch (Exception ignored) {}
            }
        }
        return all;
    }
    
    public List<Reservation> getReservationsForBook(int bookId) {
        CircularQueue<Reservation> queue = reservationsByBook.get(bookId);
        if (queue == null) return new ArrayList<>();
        
        List<Reservation> result = new ArrayList<>();
        List<Reservation> temp = new ArrayList<>();
        
        while (!queue.isEmpty()) {
            try {
                Reservation r = queue.dequeue();
                temp.add(r);
            } catch (Exception e) {
                break;
            }
        }
        
        // Re-enqueue and return
        for (Reservation r : temp) {
            try {
                queue.enqueue(r);
                result.add(r);
            } catch (Exception ignored) {}
        }
        
        return result;
    }
    
    // --- Enhanced Member Details ---
    
    public HashMap<String, Object> getMemberDetails(int memberId) {
        Member member = members.get(memberId);
        if (member == null) return null;
        
        HashMap<String, Object> details = new HashMap<>();
        details.put("member", member);
        
        // Get issued books
        List<HashMap<String, Object>> issuedBooks = new ArrayList<>();
        for (IssueRecord record : issueRecords.toList()) {
            if (record.getMemberId() == memberId && !record.isReturned()) {
                Book book = bookIndex.search(record.getBookId());
                HashMap<String, Object> bookInfo = new HashMap<>();
                bookInfo.put("book", book);
                bookInfo.put("issueDate", record.getIssueDate());
                bookInfo.put("dueDate", record.getDueDate());
                bookInfo.put("isOverdue", record.getDueDate().isBefore(LocalDate.now()));
                issuedBooks.add(bookInfo);
            }
        }
        details.put("issuedBooks", issuedBooks);
        
        // Get reservations
        List<Reservation> memberReservations = new ArrayList<>();
        for (Reservation r : getAllReservations()) {
            if (r.getMemberId() == memberId) {
                memberReservations.add(r);
            }
        }
        details.put("reservations", memberReservations);
        
        return details;
    }
    
    // --- Utils ---
    
    public List<Book> getBooksByCategory(String category) {
        CustomLinkedList<Book> list = categoryIndex.get(category);
        return list != null ? list.toList() : new ArrayList<>();
    }
}
