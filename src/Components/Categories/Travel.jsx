import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs } from 'firebase/firestore';

const Travel = () => {
  const [TravelPosts, setTravelPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const TravelPostsQuery = query(postsCollection, where('category', '==', 'Travel'));

        const querySnapshot = await getDocs(TravelPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setTravelPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Travel posts:', err);
        setError('Error fetching Travel posts');
        setLoading(false);
      }
    };

    fetchTravelPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="Travel-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Travel Posts</h2>
      
      {TravelPosts.length > 0 ? (
        <ul>
          {TravelPosts.map((post) => (
            <li key={post.id} className="post-item border-b p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} className="w-48 h-48 object-cover mb-4" />
              <p>Category: {post.category}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
              <p>posted by : {post.postedby}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Travel posts available</p>
      )}
    </div>
  );
};

export default Travel;
