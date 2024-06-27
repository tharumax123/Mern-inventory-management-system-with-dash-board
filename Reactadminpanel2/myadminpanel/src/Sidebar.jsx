// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div id='sidebar'>
      <div className='sidebar-title'>
        <span>SHOP</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to='/'>Dashboard</Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/products'>Products</Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/categories'>Categories</Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/customers'>Customers</Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/settings'>Settings</Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
