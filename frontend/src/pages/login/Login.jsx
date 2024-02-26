import { useState } from 'react'
import '../container.css'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loading, login} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login({username, password})
    }

    return (
        <div className="background">
            <div className="container">
                <div className="text">
                    <p>MuazChatApp</p>
                </div>
                <form onSubmit={handleSubmit}  style={{marginTop:50}}>
                    <div className='form'>
                        <label htmlFor="">
                            <span>Username</span>
                        </label>
                        <input onChange={(e) => {setUsername(e.target.value)}} value={username} className='input' type="text" placeholder="username here" />
                    </div>
                    <div className='form'  style={{marginTop:30}}>
                        <label htmlFor="">
                            <span>Password</span>
                        </label>
                        <input onChange={(e) => {setPassword(e.target.value)}} value={password} className='input' type="password" placeholder="password is secret :)" />
                    </div>
                    <Link className="link" to={"/signup"}>
                        {"Don't"} have account?
                    </Link>
                    <div className='button'>
                        <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default Login