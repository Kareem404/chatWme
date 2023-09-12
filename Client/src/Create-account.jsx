import React from "react";
import { useState } from "react";
import './Create-account.css'



export default function CreateAccount(){
    const [errMsg, serErrMsg] = useState('');
    const [passErrMsg, setPassErrMsg] = useState('');

    const checkMatchPasswords = () =>{
        const pass = document.getElementById('pass').value; 
        const confirmPass = document.getElementById('confirmPass').value; 

        if(confirmPass === ''){
            setPassErrMsg('');
        }
        else{
            console.log('chekcing if pass matches')
            if(pass !== confirmPass){
                setPassErrMsg('Passwords do not match');
            }
            else{
                setPassErrMsg('');
            }
        }
    }

    return (
        <div className="container">
            <div className="create-account-div">
                <p className="login-title"> 
                    Create Account
                </p>
                <p className="error">
                    {errMsg}
                </p>
                <input type="text" className="username" placeholder="Username" />
                <input type="password" className="password" id="pass" placeholder="Password" 
                onChange={checkMatchPasswords}/>
                <input type="password" className="password" id="confirmPass" placeholder="Confirm Password"
                onChange={checkMatchPasswords}/>
                <p className="error">
                    {passErrMsg}
                </p>
                <button className="login-button"> 
                    Sign Up
                </button>
            </div>
        </div>
    )
}