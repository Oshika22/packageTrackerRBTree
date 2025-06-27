// src/components/PackageList.jsx
import React, { useState } from 'react';

function PackageList({ allPackages, onDelete, onUpdateStatus }) {
  const [editingKey, setEditingKey] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  const handleEdit = (pkg) => {
    setEditingKey(pkg.key);
    setNewStatus(pkg.status);
  };

  const handleUpdate = (key) => {
    onUpdateStatus(key, newStatus);
    setEditingKey(null);
    setNewStatus('');
  };

  return (
    <div className="w-full overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📦 All Packages (Sorted)</h3>
  
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 border-b">Tracking ID</th>
            <th className="px-4 py-3 border-b">Source</th>
            <th className="px-4 py-3 border-b">Destination</th>
            <th className="px-4 py-3 border-b">Status</th>
            <th className="px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPackages.map(pkg => (
            <tr key={pkg.key} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 border-b">{pkg.key}</td>
              <td className="px-4 py-3 border-b">{pkg.source}</td>
              <td className="px-4 py-3 border-b">{pkg.destination}</td>
              <td className="px-4 py-3 border-b">
                {editingKey === pkg.key ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                ) : (
                  <span className="font-medium">{pkg.status}</span>
                )}
              </td>
              <td className="px-4 py-3 border-b space-x-2">
                {editingKey === pkg.key ? (
                  <>
                    <button
                      onClick={() => handleUpdate(pkg.key)}
                      className="text-green-600 font-semibold hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingKey(null)}
                      className="text-gray-500 font-semibold hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                       Edit
                    </button>
                    <button
                      onClick={() => onDelete(pkg.key)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                       Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default PackageList;
