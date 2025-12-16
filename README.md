# E-Commerce Website with React + Vite

![E-Commerce Demo](Screenshot/homepage.png)

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

## Business Problem

Traditional e-commerce platforms often suffer from:
- Slow loading times affecting user experience
- Complex navigation making it difficult for customers to find products
- Poor mobile responsiveness leading to lost sales
- Complicated checkout processes increasing cart abandonment rates

This project addresses these issues by providing a fast, intuitive, and responsive shopping experience.

## Technologies Used

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Styling**: CSS3 with Flexbox and Grid
- **Development Tools**: ESLint, GitHub

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
│   │   ├── LoginSignup.jsx
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

### User Authentication
- Secure login and signup functionality
- Password validation and error handling
- Persistent user sessions

### Product Management
- Category-based product browsing
- Product search and filtering
- Detailed product pages with images

### Shopping Cart
- Add/remove products with quantity adjustment
- Size selection for clothing items
- Real-time price calculation
- Shipping fee calculation (free for orders over $1000)

### Checkout Process
- Multi-step checkout with billing information
- Country/state/city selection with validation
- Multiple payment options (Credit Card, PayPal, Bank Transfer)
- Order summary with promo code support

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly navigation

## Research Questions and Key Findings

### Performance Optimization
**Question**: How can we optimize loading times for better user experience?
**Finding**: Using Vite as the build tool significantly reduces bundle size and improves hot module replacement, resulting in faster development and production builds.

### User Experience
**Question**: What navigation patterns work best for e-commerce sites?
**Finding**: Implementing clear category navigation, breadcrumb trails, and related product suggestions increases user engagement and conversion rates.

### Security
**Question**: How to securely manage API keys and user data?
**Finding**: Storing sensitive credentials in environment variables and using Firebase Authentication provides robust security without exposing keys in the codebase.

## Screenshots

### Homepage
![Homepage](Screenshot/homepage.png)
*Main landing page showcasing featured products and promotions*

### Product Page
![Product Page](Screenshot/product-page.png)
*Detailed product view with size selection and add-to-cart functionality*

### Shopping Cart
![Shopping Cart](Screenshot/categories1.png)
*Cart management with quantity adjustment and price calculation*

### User Authentication
![Login](Screenshot/login.png)
*User login and signup forms with validation*

### Checkout Process
![Checkout](Screenshot/checkout.png)
*Secure checkout with billing information and payment options*

### Related Products
![Related Products](Screenshot/payment.png)
*Product recommendations based on current selection*

### Categories
![Categories](Screenshot/payment1.png)
*Category browsing interface*

## How to Run the Project

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Firebase account for authentication

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-vtech-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project:
   - Go to the Firebase Console
   - Create a new project
   - Enable Authentication and Firestore

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Firebase configuration values

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

### Available Scripts
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Customization

### Changing Branding
1. Replace logo images in `src/Components/Assets/`
2. Update brand colors in CSS files
3. Modify site title in `index.html`

### Adding Products
1. Add product images to `src/Components/Assets/`
2. Update product data in `src/Components/Assets/all_product.js`
3. Ensure images are properly imported and referenced

### Modifying Categories
1. Update category data in `src/Components/Assets/data.js`
2. Modify navigation links in `src/Components/Navbar/Navbar.jsx`
3. Update category banners in `src/Pages/ShopCategory.jsx`

### Payment Methods
1. Add new payment logos to `src/Components/Assets/`
2. Update payment options in `src/Pages/Checkout.jsx`
3. Modify payment processing logic as needed

### Styling
1. Global styles: `src/App.css` and `src/index.css`
2. Component-specific styles: Individual CSS files in each component folder
3. Responsive breakpoints: Defined in media queries within CSS files

### Security Notes
- Never commit real API keys to version control
- Always use `.env` files for sensitive information
- Regularly rotate API keys in production environments