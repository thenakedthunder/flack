// -------------------- IMPORTS --------------------

import React, { MouseEvent } from 'react';
// custom components
import NewChannelDialog from '../NewChannelDialog/NewChannelDialog';
import { Channel } from '../Channel';

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
import ChannelViewPane from '../ChannelViewPane/ChannelViewPane';

// Socket IO
const io = require('socket.io-client')
const socket = io('http://127.0.0.1:5000')



interface Payload {
    channels: Channel[]
}


export default function ChannelListPanel() {

    // ---------------- STATE VARIABLES -----------------

    // drawer's visibility on small screens
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const [displayNewChannelDialog,
        setDisplayNewChannelDialog] = React.useState(false)

    // for holding channel names
    const [channelList, updateChannelList] =
        React.useState(new Array<Channel>())
    const [channelSelected, setChannelSelected] =
        React.useState(channelList.length ? channelList[0] : null)


    // ------------ WEBSOCKET IMPLEMENTATION ------------

    React.useEffect(() => {
        socket.emit('update channels')

        socket.on('new channel(s) in memory', (payload: Payload) => {
            updateChannelList(payload.channels)
        });
    }, []);


    // --------------- HANDLER FUNCTIONS ----------------

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    const handleOpenChannelClick = (event: React.MouseEvent<HTMLDivElement>) =>
        setChannelSelected(getSelectedChannelFromChannelName(
            event.currentTarget.dataset.channelName))

    const getSelectedChannelFromChannelName =
        (channelName: string | undefined): Channel => 
            channelList.filter(channel => channel.channelName === channelName)[0]


    // -------------- COMPONENTS ---------------

    const getSecondaryChannelText = (channel: Channel) => {
        const { messages, creatorDisplayName, creationTime} = channel

        if (messages.length === 0) {
            return `Created ` + creationTime + ` by ${creatorDisplayName}`
        }

        // else: for when messages can be transmitted
        throw Error("not implemented")
    }


    const renderChannelListItems = (channelList: Channel[]) => {
        return channelList.map((channel, index) => {
            return <ListItem
                button
                id={`channel-${index}`}
                key={`channel-${index}`}
                onClick={handleOpenChannelClick}
                data-channel-name={channel.channelName}
            >
                <ListItemText
                    primary={channel.channelName}
                    secondary={getSecondaryChannelText(channel)} />
            </ListItem>
        })
    }

    const drawerContent = (
        <div id="drawer">
            <List id="drawer-list-items">
                <ListItem button
                          onClick={() => setDisplayNewChannelDialog(true)}>
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText id="add-new-channel-btn"
                                  primary="Add a new channel" />
                </ListItem>
                <Divider />
                {renderChannelListItems(channelList)}
            </List>
        </div>
    )

    const appBar = (
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
    )

    const sideBarOnSmallScreens = (
        <Hidden mdUp implementation="css">
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
            >
                {drawerContent}
            </Drawer>
        </Hidden>
    )

    const sideBarOnLargeScreens = (
        <Hidden smDown implementation="css">
            <Drawer
                variant="permanent"
            >
                {drawerContent}
            </Drawer>
        </Hidden>
    )


    // -------------- RENDERING COMPONENT ---------------

    return (
        <div>
            {appBar}

            <nav>
                {sideBarOnSmallScreens}
                {sideBarOnLargeScreens}
            </nav>

            {channelSelected &&
                <ChannelViewPane
                    channelSelected={channelSelected}
                    drawerOpen= {mobileOpen}    
                />
            }
            
            {displayNewChannelDialog &&
                <NewChannelDialog
                    closeDialogCallback={() => setDisplayNewChannelDialog(false)}
                />
            }
        </div>
    );
}