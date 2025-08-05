import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Apply from './pages/Apply';
import ApplyConfirmation from './pages/ApplyConfirmation';
import Contact from './pages/Contact';
import EntrepreneursPublic from './pages/EntrepreneursPublic';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Entrepreneurs from './pages/Entrepreneurs';
import EntrepreneurInfo from './pages/EntrepreneurInfo';
import Applications from './pages/Applications';
import ProtectedRoute from './components/ProtectedRoute';
import { isLoggedIn, logout, getUser } from './utils/auth';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import UpdatePassword from './pages/UpdatePassword';
import UpdateApplication from './pages/UpdateApplication';

const AppContent = () => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getUser();
 

  const handleLogout = () => {
  logout(); 
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow mb-6">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
           EmpowerBridge
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {!loggedIn && (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/apply">Apply</Link></li>
                <li><Link to="/entrepreneurs-public">Entrepreneurs</Link></li>
              </>
            )}
           

            {loggedIn && user?.role === 'admin' && (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/applications">Applications</Link></li>
                <li><Link to="/entrepreneurs">Manage Entrepreneurs</Link></li>
              </>
            )}

            {loggedIn && user?.role === 'entrepreneur' && (
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}

             {loggedIn && user?.role === 'entrepreneur' && (
               <li><Link to="/update-password">Update Password</Link></li>
            )}


              {loggedIn && user?.role === 'entrepreneur' && (   
              <li>
              <Link to={`/update-application/${user.userId}`}>Update Profile</Link>
              </li>
            
              )}

              <li><Link to="/contact">Contact</Link></li>

            {loggedIn ? (
              <li><button className="btn btn-ghost" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}

           

          </ul>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<PublicOnlyRoute><Home /></PublicOnlyRoute>} />
        <Route path="/apply" element={<PublicOnlyRoute><Apply /></PublicOnlyRoute>} />
        <Route path="/entrepreneurs-public" element={<PublicOnlyRoute><EntrepreneursPublic /></PublicOnlyRoute>} />
        <Route path="/apply/confirmation" element={<ApplyConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path="/entrepreneurs" element={<ProtectedRoute><Entrepreneurs /></ProtectedRoute>} />
        <Route path="/entrepreneurs/approved/:id" element={<PublicOnlyRoute><EntrepreneurInfo /></PublicOnlyRoute>} />
        <Route path="/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route path="/update-application/:id" element={<ProtectedRoute><UpdateApplication /></ProtectedRoute>} />
         <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

const App = () => <AppContent />;

export default App;
