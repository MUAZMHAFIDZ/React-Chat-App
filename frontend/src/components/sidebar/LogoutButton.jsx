import useLogout from "../../hooks/useLogout"

const LogoutButton = () => {
    const {loading, logout} = useLogout()

    return (
        <div className="col-span-1">
            {!loading ? (
                <button className="cursor-custom bg-gradient-to-r from-blue-700 to-red-600 hover:bg-gradient-to-l mt-1 py-1 px-3 text-sm" onClick={logout} >Logout</button>
            ) : (
                <span className="text-sm text-purple-300">Loading......</span>
            )}
        </div>
    )
}
export default LogoutButton