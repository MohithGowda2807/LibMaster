package com.library.ds;

/**
 * Circular Queue Implementation used for Book Reservations.
 */
public class CircularQueue<T> {

    private T[] queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;

    @SuppressWarnings("unchecked")
    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.queue = (T[]) new Object[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    public boolean isFull() {
        return size == capacity;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void enqueue(T item) {
        if (isFull()) {
            throw new RuntimeException("Queue is full");
        }
        rear = (rear + 1) % capacity;
        queue[rear] = item;
        size++;
    }

    public T dequeue() {
        if (isEmpty()) {
            return null; // Or throw
        }
        T item = queue[front];
        queue[front] = null; // Help GC
        front = (front + 1) % capacity;
        size--;
        return item;
    }

    public T peek() {
        if (isEmpty()) return null;
        return queue[front];
    }
    
    public int size() {
        return size;
    }
}
