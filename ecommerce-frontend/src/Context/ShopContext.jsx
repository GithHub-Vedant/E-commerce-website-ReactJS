import React, { useState, createContext, useEffect } from 'react';
import { productAPI, cartAPI } from '../services/api';


const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [userId, setUserId] = useState(null);

  // Load products and user on app start
  useEffect(() => {
    console.log('Initializing ShopContext...');
    const initializeApp = async () => {
      await loadProducts();
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
        // Load cart from backend
        loadCartFromBackend(user.id);
      }
    };

    initializeApp();
  }, []);

  // Load products from static data
  const loadProducts = async () => {
    try {
      console.log('Loading products from static data...');
      const all_product_module = await import('../Components/Assets/all_product');
      const staticProducts = all_product_module.default;
      console.log('Static products loaded:', staticProducts.length);
      if (staticProducts && staticProducts.length > 0) {
        console.log('First static product:', staticProducts[0]);
        console.log('First static product keys:', Object.keys(staticProducts[0]));
      }
      setAllProduct(staticProducts);
      const newCart = {};
      staticProducts.forEach(product => {
        newCart[product.id] = [];
      });
      setCartItems(newCart);
      console.log('Loaded', staticProducts.length, 'products from static data');
    } catch (error) {
      console.error('Error loading static products:', error);
      setAllProduct([]);
      setCartItems({});
    }
  };

  // Function to get default cart based on loaded products
  const getDefualtCart = () => {
    const cart = {};
    all_product.forEach(product => {
      cart[product.id] = [];
    });
    return cart;
  };

  // Load cart from backend
  const loadCartFromBackend = async (userId) => {
    if (userId) {
      try {
        console.log('Loading cart for user ID:', userId);
        const response = await cartAPI.getCartItems(userId);
        console.log('Cart response status:', response.status);
        if (response.status === 200) {
          const backendCart = response.data;
          // Convert backend cart to frontend format
          const newCartItems = { ...cartItems };
          backendCart.forEach(item => {
            const productId = item.product.id;
            // Add items to cart based on quantity
            for (let i = 0; i < item.quantity; i++) {
              newCartItems[productId] = [...newCartItems[productId], null];
            }
          });
          setCartItems(newCartItems);
        }
      } catch (error) {
        console.error('Error loading cart from backend:', error);
        console.error('Cart API error details:', error.response || error.message || error);
      }
    }
  };

  // Function to restore cart when user logs in
  const restoreCart = (userId) => {
    setUserId(userId);
    loadCartFromBackend(userId);
  };

  const addToCart = async (itemId, size = null) => {
    // Update local state first
    setCartItems((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = [...newCart[itemId], size];
      return newCart;
    });

    if (userId) {
      try {
        // Add to backend
        const product = all_product.find(p => p.id === itemId);
        if (product) {
          const cartItem = {
            product: {
              id: product.id
            },
            quantity: 1,
            price: product.new_price
          };
          const response = await cartAPI.addToCart(cartItem);
          if (response.status !== 200) {
            console.error('Failed to add item to backend cart');
          }
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        console.error('Cart API error details:', error.response || error.message || error);
      }
    }
  }

  const removeFromCart = async (itemId, index = null) => {
    if (userId) {
      try {
        // Update local state first
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

        // In a complete implementation, we would call the backend API to remove the item
        // For now, we'll just update the local state
        // await cartAPI.removeFromCart(cartItemId, userId);
      } catch (error) {
        console.error('Error removing from cart:', error);
        // Fallback to local state update if backend call fails
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
    } else {
      // Fallback to local storage if not logged in
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
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] && cartItems[itemId].length > 0) {
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