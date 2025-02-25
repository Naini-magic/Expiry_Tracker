import { createContext, useContext, useState } from "react";

// Create Context
const ItemContext = createContext();

// Provider Component
export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Function to add new item
  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <ItemContext.Provider value={{ items, addItem }}>
      {children}
    </ItemContext.Provider>
  );
};

// Custom Hook for using the context
export const useItems = () => useContext(ItemContext);
