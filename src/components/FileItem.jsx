import React, { useState } from 'react';
import FilePreview from './FilePreview';

const FileItem = ({ file, onDelete }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md">
      <div>
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {file.name}
        </a>
        <span className="text-gray-500 text-sm"> (Size: {file.size} bytes)</span>
      </div>
      <div>
        <button
          onClick={handlePreviewToggle}
          className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-500 mr-2"
        >
          Preview
        </button>
        <button
          onClick={() => onDelete(file.id, file.url)}
          className="text-red-600 hover:text-red-500"
        >
          Delete
        </button>
      </div>
      {showPreview && <FilePreview file={file} />}
    </div>
  );
};

export default FileItem;
