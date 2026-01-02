import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, clear user data
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  getNewProducts: () => api.get('/products/new'),
};

export const cartAPI = {
  getCartItems: (userId) => api.get(`/cart/user/${userId}`),
  addToCart: (cartItem) => api.post('/cart', cartItem),
  removeFromCart: (cartId, userId) => api.delete(`/cart/${cartId}/user/${userId}`),
};

export const orderAPI = {
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`),
};

export default api;