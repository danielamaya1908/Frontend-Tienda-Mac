import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import Product from './components/Product/Product'; 
import UserAdmin from './components/UserAdmin/UserAdmin'; 
import BrandManagement from './components/Brand/Brands'; 
import Categories from './components/Category/Category'; 
import SubCategories from './components/SubCategories/SubCategories'; 
import Color from './components/Color/Color'; 
import Capacity from './components/Capacity/Capacity'; 
import ProductDetail from './components/Product/ProductDetail';

function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <Home />
            </>
          } 
        />
        <Route 
          path="/7gP4mX!5vZwQj@n8rAe" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Dashboard />} />
          } 
        />
        <Route 
          path="/login" 
          element={<LoginAdmin onLogin={() => setIsLoggedIn(true)} />} 
        />
        <Route 
          path="/product" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Product />} />
          } 
        />
        <Route 
          path="/useradmin" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<UserAdmin />} />
          } 
        />
        <Route 
          path="/brands" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<BrandManagement />} />
          } 
        />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Categories />} />
          } 
        />
        <Route 
          path="/subcategories" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<SubCategories />} />
          } 
        />
        <Route 
          path="/colors" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Color />} />
          } 
        />
        <Route 
          path="/capacities" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Capacity />} />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<ProductDetail />} />
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
