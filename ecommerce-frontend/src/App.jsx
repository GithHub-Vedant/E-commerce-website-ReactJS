import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Checkout from './Pages/Checkout';
import PaymentSuccess from './Pages/PaymentSuccess';
<<<<<<< HEAD:ecommerce-frontend/src/App.jsx
import Orders from './Pages/Orders';
=======
>>>>>>> 2b8f2241b992710c5bb4216a5de61551c4861df9:src/App.jsx
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
<<<<<<< HEAD:ecommerce-frontend/src/App.jsx
          <Route path='/orders' element={<Orders />} />
=======
>>>>>>> 2b8f2241b992710c5bb4216a5de61551c4861df9:src/App.jsx
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
