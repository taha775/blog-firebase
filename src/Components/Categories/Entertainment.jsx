import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const Entertainment = () => {
  const [EntertainmentPosts, setEntertainmentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntertainmentPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        console.log(postsCollection)
        const EntertainmentPostsQuery = query(postsCollection, where('category', '==', 'Entertainment'));

        const querySnapshot = await getDocs(EntertainmentPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.uid,
          ...doc.data()
        }));

        setEntertainmentPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Entertainment posts:', err);
        setError('Error fetching Entertainment posts');
        setLoading(false);
      }
    };

    fetchEntertainmentPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="Entertainment-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Entertainment Posts</h2>
      
      {EntertainmentPosts.length > 0 ? (
        <ul>
          {EntertainmentPosts.map((post) => (
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
        <p>No Entertainment posts available</p>
      )}
    </div>
  );
};

export default Entertainment;
