import React, { useState, useEffect } from 'react';
import { db, storage } from '../../Config/Firebase'; // Adjust the path according to your project structure
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProfile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState({
    DateofBirth: '',
    Mobile: '',
    Country: '',
    email: '',
    name: '',
    profileImage: '',
    role: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profileImageUrl = userData.profileImage;

      if (imageFile) {
        const storageRef = ref(storage, `profileImages/${uid}`);
        await uploadBytes(storageRef, imageFile);
        profileImageUrl = await getDownloadURL(storageRef);
      }

      const updatedData = { ...userData, profileImage: profileImageUrl };
      updatedData.completeProfile =
        userData.DateofBirth && userData.Country && userData.Mobile ? true : false;

      await updateDoc(doc(db, 'users', uid), updatedData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          {userData.profileImage ? (
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
          )}
          <input type="file" onChange={handleImageChange} className="mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="DateofBirth"
            value={userData.DateofBirth}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="text"
            name="Mobile"
            value={userData.Mobile}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="Country"
            value={userData.Country}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
