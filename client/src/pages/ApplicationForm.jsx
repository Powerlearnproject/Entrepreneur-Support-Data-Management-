import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    businessName: '',
    sector: '',
    website: '',
    region: '',
    pitchDeck: null,
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert('Please confirm your agreement to proceed.');
      return;
    }
    // Mock submit - log to console or route to confirmation
    console.log('Application Submitted:', form);
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">HEVA Application Form</h2>

        {/* Business Name */}
        <div>
          <label className="block text-sm mb-1">Business Name</label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Sector */}
        <div>
          <label className="block text-sm mb-1">Creative Sector</label>
          <select
            name="sector"
            value={form.sector}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select --</option>
            <option>Fashion</option>
            <option>Music</option>
            <option>Film & Photography</option>
            <option>Digital Content</option>
            <option>Craft & Design</option>
          </select>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm mb-1">Business Website (optional)</label>
          <input
            type="url"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm mb-1">Business Region</label>
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Region --</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Other</option>
          </select>
        </div>

        {/* Upload pitch deck */}
        <div>
          <label className="block text-sm mb-1">Upload Pitch Deck (PDF, optional)</label>
          <input
            type="file"
            accept="application/pdf"
            name="pitchDeck"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Agreement checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="accent-blue-600"
          />
          <label className="text-sm text-gray-700">
            I confirm that the information provided is accurate.
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
