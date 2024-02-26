import LogoutButton from "./LogoutButton"
import Persons from "./Persons"
import SearchPerson from "./SearchPerson"
import './sidebar.css'

const SideBar = () => {
    return (
        <div className="sidebar">
            <SearchPerson />
            <div className="space"></div>
            <Persons />
            <LogoutButton />
        </div>
    )
}
export default SideBar