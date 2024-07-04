import React, { useEffect, useState } from 'react';
import HEALTH from "../../temporardata/health"
import AOS from 'aos';
import 'aos/dist/aos.css';

const Health = () => {

  const [flipped, setFlipped] = useState(Array(HEALTH.length).fill(false));

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
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 gap-y-24  gap-x-9">
      {HEALTH.map((item, index) => (
        <div
          key={index}
          className="relative w-full h-72"
          onClick={() => handleFlip(index)}
          data-aos="fade-up" // AOS animation type
        >
          <div className={`absolute w-full h-full   transition-transform duration-500 transform ${flipped[index] ? 'rotate-y-180' : ''} hover:scale-105`}>
            <div className="bg-white shadow-lg   rounded-lg overflow-hidden">
              <img className="w-full h-56 object-cover object-center" src={item.image} alt={item.title} />
              <div className="p-4 h-auto hover:text-blue-600">
              <h2 className="text-lg font-sans text-black-600 cursor-pointer overflow-hidden h-16">{item.title}</h2>

                <div className="flex items-center   mt-2">
                  <img className="w-8  h-8 rounded-full mr-2" src={item.profile_icon} alt={item.person_name} />
                  <p className="text-sm flex text-gray-700">{item.person_name}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">Published Date: {item.published_date}</p>
              </div>
            </div>
          </div>
          <div className={`absolute w-full h-full transition-transform duration-500 transform ${flipped[index] ? 'rotate-y-0' : 'rotate-y-180'}`}>
        

              <p className="text-lg text-fuchsia-200 mt-2">{item.description}</p>
            
            </div>
          </div>
        
      ))}
    </div>
  );
}

export default Health;
