package com.library.ds;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Min-Heap Implementation for Priority Queue.
 * Stores objects that implement Comparable (or uses a custom comparator).
 * Primarily used for Managing Fines (Overdue books).
 */
public class MinHeap<T extends Comparable<T>> {

    private T[] heap;
    private int size;
    private int capacity;

    @SuppressWarnings("unchecked")
    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = (T[]) new Comparable[capacity];
    }

    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return (2 * i) + 1; }
    private int rightChild(int i) { return (2 * i) + 2; }

    private void swap(int i, int j) {
        T temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }

    public void insert(T key) {
        if (size == capacity) {
            // Resize logic could go here, but for now throwing exception or resizing
            resize();
        }

        size++;
        int i = size - 1;
        heap[i] = key;

        while (i != 0 && heap[parent(i)].compareTo(heap[i]) > 0) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    @SuppressWarnings("unchecked")
    private void resize() {
        capacity *= 2;
        heap = Arrays.copyOf(heap, capacity);
    }

    public T extractMin() {
        if (size <= 0) return null;
        if (size == 1) {
            size--;
            return heap[0];
        }

        T root = heap[0];
        heap[0] = heap[size - 1];
        size--;
        minHeapify(0);

        return root;
    }

    private void minHeapify(int i) {
        int l = leftChild(i);
        int r = rightChild(i);
        int smallest = i;

        if (l < size && heap[l].compareTo(heap[i]) < 0)
            smallest = l;
        if (r < size && heap[r].compareTo(heap[smallest]) < 0)
            smallest = r;

        if (smallest != i) {
            swap(i, smallest);
            minHeapify(smallest);
        }
    }
    
    public T peek() {
        if (size <= 0) return null;
        return heap[0];
    }
    
    public boolean isEmpty() {
        return size == 0;
    }
    
    public java.util.List<T> toList() {
        java.util.List<T> list = new ArrayList<>();
        // Note: internal array order is not sorted, but heap structure.
        // For a sorted list, we would need to clone and extractMin until empty.
        // Here we just return elements.
        for(int i=0; i<size; i++) {
            list.add(heap[i]);
        }
        return list;
    }
}
