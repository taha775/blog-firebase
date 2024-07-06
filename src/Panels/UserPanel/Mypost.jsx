import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router for routing
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Mypost = () => {
  const { uid } = useParams(); // Access the uid from URL params
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-posts">
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>
      
      {userPosts.length > 0 ? (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id} className="post-item border-b p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} className="w-48 h-48 object-cover mb-4" />
              <p>Category: {post.category}</p>
              <p>description: {post.content}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
              <div className="flex space-x-4 mt-2">
              <Link to={`/user-panel/${uid}/usereditpost/${post.id}`} className="bg-blue-500 text-black px-3  rounded-lg  hover:underline">Edit</Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Mypost;
