// -------------------- IMPORTS --------------------

import React, { useState, useEffect } from 'react';
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


    const getWidth = () => window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    // save current window width in the state object
    const [width, setWidth] = useState(getWidth());

    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId: NodeJS.Timeout | undefined = undefined
        const resizeListener = () => {
            // prevent execution of previous setTimeout (if there was one)
            if (timeoutId)
                clearTimeout(timeoutId);
            // change width from the state after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function, remove resize listener
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    if (width >= 960     // drawer is permanent at this size
       || (props.drawerOpen && window.innerWidth >= 720))
        contentStyle.marginLeft = 320;

    return (
        <div id="channelViewPanel" style={contentStyle}>
            <h2 id="channel-name">{props.channelSelected.channelName}</h2>
            <p id="channel-creation-info">
                {`Created ${props.channelSelected.creationTime}` +
                    ` by ${props.channelSelected.creatorDisplayName}`}
            </p>
            <div id="messages">
                No messages yet in this channel.
            </div>
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