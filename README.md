# E-Commerce Website

A modern, responsive e-commerce website built with React and Vite. This single-page application provides a complete shopping experience with product browsing, cart management, user authentication, and secure checkout functionality.


## Table of Contents

- [Project Overview](#project-overview)
- [Business Problem](#business-problem)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Research Questions and Key Findings](#research-questions-and-key-findings)
- [Screenshots](#screenshots)
- [How to Run the Project](#how-to-run-the-project)
- [Customization](#customization)
  

## Project Overview

This is a fully functional e-commerce website built with React and Vite. The application provides a complete shopping experience including product browsing, cart management, user authentication, and checkout functionality. The responsive design ensures optimal viewing experience across all devices.

The e-commerce platform includes essential sections:
- Hero section with featured products and promotions
- Product catalog with category filtering
- Detailed product pages with images and descriptions
- Shopping cart with quantity adjustment
- User authentication (login/signup)
- Secure checkout process with billing information
- Responsive design for all screen sizes
  

## Business Problem

Traditional e-commerce platforms often suffer from:
- Slow loading times affecting user experience
- Complex navigation making it difficult for customers to find products
- Poor mobile responsiveness leading to lost sales
- Complicated checkout processes increasing cart abandonment rates

This project addresses these issues by providing:
- A ready-to-use, responsive e-commerce template
- Fast loading times with Vite build optimizations
- Intuitive navigation and user-friendly interface
- Streamlined checkout process
- Mobile-first responsive design
  

## Technologies Used

- **React 19**: For building the user interface with component-based architecture
- **Vite**: Ultra-fast build tool and development server
- **React Router DOM v7**: For client-side routing
- **Firebase**: For user authentication and data storage
- **JavaScript (ES6+)**: Modern JavaScript features for clean, efficient code
- **CSS3**: For styling and responsive design
- **HTML5**: Semantic markup structure

Development tools:
- ESLint: Code quality and consistency
- npm: Package management
  

## Project Structure

```
e-commerce-website/
├── src/
│   ├── Components/
│   │   ├── Assets/
│   │   ├── Breadcrum/
│   │   ├── CartItems/
│   │   ├── DescriptionBox/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Item/
│   │   ├── Navbar/
│   │   ├── NewCollections/
│   │   ├── NewsLetter/
│   │   ├── Offers/
│   │   ├── Popular/
│   │   ├── ProductDisplay/
│   │   └── RelatedProducts/
│   ├── Context/
│   ├── Pages/
│   │   ├── CSS/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── LoginSignup.jsx
│   │   ├── PaymentSuccess.jsx
│   │   ├── Product.jsx
│   │   ├── Shop.jsx
│   │   └── ShopCategory.jsx
│   ├── App.jsx
│   ├── firebase.js
│   └── main.jsx
├── public/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── package.json
└── vite.config.js
```


## Key Features

1. **User Authentication**: Secure login and signup functionality with Firebase
2. **Product Management**: Category-based product browsing and detailed product pages
3. **Shopping Cart**: Add/remove products with quantity adjustment and real-time price calculation
4. **Checkout Process**: Multi-step checkout with billing information and payment options
5. **Responsive Design**: Mobile-first approach that works on all device sizes
6. **Performance Optimized**: Fast loading times with Vite build tool
7. **Easy Customization**: Data-driven approach for content updates
8. **Cross-browser Compatibility**: Works on all modern browsers
9. **Dynamic Shipping Calculation**: Free shipping for orders $1000 or greater, $50 fixed fee for orders under $1000
10. **Fixed GST**: $15 GST applied to all orders regardless of amount


## Research Questions and Key Findings

**Q: Why use React for an e-commerce website?**
A: React provides component reusability, efficient rendering, and a rich ecosystem of libraries. For e-commerce, this translates to maintainable code, smooth user interactions, and better performance.

**Q: How does Vite improve the development experience?**
A: Vite offers instant server start, lightning-fast HMR (Hot Module Replacement), and optimized builds. This significantly reduces development time and improves productivity for e-commerce projects.

**Q: What makes this e-commerce site responsive?**
A: The site uses CSS media queries, flexible grids, and scalable units (%, em, rem) to adapt to different screen sizes. All components are tested on various devices to ensure optimal display.

**Q: How does the shipping calculation work?**
A: The site implements a dynamic shipping calculation system where orders $1000 or greater qualify for free shipping, while orders under $1000 have a fixed $50 shipping fee. This encourages larger purchases while covering shipping costs for smaller orders.

**Q: What is the GST policy?**
A: A fixed $15 GST is applied to all orders regardless of the order amount, providing a simple and transparent tax structure for customers.


## Screenshots

Below are screenshots of the e-commerce website showing different sections and responsive views:

Homepage:

![Homepage](Screenshot/homepage.png)

Product Page:

![Product Page](Screenshot/product-page.png)

Shopping Cart:

![Shopping Cart](Screenshot/categories1.png)

User Authentication:

![Login](Screenshot/login.png)

Checkout Process:

![Checkout](Screenshot/checkout.png)

Related Products:

![Related Products](Screenshot/payment.png)

Categories:

![Categories](Screenshot/payment1.png)


## How to Run the Project

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Firebase account for authentication

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd react-vtech-ecommerce
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a Firebase project:
   - Go to the Firebase Console
   - Create a new project
   - Enable Authentication and Firestore

5. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Firebase configuration values

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the project for production
- `npm run preview`: Previews the production build locally
- `npm run lint`: Runs ESLint to check for code issues


## Customization

To customize this e-commerce website for your own use:

1. **Update Product Information**:
   - Edit the content in `src/Components/Assets/all_product.js` and `src/Components/Assets/data.js`
   - Replace images in the `src/Components/Assets/` folder with your own

2. **Modify Categories**:
   - Update category data in `src/Components/Assets/data.js`
   - Modify navigation links in `src/Components/Navbar/Navbar.jsx`

3. **Configure Firebase**:
   - Copy the `.env.example` file to `.env` and add your Firebase configuration values
   - Update Firebase settings in `src/firebase.js`

4. **Styling**:
   - Modify CSS files in each component folder to change colors, fonts, spacing
   - Global styles can be adjusted in `src/App.css` and `src/index.css`

5. **Payment Methods**:
   - Add new payment logos to `src/Components/Assets/`
   - Update payment options in `src/Pages/Checkout.jsx`

-------------------------------------------------------------------------------

© 2025 Vedant Ligade. All rights reserved
