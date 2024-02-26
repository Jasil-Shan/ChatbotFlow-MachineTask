# Chatbot Flow Builder

This project is a simple Chatbot flow builder implemented using React, Tailwind CSS and React Flow library with TypeScript. It allows users to create chatbot flows by connecting multiple messages together to decide the order of execution.

## Live Link : https://chatbot-reactflow.netlify.app/


## Usage

1. Drag and drop text nodes from the Nodes Panel onto the flow builder canvas.
2. Connect nodes together using edges to establish flow logic.
3. Edit the text of a selected text node in the Settings Panel.
4. Save the flow using the Save button.

## Features

1. **Text Node**
   - Supports adding multiple text nodes to the flow.
   - Nodes are draggable and droppable onto the flow builder canvas.

2. **Nodes Panel**
   - Houses all types of nodes supported by the flow builder.
   - Designed to be extensible for adding more types of nodes in the future.

3. **Edge**
   - Connects two nodes together to establish flow logic.

4. **Source Handle**
   - Origin of a connecting edge.
   - Only allows one edge to originate from a source handle.

5. **Target Handle**
   - Destination of a connecting edge.
   - Allows multiple edges to connect to a target handle.

6. **Settings Panel**
   - Replaces the Nodes Panel when a node is selected.
   - Allows editing the text of the selected text node.

7. **Save Button**
   - Saves the current flow.
   - Shows an error if there are more than one node and more than one node has empty target handles.

## Libraries Used

- React: JavaScript library for building user interfaces.
- React Flow: Library for building flowcharts and node-based graphs.
- TypeScript: Superset of JavaScript that adds static typing to the language.
- Tailwind CSS: Utility-first CSS framework for styling.
- React Hot Toast: Library for displaying toasts in React applications.







### Thank You for Exploring my Project 