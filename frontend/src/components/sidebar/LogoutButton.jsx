import useLogout from "../../hooks/useLogout"

const LogoutButton = () => {
    const {loading, logout} = useLogout()

    return (
        <div className="logout">
            {!loading ? (
                <button onClick={logout} >Logout</button>
            ) : (
                <span>Loading......</span>
            )}
        </div>
    )
}
export default LogoutButton