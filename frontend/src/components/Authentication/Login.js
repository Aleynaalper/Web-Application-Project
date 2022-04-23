import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"

function Login() {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
      };


        


    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) => {
        fetch("/auth/"+path, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({
              userName : username, 
              password : password,
            }),
          }).then((res) => res.json())
          .then((result) => {localStorage.setItem("tokenKey",result.message);
                            localStorage.setItem("currentUser",result.userId);
                            localStorage.setItem("userName",username)})
          .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)

        if(localStorage.getItem("userName") === null)
          {        
            navigate("/")

            
          }
        else{ navigate("/home") 
          setUsername("")
          setPassword("")
        }

    }


    return (

        

        <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <span className="linkedhu"> LinkedHU-CENG  </span>
              <span className="slogan">-------------Always get contact for your career opportunities-------------</span>
              <input onChange = {(i) => handleUsername(i.target.value)} placeholder="Email" className="loginInput1" />
              <div className="flexContainer">
              <input onChange = {(i) => handlePassword(i.target.value)} type={passwordShown ? "text" : "password"} placeholder="Password" className="loginInput2" />
              <VisibilityIcon className="icon"
              onClick={togglePassword}>Show Password
              </VisibilityIcon>
              </div>
              <i class="bi bi-eye-slash" id="togglePassword"></i>
              <button onClick={()=>handleButton("login")} className="loginButton">Sign in</button>
              <span className="loginForgot">Forgot Password?</span>
              <Link  className='link' to={{pathname : '/register' }}><button className="RegisterButton">
                Join now
                
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    //     <FormControl>
    //         <InputLabel>Username</InputLabel>
    //         <Input onChange = {(i) => handleUsername(i.target.value)}/>
    //         <InputLabel style={{ top: 80 }}>Password</InputLabel>
    //         <Input style={{ top: 40 }} 
    //         onChange = {(i) => handlePassword(i.target.value)}/>
    //         <Button variant='contained'
    //             style={{
    //                 marginTop: 60,
    //                 background: "purple",
    //                 color: "white"
    //             }}
    //             onClick={()=>handleButton("register")}>Register</Button>
    //         <FormHelperText style={{margin:20}}>Already registered?</FormHelperText>
    //         <Button variant='contained'
    //             style={{
    //                 background: "purple",
    //                 color: "white"
    //             }}
    //             onClick={()=>handleButton("login")}>Login</Button>
    // </FormControl>
    )
}

export default Login