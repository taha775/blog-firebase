import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const News = () => {
  const [NewsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const NewsPostsQuery = query(postsCollection, where('category', '==', 'News'));

        const querySnapshot = await getDocs(NewsPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setNewsPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching News posts:', err);
        setError('Error fetching News posts');
        setLoading(false);
      }
    };

    fetchNewsPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="News-posts p-4">
      <h2 className="text-2xl font-bold mb-4">News Posts</h2>
      
      {NewsPosts.length > 0 ? (
        <ul>
          {NewsPosts.map((post) => (
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
        <p>No News posts available</p>
      )}
    </div>
  );
};

export default News;
