// src/components/AddPackageForm.jsx
import React, { useState } from 'react';

function AddPackage({ tree, onPackageAdded }) {
  const [trackingID, setTrackingID] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('In Transit');

  const handleAdd = (e) => {
    e.preventDefault();

    // Validate integer tracking ID
    const trackingNumber = parseInt(trackingID);
    if (isNaN(trackingNumber)) {
      alert("❌ Tracking ID must be an integer.");
      return;
    }

    if (!source || !destination || !status) {
      alert("❌ All fields are required.");
      return;
    }

    try {
      tree.insert(trackingNumber, { source, destination, status });
      onPackageAdded();
      setTrackingID('');
      setSource('');
      setDestination('');
      setStatus('In Transit');
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">➕ Add Package</h3>
    
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-3">
        
        <input type="text" value={trackingID} onChange={e => setTrackingID(e.target.value)} placeholder="Tracking ID (integer)" required className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    
        <input type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="Source" required className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination" required className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    
        <select value={status} onChange={e => setStatus(e.target.value)} required className="min-w-[180px] px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delayed">Delayed</option>
        </select>
    
        <button type="submit" className="min-w-[150px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.03] hover:shadow-md transition duration-300 ease-in-out">
          Add Package
        </button>
      </form>
    </div>

  );
}

export default AddPackage;
