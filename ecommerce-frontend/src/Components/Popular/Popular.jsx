import React, { useState, useEffect } from 'react'
import './Popular.css'
import { productAPI } from '../../services/api';
import Item from '../Item/Item'

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true);
      console.log('Loading new products from static data...');
      try {
        // Load only new collections for popular items
        const newCollectionsModule = await import('../../Components/Assets/new_collections');

        const newCollectionsProducts = newCollectionsModule.default;

        console.log('Static new collections loaded:', newCollectionsProducts.length);

        setProducts(newCollectionsProducts);
        console.log('Loaded', newCollectionsProducts.length, 'popular products from static data');
        if (newCollectionsProducts.length > 0) {
          console.log('First product:', newCollectionsProducts[0]);
          console.log('First product keys:', Object.keys(newCollectionsProducts[0]));
        }
      } catch (error) {
        console.error('Error loading static new products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  if (loading) {
    return <div className='popular'>Loading popular products...</div>;
  }

  return (
    <div className='popular'>
      <h1>POPULAR</h1>
      <hr />
      <div className="popular-item">
        {products.length > 0 ? (
          products.map((item) => {
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })
        ) : (
          <p>No popular products available at the moment.</p>
        )}
      </div>
    </div>
  )
}

export default Popular