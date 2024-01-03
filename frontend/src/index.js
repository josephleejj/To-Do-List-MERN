import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToDoContextProvider } from './contexts/ToDoContext';
import { AuthContextProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToDoContextProvider>
        <App />
      </ToDoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


