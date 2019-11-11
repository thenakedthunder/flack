// -------------------- IMPORTS --------------------

// react components
import React from 'react';

import NewChannelDialog from '../NewChannelDialog/NewChannelDialog.js'; 

// Material Components
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import AddIcon from '@material-ui/icons/Add';

// styling
import './ChannelListPanel.css';

// Socket IO
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:5000');



export default function ChannelListPanel() {

    // ---------------- STATE VARIABLES -----------------

    // drawer's visibility on small screens
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [displayNewChannelDialog,
        setDisplayNewChannelDialog] = React.useState(false);

    // for holding channel names
    const [channelList, changeChannelList] = React.useState([]);


    // ------------ WEBSOCKET IMPLEMENTATION ------------

    React.useEffect(() => {
        socket.on('new channel created', payload => {
            changeChannelList(payload.channels.map(item => item.channelName))
        });
    });


    // --------------- HANDLER FUNCTIONS ----------------

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const openChannel = () => "TO DO"

    // ---------------- DRAWER COMPONENT ----------------

    let counter = 0;

    // rendering channels
    const channelListItems = channelList.map((channel) => {
        counter++;
        return (
            <ListItem
                button
                id={`channel-${counter}`}
                key={`channel-${counter}`}
                onClick={() => openChannel()}
            >
                <ListItemText primary={channel} />
            </ListItem>
        );
    });

    const drawer = (
        <div id="drawer">
            <List>
                <ListItem button onClick={() => setDisplayNewChannelDialog(true)}>
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText id="add-new-channel-btn" primary="Add a new channel" />
                </ListItem>
                {channelListItems}
            </List>
            <Divider />
        </div>
    );

    
    // -------------- RENDERING COMPONENT ---------------

    return (
        <div>
            <AppBar position="fixed" >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Channels
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            {displayNewChannelDialog &&
                <NewChannelDialog
                    closeDialogCallback={() => setDisplayNewChannelDialog(false)}
                />
            }
        </div>
    );

}