import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import About from '../components/About';
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
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/168/307/original/screencapture-localhost-8000-acc-home-2025-06-17-12_50_49.png?1750159724"
          alt="HEVA Impact"
          className="w-full rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">About HEVA Management</h2>
          <p className="mb-4 text-lg">
            <strong>HEVA Management</strong> is dedicated to supporting entrepreneurs at every stage of their journey. We provide access to funding, expert mentorship, and a vibrant network to help your business thrive. Our mission is to unlock your potential and accelerate your growth.
          </p>
          <div className="bg-white p-4 rounded-lg shadow">
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

    {/* Testimonials Section */}
    <div className="py-12 px-4 bg-white">
      <h2 className="text-center text-3xl font-bold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Testimonial 1 */}
        <div className="card bg-base-100 shadow-sm p-6">
          <div className="card-body items-center text-center">
            <div className="avatar mb-4">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Testimonial 1" />
              </div>
            </div>
            <p>
              The mentorship from HEVA was priceless. We now have a clearer growth strategy, and we’re running more efficiently than ever before.
            </p>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="card bg-base-100 shadow-sm p-6">
          <div className="card-body items-center text-center">
            <div className="avatar mb-4">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Testimonial 2" />
              </div>
            </div>
            <p>
              HEVA believed in our vision when others didn't. The funding we received helped us acquire essential equipment and expand to new regions.
            </p>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="card bg-base-100 shadow-sm p-6">
          <div className="card-body items-center text-center">
            <div className="avatar mb-4">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Testimonial 3" />
              </div>
            </div>
            <p>
              Before HEVA, we had ideas but lacked the structure and funding to scale. Within six months, we had clarity, capital, and mentorship that changed the trajectory of our business.
            </p>
          </div>
        </div>

      </div>
    </div>

   

    {/* Footer */}
    <Footer />
  </>
);

export default Home;
