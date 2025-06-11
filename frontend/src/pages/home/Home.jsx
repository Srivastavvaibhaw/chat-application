import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='
			flex w-full 
			sm:h-[450px] md:h-[550px] lg:h-[600px] 
			rounded-xl overflow-hidden 
			bg-gradient-to-br from-indigo-200/30 to-purple-400/20 
			bg-clip-padding backdrop-filter backdrop-blur-lg 
			border border-indigo-200/30
			shadow-lg hover:shadow-xl transition-all duration-300
			mx-auto my-3 max-w-6xl
		'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};

export default Home;
