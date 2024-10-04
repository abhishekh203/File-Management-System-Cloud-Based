import React, { useEffect, useState } from 'react';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import { db } from '../Lib/Firebase'; // Adjust the import as per your file structure
import { collection, addDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);

  useEffect(() => {
    const unsubscribeFiles = onSnapshot(collection(db, "files"), (snapshot) => {
      const filesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Files:', filesData); // Log files for debugging
      setFiles(filesData);
    });

    const unsubscribeFolders = onSnapshot(collection(db, "folders"), (snapshot) => {
      const foldersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Folders:', foldersData); // Log folders for debugging
      setFolders(foldersData);
    });

    return () => {
      unsubscribeFiles();
      unsubscribeFolders();
    };
  }, []);

  const handleUpload = async (file) => {
    const newFile = { ...file, folderId: currentFolder || null };
    console.log('Uploading file:', newFile); // Log file upload
    await addDoc(collection(db, "files"), newFile);
  };

  const handleDelete = async (fileId, fileUrl) => {
    console.log('Deleting file:', fileId); // Log file delete
    await deleteDoc(doc(db, "files", fileId)); // Delete from Firestore
    // Include storage deletion if applicable
  };

  const handleCreateFolder = async () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      const newFolder = { name: folderName };
      console.log('Creating folder:', newFolder); // Log folder creation
      await addDoc(collection(db, "folders"), newFolder);
    }
  };

  const handleFolderClick = (folderId) => {
    setCurrentFolder(folderId);
  };

  const filteredFiles = currentFolder
    ? files.filter((file) => file.folderId === currentFolder)
    : files.filter((file) => !file.folderId); // Files with no folder

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <button
        onClick={handleCreateFolder}
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
      >
        Create Folder
      </button>

      <div className="mb-4">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            className="mr-2 bg-blue-400 text-white py-1 px-3 rounded"
          >
            {folder.name}
          </button>
        ))}
        <button
          onClick={() => setCurrentFolder(null)} // Reset folder selection
          className="bg-gray-400 text-white py-1 px-3 rounded"
        >
          All Files
        </button>
      </div>

      <FileUpload onUpload={handleUpload} currentFolder={currentFolder} />
      <FileList files={filteredFiles} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
