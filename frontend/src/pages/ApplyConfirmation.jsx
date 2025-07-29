import React from 'react';
import { Link } from 'react-router-dom';

const ApplyConfirmation = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
    <div className="card w-full max-w-xl bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title mb-4">Application Received</h2>
        <p className="mb-4">Thank you for applying to HEVA! Your application has been received. We will review your submission and contact you via email with the next steps.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  </div>
);

export default ApplyConfirmation; 