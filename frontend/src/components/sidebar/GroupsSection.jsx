// src/components/sidebar/GroupsSection.jsx
import { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaPlus, 
  FaUserPlus, 
  FaSearch, 
  FaEllipsisV, 
  FaLock, 
  FaGlobe, 
  FaTimes,
  FaCheck
} from "react-icons/fa";
import SearchInput from "./SearchInput";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const GroupsSection = () => {
  const { authUser } = useAuthContext();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(null);
  const [pendingInvites, setPendingInvites] = useState([]);

  // Form states
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [groupCode, setGroupCode] = useState("");

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockGroups = [
          {
            _id: "1",
            name: "Tech Enthusiasts",
            description: "A group for tech lovers",
            members: 42,
            isPrivate: false,
            lastMessage: {
              text: "Has anyone tried the new React 18?",
              timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
            },
            unreadCount: 3,
            avatar: "https://placehold.co/100/3498db/FFFFFF/png"
          },
          {
            _id: "2",
            name: "Project Alpha Team",
            description: "Internal discussions for Project Alpha",
            members: 8,
            isPrivate: true,
            lastMessage: {
              text: "Meeting scheduled for tomorrow at 10am",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
            },
            unreadCount: 0,
            avatar: "https://placehold.co/100/e74c3c/FFFFFF/png"
          },
          {
            _id: "3",
            name: "Travel Buddies",
            description: "Share travel tips and experiences",
            members: 156,
            isPrivate: false,
            lastMessage: {
              text: "Check out these photos from my trip to Japan!",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
            },
            unreadCount: 12,
            avatar: "https://placehold.co/100/2ecc71/FFFFFF/png"
          }
        ];

        // Mock pending invites
        const mockInvites = [
          {
            _id: "inv1",
            groupId: "4",
            groupName: "Design Team",
            invitedBy: "Sarah Williams",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            avatar: "https://placehold.co/100/9b59b6/FFFFFF/png"
          },
          {
            _id: "inv2",
            groupId: "5",
            groupName: "Book Club",
            invitedBy: "Michael Chen",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
            avatar: "https://placehold.co/100/f39c12/FFFFFF/png"
          }
        ];

        setGroups(mockGroups);
        setPendingInvites(mockInvites);
      } catch (error) {
        console.error("Error fetching groups:", error);
        toast.error("Failed to load groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }

    // In a real app, this would be an API call
    toast.success(`Group "${groupName}" created successfully!`);
    
    // Add the new group to the list
    const newGroup = {
      _id: Date.now().toString(),
      name: groupName,
      description: groupDescription,
      members: 1,
      isPrivate,
      lastMessage: null,
      unreadCount: 0,
      avatar: `https://placehold.co/100/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF/png`
    };
    
    setGroups([newGroup, ...groups]);
    
    // Reset form and close modal
    setGroupName("");
    setGroupDescription("");
    setIsPrivate(false);
    setShowCreateModal(false);
  };

  const handleJoinGroup = () => {
    if (!groupCode.trim()) {
      toast.error("Group code is required");
      return;
    }

    // In a real app, this would be an API call
    toast.success("Group join request sent!");
    
    // Reset form and close modal
    setGroupCode("");
    setShowJoinModal(false);
  };

  const handleAcceptInvite = (inviteId) => {
    // In a real app, this would be an API call
    toast.success("Group invitation accepted!");
    
    // Remove the invite from the list
    setPendingInvites(pendingInvites.filter(invite => invite._id !== inviteId));
    
    // Add the group to the list (in a real app, you'd fetch the group details)
    const invite = pendingInvites.find(inv => inv._id === inviteId);
    if (invite) {
      const newGroup = {
        _id: invite.groupId,
        name: invite.groupName,
        members: 0,
        isPrivate: true,
        lastMessage: null,
        unreadCount: 0,
        avatar: invite.avatar
      };
      
      setGroups([newGroup, ...groups]);
    }
  };

  const handleRejectInvite = (inviteId) => {
    // In a real app, this would be an API call
    toast.success("Group invitation rejected");
    
    // Remove the invite from the list
    setPendingInvites(pendingInvites.filter(invite => invite._id !== inviteId));
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    
    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise show full date
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Groups</h2>
        <SearchInput placeholder="Search groups..." />
      </div>
      
      {/* Group Actions */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Create Group
        </button>
        <button
          onClick={() => setShowJoinModal(true)}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaUserPlus className="mr-2" /> Join Group
        </button>
      </div>
      
      {/* Pending Invites Section */}
      {pendingInvites.length > 0 && (
        <div className="mb-6">
          <div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">
            Group Invitations
          </div>
          
          <div className="space-y-2 mt-3">
            {pendingInvites.map((invite) => (
              <div key={invite._id} className="bg-slate-700/30 rounded-xl p-3">
                <div className="flex items-center mb-2">
                  <img
                    src={invite.avatar}
                    alt={invite.groupName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-white font-medium">{invite.groupName}</p>
                    <p className="text-slate-400 text-xs">Invited by {invite.invitedBy}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptInvite(invite._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded transition-colors text-sm flex items-center justify-center"
                  >
                    <FaCheck className="mr-1" /> Accept
                  </button>
                  <button
                    onClick={() => handleRejectInvite(invite._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded transition-colors text-sm flex items-center justify-center"
                  >
                    <FaTimes className="mr-1" /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Groups List */}
      <div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">
        Your Groups
      </div>
      
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
        {loading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : groups.length > 0 ? (
          <div className="space-y-2">
            {groups.map((group) => (
              <div 
                key={group._id} 
                className="bg-slate-700/30 hover:bg-slate-700/50 rounded-xl p-3 cursor-pointer transition-colors"
                onClick={() => setShowGroupInfo(group._id === showGroupInfo ? null : group._id)}
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img
                      src={group.avatar}
                      alt={group.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {group.isPrivate && (
                      <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1">
                        <FaLock className="text-yellow-500 text-xs" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-medium truncate pr-2">
                        {group.name}
                      </h3>
                      {group.lastMessage && (
                        <span className="text-slate-400 text-xs whitespace-nowrap">
                          {formatTime(group.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      {group.lastMessage ? (
                        <p className="text-slate-400 text-sm truncate pr-2">
                          {group.lastMessage.text}
                        </p>
                      ) : (
                        <p className="text-slate-500 text-sm italic">
                          No messages yet
                        </p>
                      )}
                      {group.unreadCount > 0 && (
                        <span className="bg-indigo-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                          {group.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Group info (expanded) */}
                {showGroupInfo === group._id && (
                  <div className="mt-3 pt-3 border-t border-slate-600/30">
                    {group.description && (
                      <p className="text-slate-300 text-sm mb-2">{group.description}</p>
                    )}
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{group.members} members</span>
                      <span>{group.isPrivate ? "Private Group" : "Public Group"}</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-1 rounded text-sm transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1 rounded text-sm transition-colors">
                        Invite People
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-400 text-center mt-10">
            <FaUsers className="mx-auto text-4xl mb-2 text-slate-500" />
            <p>You haven't joined any groups yet.</p>
            <p className="text-sm mt-1">Create a group or join an existing one to get started!</p>
          </div>
        )}
      </div>
      
      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-white text-xl font-bold mb-4">Create New Group</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Group Name*</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="w-full bg-slate-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm mb-1">Description</label>
                <textarea
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="What's this group about?"
                  className="w-full bg-slate-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privateGroup"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="privateGroup" className="text-slate-300 text-sm">
                  Private Group (invite only)
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!groupName.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Join Group Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-white text-xl font-bold mb-4">Join a Group</h3>
            
            <div>
              <label className="block text-slate-300 text-sm mb-1">Group Code or Invitation Link</label>
              <input
                type="text"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                placeholder="Enter group code"
                className="w-full bg-slate-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-slate-400 text-xs mt-2">
                Ask the group admin for the group code or invitation link.
              </p>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowJoinModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinGroup}
                disabled={!groupCode.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Join Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsSection;
