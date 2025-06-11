// frontend/src/hooks/useManageConnections.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useManageConnections = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPendingRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/connections/pending");
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to get pending requests");
      }
      
      setPendingRequests(data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error getting pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (conversationId) => {
    try {
      const res = await fetch("/api/connections/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ conversationId })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to accept request");
      }
      
      toast.success("Connection request accepted");
      getPendingRequests(); // Refresh the list
      return true;
    } catch (error) {
      toast.error(error.message);
      console.error("Error accepting request:", error);
      return false;
    }
  };

  const rejectRequest = async (conversationId) => {
    try {
      const res = await fetch("/api/connections/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ conversationId })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to reject request");
      }
      
      toast.success("Connection request rejected");
      getPendingRequests(); // Refresh the list
      return true;
    } catch (error) {
      toast.error(error.message);
      console.error("Error rejecting request:", error);
      return false;
    }
  };

  const blockUser = async (conversationId) => {
    try {
      const res = await fetch("/api/connections/block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ conversationId })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to block user");
      }
      
      toast.success("User blocked successfully");
      return true;
    } catch (error) {
      toast.error(error.message);
      console.error("Error blocking user:", error);
      return false;
    }
  };

  const unblockUser = async (conversationId) => {
    try {
      const res = await fetch("/api/connections/unblock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ conversationId })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to unblock user");
      }
      
      toast.success("User unblocked successfully");
      return true;
    } catch (error) {
      toast.error(error.message);
      console.error("Error unblocking user:", error);
      return false;
    }
  };

  useEffect(() => {
    getPendingRequests();
  }, []);

  return { 
    pendingRequests, 
    loading, 
    getPendingRequests, 
    acceptRequest, 
    rejectRequest,
    blockUser,
    unblockUser
  };
};

export default useManageConnections;
