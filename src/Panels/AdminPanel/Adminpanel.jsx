import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideNavbarAndFooter, showNavbarAndFooter } from '../../store/slices/layoutslice';
import { Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { db } from '../../Config/Firebase'; // Adjust path as per your actual file structure
import { collection, query, where, getDocs } from 'firebase/firestore';

const Adminpanel = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { uid } = useParams(); // Get the uid parameter from the URL
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    dispatch(hideNavbarAndFooter());

    // Fetch user role from Firestore
    const fetchUserData = async () => {
      try {
        const userdata = query(collection(db, 'users'), where('uid', '==', uid)); // Query to fetch user document by uid
        const querySnapshot = await getDocs(userdata);

        querySnapshot.forEach((doc) => {
          // Assuming 'role' is a field in your user document
          const userData = doc.data();
          setUserRole(userData.role); // Set userRole to the 'role' field from Firestore
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (uid) {
      fetchUserData();
    }

    return () => {
      dispatch(showNavbarAndFooter());
    };
  }, [dispatch, uid]);

  const getLinkClass = (path) => {
    return location.pathname.includes(path) ? 'block py-2 px-4 rounded bg-myorange' : 'block py-2 px-4 rounded hover:bg-gray-700';
  };



  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/6 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="space-y-2">
          {/* Pass uid to nested routes using to prop */}
          <Link to={`adminprofile/${uid}`} className={getLinkClass('adminprofile')}>Profile</Link>
          <Link to={`allusers/${uid}`} className={getLinkClass('allusers')}>All Users</Link>

          {/* Conditionally render All Authors link based on user role */}
          {userRole !== 'moderator' && (
            <Link to={`allmoderators/${uid}`} className={getLinkClass('allmoderators')}>All Moderators</Link>
          )}

          <Link to={`allposts/${uid}`} className={getLinkClass('allposts')}>All Posts</Link>
          <Link to={`addpost/${uid}`} className={getLinkClass('addpost')}>Add Posts</Link>
          <Link to={`myposts/${uid}`} className={getLinkClass('myposts')}>My Posts</Link>
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
