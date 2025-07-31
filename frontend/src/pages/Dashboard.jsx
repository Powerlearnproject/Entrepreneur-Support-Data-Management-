import React from 'react';
import { getUser } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const user = getUser();
  const navigate = useNavigate(); 

  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-6">Welcome, {user?.name}!</div>

      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Applications */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Applications</h2>
              <p>Review and manage entrepreneur applications</p>
              <div className="card-actions justify-end">
                <Link to="/applications" className="btn btn-primary">View Applications</Link>
              </div>
            </div>
          </div>

          {/* Entrepreneurs */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Entrepreneurs</h2>
              <p>Manage entrepreneur profiles and data</p>
              <div className="card-actions justify-end">
                <Link to="/entrepreneurs" className="btn btn-primary">Manage Entrepreneurs</Link>
              </div>
            </div>
          </div>

          {/* Public View */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Public View</h2>
              <p>See how entrepreneurs appear to the public</p>
              <div className="card-actions justify-end">
                <Link to="/entrepreneurs-public" className="btn btn-primary">View Public Page</Link>
              </div>
            </div>
          </div>

          {/*  Track Funds */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title"> Track Funds</h2>
              <p>Monitor how much funds have been disbursed to entrepreneurs.</p>
              <div className="card-actions justify-end">
                <Link to="/admin/funds" className="btn btn-primary">View Funds</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entrepreneur view */}
      {user?.role === 'entrepreneur' && (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>Welcome to your HEVA dashboard! Your profile is now live and visible to potential supporters and partners.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
