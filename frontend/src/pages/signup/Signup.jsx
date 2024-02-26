import '../container.css'
import { Link } from 'react-router-dom'
import Gender from './Gender'
import { useEffect, useState } from 'react'
import useSignup from '../../hooks/useSignup'

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    })

    const {loading, signup} = useSignup()

    const handleGender = (gender) => {
        setInputs({...inputs, gender: gender})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(inputs)
    }

    return (
        <div className="background">
            <div className="container">
                <div className="text">
                    <p>MuazChatApp</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form'>
                        <label htmlFor="">
                            <span>Full Name</span>
                        </label>
                        <input value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})} className='input' type="text" placeholder="username here" />
                    </div>
                    <div className='form'>
                        <label htmlFor="">
                            <span>Username</span>
                        </label>
                        <input value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} className='input' type="text" placeholder="username here" />
                    </div>
                    <div className='form'>
                        <label htmlFor="">
                            <span>Password</span>
                        </label>
                        <input value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} className='input' type="password" placeholder="password is secret :)" />
                    </div>
                    <div className='form' style={{marginBottom: 0}}>
                        <label htmlFor="">
                            <span>Confirm Password</span>
                        </label>
                        <input value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} className='input' type="password" placeholder="Confirm Password. dun forget OK :v" />
                    </div>
                    <Gender onHandleGender={handleGender} selectedGender={inputs.gender} />
                    <Link className="link" to={"/login"}>
                        I have account
                    </Link>
                    <div className='button'>
                        <button type='submit' disabled={loading}>{loading ? "Loading..." : "Signup"}</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default Signup