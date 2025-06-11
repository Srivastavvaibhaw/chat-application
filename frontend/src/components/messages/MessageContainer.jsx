// frontend/src/components/messages/MessageContainer.jsx
import { useEffect, useState, useRef } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { FaUserCircle, FaPhone, FaVideo, FaEllipsisV, FaTrash, FaMicrophone, FaArchive, FaBell, FaSearch, FaPhoneSlash, FaVolumeMute, FaVolumeUp, FaBan, FaUnlock } from "react-icons/fa";
import useManageConnections from "../../hooks/useManageConnections"; // Import the useManageConnections hook

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext(); // Import authUser from AuthContext
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState(null); // "audio" or "video"
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef(null);
  const optionsMenuRef = useRef(null);
  const { blockUser, unblockUser } = useManageConnections(); // Use the useManageConnections hook

  useEffect(() => {
    // cleanup function (unmounts)
    return () => {
      setSelectedConversation(null);
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [setSelectedConversation]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
        setShowOptionsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to format last seen time as "X time ago"
  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Online";
    
    const now = new Date();
    const lastSeenDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - lastSeenDate) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  // Format call duration
  const formatCallDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle audio call
  const handleAudioCall = () => {
    setCallType("audio");
    setIsInCall(true);
    setCallDuration(0);
    
    // Start call timer
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  // Handle video call
  const handleVideoCall = () => {
    setCallType("video");
    setIsInCall(true);
    setCallDuration(0);
    
    // Start call timer
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  // Handle end call
  const handleEndCall = () => {
    setIsInCall(false);
    setCallType(null);
    setIsMuted(false);
    setIsSpeakerOn(false);
    
    // Clear call timer
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
  };

  const handleBlockUser = async () => {
    if (!selectedConversation) return;
    
    const confirmed = window.confirm(`Are you sure you want to block ${selectedConversation.fullName}?`);
    if (!confirmed) return;
    
    const success = await blockUser(selectedConversation.conversationId);
    if (success) {
      setShowOptionsMenu(false);
    }
  };

  const handleUnblockUser = async () => {
    if (!selectedConversation) return;
    
    const success = await unblockUser(selectedConversation.conversationId);
    if (success) {
      setShowOptionsMenu(false);
    }
  };

  // Handle delete conversation
  const handleDeleteConversation = () => {
    const confirmed = window.confirm(`Are you sure you want to delete this conversation with ${selectedConversation.fullName}?`);
    if (confirmed) {
      console.log("Delete conversation with", selectedConversation.fullName);
      // Here you would implement the actual delete functionality
      // For example: deleteConversation(selectedConversation._id)
      setShowOptionsMenu(false);
    }
  };

  // Handle search in conversation
  const handleSearchConversation = () => {
    console.log("Search in conversation with", selectedConversation.fullName);
    // Here you would implement the search functionality
    setShowOptionsMenu(false);
  };

  // Handle mute notifications
  const handleMuteNotifications = () => {
    console.log("Mute notifications for", selectedConversation.fullName);
    // Here you would implement the mute functionality
    setShowOptionsMenu(false);
  };

  // Handle archive chat
  const handleArchiveChat = () => {
    console.log("Archive chat with", selectedConversation.fullName);
    // Here you would implement the archive functionality
    setShowOptionsMenu(false);
  };

  return (
    <div className='w-full h-full flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header with receiver's avatar, call buttons and options */}
          <div className='bg-indigo-600 px-4 py-3 mb-2 flex items-center justify-between rounded-t-md shadow-md'>
            <div className='flex items-center'>
              <div className='h-10 w-10 rounded-full overflow-hidden mr-3 bg-indigo-300 flex items-center justify-center'>
                <img 
                  src={selectedConversation.profilePic || `https://avatar.iran.liara.run/public/boy?username=${selectedConversation.fullName}`}
                  alt="Profile" 
                  className='h-full w-full object-cover'
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className='text-white font-bold mr-2'>{selectedConversation.fullName}</span>
                  {isInCall ? (
                    <span className='text-green-300 text-xs'>
                      On call • {formatCallDuration(callDuration)}
                    </span>
                  ) : (
                    <span className='text-indigo-200 text-xs'>
                      {formatLastSeen(selectedConversation.lastSeen)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Call and options buttons */}
            <div className="flex items-center space-x-3">
              {!isInCall ? (
                <>
                  <button 
                    onClick={handleAudioCall}
                    className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
                    title="Audio Call"
                  >
                    <FaPhone />
                  </button>
                  <button 
                    onClick={handleVideoCall}
                    className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
                    title="Video Call"
                  >
                    <FaVideo />
                  </button>
                  <div className="relative" ref={optionsMenuRef}>
                    <button 
                      onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                      className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
                      title="More Options"
                    >
                      <FaEllipsisV />
                    </button>
                    
                    {/* Options dropdown menu */}
                    {showOptionsMenu && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-slate-800 rounded-lg shadow-lg z-10 overflow-hidden">
                        <button 
                          onClick={handleSearchConversation}
                          className="w-full text-left px-3 py-2 hover:bg-slate-700 text-white text-sm flex items-center"
                        >
                          <FaSearch className="mr-2" /> Search in Chat
                        </button>
                        <button 
                          onClick={handleMuteNotifications}
                          className="w-full text-left px-3 py-2 hover:bg-slate-700 text-white text-sm flex items-center"
                        >
                          <FaBell className="mr-2" /> Mute Notifications
                        </button>
                        <button 
                          onClick={handleArchiveChat}
                          className="w-full text-left px-3 py-2 hover:bg-slate-700 text-white text-sm flex items-center"
                        >
                          <FaArchive className="mr-2" /> Archive Chat
                        </button>
                        {/* Block/Unblock option */}
                        {authUser && authUser._id && selectedConversation.blockedBy && selectedConversation.blockedBy === authUser._id ? (
                          <button 
                            onClick={handleUnblockUser}
                            className="w-full text-left px-3 py-2 hover:bg-slate-700 text-white text-sm flex items-center"
                          >
                            <FaUnlock className="mr-2" /> Unblock User
                          </button>
                        ) : (
                          <button 
                            onClick={handleBlockUser}
                            className="w-full text-left px-3 py-2 hover:bg-red-700 text-white text-sm flex items-center"
                          >
                            <FaBan className="mr-2" /> Block User
                          </button>
                        )}
                        <button 
                          onClick={handleDeleteConversation}
                          className="w-full text-left px-3 py-2 hover:bg-red-700 text-white text-sm flex items-center"
                        >
                          <FaTrash className="mr-2" /> Delete Conversation
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className={`${isMuted ? 'bg-red-600' : 'hover:bg-indigo-700'} text-white p-2 rounded-full transition-colors`}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <FaMicrophone /> : <FaMicrophone />}
                  </button>
                  <button 
                    onClick={handleEndCall}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                    title="End Call"
                  >
                    <FaPhoneSlash />
                  </button>
                  <button 
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`${isSpeakerOn ? 'bg-green-600' : 'hover:bg-indigo-700'} text-white p-2 rounded-full transition-colors`}
                    title={isSpeakerOn ? "Speaker Off" : "Speaker On"}
                  >
                    {isSpeakerOn ? <FaVolumeUp /> : <FaVolumeMute />}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Show blocked message if conversation is blocked */}
          {selectedConversation.isBlocked && (
            <div className="bg-red-600/20 text-center py-2 px-4 mb-2">
              <p className="text-red-400 text-sm">
                {selectedConversation.blockedBy === authUser?._id 
                  ? `You have blocked ${selectedConversation.fullName}. Unblock to resume messaging.`
                  : `${selectedConversation.fullName} has blocked you.`
                }
              </p>
            </div>
          )}

          {/* Call overlay */}
          {isInCall && (
            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-between z-50 p-6">
              <div className="w-full flex justify-end">
                <button 
                  onClick={handleEndCall}
                  className="text-slate-400 hover:text-white"
                >
                  <FaEllipsisV size={24} />
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-600 overflow-hidden">
                  <img 
                    src={selectedConversation.profilePic || `https://avatar.iran.liara.run/public/boy?username=${selectedConversation.fullName}`}
                    alt={selectedConversation.fullName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-white text-2xl font-bold mb-1">{selectedConversation.fullName}</h2>
                <p className="text-slate-400 mb-4">
                  {callType === "audio" ? "Audio Call" : "Video Call"}
                  {" • "} 
                  <span className="text-green-500">Connected</span>
                </p>
                <p className="text-slate-300 text-xl font-mono">{formatCallDuration(callDuration)}</p>
              </div>
              
              <div className="flex gap-6 mb-8">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`${isMuted ? "bg-red-600" : "bg-slate-700"} w-14 h-14 rounded-full flex items-center justify-center transition-colors`}
                >
                  {isMuted ? <FaMicrophone className="text-white text-xl" /> : <FaMicrophone className="text-white text-xl" />}
                </button>
                
                <button 
                  onClick={handleEndCall}
                  className="bg-red-600 hover:bg-red-700 w-14 h-14 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaPhoneSlash className="text-white text-xl" />
                </button>
                
                <button 
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`${isSpeakerOn ? "bg-green-600" : "bg-slate-700"} w-14 h-14 rounded-full flex items-center justify-center transition-colors`}
                >
                  {isSpeakerOn ? <FaVolumeUp className="text-white text-xl" /> : <FaVolumeMute className="text-white text-xl" />}
                </button>
              </div>
            </div>
          )}

          {/* Chat content */}
          {!isInCall && (
            <>
              <Messages />
              <MessageInput disabled={selectedConversation.isBlocked} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
