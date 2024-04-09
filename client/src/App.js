import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingListDetail from './ShoppingListDetail';
<<<<<<< HEAD
import ShoppingLists from './ShoppingLists';
=======
import MainPage from './MainPage';
>>>>>>> a25905efb48cb853c96cef88ba611aa7d288931a

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<ShoppingLists />} /> {/* Use as Home Page */}
=======
        <Route path="/" element={<MainPage />} /> {/* Use MainPage here */}
>>>>>>> a25905efb48cb853c96cef88ba611aa7d288931a
        <Route path="/shopping-list/:listId" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
