import React from "react";

const AllFundsTable = ({ funds }) => {
  if (!Array.isArray(funds)) {
    return <div>No fund data available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">All Fund Entries</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Entrepreneur</th>
            <th className="border p-2">Amount (KSh)</th>
            <th className="border p-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => (
  <tr key={fund._id || fund.date}>
    <td className="border p-2">
      {fund.date
        ? new Date(fund.date).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A"}
    </td>
    <td className="border p-2">{fund.entrepreneurName || "N/A"}</td>
    <td className="border p-2">
      KSh {fund.amount ? fund.amount.toLocaleString() : "0"}
    </td>
    <td className="border p-2">{fund.reason || "N/A"}</td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default AllFundsTable;
