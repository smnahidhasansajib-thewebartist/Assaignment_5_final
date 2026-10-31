# Dev Stack

A calm, curated starting point for choosing the tools behind my next web project. Explore modern technologies, compare the basics, and collect a stack that feels right for the way you build.

## Built With

- React and JavaScript (ES6+)
- Vite
- CSS
- React ToastifyS
- Lucide React
- JSON technology catalog

## Features

- Browse and search a responsive catalog of 12 web technologies, with category filters and ratings.
- Build a personal stack with duplicate protection, individual removal, a clear-all action, and toast feedback.
- Enjoy a responsive layout with a sticky navigation bar, mobile menu, loading state, and curated project guide.

## React Basics

### 1. What is JSX, and why is it used in React?
JSX lets us write UI markup alongside JavaScript. React turns it into the elements shown in the browser.

### 2. What is the difference between props and state?
Props are values a parent gives a component. State is data a component keeps and can update over time.

### 3. What does the `useState` hook do, and where did you use it in this project?
`useState` stores changing data in a function component. This project uses it for the technology list, loading status, search and filter controls, mobile menu, and selected stack.

### 4. What does the `useEffect` hook do, and why did you need it to load the JSON data?
`useEffect` runs side effects after a component renders. It fetches the separate technology JSON file when the app loads and updates the loading state when the request finishes.

### 5. Why does every item in a `.map()` list need a unique `key` prop?
A stable key helps React identify which list items changed, were added, or were removed, so it can update the right elements efficiently.

### 6. What is conditional rendering? Show one place you used it (example: the empty stack message).
Conditional rendering shows different UI for different states. The stack panel shows its empty message when there are no selected technologies and a list when the stack has items.

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
A parent passes data through props. To send an action back, the parent can pass a callback as a prop, which the child calls. Here, `TechnologyCard` receives a technology and `onAdd` callback from `App`.

## Run Locally

```bash
npm install
npm run dev
```
