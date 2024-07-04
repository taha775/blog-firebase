// UserPanel.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Profheader from './Profileheader';

import { hideNavbarAndFooter, showNavbarAndFooter } from '../../store/slices/layoutslice';

const UserPanel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideNavbarAndFooter());

    return () => {
      dispatch(showNavbarAndFooter());
    };
  }, [dispatch]);

  return (
    <div>
      <Profheader />
      <hr />
      <Outlet /> {/* Render nested routes here */}
  
    </div>
  );
};

export default UserPanel;
