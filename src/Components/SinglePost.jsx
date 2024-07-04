import React from 'react';
import singlepost from "../temporardata/singlepost";
import recentpost from '../temporardata/recent';
import blogimage from "../assets/blogimage.jpg";
import { FaFacebook } from "react-icons/fa6";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaSnapchat, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { useTheme } from '../../ThemeContext';
import { useSelector } from 'react-redux';

const SinglePost = () => {

  const { theme } = useSelector(state => state.theme)
  const data = singlepost;
  const recent = recentpost;

  return (
    <div className="container mx-auto ">
      {/* <div className="blogimage">
        <img src={blogimage} alt="" className="w-full" />
      </div> */}

      <div className="flex flex-wrap  ">
        <div className={`right-container  mt-28 w-full lg:w-7/12 p-6 ${theme ==='dark'?'text-white ':"text-black"}`}>
          {data.map((v, i) => (
            <div key={i} className="postdata p-6 border-2 rounded-xl mb-8">
              <img src={v.image} alt="" className="w-full rounded-lg mb-6" />
              <h1 className="text-3xl lg:text-5xl font-sans text-center mt-6">{v.title}</h1>
              <p className="text-lg lg:text-2xl mt-6">{v.description}</p>
              <div className="text-center mt-8">
                <a href="" className="text-blue-600 text-xl">Read More →</a>
              </div>
            </div>
          ))}
        </div>

        <div className="left-container w-full lg:w-5/12 p-4 ">
          <div className="recents mt-16 text-center">
            <h1 className="text-4xl font-sans underline underline-offset-8 text-blue-700">Recent Posts</h1>
            {recent.map((v, i) => (
              <div key={i} className={`p-4 mt-4 ${theme ==='dark'?'text-blue-500 border-2 bg-gray-900 border-violet-300 rounded-lg':'text-black'} `}>
                <div className="flex">
                  <img src={v.image} alt="" className="rounded-lg object-cover w-24 h-24 mr-4 " />
                  <h2 className="text-lg lg:text-xl font-sans text-start ">{v.title}</h2>
                 
                </div>
                <div className="text-center mt-2">
                <h2 className="text-sm font-bold ">Published Date: {v.publishedDate}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className={`categories mt-16 ${theme ==='dark'?'text-blue-600 ':''}` }>
            <h1 className={`text-blue-700 text-4xl font-sans mt-10 text-center underline underline-offset-8`}>Categories</h1>
            <ul className={`mt-10 pt-4 p-4 text-xl lg:text-2xl font-sans    rounded space-y-3 ${theme==='dark'?'border border-black':'border-4'}`}>
              <li className="border-2 border-blue-400 p-4 rounded-lg hover:bg-blue-500">Health <span className="text-xl lg:text-4xl">→</span></li>
              <li className="border-2 border-blue-400 p-4 rounded-lg hover:bg-blue-500">Education <span className="text-xl lg:text-4xl">→</span></li>
              <li className="border-2 border-blue-400 p-4 rounded-lg hover:bg-blue-500">Entertainment <span className="text-xl lg:text-4xl">→</span></li>
              <li className="border-2 border-blue-400 p-4 rounded-lg hover:bg-blue-500">Medical Tips <span className="text-xl lg:text-4xl">→</span></li>
              <li className="border-2 border-blue-400 p-4 rounded-lg hover:bg-blue-500">Technology Updates <span className="text-xl lg:text-4xl">→</span></li>
              <li className="border-2 border-blue-400 p-4 rounded-lg hover:bg-blue-500">Artificial Intelligence <span className="text-xl lg:text-4xl">→</span></li>
            </ul>
          </div>
          <div className={`followus mt-20 ${theme ==='dark'?'text-white':'text-black'}`} >
            <h1 className='text-4xl text-center text-blue-600 font-sans underline underline-offset-8' >Follow Us</h1>
            <div className='social-btn mt-10'>
      <div className='gap-20 text-center flex justify-center'>
        <button className='text-4xl hover:text-5xl transition-colors duration-300 ease-in-out transform hover:scale-110' title='Facebook'>
          <FaFacebook className='text-blue-500 hover:text-blue-700' size={80} />
          <p className='mt-2 font-sans text-sm '>Facebook</p>
        </button>
        <button className='text-4xl hover:text-5xl transition-colors duration-300 ease-in-out transform hover:scale-110' title='YouTube'>
          <FaYoutube className='text-red-500 hover:text-red-700' size={80} />
          <p className='mt-2 font-sans text-sm '>Youtube</p>
        </button>
        <button className='text-4xl hover:text-5xl transition-colors duration-300 ease-in-out transform hover:scale-110' title='Discord'>
          <FaDiscord className='text-purple-500 hover:text-purple-700' size={80} />
          <p className='mt-2 font-sans text-sm '>Discord</p>
        </button>
      </div>
      <div className='gap-20 text-center mt-20 flex justify-center'>
        <button className='text-4xl hover:text-5xl transition-colors duration-300 ease-in-out transform hover:scale-110' title='Twitter'>
          <FaTwitter className='text-blue-300 hover:text-blue-500' size={80} />
          <p className='mt-2 font-sans text-sm '>Twitter</p>
        </button>
        <button className='text-4xl hover:text-5xl transition-colors duration-300 ease-in-out transform hover:scale-110' title='LinkedIn'>
          <FaLinkedin className='text-blue-500 hover:text-blue-700' size={80} />
          <p className='mt-2 font-sans text-sm '>Linkedin</p>
        </button>
        <button className='text-4xl hover:text-5xl transition-colors duration-300 ease-in-out transform hover:scale-110' title='GitHub'>
          <FaGithub className='text-gray-500 hover:text-gray-700' size={80} />
          <p className='mt-2 font-sans text-sm '>Github</p>
        </button>
      </div>
    
    
             
             
           

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
