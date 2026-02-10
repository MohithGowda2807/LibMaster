package com.library.ds;

import java.util.ArrayList;
import java.util.List;

/**
 * Custom Hash Map Implementation.
 * Uses Separate Chaining for collision resolution with manual linked nodes.
 */
public class CustomHashMap<K, V> {

    private static class Entry<K, V> {
        K key;
        V value;
        Entry<K, V> next;

        Entry(K key, V value) {
            this.key = key;
            this.value = value;
            this.next = null;
        }
    }

    private Entry<K, V>[] table;
    private int capacity;
    private int size;

    @SuppressWarnings("unchecked")
    public CustomHashMap(int capacity) {
        this.capacity = capacity;
        this.table = new Entry[capacity];
        this.size = 0;
    }

    public CustomHashMap() {
        this(16); // Default capacity
    }

    private int hash(K key) {
        return Math.abs(key.hashCode()) % capacity;
    }

    public void put(K key, V value) {
        int index = hash(key);
        Entry<K, V> head = table[index];

        Entry<K, V> current = head;
        while (current != null) {
            if (current.key.equals(key)) {
                current.value = value; // Update existing
                return;
            }
            current = current.next;
        }

        // Add to front (simplest)
        Entry<K, V> newEntry = new Entry<>(key, value);
        newEntry.next = head;
        table[index] = newEntry;
        size++;
    }

    public V get(K key) {
        int index = hash(key);
        Entry<K, V> current = table[index];

        while (current != null) {
            if (current.key.equals(key)) {
                return current.value;
            }
            current = current.next;
        }
        return null; // Not found
    }

    public boolean containsKey(K key) {
        return get(key) != null;
    }

    public void remove(K key) {
        int index = hash(key);
        Entry<K, V> current = table[index];
        Entry<K, V> prev = null;

        while (current != null) {
            if (current.key.equals(key)) {
                if (prev == null) {
                    // Removing head
                    table[index] = current.next;
                } else {
                    prev.next = current.next;
                }
                size--;
                return;
            }
            prev = current;
            current = current.next;
        }
    }
    
    
    // Returns a list of all values (Still using ArrayList for return type ease, or could use CustomLinkedList)
    public List<V> values() {
        List<V> values = new ArrayList<>();
        for (int i = 0; i < capacity; i++) {
            Entry<K, V> current = table[i];
            while (current != null) {
                values.add(current.value);
                current = current.next;
            }
        }
        return values;
    }
    
    // Returns a list of all keys
    public List<K> keySet() {
        List<K> keys = new ArrayList<>();
        for (int i = 0; i < capacity; i++) {
            Entry<K, V> current = table[i];
            while (current != null) {
                keys.add(current.key);
                current = current.next;
            }
        }
        return keys;
    }

    public int size() {
        return size;
    }
}
