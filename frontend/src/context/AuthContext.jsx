import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

  // Define the deleteAccount function INSIDE the AuthContextProvider
  const deleteAccount = async () => {
    try {
      const res = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account");
      }
      
      // Clear user data from context and localStorage
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      
      return true;
    } catch (error) {
      throw error;
    }
  };
  
  // Define login, logout, and signup functions here if needed
  
  // Create a context value object that includes all functions
  const contextValue = {
    authUser,
    setAuthUser,
    deleteAccount
    // Include login, logout, signup if you have them
  };

  // Use the contextValue object in the Provider
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
