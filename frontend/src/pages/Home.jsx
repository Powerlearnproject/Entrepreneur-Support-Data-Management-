import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import About from '../components/About';
import Testimonial from '../components/Testimonial';
const Home = () => (
  <>
    {/* Hero Section */}
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Empowering Entrepreneurs Across Africa</h1>
          <p className="mb-5">
            Unlock funding, mentorship, and tailored support to grow your creative or impact-driven enterprise.
          </p>
          <Link to="/apply" className="btn btn-primary">
            Apply to Join HEVA
          </Link>
        </div>
      </div>
    </div>

 
 <AboutSection />
    

    {/* About Section */}
    <div className="bg-base-200 py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/171/717/original/Business_Photos_-_Download_Free_High-Quality_Pictures___Freepik.jpeg?1754409967"
          alt="HEVA Impact"
          className="w-full rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">About HEVA Management</h2>
          <p className="mb-4 text-lg">
            <strong>HEVA Management</strong> is dedicated to supporting entrepreneurs at every stage of their journey. We provide access to funding, expert mentorship, and a vibrant network to help your business thrive. Our mission is to unlock your potential and accelerate your growth.
          </p>
          <div className=" p-4">
            <h3 className="text-xl font-semibold mb-2">Why Join HEVA?</h3>
            <ul className="list-disc list-inside text-base">
              <li>Access to exclusive funding opportunities</li>
              <li>Mentorship from industry leaders</li>
              <li>Community of like-minded entrepreneurs</li>
              <li>Transparent and real-time fund management</li>
              <li>Showcase your business to partners and supporters</li>
            </ul>
          </div>
         
        </div>
      </div>
    </div>

  

    <About />

   <Testimonial />
   

    {/* Footer */}
    <Footer />
  </>
);

export default Home;
