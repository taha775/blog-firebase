import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import "../../App.css";
import { FaBookOpen } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { Share1Icon } from '@radix-ui/react-icons';

SwiperCore.use([]);

const Lifestyle = () => {
  const { theme } = useSelector(state => state.theme);
  const [LifestylePosts, setLifestylePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLifestylePosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const LifestylePostsQuery = query(postsCollection, where('category', '==', 'Lifestyle'));

        const querySnapshot = await getDocs(LifestylePostsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setLifestylePosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Lifestyle posts:', err);
        setError('Error fetching Lifestyle posts');
        setLoading(false);
      }
    };

    fetchLifestylePosts();
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

  return (
    <div className="Lifestyle-posts p-4 ">
      <Swiper
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {LifestylePosts.length > 0 ? (
          LifestylePosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="post-item p-2 rounded-lg shadow-md">
                <div className="relative flex items-center h-72">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-0 right-0 left-0 bg-black bg-opacity-50 text-white p-3">
                    <h3 className="text-2xl font-bold underl text-gray-300 font-myfont">{post.title}</h3>
                    <p className="text-sm text-myorange flex items-center gap-2">
                      Category: <FaBookOpen /> {post.category}
                    </p>
                    <p className="text-sm text-myorange">Date: {new Date(post.date).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm mt-2">{post.description}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No Lifestyle posts available</p>
        )}
      </Swiper>

      
        <div  className={`ml-2 mt-20 w-auto h-auto space-x-16 ${theme === "dark" ? "text-gray-300 bg-gray-800" : "text-black bg-white"}`}>
          <h1 className="relative text-4xl font-myfont text-black text-center font-bold before:absolute before:top-1/2 before:left-10 before:w-[38%] before:h-[1px] before:bg-gray-600 before:content-[''] before:-translate-y-1/2 after:absolute after:top-1/2 after:right-10 after:w-[38%] after:h-[1px] after:bg-gray-600 after:content-[''] after:-translate-y-1/2">
            <span className={`${theme === "dark" ? "text-gray-300" : "text-black"}`}>Lifestyle Posts</span>
          </h1>
          {LifestylePosts.length > 0 && (
         LifestylePosts.map((post) => (
          <div key={post.id} className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-6'>
            {/* Replace with actual content */}
            <div className='relative' style={{ minWidth: "20rem", minHeight: "19rem" }}>
              <img className='absolute w-full h-full object-cover' src={post.imageUrl}  alt="Popular Post" />
              <div className='absolute bottom-0 flex flex-col justify-start gap-2 p-4 w-full  text-white bg-black bg-opacity-50 h-1/2'>
                <p className='text-lg  font-bold'>Related: <span className='text-myorange'>{post.category}</span></p>
                <div className='flex items-center  gap-2'>
                  <CgProfile className='text-myorange text-lg  font-bold' />
                  <p className='text-myorange text-lg  font-bold'>{post.postedby}</p>
                </div>
                <p className='text-lg  font-bold'>Date: {post.date}</p>
              </div>
            </div>
            <div className='flex-1 md:col-span-2'>
              <h1 className="text-2xl font-myfont font-bold mb-2">
                {post.title}
              </h1>
              <p className="mb-4">
                {post.content}
              </p>
              
              <button className='bg-myorange px-4 py-2 hover:bg-black hover:text-myorange rounded'>Read More</button>
              <div className='flex mt-4 space-x-4'>
                <button className='hover:bg-myorange hover:text-black text-myorange px-4 py-2 rounded flex gap-2 items-center'>
                  <Share1Icon /> Share
                </button>
                <button className='hover:bg-myorange text-myorange hover:text-black px-4 py-2 rounded'>Save</button>
              </div>
            </div>
          </div>
        
      )))}
</div>
    </div>
  );
};

export default Lifestyle;
