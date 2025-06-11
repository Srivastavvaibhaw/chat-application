// frontend/src/hooks/useConnectionCode.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useConnectionCode = () => {
  const [connectionCode, setConnectionCode] = useState("");
  const [loading, setLoading] = useState(false);

  const getConnectionCode = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/connections/code");
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to get connection code");
      }
      
      setConnectionCode(data.connectionCode);
    } catch (error) {
      toast.error(error.message);
      console.error("Error getting connection code:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnectionCode();
  }, []);

  return { connectionCode, loading };
};

export default useConnectionCode;
