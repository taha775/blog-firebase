import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import "../../App.css";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="dots mt-4"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  const duplicatedPosts = [...educationPosts, ...educationPosts]; // Duplicate the posts array

  return (
    <div className="education-posts p-4">
      <h2 className="text-2xl font-bold mb-4">Education Posts</h2>
      <div className="scroll-container flex overflow-hidden whitespace-nowrap">
        <div className="scroll-content flex animate-scroll">
          {duplicatedPosts.length > 0 ? (
            duplicatedPosts.map((post, index) => (
              <motion.div
                key={index} // Use index as key for duplicated array
                className="post-item border p-4 max-w-xs relative mr-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <div className="post-info absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 text-white">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm">{new Date(post.date).toLocaleString()}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No education posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
