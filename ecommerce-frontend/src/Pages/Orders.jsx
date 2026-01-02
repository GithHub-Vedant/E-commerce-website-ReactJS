import React, { useState, useEffect } from 'react';
import './CSS/Checkout.css'; // Using same CSS as checkout for consistency
import { orderAPI } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      const user = JSON.parse(userString);
      const response = await orderAPI.getUserOrders(user.id);

      if (response.status === 200) {
        setOrders(response.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error fetching orders: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your orders...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="checkout">
      <div className="checkout-left">
        <h1>Your Orders</h1>

        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="order-status">
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                  <p className="order-total">Total: ${order.totalPrice?.toFixed(2)}</p>
                </div>

                <div className="order-details">
                  <h4>Shipping Address:</h4>
                  <p>{order.shippingAddress}</p>

                  <h4>Billing Address:</h4>
                  <p>{order.billingAddress}</p>

                  <h4>Order Items:</h4>
                  <div className="order-items-list">
                    {order.orderItems?.map((item, index) => (
                      <div key={index} className="order-item-detail">
                        <p>Product ID: {item.product?.id}</p>
                        <p>Name: {item.product?.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price?.toFixed(2)}</p>
                        <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;