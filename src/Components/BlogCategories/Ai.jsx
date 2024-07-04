import React, { useEffect, useState } from 'react';
import AI from "../../temporardata/ai"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
// import { useTheme } from '../../../ThemeContext';

const Ai = () => {
  const { theme } = useSelector(state => state.theme); 
  // const {theme} = useTheme()

  const [flipped, setFlipped] = useState(Array(AI.length).fill(false));

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
      once: true, // Whether animation should happen only once
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
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 gap-y-44  gap-x-9">
      {AI.map((item, index) => (
        <div
          key={index}
          className="relative w-full h-72"
          onClick={() => handleFlip(index)}
          data-aos="fade-up" // AOS animation type
        >
          <div className={` w-full h-full mb-5  transition-transform duration-500 transform ${flipped[index] ? 'rotate-y-180' : ''} hover:scale-105`}>
            <div className='bg-white shadow-lg   justify-start   rounded-lg overflow-hidden '>
              <img className="w-full h-56 object-cover object-center" src={item.image} alt={item.title} />
              <div className={`p-4  hover:text-blue-600 ${theme === 'dark' ? 'bg-gray-900 text-white rounded-lg border-2 border-black' : 'bg-white text-black border border-gray-300'}`}>
              <h2 className="text-l font-sans text-black-600 cursor-pointer overflow-hidden h-16">{item.title}</h2>
              <p className={`text-sm text-black ${theme ==='dark'? 'text-white':'text-black'}`}>{item.description}</p>

                <div className='flex items-center   mt-2'>
                  <img className="w-8  h-8 rounded-full mr-2" src={item.profile_icon} alt={item.person_name} />
                  <p className={`text-sm flex  ${theme ==="dark"? 'text-blue-400':'text-gray-700'}` }>{item.person_name}</p>

                </div>
                <p  className={`text-sm  mt-4 flex  ${theme ==="dark"? 'text-blue-400':'text-gray-700'}` }>Published Date: {item.published_date}</p>

              </div>
            </div>
          </div>
          <div className={`absolute w-full h-full transition-transform duration-500 transform ${flipped[index] ? 'rotate-y-0' : 'rotate-y-180'}`}>
        

            
            
            </div>
          </div>
        
      ))}
    </div>
  );
}

export default Ai;
