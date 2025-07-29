import React, { useEffect, useState } from 'react';

const EntrepreneursPublic = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5000/api/entrepreneurs/approved');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch');
        setEntrepreneurs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEntrepreneurs();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-base-200">
      <div className="text-2xl font-bold mb-6 text-center">Approved Entrepreneurs</div>
      {loading && <div className="loading loading-spinner loading-lg"></div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Business Name</th>
                <th>Website</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {entrepreneurs.map(e => (
                <tr key={e._id}>
                  <td>{e.image && <img src={`http://localhost:5000/uploads/${e.image}`} alt="Logo" className="w-16 h-16 object-cover rounded" />}</td>
                  <td>{e.orgName || e.name}</td>
                  <td>{e.orgWebsite ? <a href={e.orgWebsite} className="link link-primary" target="_blank" rel="noopener noreferrer">{e.orgWebsite}</a> : 'N/A'}</td>
                  <td><a href={`mailto:${e.email}`} className="link link-primary">{e.email}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EntrepreneursPublic; 