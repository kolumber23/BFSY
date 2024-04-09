import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingListDetail from './ShoppingListDetail';
import ShoppingLists from './ShoppingLists';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingLists />} /> {/* Use as Home Page */}
        <Route path="/shopping-list/:listId" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
