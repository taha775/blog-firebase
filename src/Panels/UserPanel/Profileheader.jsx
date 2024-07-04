import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { SiDarkreader } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { toggleTheme } from '../../store/slices/themeslice';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../Config/Firebase';
import FileUploadDialog from '../../Components/DialogOpen/Dialogbox';
import logoLight from "../../assets/logo.png"; // Light mode logo
import logoDark from "../../assets/light.png";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaBell } from 'react-icons/fa6';

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userdata = query(collection(db, 'users'), where('uid', '==', uid)); // Query to fetch user document by uid
        const querySnapshot = await getDocs(userdata);
        querySnapshot.forEach((doc) => {
          setUser(doc.data()); // Set user state with document data
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  const { theme } = useSelector((state) => state.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handlePost = () => {
    navigate(`/user-panel/${uid}/new-post/${uid}`);
  };

  const gotomyposts = () => {
    navigate(`/user-panel/${uid}/my-posts/${uid}`);
  };

  const handleFileSelect = (file) => {
    // Assuming you want to set the profileImg state to the URL of the selected file
    const imageUrl = URL.createObjectURL(file);
    setProfileImg(imageUrl);
    // You may want to upload the file to Firebase storage or elsewhere at this point
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page or handle edit profile logic
    // Example:
    navigate(`/user-panel/${uid}/edit-profile`);
  };

  const handleSettings = () => {
    // Navigate to settings page or handle settings logic
    // Example:
    navigate(`/user-panel/${uid}/settings`);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase sign out method

      navigate('/login', { replace: true }); // Redirect to login page and replace history
    } catch (error) {
      console.error('Error logging out:', error.message);
      // Handle logout error (optional)
    }
  };

  return (
    <div className={`navbar pt-0 flex items-center justify-between mx-auto ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} p-6`}>
      <div className="left flex items-center">
        <img className='w-28' src={theme === 'dark' ? logoDark : logoLight} alt="Logo" />
        <div className="center gap-3 flex items-center">
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-decoration-none text-reset">
              FIND MORE
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/community">Community</Dropdown.Item>
              <Dropdown.Item as={Link} to="/rss-reader">RSS Reader</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Link>FRIENDS FEED</Link>
          <Link>SHOP</Link>
        </div>
      </div>
      <div className="right flex items-center gap-3">
        <button onClick={gotomyposts} className="px-4 py-2 rounded-md bg-myorange text-white hover:bg-myorange-dark">My Posts</button>
        <button onClick={handlePost} className="px-4 py-2 rounded-md bg-myorange text-white hover:bg-myorange-dark">ADD NEW POST</button>
        <FaBell className='text-blue-600' size={25} />
        <div className='items-center flex-col'>
          <Stack direction="row" spacing={2}>
            <Avatar alt={user?.name} src={profileImg || "/static/images/avatar/placeholder.jpg"} onClick={() => setDialogOpen(true)} />
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-profile" className="text-decoration-none text-reset">
                {user?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditProfile}>Edit Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleSettings}>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        </div>
        <button onClick={handleToggleTheme} className="flex items-center">
          <SiDarkreader size={35} color={theme === "dark" ? "white" : "black"} />
        </button>
      </div>
      <FileUploadDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onFileSelect={handleFileSelect} />
    </div>
  );
};

export default ProfileHeader;
