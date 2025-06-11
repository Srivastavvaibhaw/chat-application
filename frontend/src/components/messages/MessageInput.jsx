import { useState, useRef } from "react";
import { BsSend, BsImage, BsEmojiSmile } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmoji, setShowEmoji] = useState(false);
	const fileInputRef = useRef(null);
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message && !fileInputRef.current?.files?.length) return;
		await sendMessage(message);
		setMessage("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleFileUpload = () => {
		fileInputRef.current?.click();
	};

	return (
		<form className="px-4 my-3" onSubmit={handleSubmit}>
			<div className="w-full relative bg-gray-800 rounded-xl shadow-md p-1">
				<div className="flex items-center gap-2 px-2">
					<button 
						type="button" 
						onClick={() => setShowEmoji(!showEmoji)}
						className="text-gray-400 hover:text-gray-200 transition"
					>
						<BsEmojiSmile size={20} />
					</button>
					<button 
						type="button" 
						onClick={handleFileUpload}
						className="text-gray-400 hover:text-gray-200 transition"
					>
						<BsImage size={20} />
					</button>
					<button 
						type="button" 
						className="text-gray-400 hover:text-gray-200 transition"
					>
						<IoMdAttach size={22} />
					</button>
					<input
						type="text"
						className="border-none outline-none text-sm flex-grow p-2.5 bg-transparent text-white"
						placeholder="Type a message..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button 
						type="submit" 
						className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
						disabled={loading}
					>
						{loading ? 
							<div className="loading loading-spinner loading-sm"></div> : 
							<BsSend className="text-white" size={18} />
						}
					</button>
				</div>
				
				<input
					type="file"
					ref={fileInputRef}
					className="hidden"
					accept="image/*"
				/>
				
				{showEmoji && (
					<div className="absolute bottom-full left-0 mb-2 bg-gray-700 p-2 rounded-lg shadow-lg">
						{/* Emoji picker would go here */}
						<div className="grid grid-cols-6 gap-2">
							{["😊", "😂", "❤️", "👍", "🔥", "🎉", "😍", "🙏", "👋", "😎", "🤔", "😢"].map((emoji, i) => (
								<button
									key={i}
									type="button"
									className="text-xl hover:bg-gray-600 p-1 rounded"
									onClick={() => {
										setMessage(prev => prev + emoji);
										setShowEmoji(false);
									}}
								>
									{emoji}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</form>
	);
};

export default MessageInput;
