import React, { useState } from "react";
import { getFundsByEntrepreneur } from "../services/fundApi";

import AllFundsTable from "./AllFundsTable";

const EntrepreneurFundFilter = () => {
  const [searchId, setSearchId] = useState("");
  const [funds, setFunds] = useState([]);

  const handleSearch = async () => {
  try {
    const res = await getFundsByEntrepreneur(entrepreneurId);
    setFunds(Array.isArray(res.data) ? res.data : [res.data]);
  } catch (error) {
    console.error("Error fetching funds:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Funds by Entrepreneur</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}  // ✅ update searchId
          placeholder="Enter Entrepreneur ID"
          className="border px-4 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <AllFundsTable funds={funds} />
    </div>
  );
};

export default EntrepreneurFundFilter;
