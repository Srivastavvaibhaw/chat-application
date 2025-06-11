import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<button 
					className='flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1'
					onClick={logout}
				>
					<BiLogOut className='w-5 h-5' />
					<span>Logout</span>
				</button>
			) : (
				<button className='flex items-center gap-2 bg-red-500 text-white font-medium py-2 px-4 rounded-lg opacity-75 cursor-not-allowed'>
					<span className='loading loading-spinner'></span>
					<span>Logging out...</span>
				</button>
			)}
		</div>
	);
};
export default LogoutButton;
