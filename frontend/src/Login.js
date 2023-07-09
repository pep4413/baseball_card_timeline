import { useState } from "react";

const Login = (props) => {

    const [ user, SetUser ] = useState('')
    const [ pwd, SetPwd ] = useState('')
    const [ errMsg, setErrMsg ] = useState(null)

     const handleSubmit = async (e) => {
        e.preventDefault()
        let details = {
            username: user,
            password: pwd
        }
        let jdeets = JSON.stringify(details)
        console.log(jdeets);
        let logged = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jdeets
        })
            .catch(err => console.log(err))
        let result = await logged.json()
        if (result.success) {
            props.setAuth(true)
            setErrMsg(null)
        } else {
            setErrMsg(result.message)
        }
        SetUser('')
        SetPwd('')
    }

    return ( 
        <div id="login">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" autoComplete="off" onChange={(e) => SetUser(e.target.value)} value={user} required/>
    
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => SetPwd(e.target.value)} value={pwd} required />
                
                <button>Sign In</button>
    
            </form>
            {errMsg && 
                <p>{errMsg}</p>
            }
        </div>    
    );            
}
 
export default Login;