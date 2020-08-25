import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase'
import { useStateValue } from './StateProvider';
import  firebase  from 'firebase';

function Chat() {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot => {
                    setRoomName(snapshot.data().name)
                    setSeed(Math.floor(Math.random() * 5000))
                })

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat-header-info">
                    <h3>{roomName}</h3>
                    <p>
                   {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat-header-right">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message, index) => (
                    <p className={`chat-message ${message.name === user.displayName && 'chat-receiver'}`} key={index}>
                        <span className="chat-name">{message.name}</span>
                        {message.message}
                        <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))
                }
            </div>
            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" value={input} placeholder="Type a message" onChange={e => setInput(e.target.value)} />
                    <button onClick={sendMessage}>send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
