import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const Technology = () => {
  const [TechnologyPosts, setTechnologyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnologyPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const TechnologyPostsQuery = query(postsCollection, where('category', '==', 'Technology'));

        const querySnapshot = await getDocs(TechnologyPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setTechnologyPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Technology posts:', err);
        setError('Error fetching Technology posts');
        setLoading(false);
      }
    };

    fetchTechnologyPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="Technology-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Technology Posts</h2>
      
      {TechnologyPosts.length > 0 ? (
        <ul>
          {TechnologyPosts.map((post) => (
            <li key={post.id} className="post-item border-b p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} className="w-48 h-48 object-cover mb-4" />
              <p>Category: {post.category}</p>
              <p>posted by : {post.postedby}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Technology posts available</p>
      )}
    </div>
  );
};

export default Technology;
