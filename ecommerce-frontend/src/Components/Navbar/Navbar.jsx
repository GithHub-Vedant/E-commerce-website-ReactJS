import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import user_icon from '../Assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getTotalCartItems, getDefualtCart } = useContext(ShopContext);
  const navigate = useNavigate();

  // Check if user is logged in by checking localStorage
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem('user');
    alert("You have been successfully logged out!");
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Extract display name from email (everything before @)
  const getUserDisplayName = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: '#646464' }} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none', color: '#646464' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none', color: '#646464' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none', color: '#646464' }} to='/kids'>Kid</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {user ? (
          <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
            <img src={user_icon} alt="User" className="user-icon-small" />
            {showUserMenu && (
              <div className="user-menu">
                <div className="user-name">{user.username || user.firstName || getUserDisplayName(user.email)}</div>
                <div className="user-email">{user.email}</div>
<<<<<<< HEAD:ecommerce-frontend/src/Components/Navbar/Navbar.jsx
                <button onClick={() => {
                  navigate('/orders');
                  setShowUserMenu(false); // Close menu after navigation
                }}>Your Orders</button>
=======
                <button onClick={() => alert('Orders page is not implemented yet.')}>Your Orders</button>
>>>>>>> 2b8f2241b992710c5bb4216a5de61551c4861df9:src/Components/Navbar/Navbar.jsx
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleLoginClick}>Login</button>
        )}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
