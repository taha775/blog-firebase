import React from 'react';
import { useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import ctimg1 from '../../assets/ctimg1.png';

const Banner = () => {
  const { theme } = useSelector(state => state.theme);

  return (
    <div className={` ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} container mx-auto  p-4 md:p-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Left Column (Content) */}
        <div className="flex flex-col justify-center mt-3">
          <p className={`font-bold text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>Related: <span className='text-myorange'>News</span></p>
          <div className="mt-4">
            <h1 className={`text-3xl md:text-5xl font-bold leading-tight ${theme ==="dark"? "text-gray-300" :"text-black"}  text-gray-300 `}>
              Israel Is <span className="text-myorange">Rocked</span> By Sirens As
              Iran <span className="text-myorange">Launches Dozens</span> Of
              Ballistic <span className="text-myorange">Missiles</span>
            </h1>
            <div className={`flex gap-4 mt-2 md:mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
              <p className="text-base gap-2 flex items-center md:text-lg">
                <CgProfile /> Travis
              </p>
              <p className="text-base gap-2 flex items-center md:text-lg">
                <CgProfile /> 12 APR 2024
              </p>
            </div>
            <p className={`text-base md:text-lg mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
              On 1 April 2024, an Israeli airstrike destroyed the Iranian consulate annex building
              adjacent to the Iranian embassy in Damascus, Syria, killing 12 people, including a
              senior Quds Force commander of the Islamic Revolutionary Guard Corps (IRGC), Brigadier
              General Mohammad Reza Zahedi and seven other IRGC officers. Israel does
              not claim responsibility for the .....{' '}
              <span className="text-myorange">Read More</span>
            </p>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="lg:absolute relative h-80 md:h-auto">
          <img className="object-cover w-full h-full" src={ctimg1} alt="Banner Image" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
