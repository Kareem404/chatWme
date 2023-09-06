import React from "react";
import { useState, useEffect } from "react";

import './Chatroom.css'
import { socket } from "./chats.jsx";

export default function Chatroom (props){

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const loadRoomMsgs =  room_id =>{
        // for now, just delete all the msgs
    
        setMessages([])
    
        //TODO: retrieve the msgs from the server for 'chat_id' and then display. 
        // To display: SetMessages to the array of messages retrieved from the server.
        // it will be a loop to determine if the user sent or recieved the message.
        // invoke either functions createRecivedMsg or createSentMsg.
    }

    const handleMessageRecievedEvent = msg =>{
        const recievedMsgJsx = createRecievedMsg(msg); 
        setMessages(currentMsgs =>[...currentMsgs, recievedMsgJsx]);
    }

    useEffect(()=>{
        loadRoomMsgs(props.roomId); 

        socket.on('msg-recieved', handleMessageRecievedEvent)
        return () =>{
            socket.off('msg-recieved', handleMessageRecievedEvent)
        }
    }, [props.roomId])


    const createSentMsg = msg =>{
        const sendMsgDiv = (
            <div className="message-sent-div">
                <p className="message-sent">
                    {msg}
                </p>
            </div>
        )

        return sendMsgDiv; 
    }

    

    const createRecievedMsg = msg =>{
        const recivedMsgDiv = (
            <div className="message-recived-div">
                <p className="message-recived">
                    {msg}
                </p>
            </div>
        )

        return recivedMsgDiv; 
    }
    
    const sendMsg = () =>{
        const msg = currentMessage; 
        const sentMsgJSx = createSentMsg(msg);
        document.getElementById('input-msg').value = ""
        setCurrentMessage("");
        socket.emit('msg-sent', msg, props.userId, props.roomId.toString());

        setMessages(currentMsgs => [...currentMsgs, sentMsgJSx]);
    }


    return (
        <div className="chatroom-div">
            <div className="chat-info-div">
                {/*a nav bar to display chat info*/}
                <p>
                    {/*chatroom name, will be handled by the onClick function for a specific chat*/}
                </p>
            </div>
            <div className="messages-div">
                    {messages}
            </div>

                {/*Input msg and send button*/}
                <div className="input-msg-div">
                    <input type="text" placeholder="Type Message..." className="input-msg" id="input-msg" onChange={
                        () =>{
                            setCurrentMessage(document.getElementById('input-msg').value);
                        }
                    } />

                    <button className="send-btn" onClick={sendMsg}>Send</button>
                </div>
            
        </div>
    )
}

