import React from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import './Sidebar.css';
import { SearchOutlined } from '@material-ui/icons';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src='https://media-exp1.licdn.com/dms/image/C5603AQF9by8EeGiHkg/profile-displayphoto-shrink_200_200/0/1639485540384?e=1645056000&v=beta&t=0KWxymSdYSY_FHFmhgfScXivsA_tX17GmZnD6dXEQ6Q' />
                <div className="sidebar__headerRight">
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
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder='Search or start new chat' />
                </div>
            </div>
            <div className="sidebar__chats">

            </div>
        </div>
    )
}

export default Sidebar;
