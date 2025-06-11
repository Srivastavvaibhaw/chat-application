// frontend/src/hooks/useSendConnectionRequest.js
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSendConnectionRequest = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const sendConnectionRequest = async (connectionCode) => {
    setLoading(true);
    try {
      const res = await fetch("/api/connections/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}` // Add authorization header
        },
        body: JSON.stringify({ connectionCode })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to send connection request");
      }
      
      toast.success("Connection request sent successfully");
      return true;
    } catch (error) {
      toast.error(error.message);
      console.error("Error sending connection request:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendConnectionRequest, loading };
};

export default useSendConnectionRequest;
