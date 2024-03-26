import React, { useState } from 'react';

// Mock data for the shopping list
const shoppingListData = {
  id: "list1",
  name: "Weekly Groceries",
  items: [
    { id: "item1", name: "Apples", unit: "kg", amount: 2, bought: false },
    { id: "item2", name: "Milk", unit: "liters", amount: 1, bought: true },
    { id: "item3", name: "Bread", unit: "loaf", amount: 1, bought: false },
    // Add more items as needed
  ],
  users: [
    { id: "user1", name: "Alice", isOwner: true },
    { id: "user2", name: "Bob", isOwner: false },
    { id: "user3", name: "Charlie", isOwner: false },
    // Add more users as needed
  ],
};

// Assume this is the ID of the current user viewing the list
const currentUserID = "user1"; // Change as needed to simulate different users

function ShoppingListDetail() {
  const [showAllItems, setShowAllItems] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const list = shoppingListData; // Use mock data
  const isOwner = list.users.some(user => user.id === currentUserID && user.isOwner);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => alert('Return to main page')}>X</button>
      <h1>{list.name}</h1>
      {isOwner && <button onClick={() => alert('Edit list name')}>Edit Name</button>}
      <div>
        <h2>Items</h2>
        {(showAllItems ? list.items : list.items.slice(0, 3)).map(item => (
          <div key={item.id}>
            {item.name}, {item.unit}, {item.amount}, <input type="checkbox" checked={item.bought} readOnly />
            <button onClick={() => alert('Edit item')}>Edit</button>
          </div>
        ))}
        <button onClick={() => setShowAllItems(!showAllItems)}>See all</button>
      </div>

      <div>
        <h2>Users</h2>
        {(showAllUsers ? list.users : list.users.slice(0, 3)).map(user => (
          <div key={user.id}>
            {user.name} {user.isOwner && <span style={{ opacity: 0.5 }}>(owner)</span>}
            {currentUserID === user.id && <button onClick={() => alert('Leave list')}>Leave</button>}
          </div>
        ))}
        <button onClick={() => setShowAllUsers(!showAllUsers)}>See all</button>
        {isOwner && <button onClick={() => alert('Manage users')}>Manage Users</button>}
      </div>
      
      {isOwner && <button onClick={() => alert('Delete list')}>Delete List</button>}
    </div>
  );
}

export default ShoppingListDetail;
