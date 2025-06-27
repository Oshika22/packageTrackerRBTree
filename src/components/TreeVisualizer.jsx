import React from 'react';

const TreeNode = ({ node }) => {
  if (!node || node.key === null) return null;

  const isRed = node.color === 'red';

  return (
    <div className="flex flex-col items-center">
      <div
        className={`min-w-[40px] px-4 py-2 mb-2 rounded-lg border text-center font-bold text-sm shadow-sm m-2 ${
          isRed ? 'bg-red-100 border-red-400 text-red-700' : 'bg-gray-100 border-gray-400 text-gray-700'
        }`}
      >
        {node.key}
      </div>

      {(node.left?.key !== null || node.right?.key !== null) && (
        <div className="flex w-full justify-around">
          {/* Left Subtree */}
          <div className="flex flex-col items-center w-1/2">
            {node.left?.key !== null && (
              <>
                <div className="w-[2px] h-4 bg-gray-300"></div>
                <TreeNode node={node.left} />
              </>
            )}
          </div>

          {/* Right Subtree */}
          <div className="flex flex-col items-center w-1/2">
            {node.right?.key !== null && (
              <>
                <div className="w-[2px] h-4 bg-gray-300"></div>
                <TreeNode node={node.right} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TreeVisualizer = ({ tree }) => (
  <div className="overflow-x-auto p-6 bg-white rounded-xl shadow-md">
    <h3 className="text-xl font-semibold text-gray-800 mb-6">🌳 Tree Visualizer</h3>
    <TreeNode node={tree.root} />
  </div>
);

export default TreeVisualizer;
