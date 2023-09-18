import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import './Create-account.css'



export default function CreateAccount(){
    const [errMsg, setErrMsg] = useState('');
    const [passErrMsg, setPassErrMsg] = useState('');
    const navigate = useNavigate(); 

    const checkMatchPasswords = () =>{
        const pass = document.getElementById('pass').value; 
        const confirmPass = document.getElementById('confirmPass').value; 

        if(confirmPass === ''){
            setPassErrMsg('');
        }
        else{
            if(pass !== confirmPass){
                setPassErrMsg('Passwords do not match');
            }
            else{
                setPassErrMsg('');
            }
        }
    }

    const handleAddingAccount = async () =>{
        if(passErrMsg === ''){
            // send a post request to the server to add the new use to the system

            //1. create the user object 
            const username = document.getElementById('new-username').value; 
            const password = document.getElementById('pass').value; 

            const userObject = {
                "username":  username, 
                "password": password
            }

            console.log('user tries to create account')

            //2. send the post request to the server 
            const res = await fetch('http://localhost:3000/create-account', {
                method: 'post', 
                headers: {
                    "content-type": 'application/json'
                }, 
                body: JSON.stringify(userObject)
            })

            const resJson = await res.json(); 
            const msg = resJson.msg;   
            if(res.status === 401){
                setErrMsg(msg); 
                console.log('user account exists')
                // empty the fields
                // location.reload(); 
                setErrMsg('Username already exists. Please try again');
            }      
            else if(res.status === 200){
                // display a pop-up
                console.log('user account created successfully!');
                navigate('/')   
            }
            else{
                setErrMsg('Unknown error')
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
                <input type="text" className="username" placeholder="Username" id="new-username" />
                <input type="password" className="password" id="pass" placeholder="Password"  
                onChange={checkMatchPasswords} />
                <input type="password" className="password" id="confirmPass" placeholder="Confirm Password"
                onChange={checkMatchPasswords}/>
                <p className="error">
                    {passErrMsg}
                </p>
                <button className="login-button" onClick={() =>handleAddingAccount()}> 
                    Sign Up
                </button>
            </div>
        </div>
    )
}