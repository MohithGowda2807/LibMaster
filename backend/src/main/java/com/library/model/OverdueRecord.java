package com.library.model;

import java.util.Objects;

public class OverdueRecord implements Comparable<OverdueRecord> {
    private int bookId;
    private int memberId;
    private String memberName;
    private String bookTitle;
    private int daysOverdue;
    private double fineAmount;

    public OverdueRecord() {
    }

    public OverdueRecord(int bookId, int memberId, String memberName, String bookTitle, int daysOverdue, double fineAmount) {
        this.bookId = bookId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.bookTitle = bookTitle;
        this.daysOverdue = daysOverdue;
        this.fineAmount = fineAmount;
    }

    public int getBookId() { return bookId; }
    public void setBookId(int bookId) { this.bookId = bookId; }

    public int getMemberId() { return memberId; }
    public void setMemberId(int memberId) { this.memberId = memberId; }

    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }

    public String getBookTitle() { return bookTitle; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }

    public int getDaysOverdue() { return daysOverdue; }
    public void setDaysOverdue(int daysOverdue) { this.daysOverdue = daysOverdue; }

    public double getFineAmount() { return fineAmount; }
    public void setFineAmount(double fineAmount) { this.fineAmount = fineAmount; }

    @Override
    public int compareTo(OverdueRecord other) {
        // Descending order of days overdue
        return Integer.compare(other.daysOverdue, this.daysOverdue);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OverdueRecord that = (OverdueRecord) o;
        return bookId == that.bookId && memberId == that.memberId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, memberId);
    }

    @Override
    public String toString() {
        return "OverdueRecord{" +
                "bookId=" + bookId +
                ", memberId=" + memberId +
                ", daysOverdue=" + daysOverdue +
                ", fineAmount=" + fineAmount +
                '}';
    }
}
