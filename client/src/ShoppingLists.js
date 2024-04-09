import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shoppingListData from './shoppingListData';

function MainPage() {
  const navigate = useNavigate();
  const [shoppingLists, setShoppingLists] = useState(shoppingListData);
  const [showRoleButtons, setShowRoleButtons] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newListName, setNewListName] = useState('');

  const [newItems, setNewItems] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('kg');
  const [newItemAmount, setNewItemAmount] = useState(1);


  const navigateToDetailsAsOwner = (listId) => navigate(`/shopping-list/${listId}`, { state: { isOwner: true } });
  const navigateToDetailsAsInvited = (listId) => navigate(`/shopping-list/${listId}`, { state: { isOwner: false } });

  const handleAddList = () => {
    
    if (!newListName.trim()) {
      alert("List name cannot be empty.");
      return;
    }
  
    const newList = {
      id: Date.now().toString(),
      name: newListName,
      items: newItems,
      users: newUsers,
    };
  
    setShoppingLists([...shoppingLists, newList]);
    setShowAddModal(false);
    setNewListName('');
    setNewItems([]);
    setNewUsers([]);
  };

  const handleDeleteList = (listId) => {
    if (window.confirm("Are you sure you want to delete this shopping list?")) {
      setShoppingLists(shoppingLists.filter(list => list.id !== listId));
    }
  };

  return (
    <div className="main-page">
      <h1>Main Page</h1>
      {shoppingLists.map((list) => (
        <div key={list.id} className="list-tile">
          {list.name}
          {/* Show "Select Role" and "Delete" buttons only if showRoleButtons is not set to this list's ID */}
          {showRoleButtons !== list.id && (
            <>
              <button onClick={() => setShowRoleButtons(list.id)}>Select Role</button>
              <button onClick={() => handleDeleteList(list.id)}>Delete</button>
            </>
          )}
          {/* When showRoleButtons is set to this list's ID, show "Owner", "Invited User", and "Cancel" */}
          {showRoleButtons === list.id && (
            <>
              <button onClick={() => navigateToDetailsAsOwner(list.id)}>Owner</button>
              <button onClick={() => navigateToDetailsAsInvited(list.id)}>Invited User</button>
              <button onClick={() => setShowRoleButtons(false)}>Cancel</button>
            </>
          )}
        </div>
      ))}
      <button onClick={() => setShowAddModal(true)}>Add New List</button>
      {showAddModal && (
        <div className="modal">
            <div className="modal-content">
            <h2>Add New Shopping List</h2>

            {/* List Name */}
            <div className="input-group">
                <label>List Name:</label>
                <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="List Name"
                />
            </div>

            {/* New Item Inputs */}
            <div className="input-group">
                <label>Item Name:</label>
                <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Item Name"
                />
            </div>

            <div className="input-group">
                <label>Unit:</label>
                <select value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)}>
                <option value="kg">kg</option>
                <option value="liters">liters</option>
                </select>
            </div>

            <div className="input-group">
                <label>Amount:</label>
                <input
                type="number"
                value={newItemAmount}
                onChange={(e) => setNewItemAmount(e.target.value)}
                placeholder="Amount"
                />
            </div>

            <button className="add-button" onClick={() => {
                setNewItems([...newItems, { id: Date.now().toString(), name: newItemName, unit: newItemUnit, amount: newItemAmount, bought: false }]);
                setNewItemName('');
                setNewItemUnit('kg');
                setNewItemAmount(1);
            }}>Add Item</button>

            {/* New User Input */}
            <div className="input-group">
                <label>User Name:</label>
                <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="User Name"
                />
            </div>

            <button className="invite-button" onClick={() => {
                setNewUsers([...newUsers, { id: `user${Date.now()}`, name: newUserName, isOwner: false }]);
                setNewUserName('');
            }}>Invite User</button>

            <div className="modal-actions">
                <button className="save-button" onClick={handleAddList}>Save List</button>
                <button className="cancel-button" onClick={() => {
                setShowAddModal(false);
                setNewItems([]);
                setNewUsers([]);
                }}>Cancel</button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
}

export default MainPage;
