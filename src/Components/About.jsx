import React from 'react';
import aboutimg from "../assets/aboutimg.jpg";
import { Link } from 'react-router-dom';
import meeting from "../assets/meeting.jpg";
// import { useTheme } from '../../ThemeContext';
import { useSelector } from 'react-redux';

const AboutUs = () => {
    const { theme } = useSelector(state => state.theme); 
    return (
        <div className="container mx-auto px-4 py-8">
            {/* About Content */}
            <div className="about-content">
                {/* About Main */}
                <div className="about-main">
                    <div className={`about-heading ${theme ==='dark'?'text-myorange':'text-black'} `}>
                        <h1 className={`text-4xl lg:text-6xl font-bold text-center mb-8 ${theme ==='dark'?'text-white':'text-black'} `}>About <span className="text-gray-300">Us</span></h1>
                        <p className="text-lg lg:text-xl  leading-relaxed max-w-3xl mx-auto text-center font-sans">Our mission is to inspire and guide you towards a healthier and happier lifestyle through informative and engaging content.</p>
                    </div>
                    <hr className="my-8 border-b-2 border-blue-500" />

                    <div className='flex items-center justify-center'>
                        <img className='w-full max-w-6xl' src={aboutimg} alt="About us" />
                    </div>

                    <div className='container mt-10'>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                            <div className='text-center lg:text-left'>
                                <h1 className={`text-3xl lg:text-5xl mb-8 font-sans ${theme ==='dark'?'text-white':'text-black'} `}>How we Help Our Clients</h1>
                                <Link to="/contact" className="inline-block text-2xl lg:text-3xl bg-blue-600 text-white rounded-lg px-6 py-4 hover:bg-white hover:text-myorange border border-transparent hover:border-blue-600 transition duration-200 ease-in-out">Contact us →</Link>
                            </div>

                            <p className={`text-lg lg:text-xl font-sans text-center lg:text-left  ${theme ==='dark'?'text-gray-300':'text-black'} `}>At BE Blogs we believe in the power of knowledge, authenticity, and community. Our content is guided by these principles, ensuring you receive trustworthy and heartfelt advice.<br /><br />We love connecting with our readers! Feel free to leave comments, share your thoughts, or reach out to us directly at [contact information]. Don't forget to subscribe to our newsletter and follow us on social media platforms to stay updated with our latest posts and exclusive content.</p>
                        </div>
                    </div>

                    <div className='container mt-10'>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-8">
                            <img className='w-full lg:mr-56 max-w-lg mx-auto' src={meeting} alt="Meeting" />
                            <div className='text-center lg:text-left'>
                                <h1 className={`text-3xl lg:text-5xl mb-8 font-sans ${theme ==='dark'?'text-gray-300':'text-black'} `}>Dream until your dream comes true</h1>
                                <Link to="/contact" className="inline-block text-2xl lg:text-3xl bg-blue-600 text-white rounded-lg px-6 py-4 hover:bg-white hover:text-myorange border border-transparent hover:border-blue-600 transition duration-200 ease-in-out">Read more →</Link>
                            </div>
                        </div>
                    </div>

                    {/* About Details */}
                    <hr className="my-8 border-b-2 border-blue-500" />
                    <div className={`about-details  ${theme ==='dark'?'text-gray-300':'text-black'} `}>
                        <div className="container">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Section 1: Our Story */}
                                <div className="about-section">
                                    <h2 className="text-2xl lg:text-3xl font-sans mb-4">Our Story</h2>
                                    <p className="text-lg lg:text-xl  leading-relaxed">We are a passionate team of bloggers dedicated to sharing valuable content with our audience. Our journey began in [year] with a mission to [mission statement].</p>
                                </div>

                                {/* Section 2: Our Values */}
                                <div className="about-section">
                                    <h2 className="text-2xl lg:text-3xl font-sans mb-4">Our Values</h2>
                                    <p className="text-lg lg:text-xl  leading-relaxed">At [Website Name], we prioritize integrity, authenticity, and creativity in everything we do. We believe in fostering a community of [describe community] and empowering our readers to [describe empowerment goal].</p>
                                </div>

                                {/* Section 3: Meet Our Team */}
                                <div className="about-section">
                                    <h2 className="text-2xl lg:text-3xl font-sans mb-4">Meet Our Team</h2>
                                    <p className="text-lg lg:text-xl  leading-relaxed">Our team consists of skilled writers, editors, and designers who are passionate about [topic]. Together, we strive to deliver engaging content that resonates with our audience.</p>
                                </div>

                                {/* Section 4: Contact Us */}
                                <div className="about-section">
                                    <h2 className="text-2xl lg:text-3xl font-sans mb-4">Contact Us</h2>
                                    <p className="text-lg lg:text-xl  leading-relaxed">If you have any questions, suggestions, or collaboration inquiries, feel free to reach out to us at [contact email or form link]. We'd love to hear from you!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
