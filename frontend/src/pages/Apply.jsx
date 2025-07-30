import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer';

const Apply = () => {
  const [form, setForm] = useState({
    email: '',
    orgName: '',
    orgWebsite: '',
    reasons: '',
    supportNeeds: '',
    plans: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to submit application');

      alert('✅ Application submitted successfully!');
      navigate('/apply/confirmation');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Apply as an Entrepreneur
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Share your vision, upload your logo, and tell us why you want to join HEVA.
          </p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mx-auto mt-16 max-w-2xl sm:mt-20">
          {error && <div className="alert alert-error mb-4">{error}</div>}

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3.5 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Org Name */}
            <div>
              <label htmlFor="orgName" className="block text-sm font-medium text-gray-900">Organization Name</label>
              <input
                type="text"
                name="orgName"
                value={form.orgName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3.5 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Org Website */}
            <div>
              <label htmlFor="orgWebsite" className="block text-sm font-medium text-gray-900">Organization Website/Link</label>
              <input
                type="url"
                name="orgWebsite"
                value={form.orgWebsite}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3.5 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Reasons */}
            <div>
              <label htmlFor="reasons" className="block text-sm font-medium text-gray-900">Reasons for Joining HEVA</label>
              <textarea
                name="reasons"
                value={form.reasons}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Support Needs */}
            <div>
              <label htmlFor="supportNeeds" className="block text-sm font-medium text-gray-900">Support/Funding Needs</label>
              <textarea
                name="supportNeeds"
                value={form.supportNeeds}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* New: Short & Long-term Plans */}
            <div>
              <label htmlFor="plans" className="block text-sm font-medium text-gray-900">
                Short & Long-term Plans / Where You See Your Organization with HEVA's Help
              </label>
              <textarea
                name="plans"
                value={form.plans}
                onChange={handleChange}
                rows={5}
                placeholder="Briefly describe your short and long-term goals and your projected trajectory."
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Upload Logo */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-900">Upload Logo/Image</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm text-gray-600">
                    <label htmlFor="image" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Apply to join'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Apply;
