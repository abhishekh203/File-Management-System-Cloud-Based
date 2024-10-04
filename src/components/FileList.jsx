import React from 'react';
import FileItem from './FileItem';

const FileList = ({ files, onDelete }) => {
  return (
    <div className="space-y-4">
      {files.length > 0 ? (
        files.map((file) => (
          <FileItem key={file.id} file={file} onDelete={onDelete} />
        ))
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileList;
