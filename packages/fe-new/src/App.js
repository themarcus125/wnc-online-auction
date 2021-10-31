import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/css/App.css';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';

import useStore from './store/useStore';

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

import { getToken } from './utils/auth';
import { getAPIWithToken } from './utils/api';

const AuthCheckWrapper = ({ children }) => {
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    await getToken(false, setIsLoggedIn);
  };

  return children;
};

function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setWatchList = useStore((state) => state.setWatchList);

  useEffect(async () => {
    let socket;
    if (isLoggedIn) {
      const token = await getToken();
      socket = io('localhost:3000', {
        auth: {
          token,
        },
      });
      socket.on('placed_bid', (data) => {
        console.log('data', data);
      });

      socket.on('connected', (data) => {
        console.log('connected', data);
      });
    }

    // return () => {
    //   if (isLoggedIn && socket) {
    //     socket.disconnect();
    //   }
    // };
  }, [isLoggedIn]);

  useEffect(() => {
    const loadWatchList = async () => {
      const token = await getToken();
      const response = await getAPIWithToken(
        '/api/user/watchlist/product',
        token,
      );

      if (!response.error) {
        setWatchList(response);
      }
    };

    if (isLoggedIn) {
      loadWatchList();
    }
  }, [isLoggedIn]);

  return (
    <AuthCheckWrapper>
      <div className="App">
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          autoClose={3000}
          theme="colored"
        />
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
            <CategoryProductPage
              exact
              path="/category/:categoryId/:subCategoryId"
            />
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
    </AuthCheckWrapper>
  );
}

export default App;
