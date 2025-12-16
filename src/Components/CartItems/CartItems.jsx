import React, { useContext, useEffect, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const CartItems = () => {

  const { getTotalCartAmount, all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const calculateShippingFee = (subtotal) => {
    return subtotal >= 1000 ? 0 : 100;
  };

  const calculateTotal = (subtotal) => {
    const shippingFee = calculateShippingFee(subtotal);
    return subtotal + shippingFee;
  };

  const subtotal = getTotalCartAmount();
  const shippingFee = calculateShippingFee(subtotal);
  const total = calculateTotal(subtotal);

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item) => {
        if (cartItems[item.id].length > 0) {
          // Group items by size
          const sizeCounts = {};
          cartItems[item.id].forEach(size => {
            sizeCounts[size] = (sizeCounts[size] || 0) + 1;
          });

          // Render each size group
          return Object.entries(sizeCounts).map(([size, count], index) => (
            <div key={`${item.id}-${size}-${index}`}>
              <div className="cartitems-format cartitems-format-main">
                <img src={item.image} alt="" className="carticon-product-icon" />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <p>{size || 'Not Selected'}</p>
                <div className="cartitems-quantity-controls">
                  <button onClick={() => {
                    // Remove one item of this size
                    const itemIndex = cartItems[item.id].indexOf(size);
                    if (itemIndex !== -1) {
                      removeFromCart(item.id, itemIndex);
                    }
                  }}>-</button>
                  <button className='cartitems-quantity'>{count}</button>
                  <button onClick={() => addToCart(item.id, size)}>+</button>
                </div>
                <p>${(item.new_price * count).toFixed(2)}</p>
                <img
                  className='cartitems-remove-icon'
                  src={remove_icon}
                  onClick={() => {
                    // Remove all items of this size
                    const indicesToRemove = [];
                    cartItems[item.id].forEach((itemSize, idx) => {
                      if (itemSize === size) {
                        indicesToRemove.push(idx);
                      }
                    });
                    // Remove from highest index to lowest to avoid index shifting issues
                    indicesToRemove.reverse().forEach(idx => {
                      removeFromCart(item.id, idx);
                    });
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          ));
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>${shippingFee === 0 ? 'Free' : shippingFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${total.toFixed(2)}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>{user ? 'PROCEED TO CHECKOUT' : 'LOGIN TO CHECKOUT'}</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems