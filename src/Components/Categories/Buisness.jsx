import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const Business = () => {
  const [businessPosts, setBusinessPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const businessPostsQuery = query(postsCollection, where('category', '==', 'Buisness'));

        const querySnapshot = await getDocs(businessPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setBusinessPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching business posts:', err);
        setError('Error fetching business posts');
        setLoading(false);
      }
    };

    fetchBusinessPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="business-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Business Posts</h2>
      
      {businessPosts.length > 0 ? (
        <div className="flex overflow-x-auto space-x-4">
          {businessPosts.map((post) => (
            <div key={post.id} className="min-w-[300px] bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="mb-2">{post.description}</p>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover mb-4" />}
              <p className="text-gray-600">Category: {post.category}</p>
              <p className="text-gray-600">Date: {new Date(post.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No business posts available</p>
      )}
    </div>
  );
};

export default Business;
