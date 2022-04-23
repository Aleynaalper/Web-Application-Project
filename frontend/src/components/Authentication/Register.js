import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "./Register.css"

function Register() {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate();



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
        setUsername("")
        setPassword("")
        navigate("/")
    }

    return (

        <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <span className="linkedhu"> LinkedHU-CENG  </span>
              <span className="account">Create new account </span>
              <input placeholder="First Name" className="firstname" />
              <input placeholder="Last Name" className="lastname" />
              <input onChange = {(i) => handleUsername(i.target.value)} placeholder="Email" className="loginInput" />
              <input onChange = {(i) => handlePassword(i.target.value)} type={"password"} placeholder="Password" className="loginInput" />
              <button onClick={()=>handleButton("register")}className="loginButton">Sign up</button>
              <Link to={{pathname : '/login' }} ><span className="haveaccount">Already have an account?</span></Link>
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

export default Register