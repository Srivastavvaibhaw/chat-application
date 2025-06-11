import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  
  // Custom styling for a unique look
  const bubbleBgColor = fromMe 
    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" 
    : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800";
  
  const bubbleShape = fromMe 
    ? "rounded-2xl rounded-br-none" 
    : "rounded-2xl rounded-bl-none";
  
  const avatarBorder = fromMe
    ? "border-2 border-purple-300 p-0.5 bg-gradient-to-r from-indigo-200 to-purple-200"
    : "border-2 border-gray-300 p-0.5 bg-gradient-to-r from-gray-100 to-gray-200";
  
  const shakeClass = message.shouldShake ? "shake" : "";
  
  // Add a subtle animation for new messages
  const animationClass = "animate-fade-in-down";

  return (
    <div className={`chat ${chatClassName} my-3`}>
      <div className="chat-image avatar">
        <div className={`w-10 rounded-full overflow-hidden ${avatarBorder} shadow-md hover:scale-105 transition-all duration-300`}>
          <img 
            alt="Chat avatar" 
            src={profilePic || `https://avatar.iran.liara.run/public/boy?username=${authUser.fullName}`}
            className="object-cover"
          />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${bubbleShape} ${shakeClass} ${animationClass} pb-2 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
        <div className="px-1 py-0.5">{message.message}</div>
      </div>
      <div className="chat-footer opacity-70 text-xs flex gap-1 items-center font-medium">
        <span className={`${fromMe ? "text-purple-600" : "text-gray-600"}`}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default Message;
