import React, { useState } from 'react';
import './index.css'
import AddPackage from './components/AddPackage';
import SearchPackage from './components/SearchPackage';
import PackageList from './components/PackageList';
import TreeVisualizer from './components/TreeVisualizer';
class RBTNode {
  constructor(key, data, color = 'red', TNULL = null) {
    this.key = key;
    this.data = data;
    this.color = color;
    this.left = TNULL;
    this.right = TNULL;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.TNULL = new RBTNode(null, null, 'black');
    this.TNULL.left = this.TNULL;
    this.TNULL.right = this.TNULL;
    this.root = this.TNULL;
  }

  // Left rotate
  leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left !== this.TNULL) y.left.parent = x;

    y.parent = x.parent;
    if (x.parent === null) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;

    y.left = x;
    x.parent = y;
  }

  // Right rotate
  rightRotate(x) {
    const y = x.left;
    x.left = y.right;
    if (y.right !== this.TNULL) y.right.parent = x;

    y.parent = x.parent;
    if (x.parent === null) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;

    y.right = x;
    x.parent = y;
  }

  insert(key, data) {
    if (this.searchTree(key) && this.searchTree(key) !== this.TNULL) {
      alert("Package with this ID already exists.");
      return;
    }

    const node = new RBTNode(key, data, 'red', this.TNULL);
    let y = null;
    let x = this.root;

    while (x !== this.TNULL) {
      y = x;
      if (node.key < x.key) x = x.left;
      else x = x.right;
    }

    node.parent = y;
    if (y === null) this.root = node;
    else if (node.key < y.key) y.left = node;
    else y.right = node;

    if (node.parent === null) {
      node.color = 'black';
      return;
    }

    if (node.parent.parent === null) return;

    this.fixInsert(node);
  }

  fixInsert(k) {
    while (k.parent && k.parent.color === 'red') {
      if (k.parent === k.parent.parent.right) {
        let u = k.parent.parent.left; // uncle
        if (u.color === 'red') {
          // Case 1
          u.color = 'black';
          k.parent.color = 'black';
          k.parent.parent.color = 'red';
          k = k.parent.parent;
        } else {
          if (k === k.parent.left) {
            // Case 2
            k = k.parent;
            this.rightRotate(k);
          }
          // Case 3
          k.parent.color = 'black';
          k.parent.parent.color = 'red';
          this.leftRotate(k.parent.parent);
        }
      } else {
        let u = k.parent.parent.right; // uncle

        if (u.color === 'red') {
          // Case 1
          u.color = 'black';
          k.parent.color = 'black';
          k.parent.parent.color = 'red';
          k = k.parent.parent;
        } else {
          if (k === k.parent.right) {
            // Case 2
            k = k.parent;
            this.leftRotate(k);
          }
          // Case 3
          k.parent.color = 'black';
          k.parent.parent.color = 'red';
          this.rightRotate(k.parent.parent);
        }
      }
      if (k === this.root) break;
    }
    this.root.color = 'black';
  }

  searchTree(key, node = this.root) {
    const parsedKey = parseInt(key);
    if (isNaN(parsedKey)) return this.TNULL;

    if (node === this.TNULL || parsedKey === node.key) return node;
    if (parsedKey < node.key) return this.searchTree(parsedKey, node.left);
    return this.searchTree(parsedKey, node.right);
  }

  updateStatus(key, newStatus) {
    const node = this.searchTree(key);
    if (node && node.key !== null) {
      node.data.status = newStatus;
    }
  }

  delete(key) {
    const parsedKey = parseInt(key);
    if (isNaN(parsedKey)) return;
  
    const all = this.inOrder();
    const filtered = all.filter(pkg => pkg.key !== parsedKey);
    const newTree = new RedBlackTree();
  
    filtered.forEach(pkg => {
      newTree.insert(pkg.key, {
        source: pkg.source,
        destination: pkg.destination,
        status: pkg.status,
      });
    });
  
    // Properly reassign root and TNULL
    this.root = newTree.root;
    this.TNULL = newTree.TNULL;
  
    // Reassign TNULL to all leafs to prevent infinite recursion
    const assignTNULL = (node) => {
      if (!node || node.key === null) return;
      if (!node.left) node.left = this.TNULL;
      if (!node.right) node.right = this.TNULL;
      assignTNULL(node.left);
      assignTNULL(node.right);
    };
  
    assignTNULL(this.root);
  }

  inOrder(node = this.root, result = []) {
    if (node !== this.TNULL) {
      this.inOrder(node.left, result);
      result.push({ key: node.key, ...node.data });
      this.inOrder(node.right, result);
    }
    return result;
  }
}


function App() {
  const [tree] = useState(() => new RedBlackTree());
  const [searchResult, setSearchResult] = useState(null);
  const [allPackages, setAllPackages] = useState([]);

  const refreshAllPackages = () => {
    const all = tree.inOrder();
    setAllPackages(all);
  };

  const handleSearch = (id) => {
    const node = tree.searchTree(id);
    setSearchResult(node && node.key !== null ? node : null);
  };
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold font-sarif text-center mb-8 bg-gradient-to-r from-black via-red-700 to-black bg-clip-text text-transparent p-2">
        PackTrack: Powered by Red-Black Tree
      </h1>
  
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <AddPackage tree={tree} onPackageAdded={refreshAllPackages} />
        </div>
  
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <SearchPackage onSearch={handleSearch} result={searchResult} />
        </div>
  
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <PackageList
            allPackages={allPackages}
            onUpdateStatus={(key, status) => {
              tree.updateStatus(key, status);
              refreshAllPackages();
            }}
            onDelete={(key) => {
              tree.delete(key);
              console.log("Deleted package with key:", key);
              refreshAllPackages();
            }}
          />
        </div>
  
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <TreeVisualizer tree={tree} />
        </div>
      </div>
    </div>
  );
}

export default App;
