import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import './Chats.css'
import $ from 'jquery'; 
import 'bootstrap'

export default function Chats(){

    const location = useLocation(); // Get the current location
    const queryParams = new URLSearchParams(location.search); // Get query parameters
    const user_id = queryParams.get("id"); // Get the user_id from query parameters

    
    // function to load chats: send the id from the database and retrieve the chat content. 
    const fetchChats = async ()=>{
        // send the ID to the database and retrive chat info using a get request.
        
        const res = await fetch(`http://localhost:3000/chats?id=${user_id}`)
        const chats = await res.json(); 
        console.log("chats in fetchChats: ",chats); 

         return chats; 
    }

    const chatDataJSX = async () =>{
        const chats = await fetchChats(); 
        // chats is an array of object so loop through it to handle each object.
        const chatData = []; 
        for(let i = 0; i < chats.length; i++){
            chatData.push(
                <div className="single-chat">
                    <button className="chat-button">{chats[i].CHAT_NAME}</button>
                 </div>
            )
        }
        return chatData; 
    }
    const [chatsToDisplay, setChatsToDisplay] = useState([]); // Use state to hold the chats

    useEffect(()=>{
        //$('body').css('background-color', 'white')
        const fetchAndSetChats = async () => {
            const chats = await chatDataJSX();
            setChatsToDisplay(chats); // Set the chats using state
        };

        fetchAndSetChats();
    }, [])



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
                    {chatsToDisplay}
                </div>
            </div>            

            <div className="chatroom-div">
                <div className="messages-div">
                    <div className="message-recived-div">
                        <p className="message-recived">
                            Hello there, I sent you a message!
                        </p>
                    </div>
                    <div className="message-sent-div">
                        <p className="message-sent"> 
                            Heyyy! I replied to you! This is supposed to be a very long message to 
                            check if they will overflow or not, i think they should not :)
                        </p>
                    </div>
                </div>
                <div className="send-messgae-div">

                </div>
            </div>
        
        </div>
    )
}