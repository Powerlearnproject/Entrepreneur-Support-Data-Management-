import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../utils/auth';
import API from '../utils/Api';


const EntrepreneurDetails = () => {
  const { id } = useParams();
  const [entrepreneur, setEntrepreneur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fund form state
  const [fundForm, setFundForm] = useState({ amount: '', date: '', usage: '', receipts: '' });
  const [editingFundIdx, setEditingFundIdx] = useState(null);
  const [editingFund, setEditingFund] = useState(null);
  const [fundLoading, setFundLoading] = useState(false);

  // Support form state
  const [supportForm, setSupportForm] = useState({ type: '', date: '', notes: '' });
  const [editingSupportIdx, setEditingSupportIdx] = useState(null);
  const [editingSupport, setEditingSupport] = useState(null);
  const [supportLoading, setSupportLoading] = useState(false);

  const fetchEntrepreneur = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/entrepreneurs/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch');
      setEntrepreneur(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntrepreneur();
    // eslint-disable-next-line
  }, [id]);

  // --- Funds ---
  const handleFundChange = e => setFundForm({ ...fundForm, [e.target.name]: e.target.value });
  const handleAddFund = async e => {
    e.preventDefault();
    setFundLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}/funds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...fundForm, receipts: fundForm.receipts ? [fundForm.receipts] : [] }),
      });
      if (!res.ok) throw new Error('Failed to add fund');
      setFundForm({ amount: '', date: '', usage: '', receipts: '' });
      fetchEntrepreneur();
    } catch (err) {
      alert(err.message);
    } finally {
      setFundLoading(false);
    }
  };
  const handleEditFund = idx => {
    setEditingFundIdx(idx);
    setEditingFund({ ...entrepreneur.funds[idx], receipts: entrepreneur.funds[idx].receipts?.[0] || '' });
  };
  const handleUpdateFund = async e => {
    e.preventDefault();
    setFundLoading(true);
    try {
      const fundId = entrepreneur.funds[editingFundIdx]._id;
      const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}/funds/${fundId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...editingFund, receipts: editingFund.receipts ? [editingFund.receipts] : [] }),
      });
      if (!res.ok) throw new Error('Failed to update fund');
      setEditingFundIdx(null);
      setEditingFund(null);
      fetchEntrepreneur();
    } catch (err) {
      alert(err.message);
    } finally {
      setFundLoading(false);
    }
  };
  const handleDeleteFund = async idx => {
    if (!window.confirm('Delete this fund?')) return;
    setFundLoading(true);
    try {
      const fundId = entrepreneur.funds[idx]._id;
      const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}/funds/${fundId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to delete fund');
      fetchEntrepreneur();
    } catch (err) {
      alert(err.message);
    } finally {
      setFundLoading(false);
    }
  };

  // --- Support Activities ---
  const handleSupportChange = e => setSupportForm({ ...supportForm, [e.target.name]: e.target.value });
  const handleAddSupport = async e => {
    e.preventDefault();
    setSupportLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(supportForm),
      });
      if (!res.ok) throw new Error('Failed to add support activity');
      setSupportForm({ type: '', date: '', notes: '' });
      fetchEntrepreneur();
    } catch (err) {
      alert(err.message);
    } finally {
      setSupportLoading(false);
    }
  };
  const handleEditSupport = idx => {
    setEditingSupportIdx(idx);
    setEditingSupport({ ...entrepreneur.supportActivities[idx] });
  };
  const handleUpdateSupport = async e => {
    e.preventDefault();
    setSupportLoading(true);
    try {
      const supportId = entrepreneur.supportActivities[editingSupportIdx]._id;
      const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}/support/${supportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(editingSupport),
      });
      if (!res.ok) throw new Error('Failed to update support activity');
      setEditingSupportIdx(null);
      setEditingSupport(null);
      fetchEntrepreneur();
    } catch (err) {
      alert(err.message);
    } finally {
      setSupportLoading(false);
    }
  };
  const handleDeleteSupport = async idx => {
    if (!window.confirm('Delete this support activity?')) return;
    setSupportLoading(true);
    try {
      const supportId = entrepreneur.supportActivities[idx]._id;
      const res = await fetch(`http://localhost:5000/api/entrepreneurs/${id}/support/${supportId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to delete support activity');
      fetchEntrepreneur();
    } catch (err) {
      alert(err.message);
    } finally {
      setSupportLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Entrepreneur Details</div>
      {loading && <div className="loading loading-spinner loading-lg"></div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {!loading && !error && entrepreneur && (
        <>
          <div className="card w-full bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title">{entrepreneur.name}</h2>
              <p>Business: {entrepreneur.businessName}</p>
              <p>Contact: {entrepreneur.contactInfo}</p>
              {entrepreneur.image && (
                <div className="mt-4">
                  <img src={`http://localhost:5000/uploads/${entrepreneur.image}`} alt="Logo" className="w-32 h-32 object-cover rounded" />
                </div>
              )}
            </div>
          </div>

          {/* Funds Section */}
          <div className="mb-8">
            <div className="text-lg font-semibold mb-2">Funds</div>
            {entrepreneur.funds && entrepreneur.funds.length > 0 ? (
              <div className="overflow-x-auto mb-4">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Usage</th>
                      <th>Receipts</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrepreneur.funds.map((fund, idx) => (
                      <tr key={idx}>
                        {editingFundIdx === idx ? (
                          <>
                            <td><input type="number" className="input input-bordered input-xs w-full" name="amount" value={editingFund.amount} onChange={e => setEditingFund({ ...editingFund, amount: e.target.value })} /></td>
                            <td><input type="date" className="input input-bordered input-xs w-full" name="date" value={editingFund.date ? editingFund.date.substring(0, 10) : ''} onChange={e => setEditingFund({ ...editingFund, date: e.target.value })} /></td>
                            <td><input type="text" className="input input-bordered input-xs w-full" name="usage" value={editingFund.usage} onChange={e => setEditingFund({ ...editingFund, usage: e.target.value })} /></td>
                            <td><input type="text" className="input input-bordered input-xs w-full" name="receipts" value={editingFund.receipts} onChange={e => setEditingFund({ ...editingFund, receipts: e.target.value })} /></td>
                            <td>
                              <button className="btn btn-xs btn-success mr-2" onClick={handleUpdateFund} disabled={fundLoading}>Save</button>
                              <button className="btn btn-xs btn-ghost" onClick={() => setEditingFundIdx(null)}>Cancel</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{fund.amount}</td>
                            <td>{fund.date ? new Date(fund.date).toLocaleDateString() : ''}</td>
                            <td>{fund.usage}</td>
                            <td>
                              {fund.receipts && fund.receipts.length > 0 ? (
                                fund.receipts.map((r, i) => (
                                  <a key={i} href={`http://localhost:5000/uploads/${r}`} className="link link-primary mr-2" target="_blank" rel="noopener noreferrer">View</a>
                                ))
                              ) : (
                                'N/A'
                              )}
                            </td>
                            <td>
                              <button className="btn btn-xs btn-warning mr-2" onClick={() => handleEditFund(idx)}>Edit</button>
                              <button className="btn btn-xs btn-error" onClick={() => handleDeleteFund(idx)} disabled={fundLoading}>Delete</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-500 mb-4">No funds recorded.</div>
            )}
            {/* Add Fund Form */}
            <form className="flex flex-wrap gap-2 items-end" onSubmit={handleAddFund}>
              <input type="number" name="amount" value={fundForm.amount} onChange={handleFundChange} placeholder="Amount" className="input input-bordered input-sm w-24" required />
              <input type="date" name="date" value={fundForm.date} onChange={handleFundChange} className="input input-bordered input-sm w-36" required />
              <input type="text" name="usage" value={fundForm.usage} onChange={handleFundChange} placeholder="Usage" className="input input-bordered input-sm w-36" required />
              <input type="text" name="receipts" value={fundForm.receipts} onChange={handleFundChange} placeholder="Receipt filename" className="input input-bordered input-sm w-36" />
              <button className="btn btn-primary btn-sm" type="submit" disabled={fundLoading}>{fundLoading ? 'Saving...' : 'Add Fund'}</button>
            </form>
          </div>

          {/* Support Activities Section */}
          <div>
            <div className="text-lg font-semibold mb-2">Support Activities</div>
            {entrepreneur.supportActivities && entrepreneur.supportActivities.length > 0 ? (
              <div className="overflow-x-auto mb-4">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrepreneur.supportActivities.map((activity, idx) => (
                      <tr key={idx}>
                        {editingSupportIdx === idx ? (
                          <>
                            <td><input type="text" className="input input-bordered input-xs w-full" name="type" value={editingSupport.type} onChange={e => setEditingSupport({ ...editingSupport, type: e.target.value })} /></td>
                            <td><input type="date" className="input input-bordered input-xs w-full" name="date" value={editingSupport.date ? editingSupport.date.substring(0, 10) : ''} onChange={e => setEditingSupport({ ...editingSupport, date: e.target.value })} /></td>
                            <td><input type="text" className="input input-bordered input-xs w-full" name="notes" value={editingSupport.notes} onChange={e => setEditingSupport({ ...editingSupport, notes: e.target.value })} /></td>
                            <td>
                              <button className="btn btn-xs btn-success mr-2" onClick={handleUpdateSupport} disabled={supportLoading}>Save</button>
                              <button className="btn btn-xs btn-ghost" onClick={() => setEditingSupportIdx(null)}>Cancel</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{activity.type}</td>
                            <td>{activity.date ? new Date(activity.date).toLocaleDateString() : ''}</td>
                            <td>{activity.notes}</td>
                            <td>
                              <button className="btn btn-xs btn-warning mr-2" onClick={() => handleEditSupport(idx)}>Edit</button>
                              <button className="btn btn-xs btn-error" onClick={() => handleDeleteSupport(idx)} disabled={supportLoading}>Delete</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-500 mb-4">No support activities recorded.</div>
            )}
            {/* Add Support Activity Form */}
            <form className="flex flex-wrap gap-2 items-end" onSubmit={handleAddSupport}>
              <input type="text" name="type" value={supportForm.type} onChange={handleSupportChange} placeholder="Type" className="input input-bordered input-sm w-36" required />
              <input type="date" name="date" value={supportForm.date} onChange={handleSupportChange} className="input input-bordered input-sm w-36" required />
              <input type="text" name="notes" value={supportForm.notes} onChange={handleSupportChange} placeholder="Notes" className="input input-bordered input-sm w-48" />
              <button className="btn btn-primary btn-sm" type="submit" disabled={supportLoading}>{supportLoading ? 'Saving...' : 'Add Activity'}</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EntrepreneurDetails; 