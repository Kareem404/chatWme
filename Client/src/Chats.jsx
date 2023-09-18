import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import './Chats.css'
import $ from 'jquery'; 
import 'bootstrap'

import Chatroom from "./Chatroom.jsx";

import { io } from 'socket.io-client'

export const socket = io("ws://localhost:5000");

socket.on('connect_error', error => {
    console.error('Socket.io connection error:', error);
});

export default function Chats(){

    const location = useLocation(); // Get the current location
    const queryParams = new URLSearchParams(location.search); // Get query parameters
    const user_id = queryParams.get("id"); // Get the user_id from query parameters

    
    const [chatsToDisplay, setChatsToDisplay] = useState([]); // Use state to hold the chats

    const [currentRoomId, setCurrentRoomId] = useState(0); 
    
    const [Allchats, setAllChats] = useState([]);

    // function to load chats: send the id from the database and retrieve the chat content. 
    const fetchChats = async ()=>{
        // send the ID to the database and retrive chat info using a get request.
        
        const res = await fetch(`http://localhost:3000/chats?id=${user_id}`)
        const chats = await res.json(); 
        console.log(chats);
        setAllChats(chats); 
        return chats; 
    }

    const joinSocketRoom = (room_id) =>{
        socket.emit('client-join-room', room_id);
        setCurrentRoomId(room_id)
    }

    const chatDataJSX = async () =>{
        const chats = await fetchChats(); 
        
        // chats is an array of object so loop through it to handle each object.
        const chatData = []; 
        for(let i = 0; i < chats.length; i++){
            const chat_id = chats[i].CHAT_ID; 
            chatData.push(
                <div className="single-chat" onClick={()=>joinSocketRoom(chat_id)}> {/*if invoked directly, react will call the function once it renders*/}
                    <button className="chat-button">{chats[i].CHAT_NAME}</button>
                 </div>
            )
        }
        return chatData; 
    }

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
                <div className="chats-container"> 
                    {chatsToDisplay}
                </div>
            </div>            

            
            <Chatroom roomId = {currentRoomId} userId = {user_id} chats = {Allchats}/>
        
        </div>
    )
}