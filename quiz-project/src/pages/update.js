import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    un: '',
    pass: '',
    mail: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitted = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/profile'), 3000);
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  return (
    <div style={styles.page}>
    <div style={styles.container}>
      {!success ? (
        <form onSubmit={submitted} style={styles.form}>
          <input type="text" name="un" placeholder="New Username"
            onChange={handleChange}
            style={styles.input} />
          <input type="password" name="pass" placeholder="New Password"
            onChange={handleChange}
            style={styles.input} />
          <input type="email" name="mail" placeholder="New Email"
            onChange={handleChange}
            style={styles.input} />
          <button type="submit" style={styles.button}>Update Profile</button>
        </form>
      ) : (
        <div style={styles.message}>✅ Profile updated! Redirecting...</div>
      )}
    </div>
    </div>
  );
};

const styles = {
    page: {
        backgroundImage: `url('/hp bg.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#00b3b3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      container: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: "50px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
      },
    form: {
      padding: '50px',
      borderRadius: '10px',
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    input: {
      fontFamily: "Lucida Console",
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '16px'
    },
    button: {
        fontFamily: "Lucida Console",
      backgroundColor: 'white',
      color: '#008080',
      border: 'none',
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      borderRadius: '5px'
    },
    message: {
      fontSize: '22px',
      marginTop: '20px'
    }
  };

export default UpdateProfile;
