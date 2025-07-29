import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../utils/auth';

const EntrepreneurForm = () => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      // Fetch entrepreneur data for editing
      const fetchEntrepreneur = async () => {
        setLoading(true);
        setError('');
        try {
          const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Failed to fetch');
          setName(data.name || '');
          setBusinessName(data.businessName || '');
          setContactInfo(data.contactInfo || '');
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchEntrepreneur();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('businessName', businessName);
      formData.append('contactInfo', contactInfo);
      if (image) formData.append('image', image);
      const url = id
        ? `http://localhost:5000/api/entrepreneurs/${id}`
        : 'http://localhost:5000/api/entrepreneurs';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save');
      navigate('/entrepreneurs');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{editMode ? 'Edit' : 'Add'} Entrepreneur</h2>
          {error && <div className="alert alert-error mb-2">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="name" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Business Name</span>
              </label>
              <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="business name" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Contact Info</span>
              </label>
              <input type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)} placeholder="contact info" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Logo/Image</span>
              </label>
              <input type="file" className="file-input file-input-bordered w-full" onChange={e => setImage(e.target.files[0])} accept="image/*" />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Saving...' : (editMode ? 'Update' : 'Save')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurForm; 