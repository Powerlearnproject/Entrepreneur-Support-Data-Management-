import React from 'react';

const SupportActivities = () => {
  return (
    <div className="p-8">
      <div className="text-xl font-bold mb-4">Support Activities</div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td>Mentorship</td>
              <td>2024-06-01</td>
              <td>Initial business planning session</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportActivities; 