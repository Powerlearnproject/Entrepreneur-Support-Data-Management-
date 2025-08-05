import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/Api';

const EntrepreneurInfo = () => {
  const { id } = useParams();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEntrepreneur = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/entrepreneurs/approved/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch');
      setEntrepreneur(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntrepreneur();
  }, [id]);

  return (
    <>
    <div className="p-8 max-w-3xl mx-auto">
      <div className="text-2xl font-bold mb-6">Entrepreneur Profile</div>

      {loading && <div className="loading loading-spinner loading-lg"></div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}

      {!loading && !error && entrepreneur && (
        <>
        <div className="card bg-base-100 shadow-xl p-6">
          <div className="flex flex-col items-center gap-4">
            {entrepreneur.image && (
              <img
                src={`http://localhost:5000/uploads/${entrepreneur.image}`}
                alt={entrepreneur.businessName}
                className="w-40 h-40 object-cover rounded-full shadow"
              />
            )}

            <div className="text-center">
              <h2 className="text-xl font-semibold">{entrepreneur.businessName}</h2>
              <p className="text-gray-600">{entrepreneur.businessName}</p>
              <p className="text-gray-500 text-sm mt-1">{entrepreneur.contactInfo}</p>
            </div>

            <div className="mt-6">
              <a
                href={`https://paystack.com/pay/support-${entrepreneur._id}`} // Update with your actual Paystack link
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                💖 Support This Entrepreneur
              </a>
            </div>

          </div>
        </div>



          <div className="card w-full bg-base-100 card-lg shadow-sm mt-3 mb-2">
            <div className="card-body">
              <h2 className="card-title">Support we require</h2>
              <p>
              {entrepreneur.supportNeeds}
                </p>
            </div>
          </div>


           <div className="card w-full bg-base-100 card-lg shadow-sm mt-3 mb-2">
            <div className="card-body">
              <h2 className="card-title">Short and long term plans</h2>
              <p>
              {entrepreneur.plans}
                </p>
            </div>
          </div>



      
        </>


      )}
    </div>




    </>
  );
};

export default EntrepreneurInfo;
