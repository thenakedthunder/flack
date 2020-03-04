// -------------------- IMPORTS --------------------

import React from 'react';
import { TextField, Button, Icon } from '@material-ui/core';
import { Channel } from '../Channel';
// custom components




// Prop types
type ChannelViewPaneProps = {
    channelSelected: Channel;
    drawerOpen: boolean
};


export default function ChannelListPanel(props: ChannelViewPaneProps) {

    
    const contentStyle = {
        transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
        marginTop: 64,
        marginLeft: 0
    };

    if (props.drawerOpen) {
        contentStyle.marginLeft = 400;
    }

    return (
        <div style={contentStyle}>
            <h2 id="channel-name">{props.channelSelected.channelName}</h2>
            <p id="channel-creation-info"></p>
            <div id="messages"></div>
            <div>
                <TextField
                    id="message-textbox"
                    label="Multiline"
                    multiline
                    rows="4"
                    defaultValue="Default Value"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    //className={classes.button}
                    endIcon={<Icon>send</Icon>}
                />
            </div>
        </div>
    );
}