import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase'
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [room, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return ()=>{
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar-header-right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-search-container">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat addNewChat />
                {room.map(room =>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
