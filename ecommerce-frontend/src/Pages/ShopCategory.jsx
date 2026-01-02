import React, { useState, useEffect } from 'react'
import './CSS/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      console.log('Loading products for category:', props.category, 'from static data');
      try {
        console.log('Loading products from static data for category:', props.category);
        const module = await import('../Components/Assets/all_product');
        const allProducts = module.default;
        const filteredProducts = allProducts.filter(product => product.category === props.category);
        console.log('Found', filteredProducts.length, 'products in category from static data');
        setProducts(filteredProducts);
        console.log('Loaded', filteredProducts.length, 'products from static data for category:', props.category);
      } catch (error) {
        console.error('Error loading static products for category:', props.category, error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [props.category]);

  if (loading) {
    return <div className='shop-category'>Loading products...</div>;
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-product">
        {products.length > 0 ? (
          products.map((item) => {
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })
        ) : (
          <p>No products available in this category at the moment.</p>
        )}
      </div>
      {products.length > 0 && (
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      )}
    </div>
  )
}

export default ShopCategory