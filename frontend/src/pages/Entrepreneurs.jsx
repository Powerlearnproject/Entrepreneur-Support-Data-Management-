import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import api from '../utils/Api';



const Entrepreneurs = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const navigate = useNavigate();

  const fetchEntrepreneurs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${api}/entrepreneurs`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch');
      setEntrepreneurs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntrepreneurs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entrepreneur?')) return;
    setDeletingId(id);
    setDeleteError('');
    try {
      const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete');
      await fetchEntrepreneurs();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Entrepreneurs</div>
      {loading && <div className="loading loading-spinner loading-lg"></div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {deleteError && <div className="alert alert-error mb-4">{deleteError}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Business</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entrepreneurs.map(e => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.businessName}</td>
                  <td>{e.contactInfo}</td>
                  <td>
                    <button className="btn btn-xs btn-info mr-2" onClick={() => navigate(`/entrepreneurs/${e._id}`)}>View</button>
                    <button className="btn btn-xs btn-warning mr-2" onClick={() => navigate(`/entrepreneurs/${e._id}/edit`)}>Edit</button>
                    <button className="btn btn-xs btn-error" onClick={() => handleDelete(e._id)} disabled={deletingId === e._id}>
                      {deletingId === e._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Entrepreneurs; 