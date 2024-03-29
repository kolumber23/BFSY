// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingListDetail from './ShoppingListDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Main Page</div>} />
        <Route path="/shopping-list/:listId" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
