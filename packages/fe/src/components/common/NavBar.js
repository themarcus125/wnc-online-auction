import React, { useEffect } from 'react';
import UIKit from 'uikit/dist/js/uikit.min.js';
import styled from 'styled-components';

const NavBar = () => {
  useEffect(() => {
    UIKit.navbar('#navbar');
  }, []);

  return (
    <nav id="navbar" className="uk-navbar-container" uk-navbar="">
      <ul className="uk-navbar-nav">
        <li className="uk-active">
          <a href="#">Bootleg Ebay</a>
        </li>
        <li>
          <a href="#">Category</a>
          <div className="uk-navbar-dropdown">
            <ul className="uk-nav uk-navbar-dropdown-nav">
              <li className="uk-active">
                <a href="#">Active</a>
              </li>
              <li>
                <a href="#">Item</a>
              </li>
              <li>
                <a href="#">Item</a>
              </li>
            </ul>
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
          <a href="#">Đăng nhập</a>
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
