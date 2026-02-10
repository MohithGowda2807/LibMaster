package com.library.ds;

import com.library.model.Book;

/**
 * AVL Tree Implementation for Book storage.
 * Keys are Book IDs (int).
 */
public class AVLTree {

    private class Node {
        int key; // Book ID
        Book value;
        int height;
        Node left, right;

        Node(int key, Book value) {
            this.key = key;
            this.value = value;
            this.height = 1;
        }
    }

    private Node root;

    private int height(Node N) {
        if (N == null) return 0;
        return N.height;
    }

    private int max(int a, int b) {
        return (a > b) ? a : b;
    }

    // Right Rotation
    private Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = max(height(y.left), height(y.right)) + 1;
        x.height = max(height(x.left), height(x.right)) + 1;

        return x;
    }

    // Left Rotation
    private Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = max(height(x.left), height(x.right)) + 1;
        y.height = max(height(y.left), height(y.right)) + 1;

        return y;
    }

    private int getBalance(Node N) {
        if (N == null) return 0;
        return height(N.left) - height(N.right);
    }

    public void insert(int key, Book value) {
        root = insert(root, key, value);
    }

    private Node insert(Node node, int key, Book value) {
        // 1. Normal BST insertion
        if (node == null)
            return (new Node(key, value));

        if (key < node.key)
            node.left = insert(node.left, key, value);
        else if (key > node.key)
            node.right = insert(node.right, key, value);
        else
            return node; // Duplicate keys not allowed

        // 2. Update height of this ancestor node
        node.height = 1 + max(height(node.left), height(node.right));

        // 3. Get the balance factor
        int balance = getBalance(node);

        // 4. If unbalanced, then there are 4 cases

        // Left Left Case
        if (balance > 1 && key < node.left.key)
            return rightRotate(node);

        // Right Right Case
        if (balance < -1 && key > node.right.key)
            return leftRotate(node);

        // Left Right Case
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        return node;
    }

    public Book search(int key) {
        Node current = root;
        while (current != null) {
            if (key == current.key)
                return current.value;
            else if (key < current.key)
                current = current.left;
            else
                current = current.right;
        }
        return null;
    }

    // In-order traversal helper
    public void inorderTraversal(Node node, java.util.List<Book> result) {
        if (node != null) {
            inorderTraversal(node.left, result);
            result.add(node.value);
            inorderTraversal(node.right, result);
        }
    }

    public Node getRoot() {
        return root;
    }
}
