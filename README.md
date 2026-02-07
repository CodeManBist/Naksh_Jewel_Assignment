# NakshJewels - Mini E-Commerce Module

A modern, full-stack e-commerce application built with React, Node.js, MongoDB, and Docker. This project demonstrates clean code architecture, proper state management with Redux, comprehensive error handling, and containerized deployment.

## 📋 Project Overview

NakshJewels is a mini e-commerce module that showcases:
- **Frontend**: React with Redux state management and responsive design
- **Backend**: Node.js + Express API with validation and error handling
- **Database**: MongoDB for persistent data storage
- **DevOps**: Docker containerization with docker-compose orchestration

## ✨ Features

### Frontend Features
- ✅ Product listing page with API integration
- ✅ Product cards with image, name, price, and "Add to Cart" button
- ✅ Shopping cart with quantity management and item removal
- ✅ Redux state management for products and cart
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Proper error handling and loading states
- ✅ Clean folder structure with semantic components
- ✅ No external UI libraries (custom CSS)

### Backend Features
- ✅ RESTful API endpoints (GET /products, POST /cart, PUT /cart, DELETE /cart)
- ✅ Validation middleware for request data
- ✅ Proper error handling with meaningful error messages
- ✅ MongoDB integration for data persistence
- ✅ Environment variables configuration (.env)
- ✅ Seed data for initial product population

### DevOps Features
- ✅ Dockerfile for both frontend and backend
- ✅ Docker Compose orchestration with MongoDB service
- ✅ Volume management for MongoDB data persistence
- ✅ Service dependencies configured correctly

## 🏗️ Project Structure

```
naksh-jewels/
├── frontend/                          # React application
│   ├── src/
│   │   ├── api/                      # API client and cart API
│   │   ├── app/                      # Redux store configuration
│   │   ├── assets/                   # Images and static assets
│   │   ├── components/               # Reusable components (Navbar, ProductCard, Hero)
│   │   ├── features/                 # Redux slices (products, cart)
│   │   ├── pages/                    # Page components (Home, Products, Cart, ProductDetails)
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── main.jsx                  # React entry point
│   │   └── style.css                 # Global styles
│   ├── package.json
│   ├── Dockerfile
│   ├── .env                          # Environment variables
│   └── vite.config.js
├── backend/                          # Node.js + Express application
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   ├── middlewares/              # Error and validation middlewares
│   │   ├── modules/                  # Feature modules (products, cart)
│   │   ├── utils/                    # Utility functions (ApiError, asyncHandler)
│   │   ├── app.js                    # Express app setup
│   │   ├── server.js                 # Server entry point
│   │   └── seed.js                   # Database seed script
│   ├── package.json
│   ├── Dockerfile
│   ├── .env                          # Environment variables
│   └── .env.example
├── docker-compose.yml                # Docker Compose configuration
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed on your system
- Node.js 18+ (for local development without Docker)
- MongoDB 5+ (for local development without Docker)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeManBist/Naksh_Jewel_Assignment.git
   cd naksh-jewels
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017

4. **Stop the application**
   ```bash
   docker-compose down
   ```

### Local Development Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** (already provided)
   ```bash
   cp .env.example .env
   ```

4. **Ensure MongoDB is running**
   ```bash
   # MongoDB should be running on localhost:27017
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`

#### Frontend Setup

1. **Navigate to frontend directory** (from root)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** (already provided)
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Products Endpoints

#### Get All Products
```http
GET /api/products
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "product-id",
      "name": "Product Name",
      "price": 5000,
      "description": "Product description",
      "image": "image-url"
    }
  ]
}
```

#### Get Product by ID
```http
GET /api/products/:id
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "cart-id",
    "items": [
      {
        "_id": "item-id",
        "productId": "product-id",
        "name": "Product Name",
        "price": 5000,
        "quantity": 2
      }
    ],
    "totalAmount": 10000
  }
}
```

#### Add to Cart
```http
POST /api/cart
Content-Type: application/json

{
  "productId": "product-id",
  "quantity": 1
}
```

#### Update Cart Item
```http
PUT /api/cart/:productId
Content-Type: application/json

{
  "quantity": 2
}
```

#### Remove from Cart
```http
DELETE /api/cart/:productId
```

## 🔍 Key Implementation Details

### Frontend

**State Management (Redux)**
- **productSlice**: Handles product listing and filtering
- **cartSlice**: Manages shopping cart operations (add, update, remove)
- Async thunks for API calls with proper error handling

**Components**
- **Navbar**: Navigation with cart item count
- **Hero**: Eye-catching landing section
- **ProductCard**: Reusable card component with hover effects
- **ProductDetails**: Detailed product view with quantity selector
- **Cart**: Full cart management with order summary

**Styling**
- CSS Modules for component-scoped styling
- Custom design system with CSS variables
- Responsive grid layouts with CSS Grid and Flexbox
- Mobile-first approach with media queries

### Backend

**Architecture**
- MVC-like structure with controllers, services, and models
- Async/await pattern with error handling wrapper
- Validation middleware for input sanitization
- Custom ApiError utility for consistent error responses

**Database**
- MongoDB collections: products, carts
- Seed data for initial testing
- Proper indexing for queries

### Docker Setup

**Frontend Dockerfile**
- Node 20 base image
- Development server with Vite
- Port 5173 exposed

**Backend Dockerfile**
- Node 18 base image
- Production-ready setup
- Port 5000 exposed

**Docker Compose**
- Three services: frontend, backend, MongoDB
- Proper service dependencies
- Environment variable passing
- Data persistence with MongoDB volumes

## 📋 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=MongoDB_ATLAS_URL

```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. **Test Product Listing**
   - Navigate to http://localhost:5173/products
   - Verify products load from the API

2. **Test Add to Cart**
   - Click "Add to Cart" on any product
   - Cart should update without page reload

3. **Test Cart Management**
   - Go to cart page
   - Update quantities, remove items
   - Verify totals update correctly

4. **Test Error Handling**
   - Try network failure scenarios
   - Verify error messages display properly
   - Check loading states work correctly

## 🛠️ Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
npm run seed     # Seed database with initial data
```

## 📦 Dependencies

### Frontend
- react: UI library
- react-router-dom: Routing
- react-redux: State management
- @reduxjs/toolkit: Redux utilities
- axios: HTTP client

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- dotenv: Environment variables
- joi: Validation library

## ⚙️ Configuration

All configurations are managed through environment variables and config files:
- `/backend/src/config/env.js` - Backend configuration
- `/backend/src/config/db.js` - Database connection
- `.env` files - Environment-specific variables

## 🚨 Error Handling

The application implements comprehensive error handling:

**Frontend**
- API response interceptors
- User-friendly error messages
- Loading and error states in UI
- Form validation

**Backend**
- Validation middleware catches bad requests
- Error middleware centralizes error handling
- Meaningful HTTP status codes
- Structured error responses

## 🔐 Security Considerations

- Input validation on both frontend and backend
- MongoDB injection prevention via Mongoose
- Proper error messages (no sensitive data exposure)
- Environment variables for sensitive config
- CORS ready (add if needed)

## 📈 Scalability & Best Practices

- Modular component structure for easy expansion
- Redux for predictable state management
- Async thunks for API call handling
- Service layer separation in backend
- Database indexes for query optimization
- Docker containerization for deployment

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is part of the NakshJewels internship assessment program.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section below
2. Review error messages in console/terminal
3. Check Docker container logs: `docker-compose logs [service-name]`

## 🐛 Troubleshooting

### Docker Issues

**Port already in use**
```bash
# Change ports in docker-compose.yml or stop conflicting services
docker ps
docker stop <container-id>
```

**MongoDB connection error**
- Ensure MongoDB service is running: `docker-compose logs mongo`
- Check MONGO_URI in .env matches docker-compose setup

**Frontend can't connect to backend**
- Ensure backend is running: `docker-compose logs backend`
- Check VITE_API_URL is correct: `http://localhost:5000/api`

### Development Issues

**npm install fails**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 or 5000 already in use**
```bash
# Find and kill process
lsof -i :5173  # or :5000
kill -9 <PID>
```

**MongoDB connection refused**
```bash
# Start MongoDB
mongod
# Or using Docker
docker run -d -p 27017:27017 mongo
```

## 📊 Project Statistics

- **Lines of Code**: ~3500+ (frontend & backend combined)
- **Components**: 8+ functional components
- **API Endpoints**: 4 (GET products, POST/PUT/DELETE cart, GET cart)
- **Redux Slices**: 2 (products, cart)
- **CSS Modules**: 6+ (custom styled components)

## ✅ Checklist - Assignment Requirements

### Part A: Frontend ✅
- [x] Product listing page using API
- [x] Product card with image, name, price, Add to Cart button
- [x] Cart page with quantity update and remove option
- [x] Redux state management
- [x] Responsive design
- [x] Functional components only
- [x] No UI libraries (Bootstrap, MUI, Ant)
- [x] Clean folder structure
- [x] Meaningful Git commits

### Part B: Backend ✅
- [x] GET /products API
- [x] POST /cart API
- [x] PUT /cart/:id API (update quantity)
- [x] DELETE /cart/:id API (remove item)
- [x] Validation middleware
- [x] Proper error handling
- [x] MongoDB integration
- [x] Environment variables (.env)

### Part C: Docker ✅
- [x] Dockerfile for frontend
- [x] Dockerfile for backend
- [x] docker-compose.yml
- [x] Application runs with `docker-compose up`

### Submission Guidelines ✅
- [x] Clean GitHub repository (ready to push)
- [x] README.md with setup and Docker instructions
- [x] All requirements fulfilled

---

**Created with attention to detail and best practices** 🎯
