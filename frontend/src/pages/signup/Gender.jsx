const Gender = ({onHandleGender,selectedGender}) => {
    return (
        <div className="gender" style={{display: "flex", flexDirection: "row", marginLeft: 60, marginBottom: 5, height: "50px"}}>
            <div className='form'>
                <label className={selectedGender === "male" ? "selected": ""}>
                    <input type="radio" checked={selectedGender==="male"} onChange={() => onHandleGender("male")} />
                    <span>male</span>
                </label>
            </div>
            <div className='form'>
                <label className={selectedGender === "male" ? "selected": ""}>
                    <input type="radio" checked={selectedGender==="female"} onChange={() => onHandleGender("female")} />
                    <span>female</span>
                </label>
            </div>
        </div>
    )
}
export default Gender