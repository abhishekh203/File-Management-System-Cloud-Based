// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UploadFile from './pages/UploadFile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login'; // Import Login component
import SignUp from './pages/SignUp'; // Import SignUp component
import { v4 as uuidv4 } from 'uuid'; // to generate unique ids for files

function App() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  // Function to handle file upload
  const handleUpload = (file, folderId) => {
    const newFile = {
      id: uuidv4(),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      folderId: folderId || null, // Associate file with a folder if provided
    };
    setFiles([...files, newFile]);
  };

  // Function to delete a file
  const handleDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  // Function to create a new folder
  const handleCreateFolder = (folderName) => {
    const newFolder = {
      id: uuidv4(),
      name: folderName,
    };
    setFolders([...folders, newFolder]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard files={files} onDelete={handleDelete} folders={folders} onCreateFolder={handleCreateFolder} />} />
            <Route path="/upload" element={<UploadFile onUpload={handleUpload} />} />
            <Route path="/login" element={<Login />} /> {/* Login Route */}
            <Route path="/signup" element={<SignUp />} /> {/* SignUp Route */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
