// -------------------- IMPORTS --------------------

import React from 'react';
import { TextField, Button, Icon } from '@material-ui/core';
import { Channel } from '../Channel';
// custom components




// Prop types
type ChannelViewPaneProps = {
    channelSelected: Channel;
};


export default function ChannelListPanel(props: ChannelViewPaneProps) {

    


    return (
        <div>
            <h2>{props.channelSelected.channelName}</h2>
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