import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import user_icon from '../Assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { logout } from '../../firebase'
import { getDefualtCart } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getTotalCartItems, saveAndClearCart, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      saveAndClearCart(auth.currentUser.uid);
    } else {
      // Just in case there's no current user, still clear the display
      setCartItems(getDefualtCart());
    }
    logout();
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
                <div className="user-name">{getUserDisplayName(user.email)}</div>
                <div className="user-email">{user.email}</div>
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