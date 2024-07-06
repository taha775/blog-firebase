import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters

const AdminProfile = () => {
  const { uid } = useParams(); // Get UID from route parameters
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalAuthors, setTotalAuthors] = useState(0);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        let userData = null;

        // Check if user exists in 'admin' collection
        const adminRef = doc(db, 'admin', uid);
        const adminDoc = await getDoc(adminRef);

        if (adminDoc.exists()) {
          userData = adminDoc.data();
        } else {
          // If not in 'admin', check 'users' collection
          const userRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            userData = userDoc.data();
          } else {
            throw new Error('User not found');
          }
        }

        setAdminData(userData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Error fetching admin data');
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        // Fetch total number of users
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        setTotalUsers(usersSnapshot.size);

        // Fetch total number of posts
        const postsCollection = collection(db, 'posts');
        const postsSnapshot = await getDocs(postsCollection);
        setTotalPosts(postsSnapshot.size);

        // Calculate total number of authors
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        const authors = usersList.filter(user => user.role === 'moderator'); // Adjust 'role' field based on your user data structure
        setTotalAuthors(authors.length);
      } catch (err) {
        console.error('Error fetching counts:', err);
        setError('Error fetching counts');
      }
    };

    fetchAdminData();
    fetchCounts();
  }, [uid]); // Add uid to dependency array to re-fetch if it changes

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      {adminData ? (
        <>
          {adminData.profileImage && (
            <img
              src={adminData.profileImage}
              alt={adminData.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
          )}
          <h1 className="text-2xl font-semibold">{adminData.name}</h1>
          <p className="text-gray-600">{adminData.email}</p>
          
          <div className="flex space-x-4 mt-8">
            <div className="bg-white shadow-md rounded-lg p-4 w-48 text-center">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 w-48 text-center">
              <h2 className="text-lg font-semibold">Total Posts</h2>
              <p className="text-3xl font-bold">{totalPosts}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 w-48 text-center">
              <h2 className="text-lg font-semibold">Total Moderators</h2>
              <p className="text-3xl font-bold">{totalAuthors}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center mt-4">No admin data available</p>
      )}
    </div>
  );
};

export default AdminProfile;
