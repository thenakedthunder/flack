// -------------------- IMPORTS --------------------

// react components
import React from 'react';
import ReactDOM from 'react-dom';

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
import './ChanelListPanel.css';


export default function ChanelListPanel() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [displayNewChannelDialog,
        setDisplayNewChannelDialog] = React.useState(false);
    console.log(displayNewChannelDialog);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const setDisplayNewChannelDialogCallback =
        () => {
            setDisplayNewChannelDialog(false)
        }


    const drawer = (
        <div id="drawer">
            <List>
                <ListItem button onClick={() => setDisplayNewChannelDialog(true)}>
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText primary="Add a new channel" />
                </ListItem>
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
                <NewChannelDialog parentCallback={setDisplayNewChannelDialogCallback} />
                }
        </div>
    );

}