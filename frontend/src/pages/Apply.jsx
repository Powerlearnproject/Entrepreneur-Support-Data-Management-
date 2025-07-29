import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
  const [form, setForm] = useState({
    email: '',
    orgName: '',
    orgWebsite: '',
    reasons: '',
    supportNeeds: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to submit application');
      navigate('/apply/confirmation');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Entrepreneur Application</h2>
          {error && <div className="alert alert-error mb-2">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-control mb-4">
              <label className="label">Image/Logo</label>
              <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full" onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">Email</label>
              <input type="email" name="email" className="input input-bordered" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">Organization Name</label>
              <input type="text" name="orgName" className="input input-bordered" value={form.orgName} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">Organization Website/Link</label>
              <input type="url" name="orgWebsite" className="input input-bordered" value={form.orgWebsite} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">Reasons for Joining HEVA</label>
              <textarea name="reasons" className="textarea textarea-bordered" value={form.reasons} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">Support/Funding Needs</label>
              <textarea name="supportNeeds" className="textarea textarea-bordered" value={form.supportNeeds} onChange={handleChange} required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply; 