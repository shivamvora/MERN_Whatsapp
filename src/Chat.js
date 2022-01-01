import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import './Chat.css';
import React, { useState } from 'react';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';

const Chat = ( { messages } ) => {
    const [input, setInput] = useState( '' );
    const sendMessage = async ( e ) => {
        e.preventDefault();
        await axios.post( '/messages/new', {
            message: input,
            name: 'DEMO App',
            timestamp: 'just now',
            received: false
        } );
        setInput( '' );
    }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map( ( message ) => (
                    <p className={`chat__message ${message.received && 'chat__reciever'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {message.timestamp}
                        </span>
                    </p>
                ) )}
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput( e.target.value )}
                        placeholder='Type a message'
                        type="text"
                    />
                    <button type='submit' onClick={sendMessage} >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;
