import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingListDetail from './ShoppingListDetail';
import MainPage from './MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* Use MainPage here */}
        <Route path="/shopping-list/:listId" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
