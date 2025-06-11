import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import DeleteAccountButton from "./DeleteAccountButton";
import StatusSection from "./StatusSection"; 
import GroupsSection from "./GroupsSection"; // Change this import
import CallLogSection from "./CallLogSection";
import { FaComments, FaPhone, FaCircle, FaUsers, FaCog, FaUser, FaStar } from "react-icons/fa"; // Changed FaLock to FaUsers

const Sidebar = () => {
	const [activeSection, setActiveSection] = useState("chats");

	// Render content based on active section
	const renderContent = () => {
		switch (activeSection) {
			case "chats":
				return (
					<>
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Messages</h2>
							<SearchInput />
						</div>
						
						<div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">Recent Chats</div>
						
						<div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
							<Conversations />
						</div>
					</>
				);
			case "calls":
				return <CallLogSection />; 
			case "status":
				return <StatusSection />; 
			case "groups": // Changed from "private" to "groups"
				return <GroupsSection />; // Use the new component
			case "starred":
				return (
					<>
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Starred Messages</h2>
							<SearchInput />
						</div>
						
						<div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">Favorites</div>
						
						<div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
							<div className="text-slate-400 text-center mt-10">No starred messages</div>
						</div>
					</>
				);
			case "settings":
				return (
					<>
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Settings</h2>
						</div>
						
						<div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">Options</div>
						
						<div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
							<div className="flex flex-col gap-3">
								<button className="text-left text-white hover:bg-slate-700/50 p-3 rounded-lg transition-colors">
									Account Settings
								</button>
								<button className="text-left text-white hover:bg-slate-700/50 p-3 rounded-lg transition-colors">
									Privacy & Security
								</button>
								<button className="text-left text-white hover:bg-slate-700/50 p-3 rounded-lg transition-colors">
									Notifications
								</button>
								<button className="text-left text-white hover:bg-slate-700/50 p-3 rounded-lg transition-colors">
									Appearance
								</button>
								<button className="text-left text-white hover:bg-slate-700/50 p-3 rounded-lg transition-colors">
									Help & Support
								</button>
							</div>
						</div>
					</>
				);
			case "profile":
				return (
					<>
						<div className="mb-6">
							<h2 className="text-2xl font-bold text-white mb-4 tracking-tight">My Profile</h2>
						</div>
						
						<div className="flex flex-col items-center mb-6">
							<div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
								<span className="text-white text-4xl font-bold">U</span>
							</div>
							<h3 className="text-white text-xl font-semibold">User Name</h3>
							<p className="text-slate-400">Status: Online</p>
						</div>
						
						<div className="divider before:bg-slate-600/30 after:bg-slate-600/30 before:h-0.5 after:h-0.5 text-slate-400 text-xs uppercase tracking-widest font-semibold">Profile Info</div>
						
						<div className="flex-grow overflow-y-auto custom-scrollbar pr-2 -mr-2">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col">
									<span className="text-slate-400 text-sm">Email</span>
									<span className="text-white">user@example.com</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400 text-sm">Phone</span>
									<span className="text-white">+1 123 456 7890</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400 text-sm">Bio</span>
									<span className="text-white">Hey there! I'm using this chat app.</span>
								</div>
							</div>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className="flex h-full">
			{/* Navigation sidebar */}
			<div className="w-16 bg-slate-900 flex flex-col items-center py-4 gap-6">
				{/* Top icons */}
				<div className="flex flex-col items-center gap-6">
					<button 
						onClick={() => setActiveSection("chats")}
						className={`relative p-2 rounded-lg ${activeSection === "chats" ? "bg-slate-700" : "hover:bg-slate-800"}`}
					>
						<FaComments className="text-white text-2xl" />
						<span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
					</button>
					
					<button 
						onClick={() => setActiveSection("calls")}
						className={`p-2 rounded-lg ${activeSection === "calls" ? "bg-slate-700" : "hover:bg-slate-800"}`}
					>
						<FaPhone className="text-white text-2xl" />
					</button>
					
					<button 
						onClick={() => setActiveSection("status")}
						className={`relative p-2 rounded-lg ${activeSection === "status" ? "bg-slate-700" : "hover:bg-slate-800"}`}
					>
						<FaCircle className="text-white text-2xl" />
						<span className="absolute -top-1 -right-1 bg-green-500 w-2 h-2 rounded-full"></span>
					</button>
					
					<button 
						onClick={() => setActiveSection("groups")} // Changed from "private" to "groups"
						className={`p-2 rounded-lg ${activeSection === "groups" ? "bg-slate-700" : "hover:bg-slate-800"}`} // Changed "private" to "groups"
					>
						<FaUsers className="text-white text-2xl" /> {/* Changed FaLock to FaUsers */}
					</button>
				</div>

				{/* Profile pictures */}
				

				{/* Bottom icons */}
				<div className="flex flex-col items-center gap-6 mt-auto">
					<button 
						onClick={() => setActiveSection("starred")}
						className={`p-2 rounded-lg ${activeSection === "starred" ? "bg-slate-700" : "hover:bg-slate-800"}`}
					>
						<FaStar className="text-white text-2xl" />
					</button>
					
					
					
					<button 
						onClick={() => setActiveSection("settings")}
						className={`p-2 rounded-lg ${activeSection === "settings" ? "bg-slate-700" : "hover:bg-slate-800"}`}
					>
						<FaCog className="text-white text-2xl" />
					</button>
					
					<button 
						onClick={() => setActiveSection("profile")}
						className={`p-2 rounded-lg ${activeSection === "profile" ? "bg-slate-700" : "hover:bg-slate-800"}`}
					>
						<FaUser className="text-white text-2xl" />
					</button>
				</div>
			</div>

			{/* Main sidebar content */}
			<div className="bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-600/40 p-5 flex flex-col h-full flex-grow rounded-l-xl shadow-xl">
				{renderContent()}
				
				<div className="mt-6 pt-4 border-t border-slate-700/50 flex flex-col gap-3">
					<LogoutButton />
					<DeleteAccountButton />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
