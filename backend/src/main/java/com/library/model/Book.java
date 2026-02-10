package com.library.model;

import java.util.Objects;

public class Book {
    private int id;
    private String title;
    private String author;
    private String category;
    private int totalCopies;
    private int availableCopies;
    private int timesIssued;

    public Book() {
    }

    public Book(int id, String title, String author, String category, int totalCopies, int availableCopies, int timesIssued) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.totalCopies = totalCopies;
        this.availableCopies = availableCopies;
        this.timesIssued = timesIssued;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getTotalCopies() { return totalCopies; }
    public void setTotalCopies(int totalCopies) { this.totalCopies = totalCopies; }

    public int getAvailableCopies() { return availableCopies; }
    public void setAvailableCopies(int availableCopies) { this.availableCopies = availableCopies; }

    public int getTimesIssued() { return timesIssued; }
    public void setTimesIssued(int timesIssued) { this.timesIssued = timesIssued; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return id == book.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                '}';
    }

    // Custom deep copy constructor if needed, or manual copying
    public Book(Book other) {
        this.id = other.id;
        this.title = other.title;
        this.author = other.author;
        this.category = other.category;
        this.totalCopies = other.totalCopies;
        this.availableCopies = other.availableCopies;
        this.timesIssued = other.timesIssued;
    }
}
