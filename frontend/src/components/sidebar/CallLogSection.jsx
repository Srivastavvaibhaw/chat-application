import { useState } from "react";
import { 
  FaPhone, 
  FaPhoneSlash, 
  FaVideo, 
  FaTrash, 
  FaInfoCircle, 
  FaArrowUp, 
  FaArrowDown, 
  FaEllipsisV, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVolumeUp, 
  FaVolumeMute,
  FaTimes,
  FaPlus
} from "react-icons/fa";
import SearchInput from "./SearchInput";

const CallLogSection = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [callType, setCallType] = useState("audio");
  const [selectedCall, setSelectedCall] = useState(null);
  const [selectedCalls, setSelectedCalls] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Call UI states
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  
  // Sample call log data
  const callLogs = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://placehold.co/100/2ecc71/FFFFFF/png",
      time: "Today, 10:30 AM",
      duration: "5:23",
      type: "incoming",
      callType: "audio",
      missed: false
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "https://placehold.co/100/e74c3c/FFFFFF/png",
      time: "Today, 9:15 AM",
      duration: "",
      type: "outgoing",
      callType: "video",
      missed: true
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "https://placehold.co/100/f39c12/FFFFFF/png",
      time: "Yesterday, 7:45 PM",
      duration: "12:08",
      type: "incoming",
      callType: "audio",
      missed: false
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "https://placehold.co/100/9b59b6/FFFFFF/png",
      time: "Yesterday, 3:20 PM",
      duration: "1:45",
      type: "outgoing",
      callType: "video",
      missed: false
    },
    {
      id: 5,
      name: "Alex Johnson",
      avatar: "https://placehold.co/100/2ecc71/FFFFFF/png",
      time: "Yesterday, 11:05 AM",
      duration: "",
      type: "incoming",
      callType: "audio",
      missed: true
    },
    {
      id: 6,
      name: "Sarah Williams",
      avatar: "https://placehold.co/100/e74c3c/FFFFFF/png",
      time: "Monday, 8:30 PM",
      duration: "3:12",
      type: "outgoing",
      callType: "audio",
      missed: false
    },
    {
      id: 7,
      name: "Michael Brown",
      avatar: "https://placehold.co/100/f39c12/FFFFFF/png",
      time: "Monday, 2:15 PM",
      duration: "8:33",
      type: "incoming",
      callType: "video",
      missed: false
    }
  ];

  const filteredCalls = callLogs.filter(call => {
    if (activeFilter === "all") return true;
    if (activeFilter === "missed") return call.missed;
    if (activeFilter === "incoming") return call.type === "incoming";
    if (activeFilter === "outgoing") return call.type === "outgoing";
    if (activeFilter === "video") return call.callType === "video";
    return true;
  });

  const handleDeleteCall = () => {
    // Logic to delete selected calls from database
    setShowDeleteModal(false);
    setSelectedCalls([]);
    setIsMultiSelect(false);
    // Update UI or show success message
  };

  const handleCallUser = (user) => {
    setSelectedCall(user);
    setShowCallModal(true);
  };

  const handleEndCall = () => {
    setShowCallModal(false);
    setSelectedCall(null);
  };

  const toggleCallSelection = (callId) => {
    if (selectedCalls.includes(callId)) {
      setSelectedCalls(selectedCalls.filter(id => id !== callId));
    } else {
      setSelectedCalls([...selectedCalls, callId]);
    }
  };

  const getCallIcon = (call) => {
    if (call.type === "incoming") {
      return <FaArrowDown className={`${call.missed ? "text-red-500" : "text-green-500"}`} />;
    } else {
      return <FaArrowUp className={`${call.missed ? "text-red-500" : "text-blue-500"}`} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Calls</h2>
        <SearchInput />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            {activeFilter === "all" ? "All Calls" : 
             activeFilter === "missed" ? "Missed Calls" : 
             activeFilter === "incoming" ? "Incoming Calls" : 
             activeFilter === "outgoing" ? "Outgoing Calls" : 
             "Video Calls"}
            <FaEllipsisV className="ml-2 text-xs" />
          </button>
          
          {showFilterMenu && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-slate-800 rounded-lg shadow-lg z-10 overflow-hidden">
              <button 
                onClick={() => {
                  setActiveFilter("all");
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-slate-700 text-sm ${activeFilter === "all" ? "bg-indigo-600 text-white" : "text-white"}`}
              >
                All Calls
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("missed");
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-slate-700 text-sm ${activeFilter === "missed" ? "bg-indigo-600 text-white" : "text-white"}`}
              >
                Missed Calls
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("incoming");
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-slate-700 text-sm ${activeFilter === "incoming" ? "bg-indigo-600 text-white" : "text-white"}`}
              >
                Incoming Calls
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("outgoing");
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-slate-700 text-sm ${activeFilter === "outgoing" ? "bg-indigo-600 text-white" : "text-white"}`}
              >
                Outgoing Calls
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("video");
                  setShowFilterMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-slate-700 text-sm ${activeFilter === "video" ? "bg-indigo-600 text-white" : "text-white"}`}
              >
                Video Calls
              </button>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsMultiSelect(!isMultiSelect)}
            className={`${isMultiSelect ? "bg-indigo-600" : "bg-slate-700 hover:bg-slate-600"} text-white text-sm px-3 py-1.5 rounded-lg transition-colors`}
          >
            {isMultiSelect ? "Cancel" : "Select"}
          </button>
          {isMultiSelect && selectedCalls.length > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              Delete ({selectedCalls.length})
            </button>
          )}
          <button
            onClick={() => {
              setCallType("audio");
              setShowCallModal(true);
              setSelectedCall(null);
            }}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors flex items-center"
          >
            <FaPlus className="mr-1" /> New Call
          </button>
        </div>
      </div>
      
      <div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">
        Recent Calls
      </div>
      
      {/* Call Logs List */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
        {filteredCalls.length > 0 ? (
          filteredCalls.map(call => (
            <div 
              key={call.id} 
              className={`flex items-center p-3 ${isMultiSelect ? "hover:bg-slate-700/20" : "hover:bg-slate-700/30"} rounded-xl transition-colors mb-2 cursor-pointer ${selectedCalls.includes(call.id) ? "bg-slate-700/40" : ""}`}
              onClick={() => isMultiSelect ? toggleCallSelection(call.id) : handleCallUser(call)}
            >
              {isMultiSelect && (
                <div className="mr-3">
                  <div className={`w-5 h-5 rounded border ${selectedCalls.includes(call.id) ? "bg-indigo-600 border-indigo-600" : "border-slate-500"} flex items-center justify-center`}>
                    {selectedCalls.includes(call.id) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
              <div className="relative mr-4">
                <img 
                  src={call.avatar} 
                  alt={call.name} 
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1">
                  {call.callType === "video" ? (
                    <FaVideo className={`${call.missed ? "text-red-500" : "text-blue-500"}`} />
                  ) : (
                    <FaPhone className={`${call.missed ? "text-red-500" : "text-green-500"}`} />
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <p className="text-white font-medium">{call.name}</p>
                  <div className="flex items-center">
                    {getCallIcon(call)}
                    <p className="text-slate-400 text-xs ml-1">{call.time}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm ${call.missed ? "text-red-500" : "text-slate-400"}`}>
                    {call.missed ? "Missed Call" : call.duration ? `Duration: ${call.duration}` : "Call ended"}
                  </p>
                  {!isMultiSelect && (
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCallType("audio");
                          handleCallUser(call);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-full transition-colors"
                      >
                        <FaPhone className="text-xs" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCallType("video");
                          handleCallUser(call);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full transition-colors"
                      >
                        <FaVideo className="text-xs" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-400 text-center mt-10">No call history found</div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <FaTrash className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-white text-xl font-bold">Delete Call Logs</h3>
              <p className="text-slate-400 mt-2">
                Are you sure you want to delete {selectedCalls.length} selected call {selectedCalls.length === 1 ? "record" : "records"}? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCall}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-between z-50 p-6">
          <div className="w-full flex justify-end">
            <button 
              onClick={handleEndCall}
              className="text-slate-400 hover:text-white"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="text-center">
            {selectedCall ? (
              <>
                <img 
                  src={selectedCall.avatar} 
                  alt={selectedCall.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-600"
                />
                <h2 className="text-white text-2xl font-bold mb-1">{selectedCall.name}</h2>
                <p className="text-slate-400 mb-4">
                  {callType === "audio" ? "Audio Call" : "Video Call"}
                  {" • "} 
                  <span className="text-green-500">Connected</span>
                </p>
                <p className="text-slate-300 text-xl font-mono">00:05</p>
              </>
            ) : (
              <>
                <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-600 bg-slate-700 flex items-center justify-center">
                  <FaUser className="text-white text-4xl" />
                </div>
                <h2 className="text-white text-2xl font-bold mb-1">New Call</h2>
                <p className="text-slate-400 mb-4">
                  Enter a contact name or number
                </p>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full max-w-md bg-slate-700 text-white rounded-lg p-3 mb-4"
                />
              </>
            )}
          </div>
          
          <div className="flex gap-6 mb-8">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`${isMuted ? "bg-red-600" : "bg-slate-700"} w-14 h-14 rounded-full flex items-center justify-center transition-colors`}
            >
              {isMuted ? <FaMicrophoneSlash className="text-white text-xl" /> : <FaMicrophone className="text-white text-xl" />}
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
    </div>
  );
};

export default CallLogSection;
