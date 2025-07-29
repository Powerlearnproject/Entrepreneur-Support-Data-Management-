import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          {error && <div className="alert alert-error mb-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="name" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select className="select select-bordered" value={role} onChange={e => setRole(e.target.value)}>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 