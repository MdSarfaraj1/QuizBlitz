import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // token from localStorage

      if (!token) {
        setError('No authentication token found!');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data); // Set the user data if successful
      } catch (error) {
        setError(error.message); // Handle any errors
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to fetch data once on component mount

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!user) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Profile</h1>
      <div style={styles.profileContainer}>
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.progress}>Progress: {user.progress}%</p>

        <div style={styles.linksContainer}>
          <a href="/update-profile" style={styles.link}>Update Profile</a>
          <a href="/view-progress" style={styles.link}>View Progress</a>
        </div>
      </div>
    </div>
  );
};

// Styles as JavaScript objects
const styles = {
  container: {
    backgroundImage: "url('hp bg.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    color: '#00b3b3',
    fontFamily: '"Consolas"',
    textAlign: 'center',
    margin: '0',
    padding: '0',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '40px',
    textShadow: '2px 2px 5px black',
  },
  profileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Translucent background for the profile section
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  name: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
  email: {
    fontSize: '18px',
    margin: '10px 0',
  },
  progress: {
    fontSize: '18px',
    margin: '10px 0',
  },
  linksContainer: {
    marginTop: '20px',
  },
  link: {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    fontSize: '18px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'rgba(0, 179, 179, 0.8)',
    borderRadius: '8px',
    transition: 'all 0.3s ease-in-out',
  },
  error: {
    color: 'red',
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '20px',
  },
  loading: {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default ProfilePage;
