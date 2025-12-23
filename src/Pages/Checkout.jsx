import React, { useContext, useState, useEffect } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import creditCardLogo from '../Components/Assets/atm-card.png';
import paypalLogo from '../Components/Assets/online-payment.png';
import bankTransferLogo from '../Components/Assets/bank_tranfer.png';

const Checkout = () => {
  const { all_product, cartItems, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [country, setCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  // Get user info when component mounts
  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Pre-fill email from user profile
        setEmail(user.email || '');

        // Try to fetch user's name from Firestore
        try {
          const q = query(collection(db, 'user'), where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setFullName(userData.name || '');
          }
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const calculateShippingFee = (subtotal) => {
    // Free shipping for orders >= $1000, otherwise $50
    return subtotal >= 1000 ? 0 : 50;
  };

  const calculateGST = (subtotal) => {
    // Fixed GST of $15 as per requirement
    return 15;
  };

  const calculateTotal = (subtotal) => {
    const shippingFee = calculateShippingFee(subtotal);
    const gst = calculateGST(subtotal);
    const discountedSubtotal = subtotal - discount;
    return discountedSubtotal + shippingFee + gst;
  };

  const subtotal = getTotalCartAmount();
  const shippingFee = calculateShippingFee(subtotal);
  const gst = calculateGST(subtotal);
  const total = calculateTotal(subtotal);

  const handleApplyPromoCode = () => {
    // Simple promo code validation - in a real app, this would be more complex
    if (promoCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      alert('Promo code applied! 10% discount added.');
    } else if (promoCode === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      alert('Promo code applied! 20% discount added.');
    } else {
      setDiscount(0);
      alert('Invalid promo code.');
    }
  };

  const handlePayment = (paymentMethod) => {
    console.log('Payment method clicked:', paymentMethod);

    // Collect billing info to pass to payment page
    const billingInfo = {
      fullName,
      email,
      phone,
      country,
      state: selectedState,
      city: selectedCity
    };

    console.log('Navigating to payment page with billing info:', billingInfo);

    // Check if required fields are filled
    if (!fullName || !email || !phone || !country || !selectedState || !selectedCity) {
      alert('Please fill in all required billing information before proceeding to payment.');
      return;
    }

    // Prepare order data
    const orderData = {
      orderId: Math.floor(Math.random() * 100000),
      date: new Date().toLocaleDateString(),
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      shippingFee: shippingFee,
      gst: gst,
      discount: discount,
      total: total,
      items: []
    };

    // Process cart items
    all_product.forEach((item) => {
      if (cartItems[item.id].length > 0) {
        // Group items by size
        const sizeCounts = {};
        cartItems[item.id].forEach(size => {
          sizeCounts[size] = (sizeCounts[size] || 0) + 1;
        });

        // Add each size group to order data
        Object.entries(sizeCounts).forEach(([size, count]) => {
          orderData.items.push({
            id: item.id,
            name: item.name,
            image: item.image,
            size: size || 'Not Selected',
            quantity: count,
            price: item.new_price,
            subtotal: (item.new_price * count)
          });
        });
      }
    });

    // Show processing animation
    setIsProcessing(true);
    setProcessingMessage(`${paymentMethod} processing...`);

    // Simulate 2-second payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to payment success page with order data
      navigate('/payment-success', { state: { orderData } });
    }, 2000);
  };
  return (
    <div className='checkout'>
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-modal">
            <div className="spinner"></div>
            <p>{processingMessage}</p>
          </div>
        </div>
      )}
      <h1>Checkout</h1>

      <div className="checkout-container">        <div className="checkout-left">
        <h2>Billing Details</h2>
        <div className="billing-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select Country</option>
                <option value="afghanistan">Afghanistan</option>
                <option value="albania">Albania</option>
                <option value="algeria">Algeria</option>
                <option value="argentina">Argentina</option>
                <option value="australia">Australia</option>
                <option value="austria">Austria</option>
                <option value="bangladesh">Bangladesh</option>
                <option value="belgium">Belgium</option>
                <option value="brazil">Brazil</option>
                <option value="bulgaria">Bulgaria</option>
                <option value="canada">Canada</option>
                <option value="chile">Chile</option>
                <option value="china">China</option>
                <option value="colombia">Colombia</option>
                <option value="costa rica">Costa Rica</option>
                <option value="croatia">Croatia</option>
                <option value="cyprus">Cyprus</option>
                <option value="czech republic">Czech Republic</option>
                <option value="denmark">Denmark</option>
                <option value="dominican republic">Dominican Republic</option>
                <option value="egypt">Egypt</option>
                <option value="estonia">Estonia</option>
                <option value="finland">Finland</option>
                <option value="france">France</option>
                <option value="germany">Germany</option>
                <option value="greece">Greece</option>
                <option value="guatemala">Guatemala</option>
                <option value="honduras">Honduras</option>
                <option value="hungary">Hungary</option>
                <option value="iceland">Iceland</option>
                <option value="india">India</option>
                <option value="indonesia">Indonesia</option>
                <option value="ireland">Ireland</option>
                <option value="israel">Israel</option>
                <option value="italy">Italy</option>
                <option value="jamaica">Jamaica</option>
                <option value="japan">Japan</option>
                <option value="jordan">Jordan</option>
                <option value="kenya">Kenya</option>
                <option value="kuwait">Kuwait</option>
                <option value="latvia">Latvia</option>
                <option value="lebanon">Lebanon</option>
                <option value="liechtenstein">Liechtenstein</option>
                <option value="lithuania">Lithuania</option>
                <option value="luxembourg">Luxembourg</option>
                <option value="malaysia">Malaysia</option>
                <option value="malta">Malta</option>
                <option value="mexico">Mexico</option>
                <option value="monaco">Monaco</option>
                <option value="morocco">Morocco</option>
                <option value="netherlands">Netherlands</option>
                <option value="new zealand">New Zealand</option>
                <option value="nicaragua">Nicaragua</option>
                <option value="norway">Norway</option>
                <option value="pakistan">Pakistan</option>
                <option value="panama">Panama</option>
                <option value="paraguay">Paraguay</option>
                <option value="peru">Peru</option>
                <option value="philippines">Philippines</option>
                <option value="poland">Poland</option>
                <option value="portugal">Portugal</option>
                <option value="puerto rico">Puerto Rico</option>
                <option value="romania">Romania</option>
                <option value="russia">Russia</option>
                <option value="saudi arabia">Saudi Arabia</option>
                <option value="serbia">Serbia</option>
                <option value="singapore">Singapore</option>
                <option value="slovakia">Slovakia</option>
                <option value="slovenia">Slovenia</option>
                <option value="south africa">South Africa</option>
                <option value="south korea">South Korea</option>
                <option value="spain">Spain</option>
                <option value="sweden">Sweden</option>
                <option value="switzerland">Switzerland</option>
                <option value="taiwan">Taiwan</option>
                <option value="thailand">Thailand</option>
                <option value="turkey">Turkey</option>
                <option value="ukraine">Ukraine</option>
                <option value="united arab emirates">United Arab Emirates</option>
                <option value="united kingdom">United Kingdom</option>
                <option value="united states">United States</option>
                <option value="uruguay">Uruguay</option>
                <option value="venezuela">Venezuela</option>
                <option value="vietnam">Vietnam</option>
              </select>
            </div>

            <div className="form-group">
              <label>State/Province</label>
              <input
                type="text"
                placeholder="Enter state/province"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input type="text" placeholder="Enter postal code" />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea placeholder="Enter street address"></textarea>
          </div>
        </div>

        <h2>Payment Method</h2>
        <div className="payment-methods">
          <button onClick={() => handlePayment('Credit Card')}>
            <img src={creditCardLogo} alt="Credit Card" className="payment-logo" />
            Credit Card
          </button>
          <button onClick={() => handlePayment('PayPal')}>
            <img src={paypalLogo} alt="PayPal" className="payment-logo" />
            PayPal
          </button>
          <button onClick={() => handlePayment('Bank Transfer')}>
            <img src={bankTransferLogo} alt="Bank Transfer" className="payment-logo" />
            Bank Transfer
          </button>
        </div>
      </div>

        <div className="checkout-right">
          <h2>Your Order</h2>
          <div className="order-summary">
            <div className="order-items">
              {all_product.map((item) => {
                if (cartItems[item.id].length > 0) {
                  // Group items by size
                  const sizeCounts = {};
                  cartItems[item.id].forEach(size => {
                    sizeCounts[size] = (sizeCounts[size] || 0) + 1;
                  });

                  // Render each size group
                  return Object.entries(sizeCounts).map(([size, count], index) => (
                    <div className="order-item" key={`${item.id}-${size}-${index}`}>
                      <div className="item-info">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <p>{item.name}</p>
                          <p>Size: {size || 'Not Selected'}</p>
                          <p>Quantity: {count}</p>
                        </div>
                      </div>
                      <div className="item-price">${(item.new_price * count).toFixed(2)}</div>
                    </div>
                  ));
                }
                return null;
              })}
            </div>

            <div className="order-totals">
              <div className="order-total-item">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>

              <div className="order-total-item">
                <p>Shipping Fee</p>
                <p>${shippingFee === 0 ? 'Free' : shippingFee.toFixed(2)}</p>
              </div>

              <div className="order-total-item">
                <p>GST</p>
                <p>${gst.toFixed(2)}</p>
              </div>

              {discount > 0 && (
                <div className="order-total-item discount">
                  <p>Promo Code Discount</p>
                  <p>-${discount.toFixed(2)}</p>
                </div>
              )}

              <div className="order-total-item grand-total">
                <h3>Total</h3>
                <h3>${total.toFixed(2)}</h3>
              </div>
            </div>

            <div className="promo-code-section">
              <h3>Apply Promo Code</h3>
              <div className="promo-input">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={handleApplyPromoCode}>Apply</button>
              </div>
              <p>Try SAVE10 for 10% off or SAVE20 for 20% off</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
