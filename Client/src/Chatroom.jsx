import React from "react";
import { useState } from "react";

import './Chatroom.css'

export default function Chatroom (){

    return (
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

                {/*Input msg and send button*/}
                <div className="input-msg-div">
                    <input type="text" placeholder="Type Message..." className="input-msg" />
                    <button className="send-btn">Send</button>
                </div>

            </div>
    )
}