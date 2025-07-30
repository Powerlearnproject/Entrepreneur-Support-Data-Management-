// App.jsx
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
import EntrepreneurForm from './pages/EntrepreneurForm';
import EntrepreneurDetails from './pages/EntrepreneurDetails';
import Applications from './pages/Applications';
import ProtectedRoute from './components/ProtectedRoute';
import { isLoggedIn, logout, getUser } from './utils/auth';

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
          <Link to="/" className="btn btn-ghost normal-case text-xl">HEVA Data Management</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            {!loggedIn && <li><Link to="/apply">Apply</Link></li>}
            <li><Link to="/entrepreneurs-public">Entrepreneurs</Link></li>
            <li><Link to="/contact">Contact</Link></li>

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

            {loggedIn ? (
              <li><button className="btn btn-ghost" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/apply/confirmation" element={<ApplyConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/entrepreneurs-public" element={<EntrepreneursPublic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path="/entrepreneurs" element={<ProtectedRoute><Entrepreneurs /></ProtectedRoute>} />
        <Route path="/entrepreneurs/new" element={<ProtectedRoute><EntrepreneurForm /></ProtectedRoute>} />
        <Route path="/entrepreneurs/:id" element={<ProtectedRoute><EntrepreneurDetails /></ProtectedRoute>} />
        <Route path="/entrepreneurs/:id/edit" element={<ProtectedRoute><EntrepreneurForm /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

const App = () => <AppContent />;

export default App;
