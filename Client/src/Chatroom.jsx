import React from "react";
import { useState } from "react";

import './Chatroom.css'
import { event } from "jquery";

export default function Chatroom (){

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

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