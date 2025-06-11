// frontend/src/components/sidebar/Conversations.jsx
import { useEffect, useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useConnectionCode from "../../hooks/useConnectionCode";
import useSendConnectionRequest from "../../hooks/useSendConnectionRequest";
import useManageConnections from "../../hooks/useManageConnections";
import { FaLock, FaUserPlus, FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Conversations = () => {
  const { conversations, loading } = useGetConversations();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [showConnectionCode, setShowConnectionCode] = useState(false);
  const [connectionCodeInput, setConnectionCodeInput] = useState("");
  const { connectionCode } = useConnectionCode();
  const { sendConnectionRequest, loading: sendingRequest } = useSendConnectionRequest();
  const { pendingRequests, acceptRequest, rejectRequest } = useManageConnections();

  const handleSendConnectionRequest = async (e) => {
    e.preventDefault();
    if (!connectionCodeInput.trim()) return;

    const success = await sendConnectionRequest(connectionCodeInput.trim());
    if (success) {
      setConnectionCodeInput("");
      setShowConnectForm(false);
    }
  };

  const copyConnectionCode = () => {
    navigator.clipboard.writeText(connectionCode);
    toast.success("Connection code copied to clipboard");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Private Connection Features */}
      <div className="mb-4 space-y-3">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setShowConnectionCode(!showConnectionCode);
              setShowConnectForm(false);
            }}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <FaLock className="mr-2" /> My Code
          </button>
          <button
            onClick={() => {
              setShowConnectForm(!showConnectForm);
              setShowConnectionCode(false);
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <FaUserPlus className="mr-2" /> Connect
          </button>
        </div>

        {/* Show connection code panel */}
        {showConnectionCode && (
          <div className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-slate-300 text-xs mb-2">Your private connection code:</p>
            <div className="flex items-center bg-slate-800 p-2 rounded">
              <span className="text-indigo-300 font-mono font-bold flex-1">{connectionCode}</span>
              <button
                onClick={copyConnectionCode}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-slate-400 text-xs mt-2">
              Share this code with trusted contacts to connect privately.
            </p>
          </div>
        )}

        {/* Show connect form */}
        {showConnectForm && (
          <form onSubmit={handleSendConnectionRequest} className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-slate-300 text-xs mb-2">Enter connection code:</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={connectionCodeInput}
                onChange={(e) => setConnectionCodeInput(e.target.value)}
                placeholder="Connection code"
                className="flex-1 bg-slate-800 text-white text-sm rounded p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={sendingRequest || !connectionCodeInput.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded transition-colors disabled:opacity-50"
              >
                {sendingRequest ? "..." : "Connect"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Pending Connection Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-4">
          <h3 className="text-slate-400 text-xs uppercase font-semibold mb-2">Connection Requests</h3>
          <div className="space-y-2">
            {pendingRequests.map((request) => (
              <div key={request._id} className="bg-slate-700/30 rounded-lg p-2">
                <div className="flex items-center mb-2">
                  <img
                    src={request.profilePic || `https://avatar.iran.liara.run/public/boy?username=${request.username}`}
                    alt={request.fullName}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{request.fullName}</p>
                    <p className="text-slate-400 text-xs">@{request.username}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => acceptRequest(request.conversationId)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-1 rounded transition-colors flex items-center justify-center"
                  >
                    <FaCheck className="mr-1" /> Accept
                  </button>
                  <button
                    onClick={() => rejectRequest(request.conversationId)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded transition-colors flex items-center justify-center"
                  >
                    <FaTimes className="mr-1" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversations List */}
      <h3 className="text-slate-400 text-xs uppercase font-semibold mb-2">Conversations</h3>
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-slate-400 text-center py-10">
            No conversations yet
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => setSelectedConversation(conversation)}
              className={`flex items-center gap-2 hover:bg-slate-700/30 rounded p-2 py-3 cursor-pointer transition-colors ${
                selectedConversation?._id === conversation._id ? "bg-slate-700/40" : ""
              }`}
            >
              <div className={`avatar ${onlineUsers.includes(conversation._id) ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                  <img
                    src={conversation.profilePic || `https://avatar.iran.liara.run/public/boy?username=${conversation.username}`}
                    alt="user avatar"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <p className={`font-bold text-slate-200`}>{conversation.fullName}</p>
                  {conversation.status === "pending" && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-1 rounded">Pending</span>
                  )}
                  {conversation.isBlocked && (
                    <span className="text-xs bg-red-500/20 text-red-300 px-1 rounded">Blocked</span>
                  )}
                </div>
                <p className="text-sm text-slate-400 truncate">
                  {conversation.lastMessage?.text || "No messages yet"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Conversations;
