import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { db, storage } from '../../Config/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import ProgressBar from "../../Components/ProgressBar/Progress"; // Assuming you've renamed and resolved the previous naming conflict

const Post = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false); // State to track image upload status

  const categories = ['Technology', 'Health', 'Education', 'Entertainment', 'News', 'Sports', 'Business', 'Travel', 'Lifestyle'];

  const { uid } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userdata = query(collection(db, 'users'), where('uid', '==', uid));
        const querySnapshot = await getDocs(userdata);

        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (value) => setContent(value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleImageChange = (e) => setImageUpload(e.target.files[0]);

  const uploadFile = async () => {
    if (!imageUpload) return;
    const storageRef = ref(storage, `images/${imageUpload.name}`);
    try {
      setUploadingImage(true); // Set uploading image state to true
      const snapshot = await uploadBytes(storageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image');
      return null;
    } finally {
      setUploadingImage(false); // Set uploading image state back to false once upload completes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category || !imageUpload) {
      toast.error("please fill all required field")
      setError('All fields are required.');
      return;
    }

    try {
      setSubmissionStatus('loading');

      const uploadedImageUrl = await uploadFile();
      if (!uploadedImageUrl) {
        
        toast.error("Image upload failed!")
        setError('Image upload failed.');
        setSubmissionStatus('failed');
        return;
      }

      const postData = {
        uid: user?.uid,
        title,
        content,
        category,
        status,
        imageUrl: uploadedImageUrl,
        date: new Date().toISOString(),
        postedby: user?.name
      };

      await addDoc(collection(db, 'posts'), postData);

      setTitle('');
      setContent('');
      setCategory('');
      setStatus('draft');
      setImageUpload(null);
      setImageUrl('');

      setSubmissionStatus('idle');
      setError(null);

      console.log('Post submitted successfully:', postData);
      toast.success("post published successfully")
      navigate(`/user-panel/${uid}/my-posts/${uid}`);
     
    } catch (error) {
      console.error('Error submitting post:', error);
      setSubmissionStatus('failed');
      setError('Error submitting post');
    }
  };

  return (
    <div className="post-container mt-10 w-auto h-auto ">
      <h2 className='text-2xl text-black  font-bold text-center '>Create a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="field font-myfont mt-6 ">
          <label>Title</label>
          <input type="text" placeholder='Enter Title' value={title} onChange={handleTitleChange} />
        </div>
        <div className="field">
          <label>Content</label>
          <JoditEditor ref={editor} value={content} onChange={handleContentChange} />
        </div>
        <div className="field">
          <label className='mr-4'>Category</label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className='mr-4'>Image</label>
          <input className='' type="file" onChange={handleImageChange} />
          <button type="button" onClick={uploadFile}>Upload Image</button>
          {uploadingImage && <ProgressBar />} {/* Conditionally render ProgressBar */}
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          )}
        </div>
        <button type="submit" className=' px-4  py-1 rounded-md bg-myorange text-black hover:bg-myorange-dark '>Submit</button>
        
        
      </form>
      {submissionStatus === 'loading' && <p>Loading...</p>}
      {submissionStatus === 'failed' && <p>Error: {error}</p>}
    </div>
  );
};

export default Post;
