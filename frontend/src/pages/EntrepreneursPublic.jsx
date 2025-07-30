import React, { useEffect, useState } from 'react';
import API from '../utils/Api';
import Footer from '../components/Footer';

const EntrepreneursPublic = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API}/entrepreneurs/approved`);
        console.log(`${API}/entrepreneurs/approved`);
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
    <>
    <div className="p-8 min-h-screen bg-base-200">
      <div className="text-2xl font-bold mb-6 text-center">Entrepreneurs</div>

      {loading && <div className="loading loading-spinner loading-lg mx-auto"></div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}

      {!loading && !error && (
        entrepreneurs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entrepreneurs.map((e) => (
              <div key={e._id} className="card bg-base-100 shadow-sm">
                <figure>
                  <img
                    src={`http://localhost:5000/uploads/${e.image}`}
                    alt={`${e.orgName || e.name} logo`}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{e.orgName || e.name}</h2>
                  <p className="text-sm text-gray-600">{e.reason || 'No description provided.'}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    {e.orgWebsite && (
                      <div>
                        🌐{' '}
                        <a
                          href={e.orgWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                    <div>
                      📧{' '}
                      <a href={`mailto:${e.email}`} className="link link-primary">
                        {e.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10 text-lg">
            No entrepreneurs available at the moment.
          </div>
        )
      )}


    </div>

  <Footer />
  </>
  );
};

export default EntrepreneursPublic;
