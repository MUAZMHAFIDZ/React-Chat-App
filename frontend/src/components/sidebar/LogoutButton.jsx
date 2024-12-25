import useLogout from "../../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="col-span-1">
      {!loading ? (
        <button
          className="cursor-custom rounded-lg bg-gradient-to-r from-red-700 to-red-600 hover:bg-gradient-to-l mt-1 py-1 px-3 text-sm"
          onClick={logout}
        >
          <FiLogOut />
        </button>
      ) : (
        <span className="text-sm text-purple-300">Loading......</span>
      )}
    </div>
  );
};
export default LogoutButton;
