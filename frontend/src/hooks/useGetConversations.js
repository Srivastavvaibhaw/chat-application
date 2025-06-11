// frontend/src/hooks/useGetConversations.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        // Fetch all conversations
        const res = await fetch("/api/users");
        
        // Check for a valid response before attempting to parse JSON
        if (!res.ok) {
          console.error("Error fetching /api/users:", res.status, res.statusText);
          throw new Error(`Failed to fetch users: ${res.statusText}`);
        }
        
        // Check if response body is empty
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        
        // Check for a valid response before attempting to parse JSON
        const connectionsRes = await fetch("/api/connections/status");
        let connectionsData = [];

        if (connectionsRes.ok) {
            const connectionsText = await connectionsRes.text();
            connectionsData = connectionsText ? JSON.parse(connectionsText) : [];
        } else {
            console.error("Error fetching /api/connections/status:", connectionsRes.status, connectionsRes.statusText);
        }
        
        
        // Combine data and add connection status info
        const enhancedConversations = data.map(conversation => {
          // Find connection info for this conversation
          const connectionInfo = connectionsData.find(
            conn => conn.participantId && conn.participantId.toString() === conversation._id
          );
          
          // Add connection status info to the conversation
          return {
            ...conversation,
            status: connectionInfo?.status || "accepted", // Default to accepted for backward compatibility
            isBlocked: connectionInfo?.isBlocked || false,
            blockedBy: connectionInfo?.blockedBy || null,
            initiatedByMe: connectionInfo?.initiatedByMe || false,
            conversationId: connectionInfo?.conversationId || conversation._id
          };
        });
        
        // Filter out pending connections unless they're initiated by the current user
        const filteredConversations = enhancedConversations.filter(
          conversation => conversation.status === "accepted" || conversation.initiatedByMe
        );
        
        setConversations(filteredConversations);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
