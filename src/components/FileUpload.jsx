import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../Lib/Firebase'; // Adjust the import as per your file structure

const FileUpload = ({ onUpload, currentFolder }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadMessage(''); // Reset message when a new file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file to upload.');
      return;
    }

    const storageRef = ref(storage, `folders/${currentFolder || 'root'}/files/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
      },
      (error) => {
        console.error('Upload failed:', error);
        setUploadMessage('Upload failed. Please try again.');
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const fileMetadata = {
          name: selectedFile.name,
          url: downloadURL,
          size: selectedFile.size,
          type: selectedFile.type,
          folderId: currentFolder || null,
        };
        await onUpload(fileMetadata); // Pass the file to the parent component
        setUploading(false);
        setProgress(0);
        setUploadMessage('Upload successful!');
        setSelectedFile(null); // Reset file input
      }
    );
    setUploading(true);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {uploading ? (
        <p>Uploading: {progress.toFixed(2)}%</p>
      ) : (
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Upload File
        </button>
      )}
      {uploadMessage && <p className="mt-2 text-green-600">{uploadMessage}</p>}
    </div>
  );
};

export default FileUpload;
