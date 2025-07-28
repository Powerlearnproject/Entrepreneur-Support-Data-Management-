// src/pages/Form.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    disability: '',
    userType: '',
    age: '',
    yearsInBusiness: '',
    country: '',
    city: '',
    sector: '',
    description: '',
    license: null,
    logo: null,
    isOperational: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // ✅ Optional: send to backend later
    navigate('/confirmation'); // ✅ Go to confirmation screen
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Tell us about you or your startup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name or Brand Name"
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="gender"
              onChange={handleChange}
              required
              className="w-full border rounded p-3"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nonbinary">Non-binary</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>

            <select
              name="disability"
              onChange={handleChange}
              required
              className="w-full border rounded p-3"
            >
              <option value="">Person with Disability?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <select
            name="userType"
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          >
            <option value="">Are you an Individual or Company?</option>
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </select>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age (if individual)"
              onChange={handleChange}
              className="w-full border rounded p-3"
            />
            <input
              type="number"
              name="yearsInBusiness"
              placeholder="Years in Business"
              onChange={handleChange}
              className="w-full border rounded p-3"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              required
              className="w-full border rounded p-3"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
              className="w-full border rounded p-3"
            />
          </div>

          <select
            name="sector"
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          >
            <option value="">Select your Sector</option>
            <option value="fashion">Fashion</option>
            <option value="music">Music</option>
            <option value="film">Film</option>
            <option value="crafts">Crafts</option>
            <option value="digital_content">Digital Content</option>
            <option value="gaming">Gaming</option>
            <option value="photography">Photography</option>
          </select>

          <textarea
            name="description"
            placeholder="Short description of your business/project"
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          ></textarea>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              accept="image/*"
              className="w-full border rounded p-3"
            />
            <input
              type="file"
              name="license"
              onChange={handleChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full border rounded p-3"
            />
          </div>

          <select
            name="isOperational"
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          >
            <option value="">Is the business operational?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-700 text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-blue-800 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
