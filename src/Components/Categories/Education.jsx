import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const Education = () => {
  const [educationPosts, setEducationPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducationPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const educationPostsQuery = query(postsCollection, where('category', '==', 'Education'));

        const querySnapshot = await getDocs(educationPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setEducationPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching education posts:', err);
        setError('Error fetching education posts');
        setLoading(false);
      }
    };

    fetchEducationPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="education-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Education Posts</h2>

      <div className="flex overflow-x-auto space-x-4">
        {educationPosts.length > 0 ? (
          educationPosts.map((post) => (
            <motion.div
              key={post.id}
              className="post-item border p-4 max-w-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.description}</p>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover mb-4"
              />
              <p>Category: {post.category}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
            </motion.div>
          ))
        ) : (
          <p>No education posts available</p>
        )}
      </div>
    </div>
  );
};

export default Education;
