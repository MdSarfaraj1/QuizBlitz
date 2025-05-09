import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })//check how backend is returning data
    
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => setUser(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!user) {
    return <div style={styles.bg}><p>Loading...</p></div>;
  }

  return (
    <div style={styles.bg}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <div style={styles.profileCircle}>
            {user.photo && (
              <img src={user.photo} alt="Profile" style={styles.img} />
            )}
          </div>
          <p style={styles.link} onClick={() => navigate('/update-photo')}>Change Icon</p>
        </div>

        <div style={styles.field}><strong>Username:</strong> {user.username}</div>
        <div style={styles.field}><strong>Email:</strong> {user.email}</div>
        <div style={styles.field}><strong>Password:</strong> ******</div>

        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => navigate('/progress')}>View Progress</button>
          <button style={styles.button} onClick={() => navigate('/update')}>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  bg: {
    backgroundImage: `url('/hp bg.jpeg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    color: "#00b3b3",
    fontFamily: "Lucida Console",
    textAlign: "center",
    margin: 0,
    padding: 0,
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
  imageContainer: {
    marginBottom: '20px'
  },
  profileCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#cccccc',
    margin: '0 auto',
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '10px'
  },
  field: {
    marginBottom: '12px',
    textAlign: 'left'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  button: {
    backgroundColor: "white",
    color: "black",
    fontFamily: "Consolas",
    fontSize: "16px",
    padding: "10px 20px",
    borderRadius: '8px',
  }
};

export default Profile;
