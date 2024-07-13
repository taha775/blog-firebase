import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router for routing
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import "../../App.css"
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const Mypost = () => {
  const navigate =  useNavigate()
  const { uid } = useParams(); // Access the uid from URL params
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme } = useSelector(state => state.theme);


  const gotoAllpost =()=>{
    navigate(`/user-panel/${uid}`); 
  }

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const userPostsQuery = query(postsCollection, where('uid', '==', uid)); // Query posts where uid matches

        const querySnapshot = await getDocs(userPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setUserPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError('Error fetching user posts');
        setLoading(false);
      }
    };

    if (uid) {
      fetchUserPosts();
    }
  }, [uid]);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      console.log('Post deleted successfully:', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="dots mt-4"></div>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`container mx-auto mt-28 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>

     <FaArrowAltCircleLeft color='' className='text-myorange size-8 mx-2 ' onClick={()=>gotoAllpost()}/>
  
      <h2 className="text-4xl font-sans text-center underline underline-offset-8 mb-10">My Posts</h2>
      
      {userPosts.length > 0 ? (
        <div className="flex flex-wrap">
          {userPosts.map((post) => (
            <div key={post.id} className="postdata p-6 border-2 rounded-xl mb-8 w-full lg:w-7/12 mx-auto">
              <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg mb-6" />
              <h3 className="text-3xl lg:text-5xl font-sans text-center mt-6">{post.title}</h3>
              <p className="text-lg lg:text-2xl mt-6">{post.description}</p>
              <div className="text-center mt-8">
                <Link to={`/user-panel/${uid}/edit-post/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-blue-700">Edit</Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm mt-4">Category: {post.category}</p>
              <p className="text-sm mt-2">Content: {post.content}</p>
              <p className="text-sm mt-2">Published Date: {new Date(post.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Mypost;
