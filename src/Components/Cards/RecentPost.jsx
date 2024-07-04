import React, { useEffect, useState } from 'react';
import data from "../../temporardata/data";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { ClockIcon } from '@radix-ui/react-icons';
import { CgProfile } from 'react-icons/cg';

const Recentpost = () => {
  const { theme } = useSelector(state => state.theme); 
  const [flipped, setFlipped] = useState(Array(data.length).fill(false));

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleFlip = (index) => {
    setFlipped(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className={`ml-2${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className="relative text-4xl font-myfont text-black text-center font-bold before:absolute before:top-1/2 before:left-16 before:w-[35%] before:h-[1px] before:bg-gray-600 before:content-[''] before:-translate-y-1/2 after:absolute after:top-1/2 after:right-16 after:w-[35%] after:h-[1px] after:bg-gray-600 after:content-[''] after:-translate-y-1/2">
        <span className={`${theme ==="dark" ?"text-gray-300" :"text-black"}`}> Recent Posts</span>
      </h1>
      <div className={`mx-auto my-8 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {data.map((item, index) => (
          <div
            key={index}
            className="relative transition-transform duration-500 transform hover:scale-105"
            onClick={() => handleFlip(index)}
            data-aos="fade-up"
          >
            <div className={`relative w-full h-auto shadow-lg rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
              <img className="object-cover ml-5 rounded-3xl mt-3 h-56 sm:h-64 md:h-72" src={item.image} alt={item.title} />
              <div className="p-4 ">
                <p className="text-sm font-myfont mt-2">Related: <span className="text-myorange font-bold">{item.related}</span></p>
                <h2 className="font-myfont font-bold text-xl sm:text-2xl cursor-pointer">{item.title}</h2>
                <p className="text-sm mt-2">{item.description}</p>
                <div className="flex items-center mt-2 justify-between">
                  <button className="bg-myorange font-myfont text-sm sm:text-[0.75rem] p-1 font-bold">Read More</button>
                  <div className={`flex items-center gap-2${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                    <p className={`text-[0.8rem] gap-1 flex items-center ${theme === "dark" ? 'text-gray-300' : 'text-gray-900'}`}><CgProfile  /> {item.person_name}</p>
                    <p className={`text-[0.8rem] flex gap-1 items-center ${theme === "dark" ? 'text-gray-300' : 'text-gray-900'}`}><ClockIcon /> {item.published_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recentpost;
