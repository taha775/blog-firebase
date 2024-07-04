import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { theme } = useSelector(state => state.theme);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'gray-300' : 'myorange'} px-4 py-8 sm:px-24 lg:px-4 mt-8 sm:max-w-xl md:max-w-full md:mx-auto lg:max-screen-xl md:mt-20 md:py-16`}>
      <div className="grid gap-8 lg:grid-cols-6 ">
        {/* Categories */}
        <div className="grid gap-5 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className={`font-myfont text-base tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Category</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">News</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">World</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Games</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">References</a></li>
            </ul>
          </div>
          <div>
            <p className={`font-myfont text-base tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Apples</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Web</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">eCommerce</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Business</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Entertainment</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Portfolio</a></li>
            </ul>
          </div>
          <div>
            <p className={`font-myfont text-base tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Cherry</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Media</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Brochure</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Nonprofit</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Education</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Projects</a></li>
            </ul>
          </div>
          <div>
            <p className={`font-myfont text-base tracking-wide ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Business</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Infopreneur</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Personal</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Webkit</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Forum</a></li>
              <li><a href="/" className="transition-colors duration-300 hover:text-orange-600">Projects</a></li>
            </ul>
          </div>
        </div>
        {/* Subscriptions */}
        <div className={`lg:col-span-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} py-8 lg:py-0`}>
          <p className=" font-myfont text-base mb-4">Subscribe for updates</p>
          <form className="flex flex-col md:flex-row">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="flex-grow h-12 px-4 mb-3 mr-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-purple-400 focus:outline-none"
            />
            <button
              type="submit"
              className={`inline-flex items-center justify-center h-12 px-6 font-myfont text-base tracking-wide text-white bg-myorange transition duration-200 rounded shadow-md hover:bg-orange-500 focus:outline-none ${theme === 'dark' ? 'text-blue-600' : 'text-gray-700'}`}
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-700">Stay updated with our latest news and announcements. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, excepturi eveniet. Quidem eaque, eligendi, sequi temporibus quisquam a provident id repellendus itaque voluptate ipsam perspiciatis adipisci explicabo consectetur, harum omnis.</p>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className={`flex flex-col items-center justify-between pt-5  border-t border-gray-300 sm:flex-row ${theme === 'dark' ? 'bg-gray-800 text-my' : 'bg-white text-black'}`}>
        <p className="text-lg">&copy; Copyright 2024 | All rights reserved.</p>
        
        <div className="flex mt-4 space-x-4">
          <a href="/" className="transition-all duration-300 hover:text-myorange"><FaTwitter className="h-6 w-6" /></a>
          <a href="/" className="transition-all duration-300 hover:text-myorange"><FaFacebook className="h-6 w-6" /></a>
          <a href="/" className="transition-all duration-300 hover:text-myorange"><FaInstagram className="h-6 w-6" /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
