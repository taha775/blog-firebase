import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading } from '@radix-ui/themes';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { toast } from 'react-toastify';
// Importing the constants

const Login = () => {
  const { theme } = useSelector(state => state.theme); 
  const navigate = useNavigate();

  const formik = useFormik({  
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // Log the admin UID to verify it's correct
        console.log('Admin UID:', user.uid);

        // Get admin data from Firestore
        const adminDoc = await getDoc(doc(db, "admin", user.uid));
        
        if (adminDoc.exists()) {
          const adminData = adminDoc.data();

          // Log the admin data to check its structure
          console.log('Admin data:', adminData);

          // Check the role and navigate accordingly
          if (adminData.role === 'admin') {
            navigate(`/admin-panel/${adminData.uid}`); // Navigate to admin panel with admin UID
            toast.success('Admin login successful');
          } else {
            toast.error('User is not an admin');
          }
        } else {
          // Log an error if admin document does not exist
          console.error('Admin document not found');
          toast.error('Admin document not found');
        }

        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        // Check if user document exists
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // console.log(userData);

          // Check the role and navigate accordingly
          if (userData.role === 'user') {
            navigate(`/user-panel/${userData.uid}`); // Navigate to user panel with user UID
          } else if (userData.role === 'aurthor' && userData.status ==='pending') {
            toast.info("please wait for the admin to approved your profile")
              
            // navigate(`/writer-panel/${userData.uid}`); // Navigate to writer panel with user UID
          }
          else if(userData.role === 'aurthor' && userData.status ==='approved'){
            toast.success("login successful")
            navigate(`/admin-panel/${userData.uid}`); // Naviga
          }
          
          else {
            toast.error('Unknown user role');
          }

         
        } else {
          toast.error('User data not found');
        }
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          toast.error('User not found');
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Incorrect password');
        } else {
          toast.error(error.message);
        }
        console.error('Error logging in:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='flex justify-center items-center mt-8 mb-4'>
      <Box className={`max-w-lg w-full flex-col px-24 py-6 rounded-lg transition duration-500 ${theme === 'dark' ? 'bg-gray-900 text-white border-2 border-black' : 'bg-white text-black border border-gray-300'}`} style={{
        boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.4)',
        borderRadius: '8px'
      }}>
        <div className='text-center mb-4'>
          <Heading as='h2' className='text-4xl'>Log In</Heading>
        </div>

        <div className='text-center'>
          <Button className="flex border-blue-600 rounded items-center cursor-pointer px-12 py-5" variant="outline">
            <FaGoogle size={25} className="mr-3 cursor-pointer" />
            Continue with Google
          </Button>
        </div>

        <div className="flex items-center justify-center my-4 space-x-4">
          <div className={`border-t ${theme === 'dark' ? 'border-gray-500' : 'border-gray-300'} flex-grow`}></div>
          <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>OR</span>
          <div className={`border-t ${theme === 'dark' ? 'border-gray-500' : 'border-gray-300'} flex-grow`}></div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-blue-700' : 'text-black'}`}>Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-800 text-white border-black' : 'bg-white text-black border-gray-300'}`}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-blue-700' : 'text-black'}`}>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-800 text-white border-black' : 'bg-white text-black border-gray-300'}`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <div className="mt-9">
            <Button color="indigo" variant="outline" className="w-full cursor-pointer p-3" type="submit" disabled={formik.isSubmitting}>
              Log In
            </Button>
          </div>
        </form>
        <p className="mt-4 text-sm font-sans text-center">
          Don't have an account? <Link to="/signup" className="font-medium text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </Box>
    </div>
  );
};

export default Login;
