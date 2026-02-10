package com.library.model;

import java.time.LocalDate;
import java.util.Objects;

public class IssueRecord {
    private int bookId;
    private int memberId;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private boolean returned;

    public IssueRecord() {
    }

    public IssueRecord(int bookId, int memberId, LocalDate issueDate, LocalDate dueDate) {
        this.bookId = bookId;
        this.memberId = memberId;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.returned = false;
    }

    public int getBookId() { return bookId; }
    public void setBookId(int bookId) { this.bookId = bookId; }

    public int getMemberId() { return memberId; }
    public void setMemberId(int memberId) { this.memberId = memberId; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public boolean isReturned() { return returned; }
    public void setReturned(boolean returned) { this.returned = returned; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IssueRecord that = (IssueRecord) o;
        return bookId == that.bookId && memberId == that.memberId && Objects.equals(issueDate, that.issueDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, memberId, issueDate);
    }

    @Override
    public String toString() {
        return "IssueRecord{" +
                "bookId=" + bookId +
                ", memberId=" + memberId +
                ", issueDate=" + issueDate +
                ", dueDate=" + dueDate +
                ", returned=" + returned +
                '}';
    }
}
