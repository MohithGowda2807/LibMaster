package com.library.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Member {
    private int id;
    private String name;
    private String email;
    private String phone;
    private LocalDate registrationDate;
    private List<Integer> currentBorrowedBooks = new ArrayList<>(); // Store Book IDs
    private double pendingFines;

    public Member() {
    }

    public Member(int id, String name, String email, String phone, LocalDate registrationDate, List<Integer> currentBorrowedBooks, double pendingFines) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.registrationDate = registrationDate;
        this.currentBorrowedBooks = currentBorrowedBooks;
        this.pendingFines = pendingFines;
    }

    public Member(int id, String name, String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.registrationDate = LocalDate.now();
        this.currentBorrowedBooks = new ArrayList<>();
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) {
        if (phone == null || !phone.matches("^[6-9]\\d{9}$")) {
            throw new IllegalArgumentException("Invalid Indian mobile number");
        }
        this.phone = phone;
    }

    public LocalDate getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDate registrationDate) { this.registrationDate = registrationDate; }

    public List<Integer> getCurrentBorrowedBooks() { return currentBorrowedBooks; }
    public void setCurrentBorrowedBooks(List<Integer> currentBorrowedBooks) { this.currentBorrowedBooks = currentBorrowedBooks; }

    public double getPendingFines() { return pendingFines; }
    public void setPendingFines(double pendingFines) { this.pendingFines = pendingFines; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return id == member.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
