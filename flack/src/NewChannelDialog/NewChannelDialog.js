// -------------------- IMPORTS --------------------

// react components
import React from 'react';

// styling
import './NewChannelDialog.css';

import FlackDialog from '../FlackDialog/FlackDialog.js';


export default function NewChannelDialog(props) {

    // ------------------- CONSTANTS --------------------

    const CHANNEL_NAME_INPUT_DEFAULT_LABEL = "Channel Name";
    const DIALOG_INSTRUCTION_TEXT = `Please provide a name for the new channel.`


    // --------------- HANDLER FUNCTIONS ----------------

    const handleClose = newChannelName => {
        if (!newChannelName)
            throw Error("Unexpected error: empty string provided as " +
                "channel name");

        hideDialogWithAnimation();

        setTimeout(() => {
            closeDialog();
        }, 750);            // gives time for the animation to end
    }


    // ---------------- HELPER FUNCTIONS ----------------

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector("#channelname-input-dialog");
        dialog.classList.add("fade-out");
    }

    const closeDialog = () => {
        props.closeDialogCallback();
    }

    // -------------- RENDERING COMPONENT ---------------

    return (
        <FlackDialog
            dialogId="channelname-input-dialog"
            inputId="channelname-input"
            submitButtonId="channel-name-ok-btn"
            classNameForAnimation="fade-in"
            isOpen={true}
            nameInputText=""
            handleCloseCallback={handleClose}
            nameType="channel"
            nameInputDefaultLabel={CHANNEL_NAME_INPUT_DEFAULT_LABEL}
            contentText={DIALOG_INSTRUCTION_TEXT}
            hasCancelBtn={true}
            cancelBtnOnClickCallBack={closeDialog}
        />
    );
}