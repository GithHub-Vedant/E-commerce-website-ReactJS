import React from 'react';
import './CSS/PaymentSuccess.css';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const { orderData } = location.state || {};

  // If no order data, generate fallback data
  const orderId = orderData?.orderId || Math.floor(Math.random() * 100000);
  const currentDate = orderData?.date || new Date().toLocaleDateString();
  const paymentMethod = orderData?.paymentMethod || 'Unknown';
  const subtotal = orderData?.subtotal || 0;
  const shippingFee = orderData?.shippingFee !== undefined ? orderData.shippingFee : (subtotal >= 1000 ? 0 : 50); // Conditional shipping logic
  const gst = orderData?.gst || 15; // Fixed GST
  const discount = orderData?.discount || 0;
  const total = orderData?.total || 0;
  const items = orderData?.items || [];

  return (
    <div className="payment-success-page">
      <div className="payment-success-container">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        <h1>Payment Successful!</h1>
        <p className="success-message">Thank you for your purchase. Your order has been confirmed.</p>

        <div className="order-details">
          <h2>Order Summary</h2>
          <div className="order-info">
            <p><span>Order ID:</span> {orderId}</p>
            <p><span>Date:</span> {currentDate}</p>
            <p><span>Payment Method:</span> {paymentMethod}</p>
            <p><span>Status:</span> <span className="confirmed-status">Confirmed</span></p>
          </div>
        </div>

        <div className="order-items">
          <h2>Order Items</h2>
          <div className="items-list">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div className="order-item" key={`${item.productId || item.id}-${index}`}>
                  <div className="item-info">
                    <div>
                      <p className="item-name">Product ID: {item.productId || item.id}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
        </div>

        <div className="order-totals">
          <div className="totals-info">
            <p><span>Subtotal:</span> ${subtotal.toFixed(2)}</p>
            <p><span>Shipping:</span> ${shippingFee === 0 ? 'Free' : '$' + shippingFee.toFixed(2)}</p>
            <p><span>GST:</span> ${gst.toFixed(2)}</p>
            {discount > 0 && (
              <p><span>Discount:</span> -${discount.toFixed(2)}</p>
            )}
            <p className="grand-total"><span>Total:</span> ${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="next-steps">
          <h2>Next Steps</h2>
          <ul>
            <li>You will receive an email confirmation shortly</li>
            <li>We'll notify you when your order ships</li>
            <li>You can track your order status in your account</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/" className="btn continue-shopping">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn view-orders">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;