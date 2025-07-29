import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
    <div className="max-w-2xl text-center">
      <h1 className="text-5xl font-extrabold mb-6">Empowering Entrepreneurs with HEVA Management</h1>
      <p className="mb-6 text-lg">
        <span className="font-semibold">HEVA Management</span> is dedicated to supporting entrepreneurs at every stage of their journey. We provide access to funding, expert mentorship, and a vibrant network to help your business thrive. Our mission is to unlock your potential and accelerate your growth.
      </p>
      <div className="mb-6 text-lg bg-base-100 rounded-lg shadow p-4">
        <h2 className="text-2xl font-bold mb-2">Why Join HEVA?</h2>
        <ul className="list-disc list-inside text-left mx-auto max-w-md">
          <li>Get access to exclusive funding opportunities for your business</li>
          <li>Receive mentorship and guidance from industry leaders</li>
          <li>Join a community of like-minded entrepreneurs and investors</li>
          <li>Benefit from transparent and real-time fund management</li>
          <li>Showcase your business to potential partners and supporters</li>
        </ul>
      </div>
      <p className="mb-6 text-lg">
        <span className="font-semibold">Ready to take your business to the next level?</span> Apply now to become part of the HEVA network. Once your application is approved by our admin team, your business will be featured on our platform, giving you visibility and access to support and funding.
      </p>
      <Link to="/apply" className="btn btn-primary btn-lg mt-4">Apply as an Entrepreneur</Link>
    </div>
  </div>
);

export default Home; 