const shoppingListData = [
  {
    id: "1",
    name: "Shopping List 1",
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
  }
];

export default shoppingListData;
