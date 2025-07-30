import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch');
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm('Are you sure you want to approve this application?')) return;
    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${id}/approve`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to approve');
      alert('Application approved and user account created!');
      fetchApplications();
    } catch (err) {
      alert(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setProcessingId(selectedApplication._id);
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${selectedApplication._id}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ rejectionReason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to reject');
      alert('Application rejected and email sent!');
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedApplication(null);
      fetchApplications();
    } catch (err) {
      alert(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (application) => {
    setSelectedApplication(application);
    setShowRejectModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      approved: 'badge-success',
      rejected: 'badge-error',
    };
    return `badge ${badges[status] || 'badge-neutral'}`;
  };

  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-6">Entrepreneur Applications</div>
      
      {loading && <div className="loading loading-spinner loading-lg"></div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}
      
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Organization</th>
                <th>Email</th>
                <th>Website</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id}>
                  <td>
                    {app.image && (
                      <img 
                        src={`http://localhost:5000/uploads/${app.image}`} 
                        alt="Logo" 
                        className="w-16 h-16 object-cover rounded" 
                      />
                    )}
                  </td>
                  <td>
                    <div className="font-bold">{app.orgName}</div>
                    <div className="text-sm opacity-50 max-w-xs truncate">
                      {app.reasons}
                    </div>
                  </td>
                  <td>{app.email}</td>
                  <td>
                    {app.orgWebsite && (
                      <a 
                        href={app.orgWebsite} 
                        className="link link-primary" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    )}
                  </td>
                  <td>
                    <span className={getStatusBadge(app.status)}>
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    {app.status === 'pending' && (
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-xs btn-success" 
                          onClick={() => handleApprove(app._id)}
                          disabled={processingId === app._id}
                        >
                          {processingId === app._id ? 'Processing...' : 'Approve'}
                        </button>
                        <button 
                          className="btn btn-xs btn-error" 
                          onClick={() => openRejectModal(app)}
                          disabled={processingId === app._id}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {app.status === 'rejected' && app.rejectionReason && (
                      <div className="tooltip" data-tip={app.rejectionReason}>
                        <span className="text-xs text-error cursor-help">View reason</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reject Application</h3>
            <p className="py-4">
              Please provide a reason for rejecting {selectedApplication?.orgName}'s application:
            </p>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
            <div className="modal-action">
              <button 
                className="btn btn-error" 
                onClick={handleReject}
                disabled={processingId === selectedApplication?._id}
              >
                {processingId === selectedApplication?._id ? 'Processing...' : 'Reject Application'}
              </button>
              <button 
                className="btn" 
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedApplication(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;