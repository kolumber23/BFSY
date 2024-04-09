import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import shoppingListData from './shoppingListData';
import './ShoppingListDetail.css';

const ShoppingListDetail = () => {
    const navigate = useNavigate();
    const { listId } = useParams();
    const location = useLocation();
    const [list, setList] = useState(null); // mockListData reprezentuje počáteční stav nákupního
    const [editState, setEditState] = useState({}); // sleduje stav editace položek
    const [newUserName, setNewUserName] = useState('');
    const [isEditingListName, setIsEditingListName] = useState(false); // nový stav pro úpravu názvu seznamu

    useEffect(() => {
        const foundList = shoppingListData.find(list => list.id === listId);
        if (foundList) {
            setList({...foundList});
        } else {
            navigate('/');
        }
    }, [listId, navigate]);

    // Zjištění zda je uživatel vlastník nebo ne
    const [currentUser] = useState({
        id: "user2",
        isOwner: location.state ? location.state.isOwner : false,
    });
    
    // změny při inline úpravách
    const handleEditChange = (itemId, field, value) => {
        setEditState(prev => ({
            ...prev,
            [itemId]: { 
                ...(prev[itemId] || {}), 
                [field]: value 
            },
        }));
    };    

    const handleBoughtChange = (itemId) => {
        setList(prevList => ({
          ...prevList,
          items: prevList.items.map(item => 
            item.id === itemId ? { ...item, bought: !item.bought } : item
          ),
        }));
      };

    // uložení změn, ujištění, že název položky není prázdný
    const handleSaveItem = (itemId) => {
        const itemUpdates = editState[itemId];
        // Check if the name is not empty when attempting to save
        if (!itemUpdates.name || itemUpdates.name.trim() === "") {
            alert("Item name cannot be empty.");
            // Optional: Revert to original name if attempted to save as empty
            setEditState(prev => {
                const newState = { ...prev };
                // Remove the edit state for this item, reverting to original name if name was empty
                delete newState[itemId];
                return newState;
            });
        } else {
            setList(prev => ({
                ...prev,
                items: prev.items.map(item => item.id === itemId ? { ...item, ...itemUpdates } : item),
            }));
            setEditState(prev => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            });
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
        if (window.confirm("Are you sure you want to delete this list?")) {
            navigate('/');
        }
    };

    if (!list) {
        return <div>Loading...</div>;
    }

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
                            <input
                                type="checkbox"
                                checked={item.bought}
                                onChange={() => handleBoughtChange(item.id)}
                            />
                            {editState[item.id] ? (
                                <>
                                    <input
                                        value={editState[item.id].hasOwnProperty('name') ? editState[item.id].name : item.name}
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