import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const Sports = () => {
  const [SportsPosts, setSportsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSportsPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const SportsPostsQuery = query(postsCollection, where('category', '==', 'Sports'));

        const querySnapshot = await getDocs(SportsPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setSportsPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Sports posts:', err);
        setError('Error fetching Sports posts');
        setLoading(false);
      }
    };

    fetchSportsPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="Sports-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Sports Posts</h2>
      
      {SportsPosts.length > 0 ? (
        <ul>
          {SportsPosts.map((post) => (
            <li key={post.id} className="post-item border-b p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} className="w-48 h-48 object-cover mb-4" />
              <p>Category: {post.category}</p>
              <p>posted by:{post.postedby}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Sports posts available</p>
      )}
    </div>
  );
};

export default Sports;
