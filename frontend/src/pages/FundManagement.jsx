import React from 'react';

const FundManagement = () => {
  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Fund Management</div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Usage</th>
              <th>Receipts</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td>$1,000</td>
              <td>2024-06-01</td>
              <td>Equipment purchase</td>
              <td><a href="/uploads/receipt1.jpg" className="link link-primary">View</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundManagement; 