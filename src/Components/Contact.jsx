import React, { useEffect } from 'react';
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import maps from "../../src/assets/maps.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import form from "../assets/form.jpg"

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up" className="container mx-auto px-4 flex-col py-8">
      <h1 className='text-6xl text-center font-semibold text-blue-600 underline-offset-4 underline'>Get In Touch</h1>
      <p className='text-xl text-center p-2 mt-2 text-gray-500'>
        Contact us to publish your content and show ads <br />to our website and get in good touch
      </p>
      <div className='mt-32 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        <div className='hover:border-blue-600 text-center'>
          <RiHomeOfficeFill className='text-blue-600 mx-auto hover:border-4 border-white' size={120} />
          <h2 className='mt-4'>Autoban road hyd <br /> Pakistan</h2>
        </div>
        <div className='text-center'>
          <MdAttachEmail className='text-blue-600 mx-auto hover:border-4' size={120} />
          <h2 className='mt-4'>blogsbe@gmail.com</h2>
        </div>
        <div className='text-center'>
          <FaPhoneAlt className='text-blue-600 mx-auto hover:border-4' size={120} />
          <h2 className='mt-4'>0222-111-000</h2>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex justify-center '>
          <img style={{ width: "1000px", height: "500px" }} className='w-full h-full object-cover' src={maps} alt="map" />
        </div>

        <div className='flex mt-10  '>
          <img   className=' flex justify-end  ' style={{width:"550px"}} src={form} alt="" />
        <form className="max-w-lg mx-auto mt-20  ">
        <h1 className='items-center flex justify-center font-semibold mt-7 text-3xl text-blue-600 underline underline-offset-8'>Fill Out The Form To Reach Us </h1>

        <div className="mb-6 text-blue-600 flex mt-20 w-auto  gap-7">
          <label htmlFor="name" className="block  text-lg font-semibold mb-2 gap-4">Name</label>
          <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded-lg border border-blue-500 focus:outline-none focus:border-blue-600" />
          <label htmlFor="name" className="block  text-lg font-semibold mb-2">Email</label>
          <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded-lg border border-blue-500 focus:outline-none focus:border-blue-600" />
        </div>
        <div className="mb-6 flex gap-7 text-blue-600 ">
          <label htmlFor="email" className="block  text-lg font-semibold mb-2 gap-4">Phone</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-lg border border-blue-500 focus:outline-none focus:border-blue-600" />
          <label htmlFor="email" className="block  text-lg font-semibold mb-2">Subject</label>
          <input type="text" id="subject" name="subject" className="w-full px-4 py-2 rounded-lg border border-blue-500 focus:outline-none focus:border-blue-600" />
        </div>
        <div className="mb-6 gap-7 text-blue-600">
          <label htmlFor="message" className="block  text-lg font-semibold mb-2">Message</label>
          <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 rounded-lg border border-blue-500 focus:outline-none focus:border-blue-600"></textarea>
        </div>
        <div className="text-center gap-7" >
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Submit</button>
        </div>
      </form>
      
      </div>
      </div>
    </div>
  );
}

export default Contact;
