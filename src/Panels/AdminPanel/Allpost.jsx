import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const Allpost = () => {
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
                return { ...postData, username: userData.name, userprofile: userData.profileImage };
              } else {
                console.log('User document does not exist for uid:', postData.uid);
                return { ...postData, username: 'Unknown User', userprofile: null };
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              return { ...postData, username: 'Unknown User', userprofile: null };
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

  const handleApprovePost = async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        status: 'approved',
      });
      // Assuming you want to update the local state as well
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, status: 'approved' } : post))
      );
      console.log(`Post ${postId} approved successfully.`);
    } catch (error) {
      console.error('Error approving post:', error);
      // Handle error as needed
    }
  };

  const handleDeclinePost = async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);
      // Remove the post from the local state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      console.log(`Post ${postId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error as needed
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="admin-all-posts">
      <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
      {posts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border-gray-200 shadow-sm rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-gray-200">Post ID</th>
                <th className="py-2 px-4 border-b border-gray-200">Title</th>
                <th className="py-2 px-4 border-b border-gray-200">Category</th>
                <th className="py-2 px-4 border-b border-gray-200">Date</th>
                <th className="py-2 px-4 border-b border-gray-200">Image</th>
                <th className="py-2 px-4 border-b border-gray-200">UID</th>
                <th className="py-2 px-4 border-b border-gray-200">Content</th>
                <th className="py-2 px-4 border-b border-gray-200">Status</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                <th className="py-2 px-4 border-b border-gray-200">Posted By</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{post.id}</td>
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">{post.category}</td>
                  <td className="py-2 px-4">{new Date(post.date).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{post.uid}</td>
                  <td className="py-2 px-4 whitespace-pre-line">{post.content}</td>
                  <td className="py-2 px-4">{post.status}</td>
                  <td className="py-2 px-4">
                    {post.status !== 'approved' && (
                      <div className="space-x-2">
                        <button
                          onClick={() => handleApprovePost(post.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeclinePost(post.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {post.userprofile ? (
                      <div className="flex items-center">
                        <img
                          src={post.userprofile}
                          alt={post.username}
                          className="w-10 h-10 object-cover rounded-full mr-2"
                        />
                        <p>{post.postedby}</p>
                      </div>
                    ) : (
                      <p>{post.postedby}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4">No posts available</p>
      )}
    </div>
  );
};

export default Allpost;
