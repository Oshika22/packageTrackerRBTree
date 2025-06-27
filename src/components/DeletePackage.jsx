// src/components/DeletePackage.jsx
import React, { useState } from 'react';

function DeletePackage({ tree, onDeleted }) {
  const [deleteID, setDeleteID] = useState('');

  const handleDelete = () => {
    const parsedKey = parseInt(deleteID);
    if (isNaN(parsedKey)) {
      alert("❌ Invalid Tracking ID");
      return;
    }

    const exists = tree.searchTree(parsedKey);
    if (exists && exists.key !== null) {
      tree.delete(parsedKey);
      onDeleted();
      alert(`🗑️ Package ${parsedKey} deleted.`);
    } else {
      alert(`❌ Package ${parsedKey} not found.`);
    }
    setDeleteID('');
  };

  return (
    <div>
      <h3>Delete Package</h3>
      <input
        value={deleteID}
        onChange={e => setDeleteID(e.target.value)}
        placeholder="Tracking ID"
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeletePackage;
