import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const MyAdminPost = () => {
  const { uid } = useParams(); // Access the uid from URL params
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const userPostsQuery = query(postsCollection, where('uid', '==', uid)); // Query posts where uid matches

        const querySnapshot = await getDocs(userPostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setUserPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError('Error fetching user posts');
        setLoading(false);
      }
    };

    if (uid) {
      fetchUserPosts();
    }
  }, [uid]);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      console.log('Post deleted successfully:', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post');
    }
  };

  const [expandedPost, setExpandedPost] = useState(null);

  const toggleReadMore = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-posts p-4">
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>
      {userPosts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 py-2 px-4">Title</th>
                <th className="w-1/4 py-2 px-4">Description</th>
                <th className="w-1/4 py-2 px-4">Category</th>
                <th className="w-1/4 py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">
                    {expandedPost === post.id ? post.content : `${post.content.substring(0, 60  )}...`}
                    <button
                      onClick={() => toggleReadMore(post.id)}
                      className="text-blue-500 hover:underline ml-2"
                    >
                      {expandedPost === post.id ? 'Read Less' : 'Read More'}
                    </button>
                  </td>
                  <td className="py-2 px-4">{post.category}</td>
                  <td className="py-2 px-4 flex space-x-4">
                    <Link to={`/admin-panel/${uid}/editpost/${post.id}`} className="text-blue-500 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default MyAdminPost;
