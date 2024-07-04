import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you are using React Router for routing
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const Mypost = () => {
  const { uid } = useParams(); // Access the uid from URL params
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-posts">
      <h2>My Posts</h2>
      
      {userPosts.length > 0 ? (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
              <p>Category: {post.category}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
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
