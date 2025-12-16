import React, { useState, createContext, useEffect } from 'react';
import all_product from '../Components/Assets/all_product';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const ShopContext = createContext(null);

export const getDefualtCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = [];
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefualtCart());
  const [userCarts, setUserCarts] = useState({});

  // Handle user authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in - restore their cart if it exists
        if (userCarts[user.uid]) {
          setCartItems(userCarts[user.uid]);
        }
      } else {
        // User logged out - clear the cart display
        setCartItems(getDefualtCart());
      }
    });

    return () => unsubscribe();
  }, [userCarts]);

  // Function to save cart when user logs out
  const saveAndClearCart = (userId) => {
    if (userId) {
      setUserCarts(prev => ({
        ...prev,
        [userId]: cartItems
      }));
    }
    setCartItems(getDefualtCart());
  };

  // Function to restore cart when user logs in
  const restoreCart = (userId) => {
    if (userCarts[userId]) {
      setCartItems(userCarts[userId]);
    } else {
      setCartItems(getDefualtCart());
    }
  };

  const addToCart = (itemId, size = null) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      // Add a new item with the selected size
      newCart[itemId] = [...newCart[itemId], size];
      return newCart;
    });
  }

  const removeFromCart = (itemId, index = null) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (index !== null) {
        // Remove specific item by index
        newCart[itemId] = newCart[itemId].filter((_, i) => i !== index);
      } else {
        // Remove last item
        newCart[itemId] = newCart[itemId].slice(0, -1);
      }
      return newCart;
    });
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId].length > 0) {
        const itemInfo = all_product.find(
          product => product.id === Number(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId].length;
        }
      }
    }

    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;

    for (const itemId in cartItems) {
      totalItem += cartItems[itemId].length;
    }

    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    saveAndClearCart,
    restoreCart,
    setCartItems,
    getDefualtCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export { ShopContext };

export default ShopContextProvider;