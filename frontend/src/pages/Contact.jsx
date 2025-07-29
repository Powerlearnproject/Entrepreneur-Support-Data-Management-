import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Contact HEVA</h2>
          {submitted ? (
            <div className="alert alert-success mb-4">Thank you for contacting us! We will get back to you soon.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">Name</label>
                <input type="text" name="name" className="input input-bordered" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-control mb-4">
                <label className="label">Email</label>
                <input type="email" name="email" className="input input-bordered" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-control mb-4">
                <label className="label">Message</label>
                <textarea name="message" className="textarea textarea-bordered" value={form.message} onChange={handleChange} required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full" type="submit">Send Message</button>
              </div>
            </form>
          )}
          <div className="mt-8 text-center text-sm text-gray-500">
            <div>Email: info@heva.org</div>
            <div>Phone: +254 700 000 000</div>
            <div>Address: Nairobi, Kenya</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 