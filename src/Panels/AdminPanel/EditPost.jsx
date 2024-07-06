import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { db } from '../../Config/Firebase'; // Ensure your Firebase configuration is correctly imported
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditPost = () => {
  const { uid, postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const categories = ['Technology', 'Health', 'Education', 'Entertainment', 'News', 'Sports', 'Business', 'AI'];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'posts', postId));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setContent(postData.content);
          setCategory(postData.category);
          setStatus(postData.status);
        } else {
          console.log('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (value) => setContent(value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        title,
        content,
        category,
        status,
      });

      console.log('Post updated successfully');
      navigate(`/admin-panel/${uid}/myposts/${uid}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="post-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="field">
          <label>Content</label>
          <JoditEditor value={content} onChange={handleContentChange} />
        </div>
        <div className="field">
          <label>Category</label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Status</label>
          <select value={status} onChange={handleStatusChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
