// src/components/FilePreview.jsx
import React from 'react';

const PreviewFile = ({ file }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h3 className="text-lg font-bold">{file.name}</h3>
      <p>Size: {file.size} bytes</p>
      {file.url && (
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View File
        </a>
      )}
      {/* Image Preview */}
      {file.type.startsWith('image/') && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">Preview:</h4>
          <img
            src={file.url}
            alt={file.name}
            className="mt-2 w-full h-auto rounded shadow"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
};

export default PreviewFile;
