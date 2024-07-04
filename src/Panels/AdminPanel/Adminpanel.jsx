import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideNavbarAndFooter, showNavbarAndFooter } from '../../store/slices/layoutslice';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Adminpanel = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(hideNavbarAndFooter());

    return () => {
      dispatch(showNavbarAndFooter());
    };
  }, [dispatch]);

  const getLinkClass = (path) => {
    return location.pathname.includes(path) ? 'block py-2 px-4 rounded bg-myorange' : 'block py-2 px-4 rounded hover:bg-gray-700';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/6 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="space-y-2">
          <Link to="profile" className={getLinkClass('profile')}>Profile</Link>
          <Link to="allusers" className={getLinkClass('allusers')}>All Users</Link>
          <Link to="allposts" className={getLinkClass('allposts')}>All Posts</Link>
          <Link to="addpost" className={getLinkClass('addpost')}>Add Posts</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-myorange">Welcome to the Admin Dashboard</h1>

        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Adminpanel;
