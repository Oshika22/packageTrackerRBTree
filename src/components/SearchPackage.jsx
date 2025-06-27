// src/components/SearchPackage.jsx
import React, { useState } from 'react';

function SearchPackage({ onSearch, result }) {
  const [searchID, setSearchID] = useState('');

  const handleSearch = () => {
    if (!searchID) return alert("Enter a Tracking ID.");
    onSearch(searchID);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold text-gray-800">🔍 Search Package</h3>
  
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          value={searchID}
          onChange={e => setSearchID(e.target.value)}
          placeholder="Tracking ID"
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="min-w-[120px] bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.03] hover:shadow-md transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
  
      {result ? (
        <p className="text-gray-700 mt-2">
          <strong className="text-blue-600">{result.key}</strong> | {result.data.source} → {result.data.destination} |{" "}
          <span className="font-semibold">{result.data.status}</span>
        </p>
      ) : searchID && <p className="text-red-500 mt-2 font-semibold">❌ Not found</p>}
    </div>
  );

}

export default SearchPackage;
