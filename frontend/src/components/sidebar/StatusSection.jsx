import { useState } from "react";
import { FaPlus, FaEye, FaImage, FaVideo, FaFileAlt, FaTimes } from "react-icons/fa";
import SearchInput from "./SearchInput";

const StatusSection = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [statusCaption, setStatusCaption] = useState("");

  // Sample status data
  const myStatus = {
    hasActiveStatus: true,
    lastUpdated: "Today, 10:30 AM",
    views: 12,
    content: "https://placehold.co/400x800/3498db/FFFFFF/png"
  };

  const userStatuses = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://placehold.co/100/2ecc71/FFFFFF/png",
      lastUpdated: "Today, 11:45 AM",
      seen: false,
      type: "image"
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "https://placehold.co/100/e74c3c/FFFFFF/png",
      lastUpdated: "Today, 9:20 AM",
      seen: true,
      type: "video"
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "https://placehold.co/100/f39c12/FFFFFF/png",
      lastUpdated: "Today, 8:05 AM",
      seen: true,
      type: "text"
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "https://placehold.co/100/9b59b6/FFFFFF/png",
      lastUpdated: "Yesterday, 10:15 PM",
      seen: true,
      type: "image"
    },
    {
      id: 5,
      name: "Daniel Wilson",
      avatar: "https://placehold.co/100/1abc9c/FFFFFF/png",
      lastUpdated: "Yesterday, 8:30 PM",
      seen: false,
      type: "image"
    }
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUploadStatus = () => {
    // Here you would implement the actual upload functionality
    // For now, we'll just close the modal
    setShowUploadModal(false);
    setSelectedFile(null);
    setStatusCaption("");
    // Show success message or update UI accordingly
  };

  const getStatusTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <FaVideo className="text-red-500" />;
      case "text":
        return <FaFileAlt className="text-blue-500" />;
      case "image":
      default:
        return <FaImage className="text-green-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Status</h2>
        <SearchInput />
      </div>
      
      {/* My Status Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold">My Status</h3>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors"
          >
            <FaPlus />
          </button>
        </div>
        
        <div className="bg-slate-700/30 rounded-xl p-4">
          {myStatus.hasActiveStatus ? (
            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
                  <img 
                    src={myStatus.content} 
                    alt="My status" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-slate-800 rounded-full p-1">
                  <FaEye className="text-white text-xs" />
                </div>
              </div>
              <div>
                <p className="text-white font-medium">My Status</p>
                <p className="text-slate-400 text-sm">{myStatus.lastUpdated}</p>
                <p className="text-slate-400 text-xs">{myStatus.views} views</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="w-16 h-16 rounded-full bg-slate-600 flex items-center justify-center">
                  <FaPlus className="text-white text-xl" />
                </div>
              </div>
              <div>
                <p className="text-white font-medium">Add Status</p>
                <p className="text-slate-400 text-sm">Tap to add status update</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">
        Recent Updates
      </div>
      
      {/* User Statuses */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
        {userStatuses.map(status => (
          <div 
            key={status.id} 
            className="flex items-center p-3 hover:bg-slate-700/30 rounded-xl transition-colors mb-2 cursor-pointer"
          >
            <div className="relative mr-4">
              <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${status.seen ? 'border-slate-500' : 'border-green-500'}`}>
                <img 
                  src={status.avatar} 
                  alt={status.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-slate-800 rounded-full p-1">
                {getStatusTypeIcon(status.type)}
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-white font-medium">{status.name}</p>
              <p className="text-slate-400 text-sm">{status.lastUpdated}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Upload Status Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-bold">Update Status</h3>
              <button 
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex gap-3 mb-4">
                <button 
                  onClick={() => setUploadType("image")}
                  className={`flex-1 py-2 rounded-lg ${uploadType === "image" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
                >
                  <FaImage className="mx-auto" />
                  <span className="text-xs mt-1 block">Image</span>
                </button>
                <button 
                  onClick={() => setUploadType("video")}
                  className={`flex-1 py-2 rounded-lg ${uploadType === "video" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
                >
                  <FaVideo className="mx-auto" />
                  <span className="text-xs mt-1 block">Video</span>
                </button>
                <button 
                  onClick={() => setUploadType("text")}
                  className={`flex-1 py-2 rounded-lg ${uploadType === "text" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
                >
                  <FaFileAlt className="mx-auto" />
                  <span className="text-xs mt-1 block">Text</span>
                </button>
              </div>
              
              {uploadType !== "text" ? (
                <div className="mb-4">
                  {selectedFile ? (
                    <div className="relative">
                      <img 
                        src={selectedFile} 
                        alt="Selected file" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button 
                        onClick={() => setSelectedFile(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="block w-full h-64 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                      <FaPlus className="text-slate-400 text-2xl mb-2" />
                      <span className="text-slate-400">Click to upload {uploadType}</span>
                      <input 
                        type="file" 
                        accept={uploadType === "image" ? "image/*" : "video/*"} 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <textarea
                    className="w-full h-64 bg-slate-700 text-white rounded-lg p-3 resize-none"
                    placeholder="What's on your mind?"
                    value={statusCaption}
                    onChange={(e) => setStatusCaption(e.target.value)}
                  ></textarea>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-slate-300 text-sm mb-1">Add a caption</label>
                <input 
                  type="text"
                  className="w-full bg-slate-700 text-white rounded-lg p-2"
                  placeholder="Caption (optional)"
                  value={statusCaption}
                  onChange={(e) => setStatusCaption(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadStatus}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                disabled={uploadType !== "text" && !selectedFile}
              >
                Upload Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSection;
