import React, {useRef} from 'react'

const Login = () =>{
    const userInput = useRef()
    const passwordInput = useRef()

    return(
        <div>
            <h4>Login</h4>
            <input ref = {userInput} name='username' placeholder='username'/>
            <input ref = {passwordInput} name='password' placeholder='password'/>
        </div>
    )
}

export default Login