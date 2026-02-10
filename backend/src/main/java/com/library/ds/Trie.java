package com.library.ds;

import com.library.model.Book;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Trie Implementation for Book Title Autocomplete.
 */
public class Trie {

    private class TrieNode {
        Map<Character, TrieNode> children;
        boolean isEndOfWord;
        Book book; // Store book reference at leaf for quick access

        TrieNode() {
            children = new HashMap<>(); // Using HashMap for children is standard, or could use array[256]
            isEndOfWord = false;
        }
    }

    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    // Insert title
    public void insert(String title, Book book) {
        TrieNode current = root;
        String lowerTitle = title.toLowerCase(); // Normalized

        for (int i = 0; i < lowerTitle.length(); i++) {
            char ch = lowerTitle.charAt(i);
            current = current.children.computeIfAbsent(ch, c -> new TrieNode());
        }
        current.isEndOfWord = true;
        current.book = book;
    }

    // Search for prefix and return suggestions
    public List<Book> searchPrefix(String prefix) {
        List<Book> results = new ArrayList<>();
        TrieNode current = root;
        String lowerPrefix = prefix.toLowerCase();

        for (int i = 0; i < lowerPrefix.length(); i++) {
            char ch = lowerPrefix.charAt(i);
            TrieNode node = current.children.get(ch);
            if (node == null) {
                return results; // No match
            }
            current = node;
        }

        // Collect all books from this node downwards
        findAllBooks(current, results);
        return results;
    }

    private void findAllBooks(TrieNode node, List<Book> results) {
        if (node.isEndOfWord) {
            results.add(node.book);
        }

        for (TrieNode child : node.children.values()) {
            findAllBooks(child, results);
        }
    }
}
