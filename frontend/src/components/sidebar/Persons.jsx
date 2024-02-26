import useGetConvertion from "../../hooks/useGetConvertion"
import Person from "./Person"
import './sidebar.css'

const Persons = () => {
    const {loading, convertions} = useGetConvertion()

    return (
        <div className="persons">
            {convertions.map((people, idx) => (
                <Person 
                    key={people._id}
                    convertion={people}
                />
            ))}
            
            {loading ? <span>Loading...</span> : null}
        </div>
    )
}
export default Persons