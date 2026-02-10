package com.library.controller;

import com.library.model.Book;
import com.library.model.Member;
import com.library.model.OverdueRecord;
import com.library.model.Reservation;
import com.library.ds.CustomHashMap;
import com.library.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    // --- Book Endpoints ---

    @PostMapping("/books")
    public Book addBook(@RequestBody Book book) {
        return libraryService.addBook(book);
    }

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return libraryService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    public Book getBook(@PathVariable int id) {
        return libraryService.getBookById(id);
    }

    @GetMapping("/books/search")
    public List<Book> searchBooks(@RequestParam String q) {
        return libraryService.searchBooks(q);
    }
    
    @GetMapping("/books/category/{category}")
    public List<Book> getBooksByCategory(@PathVariable String category) {
        return libraryService.getBooksByCategory(category);
    }

    // --- Member Endpoints ---

    @PostMapping("/members")
    public Member registerMember(@RequestBody Member member) {
        return libraryService.registerMember(member);
    }

    @GetMapping("/members")
    public List<Member> getAllMembers() {
        return libraryService.getAllMembers();
    }

    @GetMapping("/members/{id}")
    public Member getMember(@PathVariable int id) {
        return libraryService.getMember(id);
    }

    // --- Circulation Endpoints ---

    @PostMapping("/issue")
    public String issueBook(@RequestParam int bookId, @RequestParam int memberId) {
        return libraryService.issueBook(bookId, memberId);
    }

    @PostMapping("/return")
    public String returnBook(@RequestParam int bookId, @RequestParam int memberId) {
        return libraryService.returnBook(bookId, memberId);
    }
    
    // --- Overdue & Fines Endpoints ---
    
    @GetMapping("/overdue")
    public List<OverdueRecord> getOverdueBooks() {
        return libraryService.getOverdueBooks();
    }
    
    // --- Reservation Endpoints ---
    
    @PostMapping("/reserve")
    public String reserveBook(@RequestParam int bookId, @RequestParam int memberId) {
        return libraryService.reserveBook(bookId, memberId);
    }
    
    @GetMapping("/reservations")
    public List<Reservation> getAllReservations() {
        return libraryService.getAllReservations();
    }
    
    @GetMapping("/reservations/{bookId}")
    public List<Reservation> getReservationsForBook(@PathVariable int bookId) {
        return libraryService.getReservationsForBook(bookId);
    }
    
    // --- Enhanced Member Details ---
    
    @GetMapping("/members/{id}/details")
    public Map<String, Object> getMemberDetails(@PathVariable int id) {
        return libraryService.getMemberDetails(id);
    }
}
