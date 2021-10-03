import React, { useEffect, useState } from 'react';
import UIKit from 'uikit/dist/js/uikit.min.js';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { navigate } from 'gatsby-link';

import { getAPI } from '../../utils/api';
import { getUser, logout } from '../../utils/auth';

const NavBar = () => {
  const { name: userFullname, role = 0 } = getUser();
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const response = await getAPI('/api/category');
    if (!response.error) {
      setCategories(response);
    }
  };

  useEffect(() => {
    UIKit.navbar('#navbar');
    loadCategories();
  }, []);

  return (
    <nav id="navbar" className="uk-navbar-container" uk-navbar="">
      <ul className="uk-navbar-nav">
        <li className="uk-active">
          <a href="#">Bootleg Ebay</a>
        </li>
        <li>
          <a href="#">Danh mục</a>
          <div className="uk-navbar-dropdown" style={{ width: 'auto' }}>
            <GridWrapper className="uk-nav uk-navbar-dropdown-nav">
              {categories.map((category) => {
                return (
                  <GridItem
                    key={category._id}
                    className="uk-active uk-background-muted"
                  >
                    <Link to={`/category/${category._id}`}>
                      {category.name}
                    </Link>
                  </GridItem>
                );
              })}
            </GridWrapper>
          </div>
        </li>
      </ul>
      <NavBarInputWrapper className="uk-search uk-search-navbar uk-flex uk-flex-1 uk-flex-middle">
        <span uk-search-icon></span>
        <NavBarInput
          className="uk-search-input"
          type="search"
          placeholder="Search"
        />
        <NavBarInputDropDown className="uk-select">
          <option>Category 01</option>
          <option>Categoryyyyyy 02</option>
        </NavBarInputDropDown>
        <NavBarInputButton className="uk-button uk-button-primary">
          Tìm kiếm
        </NavBarInputButton>
      </NavBarInputWrapper>

      <ul className="uk-navbar-nav">
        <li className="uk-active">
          {userFullname ? (
            <React.Fragment>
              <div className="uk-flex uk-flex-middle uk-height-1-1">
                <div
                  style={{
                    cursor: 'pointer',
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <UserTitle>{userFullname}</UserTitle>
                  <span
                    className="uk-icon"
                    uk-icon="icon: triangle-down"
                    style={{ alignSelf: 'center' }}
                  ></span>
                </div>
              </div>
              <div className="uk-navbar-dropdown">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  {role === 2 && (
                    <li>
                      <Link to={'/admin'}>Trang chủ Admin</Link>
                    </li>
                  )}
                  <li>
                    <Link to={'/account'}>Tài khoản</Link>
                  </li>
                  <li>
                    <a onClick={() => logout(() => navigate('/'))}>Đăng xuất</a>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

const NavBarInputWrapper = styled.form`
  padding: 0px 10px;
`;

const NavBarInputButton = styled.button`
  width: 150px;
  margin-left: 10px !important;
  height: 40px;
`;

const NavBarInputDropDown = styled.select`
  text-overflow: ellipsis;
  width: 150px !important;
  height: 40px;
  border: 1px solid #000 !important;
  border-left: 0px !important;
`;

const NavBarInput = styled.input`
  background-color: #fff !important;
  border: 1px solid #000 !important;
  padding: 0px 10px;
`;

const UserTitle = styled.div`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
`;

const GridWrapper = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const GridItem = styled.li`
  display: block;
  padding: 20px;
`;
