import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const DeleteAccountButton = () => {
  const { currentUser, deleteAccount } = useAuthContext();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success("Your account has been deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete account");
      console.error("Error deleting account:", error);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs text-red-300">Are you sure? This cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteAccount}
            className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsConfirming(false)}
            className="text-white bg-slate-600 hover:bg-slate-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors py-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
          clipRule="evenodd"
        />
      </svg>
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
