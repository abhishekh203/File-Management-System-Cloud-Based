import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { v4 as uuidv4 } from 'uuid';

const UploadFile = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = (file) => {
    const newFile = {
      id: uuidv4(),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    };
    setFiles([...files, newFile]);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Upload File</h2>
      <FileUpload onUpload={handleUpload} />
    </div>
  );
};

export default UploadFile;
