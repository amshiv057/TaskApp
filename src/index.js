import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import path
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./components/context/ContextProvider";

// Correct usage of createRoot
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

root.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);


