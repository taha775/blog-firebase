import React, { useState } from 'react';
import latest from "../../assets/Latest.jpeg";
import data from "../../temporardata/data.js";
import Ai from "../BlogCategories/Ai.jsx";
import Education from "../BlogCategories/Education.jsx";
import Entertainment from "../BlogCategories/Entertainment.jsx";
import Health from "../BlogCategories/Health.jsx";
import Technology from "../BlogCategories/Technology.jsx";
import { useTheme } from '../../../ThemeContext.jsx';
import { useSelector } from 'react-redux';

const Blogs = () => {
  const { theme } = useSelector(state => state.theme); 
  const [selectedCategory, setSelectedCategory] = useState('ai');

  const showCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='flex-col mt-12'>
        <div className='text-center mb-10'>
          <h1 className='text-5xl font-sans font-bold underline md:underline-offset-4 text-blue-600'>Blog Categories</h1>
        </div>
        <div className='mt-12 space-x-3 btn font-sans font-semibold flex justify-center flex-wrap gap-4'>
          <button
            onClick={() => showCategory('ai')}
            className={`shadow-md rounded-lg px-4 py-2 ${
              selectedCategory === 'ai' ? 'bg-white  border-2 text-blue-600 border-blue-600' : 'bg-blue-600 text-white border-blue-'
            } hover:bg-white hover:text-blue-600 hover:border-blue-600 transition duration-220 ease`}
          >
            AI
          </button>
          <button
            onClick={() => showCategory('technologies')}
            className={`shadow-md rounded-lg px-4 py-2 ${
              selectedCategory === 'technologies' ? 'bg-white  border-2 text-blue-600 border-blue-600' : 'bg-blue-600 text-white border-transparent'
            } hover:bg-white hover:text-blue-600 hover:border-blue-600 transition duration-220 ease`}
          >
            TECHNOLOGIES 
          </button>
          <button
            onClick={() => showCategory('health')}
            className={`shadow-md rounded-lg px-4 py-2 ${
              selectedCategory === 'health' ? 'bg-white  border-2 text-blue-600 border-blue-600' : 'bg-blue-600 text-white border-transparent'
            } hover:bg-white hover:text-blue-600 hover:border-blue-600 transition duration-220 ease`}
          >
            HEALTH
          </button>
          <button
            onClick={() => showCategory('education')}
            className={`shadow-md rounded-lg px-4 py-2 ${
              selectedCategory === 'education' ? 'bg-white border-2 text-blue-600 border-blue-600' : 'bg-blue-600 text-white border-transparent'
            } hover:bg-white hover:text-blue-600 hover:border-blue-600 transition duration-220 ease`}
          >
            EDUCATION
          </button>
          <button
            onClick={() => showCategory('entertainment')}
            className={`shadow-md rounded-lg px-4 py-2 ${
              selectedCategory === 'entertainment' ? 'bg-white border-2 text-blue-600 border-blue-600' : 'bg-blue-600 text-white border-transparent'
            } hover:bg-white hover:text-blue-600 hover:border-blue-600 transition duration-220 ease`}
          >
            ENTERTAINMENT
          </button>
        </div>
        {selectedCategory === 'ai' && <Ai />}
        {selectedCategory === 'health' && <Health />}
        {selectedCategory === 'education' && <Education />}
        {selectedCategory === 'technologies' && <Technology />}
        {selectedCategory === 'entertainment' && <Entertainment />}
      </div>

      <div className='flex flex-wrap -mx-4 mt-60'>
        <div className='w-full md:w-1/2 px-4 scale-x-105 mb-8 md:mb-0'>
          <img className='w-full mt-24 h-auto object-cover rounded-lg shadow-lg' src={latest} alt="Latest News" />
        </div>
        <div className='w-full md:w-1/2 px-4'>
          <h1 className='text-center mb-8 text-5xl underline font-bold text-blue-600'>NEWS</h1>
          <div className='overflow-y-auto h-96 pr-2 '>
            {data.map((item, index) => (
              <div key={index} className={` shadow-md rounded-lg mb-4 p-4' ${theme ==='dark'?'bg-black border border-violet-400 ' :'bg-white'}  `}>
                <div className='p-4 '>
                  <h5 className='text-lg font-semibold mb-1'>{item.title}</h5>
                  <p className='text-sm text-blue-400 mb-1'>Published Date: {item.published_date}</p>
                  <p className='text-sm font-semibold text-yellow-500 mb-1'>By: {item.person_name}</p>
                  <p className={`text-sm  ${theme ==='dark'?'text-blue-600':' text-gray-500'} `}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="popular">
        <h1></h1>
      </div>
    </div>
  );
};

export default Blogs;
