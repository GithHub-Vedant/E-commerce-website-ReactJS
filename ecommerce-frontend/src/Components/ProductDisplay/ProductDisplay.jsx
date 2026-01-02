import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [notification, setNotification] = useState('');

  const handleAddToCart = () => {
    if (!selectedSize) {
      const message = 'Please select a size before adding to cart';
      setNotification(message);
      // Clear notification after 2 seconds for size selection warning
      setTimeout(() => {
        setNotification('');
      }, 2000);
      return;
    }

    addToCart(product.id, selectedSize);
    const message = `Added to cart: ${product.name} (Size: ${selectedSize})`;
    setNotification(message);

    // Clear notification after 2 seconds for successful add to cart
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <div className='productdisplay'>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div
              className={selectedSize === 'S' ? 'selected' : ''}
              onClick={() => setSelectedSize('S')}
            >
              S
            </div>
            <div
              className={selectedSize === 'M' ? 'selected' : ''}
              onClick={() => setSelectedSize('M')}
            >
              M
            </div>
            <div
              className={selectedSize === 'L' ? 'selected' : ''}
              onClick={() => setSelectedSize('L')}
            >
              L
            </div>
            <div
              className={selectedSize === 'XL' ? 'selected' : ''}
              onClick={() => setSelectedSize('XL')}
            >
              XL
            </div>
            <div
              className={selectedSize === 'XXL' ? 'selected' : ''}
              onClick={() => setSelectedSize('XXL')}
            >
              XXL
            </div>
          </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span>Women, T-Shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay