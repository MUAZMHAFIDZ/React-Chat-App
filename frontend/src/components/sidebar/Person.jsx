import { useState } from 'react'
import './sidebar.css'
import useConvertion from '../../store/useConvertion'

const Person = ({convertion}) => {
    const { selectedConvertion, setSelectedConvertion } = useConvertion()

    const isSelected = selectedConvertion?._id === convertion._id
    
    return (
        <div className={`person ${isSelected?"personbg" : ""}`} onClick={() => setSelectedConvertion(convertion)} >
            <div className="avatar online">
                <img src={convertion.photoProfile} alt="" />
            </div>
            <p>{convertion.fullName}</p>
        </div>
    )
}
export default Person