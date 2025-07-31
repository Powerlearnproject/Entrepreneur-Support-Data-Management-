
import React from "react";

import { useState } from 'react';
import { createFund } from "../services/fundAPI";


const AddFundForm = () => {
  const [form, setForm] = useState({ entrepreneurId: '', amount: '', date: '', purpose: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    createFund(form)
      .then(() => alert('Fund added successfully!'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="entrepreneurId" onChange={handleChange} placeholder="Entrepreneur ID" className="input" required />
      <input name="amount" type="number" onChange={handleChange} placeholder="Amount" className="input" required />
      <input name="date" type="date" onChange={handleChange} className="input" required />
      <input name="purpose" onChange={handleChange} placeholder="Purpose" className="input" required />
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default AddFundForm;
