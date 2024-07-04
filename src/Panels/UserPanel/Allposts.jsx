import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const Allposts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const postsSnapshot = await getDocs(postsCollection);

        const postsList = await Promise.all(
          postsSnapshot.docs.map(async (postDoc) => {
            const postData = { id: postDoc.id, ...postDoc.data() };

            try {
              const userDoc = await getDoc(doc(db, 'users', postData.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                return { ...postData, username: userData.name,userprofile:userData.profileImage };
              } else {
                console.log('User document does not exist for uid:', postData.uid);
                return { ...postData, username: 'Unknown User' };
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              return { ...postData, username: 'Unknown User' };
            }
          })
        );

        setPosts(postsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="all-posts">
        
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              
              <p>{post.description}</p>
              <img src={post.imageUrl} alt={post.title} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
              <p>Category: {post.category}</p>
              <p>Date: {new Date(post.date).toLocaleString()}</p>
              <p>Posted by: {post.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Allposts;
