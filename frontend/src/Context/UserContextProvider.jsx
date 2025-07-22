import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
export const UserContext=React.createContext()


export const UserContextProvider=({children})=>{

    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId') || null;
    });

    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || null;
    });
    const [profilePicture, setProfilePicture] = useState(() => {
      return localStorage.getItem('profilePicture') || null;
  });
  const [role,setRole]=useState(()=>{
    return localStorage.getItem('role')|| null
  })

    const [flashMessage,setMessage]=useState("")

    const setFlashMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
      };
    
    // Update localStorage whenever userId changes
   const updateUserId = (newUserId, newUsername, profilePicture,newRole) => {
  if (newUserId) {
    localStorage.setItem('userId', newUserId);
    localStorage.setItem('username', newUsername);
    localStorage.setItem('profilePicture', profilePicture);
    localStorage.setItem('role',newRole)
  } else {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('profilePicture');
localStorage.removeItem('role')
  }

  // Always update state to ensure re-render
  setUserId(newUserId);
  setUsername(newUsername);
  setProfilePicture(profilePicture);
  setRole(newRole)
};


const clearAuth = () => {
    // localStorage.removeItem("userId");
    // localStorage.removeItem("username");
    // localStorage.removeItem("profilePicture");
    updateUserId(null,null,null,null);
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/User/verify-token`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          console.log("✅ Token is valid");
          // Optional: setUser again with backend data
        }
      } catch (err) {
        console.warn("⚠️ Token invalid or expired, clearing localStorage");
        clearAuth();
      }
    }

    checkSession();
  }, []);
      
    return(
        <UserContext.Provider value={{userId,role,username,profilePicture, setUser:updateUserId,flashMessage,setFlashMessage,profilePicture}}>
            {children}
        </UserContext.Provider>
    )
}
export const useAuth=()=>useContext(UserContext)
