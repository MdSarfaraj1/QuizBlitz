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

    const [flashMessage,setMessage]=useState("")

    const setFlashMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
      };
    
    // Update localStorage whenever userId changes
    const updateUserId = (newUserId,newUsername,profilePicture) => {
        if (newUserId) {
            localStorage.setItem('userId', newUserId);
            localStorage.setItem('username',newUsername)
            localStorage.setItem('profilePicture',profilePicture)
            setUserId(newUserId);
            setUsername(newUsername);
            setProfilePicture(profilePicture);
        } else {
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('profilePicture')
        }
        
    };

    // useEffect(() => {
    //     async function checkSession() {
    //       try {
    //         const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/User/verify-token`, {
    //           withCredentials: true,
    //         });
      
    //         if (res.status === 200) {
    //           console.log("Token present");
              
    //         }
    //       } catch (err) {
    //         console.log("Token invalid or error:", err);
    //         localStorage.removeItem("userId");
    //         localStorage.removeItem("username");
    //         localStorage.removeItem("profilePicture");
    //       }
    //     }
      
    //     checkSession();
    //   }, []);
      
    return(
        <UserContext.Provider value={{userId,username,setUser:updateUserId,flashMessage,setFlashMessage,profilePicture}}>
            {children}
        </UserContext.Provider>
    )
}
export const useAuth=()=>useContext(UserContext)
