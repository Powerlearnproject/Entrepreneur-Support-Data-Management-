import axios from 'axios';

import React, { useEffect, useState } from 'react';

const TotalFundsSection = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/funds/total");
        setTotalAmount(res.data.totalAmount || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch total disbursed funds.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, []);

  if (loading) return <p>Loading total funds...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Total Funds Disbursed</h2>
      <p className="text-3xl font-bold text-green-600">Ksh {totalAmount.toLocaleString()}</p>
    </div>
  );
};

export default TotalFundsSection;
