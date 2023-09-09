import React from "react";
import './login.css'
import { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom'; 

export default function Login(){
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate() ;

    

    const checkLoginInfo = async () =>{
        
            let valid = false; 
            // check for validity
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            //send post request to the server using fetch 
            const res = await fetch('http://localhost:3000/login', {
                method: "POST", 
                headers: {
                    'content-type': 'application/json'
                }, 
                body: JSON.stringify({username, password})
            })
            if(res.status === 404){
                setErrorMessage("Invalid Username or Password")
            }
            else if(res.status === 200){ 
                // route to the chat url 
                const responseData = await res.json();
                console.log(responseData); 
                const user_id = responseData.user_id; 
                navigate(`/chats?id=${user_id}`)
            }
            else{
                setErrorMessage("Error in server")
            }
        
    }

    return (
        <div className="container">
           <div className="main-div">
                <p className="login-title">Sign In</p>
                <p className="error">{errorMessage}</p>
                <input type="text" placeholder="Username" className="username" id="username"/>
                <input type="password" placeholder="Password" className="password" id="password"/>
                <button className="login-button" onClick={checkLoginInfo}>Login</button>
                <p className="create-account">
                Don't have an account yet? <a href="/create-account">Create Account</a>
                </p>
           </div>
        </div>
    );
}