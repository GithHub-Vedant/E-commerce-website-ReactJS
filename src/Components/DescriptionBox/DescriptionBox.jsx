import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigation">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>An e-commerce website is an online platform that facilitates the buying and selling of product or service over the internet. it server as a virtual marketplace where businesses and individuals can showcase their product, interact with customer, and conduct transaction without the need for a physical presence. E-commerce website have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
        <p>E-commerce website typically display product or services along with detailed description, image, price and any available variation(e.g., sizes, colors).Each product usually has its own dedicated page with relevant information.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
