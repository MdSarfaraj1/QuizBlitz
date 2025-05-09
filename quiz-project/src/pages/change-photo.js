import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPhoto() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/upload-photo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Photo uploaded successfully!');
        navigate('/profile'); // Redirect back to profile
      } else {
        alert('Failed to upload photo: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upload Profile Photo</h1>
      <form onSubmit={handleUpload} style={styles.form}>
        {preview && <img src={preview} alt="Preview" style={styles.preview} />}
        <input type="file" onChange={handleFileChange} accept="image/*" style={styles.fileInput} />
        <button type="submit" style={styles.button}>Upload</button>
      </form>
    </div>
  );
}

const styles = {
    container: {
        backgroundImage: "url('hp bg.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Consolas',
        color: '#00b3b3',
      },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: '50px',
      borderRadius: '10px',
      width: '300px',
    display: 'inline-block',
  },
  preview: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  fileInput: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: 'rgb(0, 179, 179, 0.6)',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  }
};

export default UploadPhoto;
