import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingListDetail.css';

const mockListData = {
    id: "1",
    name: "Weekly Groceries",
    items: [
        { id: "item1", name: "Apples", unit: "kg", amount: 2, bought: false },
        { id: "item2", name: "Milk", unit: "liters", amount: 1, bought: true },
        { id: "item3", name: "Pepsi Max", unit: "liters", amount: 8, bought: true },
    ],
    users: [
        { id: "user1", name: "Alice", isOwner: true },
        { id: "user2", name: "Bob", isOwner: false },
        { id: "user3", name: "Mark", isOwner: false },
    ]
};

const ShoppingListDetail = () => {
    const navigate = useNavigate();
    const [list, setList] = useState(mockListData); // mockListData reprezentuje počáteční stav nákupního
    const [editState, setEditState] = useState({}); // sleduje stav editace položek
    const [currentUser] = useState({ id: "user2", isOwner: true }); // uživatel - autorizace podle isOwner true/false
    const [newUserName, setNewUserName] = useState('');
    const [isEditingListName, setIsEditingListName] = useState(false); // nový stav pro úpravu názvu seznamu


    // změny při inline úpravách
    const handleEditChange = (itemId, field, value) => {
        setEditState(prev => ({
            ...prev,
            [itemId]: { ...(prev[itemId] || {}), [field]: value },
        }));
    };

    // uložení změn, ujištění, že název položky není prázdný
    const handleSaveItem = (itemId) => {
        const itemUpdates = editState[itemId];
        if (itemUpdates.name && itemUpdates.name.trim() !== "") {
            setList(prev => ({
                ...prev,
                items: prev.items.map(item => item.id === itemId ? { ...item, ...itemUpdates } : item),
            }));
            setEditState(prev => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            });
        } else {
            alert("Item name cannot be empty."); // informování uživatele
        }
    };

    // přidání nové položky
    const handleAddItem = () => {
        const newItem = { id: Date.now().toString(), name: '', unit: 'kg', amount: 1, bought: false };
        setList(prev => ({
            ...prev,
            items: [...prev.items, newItem],
        }));
        // automaticky zpřistupní edit mode pro přidání nové položky
        setEditState(prev => ({ ...prev, [newItem.id]: newItem }));
    };

    // smazání položky
    const handleDeleteItem = (itemId) => {
        setList(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== itemId),
        }));
    };

    // smazání uivatele (vlastník múže kohokoliv kromě sebe, pozvaný uživatel může pouze sebe viz struktura routy)
    const handleRemoveUser = (userId) => {
        if (currentUser.isOwner || (!currentUser.isOwner && currentUser.id === userId)) {
            setList(prev => ({
                ...prev,
                users: prev.users.filter(user => user.id !== userId),
            }));
            if (!currentUser.isOwner && currentUser.id === userId) {
                navigate('/'); 
            }
        }
    };    

    const handleAddUser = () => {
        if (newUserName.trim() !== "" && currentUser.isOwner) {
            const newUser = { id: `user${Date.now()}`, name: newUserName, isOwner: false };
            setList(prev => ({
                ...prev,
                users: [...prev.users, newUser]
            }));
            setNewUserName('');
        }
    };

    const handleListNameChange = (e) => {
        setList(prev => ({ ...prev, name: e.target.value }));
    };
    
    const toggleListNameEdit = () => {
        setIsEditingListName(!isEditingListName);
    };

        // funkce pro "smazání" mock listu
    const handleDeleteList = () => {
        setList(null); 
        navigate('/');
    };

    return (
        <div className="shopping-list-detail">
      <button onClick={() => navigate('/')}>X</button>
      {isEditingListName ? (
        <>
          <input
            value={list.name}
            onChange={handleListNameChange}
            autoFocus
          />
          <button onClick={toggleListNameEdit}>Save</button>
        </>
      ) : (
        <>
                <h1>{list.name}</h1>
                {currentUser.isOwner && <>
                    <button onClick={toggleListNameEdit}>Edit Name</button>
                    <button onClick={handleDeleteList} className="delete-list-button">Delete List</button>
                </>}
            </>
      )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Items Section */}
                <div className="items-section">
                    <h2>Items</h2>
                    {list.items.map(item => (
                        <div key={item.id}>
                            {editState[item.id] ? (
                                <>
                                    <input
                                        value={editState[item.id].name || item.name}
                                        onChange={(e) => handleEditChange(item.id, 'name', e.target.value)}
                                        placeholder="Item Name"
                                    />
                                    <select
                                        value={editState[item.id].unit || item.unit}
                                        onChange={(e) => handleEditChange(item.id, 'unit', e.target.value)}
                                    >
                                        <option value="kg">kg</option>
                                        <option value="liters">liters</option>
                                    </select>
                                    <input
                                        type="number"
                                        value={editState[item.id].amount || item.amount}
                                        onChange={(e) => handleEditChange(item.id, 'amount', Number(e.target.value))}
                                    />
                                    <button onClick={() => handleSaveItem(item.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    {`${item.name}, ${item.unit} : ${item.amount}`}
                                    <button onClick={() => setEditState({ [item.id]: item })}>Edit</button>
                                </>
                            )}
                            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={handleAddItem}>Add Item</button>
                </div>

                {/* Users Section */}
                <div className="users-section">
                    <h2>Users</h2>
                    {list.users.map(user => (
                        <div key={user.id}>
                            {user.name} {user.isOwner && <span>(owner)</span>}
                            {!user.isOwner && (currentUser.isOwner || currentUser.id === user.id) && (
                                <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
                            )}
                        </div>
                    ))}
                    {currentUser.isOwner && (
                        <>
                            <input
                                type="text"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                placeholder="Add new user"
                            />
                            <button onClick={handleAddUser}>Add User</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingListDetail;