import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
    <div className="max-w-2xl text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to HEVA Management</h1>
      <p className="mb-4 text-lg">
        HEVA empowers entrepreneurs by providing funding, mentorship, and business support. We help you grow your business, connect with investors, and access real-time resources to succeed.
      </p>
      <p className="mb-4 text-lg">
        <span className="font-semibold">Why join HEVA?</span> <br/>
        - Access to funding and business support<br/>
        - Real-time updates and transparent fund management<br/>
        - Connect with a network of successful entrepreneurs and investors<br/>
        - Get mentorship and guidance from industry experts
      </p>
      <Link to="/apply" className="btn btn-primary btn-lg mt-4">Apply as an Entrepreneur</Link>
    </div>
  </div>
);

export default Home; 