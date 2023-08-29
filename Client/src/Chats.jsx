import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import './Chats.css'
import $ from 'jquery'; 
import 'bootstrap'

export default function Chats(props){

    const location = useLocation(); // Get the current location
    const queryParams = new URLSearchParams(location.search); // Get query parameters
    const user_id = queryParams.get("id"); // Get the user_id from query parameters

    useEffect(()=>{
        $('body').css('background-color', 'white')
    }, [])

    
    // function to load chats: send the id from the database and retrieve the chat content. 
    const loadChats = async ()=>{
        // send the ID to the database and retrive chat info using a get request.
    }

    return (
        <div>
           <nav>
            <p className="chat-app-title">chatWme</p>
            <div className="buttons-div">
                <button className="add-friends">Add Friends</button>
                <button className="create-chatroom">Create Chatroom</button>
            </div>
           </nav>

            <div className="chats-div">
                {/*search bar for chats*/}
                <input type="text" placeholder="Search..." className="chat-seacrh" />
                <div chats-container> 
                    <div className="single-chat">
                        <button className="chat-button">Chat 1</button>
                    </div>
                    <div className="single-chat">
                        <button className="chat-button">Chat 2</button>
                    </div>
                    
                </div>
            </div>            

            <div className="chatroom-div">
                
            </div>
        
        </div>
    )
}