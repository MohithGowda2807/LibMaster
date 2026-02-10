package com.library.model;

import java.time.LocalDateTime;
import java.util.Objects;

public class Reservation {
    private int bookId;
    private int memberId;
    private LocalDateTime reservationTime;

    public Reservation() {
    }

    public Reservation(int bookId, int memberId, LocalDateTime reservationTime) {
        this.bookId = bookId;
        this.memberId = memberId;
        this.reservationTime = reservationTime;
    }

    public int getBookId() { return bookId; }
    public void setBookId(int bookId) { this.bookId = bookId; }

    public int getMemberId() { return memberId; }
    public void setMemberId(int memberId) { this.memberId = memberId; }

    public LocalDateTime getReservationTime() { return reservationTime; }
    public void setReservationTime(LocalDateTime reservationTime) { this.reservationTime = reservationTime; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reservation that = (Reservation) o;
        return bookId == that.bookId && memberId == that.memberId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, memberId);
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "bookId=" + bookId +
                ", memberId=" + memberId +
                ", reservationTime=" + reservationTime +
                '}';
    }
}
