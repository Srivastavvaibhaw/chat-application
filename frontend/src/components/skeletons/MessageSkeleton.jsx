const MessageSkeleton = () => {
	// Define reusable skeleton components for better maintainability
	const AvatarSkeleton = () => (
	  <div className="skeleton w-10 h-10 rounded-full shrink-0" aria-hidden="true"></div>
	);
	
	const MessageContentSkeleton = ({ lineCount = 2 }) => (
	  <div className="flex flex-col gap-1">
		{[...Array(lineCount)].map((_, index) => (
		  <div 
			key={index} 
			className="skeleton h-4 w-40" 
			style={{ width: `${Math.max(20, Math.min(40, 30 + Math.random() * 20))}%` }}
			aria-hidden="true"
		  ></div>
		))}
	  </div>
	);
  
	return (
	  <>
		{/* Incoming message skeleton */}
		<div className="flex gap-3 items-start animate-pulse mb-4">
		  <AvatarSkeleton />
		  <MessageContentSkeleton lineCount={2} />
		</div>
		
		{/* Outgoing message skeleton */}
		<div className="flex gap-3 items-start justify-end animate-pulse">
		  <MessageContentSkeleton lineCount={1} />
		  <AvatarSkeleton />
		</div>
	  </>
	);
  };
  
export default MessageSkeleton;
