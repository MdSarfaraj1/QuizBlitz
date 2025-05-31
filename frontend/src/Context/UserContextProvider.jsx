import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
export const UserContext=React.createContext()


export const UserContextProvider=({children})=>{

    const [userId, setUserID] = useState(() => {
        return localStorage.getItem('userID') || null;
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
    
    // Update localStorage whenever userID changes
    const updateUserID = (newUserID,newUsername,profilePicture) => {
        if (newUserID) {
            localStorage.setItem('userID', newUserID);
            localStorage.setItem('username',newUsername)
            localStorage.setItem('profilePicture',profilePicture)
            setUserID(newUserID);
            setUsername(newUsername);
            setProfilePicture(profilePicture);
        } else {
            localStorage.removeItem('userID');
            localStorage.removeItem('username');
            localStorage.removeItem('profilePicture')
        }
        
    };

    // useEffect(() => {
    //     async function checkSession() {
    //       try {
    //         const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/verify-token`, {
    //           withCredentials: true,
    //         });
      
    //         if (res.status === 200) {
    //           console.log("Token present");
    //           // Maybe store user info or auth status here
    //         }
    //       } catch (err) {
    //         console.log("Token invalid or error:", err);
    //         localStorage.removeItem("userID");
    //         localStorage.removeItem("username");
    //       }
    //     }
      
    //     checkSession();
    //   }, []);
      
    return(
        <UserContext.Provider value={{userId,username,setUser:updateUserID,flashMessage,setFlashMessage,profilePicture}}>
            {children}
        </UserContext.Provider>
    )
}
export const useAuth=()=>useContext(UserContext)
