import MessageItem from "../../components/messages/MessageItem"
import SideBar from "../../components/sidebar/SideBar"
import './Home.css'

const Home = () => {
    return (
        <div className="bg">
            <div className="contain">
                <SideBar />
                <MessageItem />
            </div>
        </div>
    )
}
export default Home