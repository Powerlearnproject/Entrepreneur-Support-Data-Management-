import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalFundsSection from '../components/TotalFundsSection';
import AllFundsTable from '../components/AllFundsTable';
import EntrepreneurFundFilter from '../components/EntrepreneurFundFilter';
import AddFundForm from '../components/AddFundForm';
import { getAllFunds } from "../services/fundApi"; // Ensure correct casing!

const AdminFundPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleViewAll = async () => {
    try {
      const response = await getAllFunds();
      setFunds(response.data); // ✅ This works now
    } catch (error) {
      console.error("Error fetching all funds:", error);
    }
  }; // ✅ You were missing this closing brace

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get('/api/funds'); // Or replace with getAllFunds() for consistency
        setFunds(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load funds.');
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  if (loading) return <div className="p-4">Loading funds...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Funds Management</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={handleViewAll} className="bg-blue-600 text-white px-4 py-2 rounded">View All</button>
        <button onClick={() => setActiveTab('total')} className="btn">Total Disbursed</button>
        <button onClick={() => setActiveTab('by-entrepreneur')} className="btn">Track by Entrepreneur</button>
        <button onClick={() => setActiveTab('add')} className="btn">Add New</button>
      </div>

      {activeTab === 'all' && <AllFundsTable funds={funds} />}
      {activeTab === 'total' && <TotalFundsSection funds={funds} />}
      {activeTab === 'by-entrepreneur' && <EntrepreneurFundFilter funds={funds} />}
      {activeTab === 'add' && <AddFundForm />}
    </div>
  );
};

export default AdminFundPage;
