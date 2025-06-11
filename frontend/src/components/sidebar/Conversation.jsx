import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useState, useEffect } from "react";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	const [lastSeen, setLastSeen] = useState("Recently");

	// Simulate getting last seen time
	useEffect(() => {
		if (!isOnline) {
			// This would normally come from your backend
			const times = ["5m ago", "1h ago", "3h ago", "Yesterday", "2d ago"];
			setLastSeen(times[Math.floor(Math.random() * times.length)]);
		}
	}, [isOnline]);

	return (
		<>
			<div
				className={`flex gap-2 items-center rounded-2xl p-2.5 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
					isSelected 
						? "bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg" 
						: "hover:bg-slate-700/30"
				}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className="relative flex-shrink-0">
					<div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
						isSelected ? "ring-2 ring-indigo-300 ring-offset-1 ring-offset-slate-800" : ""
					} overflow-hidden`}>
						<img 
							src={conversation.profilePic || `https://avatar.iran.liara.run/public/boy?username=${conversation.fullName}`} 
							alt={conversation.fullName}
							className="w-full h-full object-cover"
						/>
					</div>
					{isOnline ? (
						<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
					) : (
						<div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800"></div>
					)}
				</div>

				<div className="flex flex-col flex-1 min-w-0">
					<div className="flex justify-between items-center">
						<p className={`font-semibold truncate ${isSelected ? "text-white" : "text-slate-200"}`}>
							{conversation.fullName}
						</p>
						<span className="text-lg flex-shrink-0 ml-1">{emoji}</span>
					</div>
					<div className="flex justify-between items-center">
						<p className={`text-xs truncate ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
							{isOnline ? (
								<span className="flex items-center">
									<span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
									Active now
								</span>
							) : (
								<span className="flex items-center">
									<span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
									{lastSeen}
								</span>
							)}
						</p>
						{conversation.unreadCount > 0 && (
							<span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
								isSelected ? "bg-white text-indigo-800" : "bg-indigo-600 text-white"
							}`}>
								{conversation.unreadCount}
							</span>
						)}
					</div>
				</div>
			</div>

			{!lastIdx && <div className="border-b border-slate-700/30 my-2" />}
		</>
	);
};

export default Conversation;



