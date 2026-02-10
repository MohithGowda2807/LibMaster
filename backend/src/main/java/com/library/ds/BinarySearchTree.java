package com.library.ds;

import com.library.model.Book;
import java.util.ArrayList;
import java.util.List;

/**
 * Standard Binary Search Tree Implementation.
 * Used for redundant search or demonstration.
 */
public class BinarySearchTree {

    private class Node {
        int key; // Book ID
        Book value;
        Node left, right;

        Node(int key, Book value) {
            this.key = key;
            this.value = value;
        }
    }

    private Node root;

    public void insert(int key, Book value) {
        root = insertRec(root, key, value);
    }

    private Node insertRec(Node root, int key, Book value) {
        if (root == null) {
            root = new Node(key, value);
            return root;
        }

        if (key < root.key)
            root.left = insertRec(root.left, key, value);
        else if (key > root.key)
            root.right = insertRec(root.right, key, value);

        return root;
    }

    public Book search(int key) {
        return searchRec(root, key);
    }

    private Book searchRec(Node root, int key) {
        if (root == null || root.key == key) {
            return (root != null) ? root.value : null;
        }

        if (root.key > key)
            return searchRec(root.left, key);

        return searchRec(root.right, key);
    }

    public void delete(int key) {
        root = deleteRec(root, key);
    }

    private Node deleteRec(Node root, int key) {
        if (root == null) return root;

        if (key < root.key)
            root.left = deleteRec(root.left, key);
        else if (key > root.key)
            root.right = deleteRec(root.right, key);
        else {
            // Node with only one child or no child
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;

            // Node with two children: Get the inorder successor (smallest in the right subtree)
            root.key = minValue(root.right);

            // Delete the inorder successor
            root.right = deleteRec(root.right, root.key);
        }

        return root;
    }

    private int minValue(Node root) {
        int minv = root.key;
        while (root.left != null) {
            minv = root.left.key;
            root = root.left;
        }
        return minv;
    }
    
    public List<Book> inorder() {
        List<Book> list = new ArrayList<>();
        inorderRec(root, list);
        return list;
    }
    
    private void inorderRec(Node root, List<Book> list) {
        if (root != null) {
            inorderRec(root.left, list);
            list.add(root.value);
            inorderRec(root.right, list);
        }
    }
}
