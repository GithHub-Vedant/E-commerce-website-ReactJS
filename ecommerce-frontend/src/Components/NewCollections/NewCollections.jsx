import React, { useState, useEffect } from 'react'
import './NewCollections.css'
import { productAPI } from '../../services/api';
import Item from '../Item/Item'

const NewCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true);
      console.log('Loading new collections from static data...');
      try {
        // Load only new collections data for new collections section
        const newCollectionsModule = await import('../../Components/Assets/new_collections');

        const newCollectionsProducts = newCollectionsModule.default;

        console.log('Static new collections loaded:', newCollectionsProducts.length);

        setProducts(newCollectionsProducts);
        console.log('Loaded', newCollectionsProducts.length, 'new collections from static data');
        if (newCollectionsProducts.length > 0) {
          console.log('First collection:', newCollectionsProducts[0]);
          console.log('First collection keys:', Object.keys(newCollectionsProducts[0]));
        }
      } catch (error) {
        console.error('Error loading static new collections:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  if (loading) {
    return <div className='new-collections'>Loading new collections...</div>;
  }

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {products.length > 0 ? (
          products.map((item) => {
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })
        ) : (
          <p>No new collections available at the moment.</p>
        )}
      </div>
    </div>
  )
}

export default NewCollections