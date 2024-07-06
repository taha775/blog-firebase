import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const Health = () => {
  const [HealthPosts, setHealthPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const HealthPostsQuery = query(postsCollection, where('category', '==', 'Health'));

        const querySnapshot = await getDocs(HealthPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setHealthPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Health posts:', err);
        setError('Error fetching Health posts');
        setLoading(false);
      }
    };

    fetchHealthPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="Health-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Health Posts</h2>
      
      {HealthPosts.length > 0 ? (
        <ul>
          {HealthPosts.map((post) => (
            <li key={post.id} className="post-item border-b p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} className="w-48 h-48 object-cover mb-4" />
              <p>Category: {post.category}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Health posts available</p>
      )}
    </div>
  );
};

export default Health;
