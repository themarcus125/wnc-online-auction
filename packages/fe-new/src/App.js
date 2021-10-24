import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './assets/css/App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/404';
import Account from './pages/account';
import Login from './pages/login';
import Register from './pages/register';
import ResetPassword from './pages/reset-password';
import Search from './pages/search';
import CategoryPage from './components/CategoryPage';
import CategoryProductPage from './components/CategoryProductPage';
import ProductDetailPage from './components/common/ProductDetailPage';
import Seller from './pages/seller';
import Admin from './pages/admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          
          <Account path="/account" />
          <Login path="/login" />
          <Register path="/register" />
          <ResetPassword path="/reset-password" />
          <Search path="/search" />
          <CategoryPage exact path="/category/:categoryId" />
          <CategoryProductPage exact path="/category/:categoryId/:subCategoryId" />
          <ProductDetailPage exact path="/product/:productId" />
          <Seller exact path="/seller/:sellerPath" />
          <Admin path="/admin" />
          
          <Route path="/404">
            <NotFoundPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
