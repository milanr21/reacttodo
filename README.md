# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Installation Setup

Follow these steps to set up the project locally:

### 1. Create a New Vite + React + TypeScript Project

Run the following command to create a new project with Vite, React, and TypeScript:

```bash
npm create vite@latest reacttodo --template react-ts
cd reacttodo
```

### 2. Install Dependencies

npm install @reduxjs/toolkit react-redux @dnd-kit/core @dnd-kit/sortable @material/tooltip lucide-react react-router-dom react-toastify dayjs

### 3. Run the Server

npm run dev

### 4. Build the App for Production

Build the app for Production

### 5. Deploy in Vercel

# React Todo App

This is a Todo application built using **Vite**, **React**, **TypeScript**, and **Redux Toolkit** for state management. It allows users to manage their todos with functionalities such as adding, editing, toggling completion status, searching, and persisting todos across browser sessions using **localStorage**.

## Features

- **Todo List Management**: Display a list of todos with details such as title, description, created date, end date, and completion status.

- **Add, Edit, and View Todos**: Easily add new todos, edit existing ones, and view todo details.

- **Toggle Todo Status**: Toggle todos between "Completed" or "Not Completed".

- **Search Todos**: Search for specific todos by title or description.

- **Date Formatting**: Dates (created and end date) are formatted using **dayjs**.

- **Responsive UI**: Built with **Lucide icons** and Material Tooltips for an enhanced user experience.

- **Persistence**: Todos are stored in **localStorage**, making them persistent across browser refreshes or restarts.
