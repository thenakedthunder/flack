// -------------------- IMPORTS --------------------

// react components
import React from 'react';

// styling
import './NewChannelDialog.css';

import FlackDialog from '../FlackDialog/FlackDialog.js';

export default function NewChannelDialog(props) {

    // ------------------- CONSTANTS --------------------

    const CHANNEL_NAME_INPUT_DEFAULT_LABEL = "Channel Name";
    const DIALOG_INSTRUCTION_TEXT =
        "Please provide a name for the new channel."
    const CHANNEL_NAME_TAKEN_ERROR_LABEL =
        "Sorry, this name is already used. Please choose another one.";


    // --------------- HANDLER FUNCTIONS ----------------

    const handleClose = newChannelName => {
        if (!newChannelName)
            throw Error("Unexpected error: empty string provided as " +
                "channel name");

        const result = handleChannelCreation(newChannelName);
        if (result != 'SUCCESS')
            return getChannelCreationErrorObjectFrom(result);

        hideDialogWithAnimation();
        // gives time for the animation to end
        setTimeout(() => closeDialog(), 750); 

        return { success: true }
    }

    const handleChannelCreation = newChannelName => {
        let request = setupChannelCreationRequest();
        request.send(JSON.stringify({
            'newChannelName': newChannelName,
            'display_name_of_creator': localStorage.getItem('displayName')
        }))

        if (request.status != 200) {
            return "Unexpected error :("
        }

        return request.responseText;
    };

    // ---------------- HELPER FUNCTIONS ----------------

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector("#channelname-input-dialog");
        dialog.classList.add("fade-out");
    }

    const closeDialog = () => props.closeDialogCallback();

    const getChannelCreationErrorObjectFrom = result => {
        if (result === 'FAILED') {
            return {
                channelCreationSucceeded: false,
                errorMessage: CHANNEL_NAME_TAKEN_ERROR_LABEL
            };
        }

        return {
            channelCreationSucceeded: false,
            errorMessage: result
        }
    }

    const setupChannelCreationRequest = () => {
        let request = new XMLHttpRequest()
        // for the right functioning, this request requires to be synchronous
        request.open('POST', 'http://localhost:5000/channel_creation', false);
        request.setRequestHeader("Content-Type", "application/json");

        return request;
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
            contentText={DIALOG_INSTRUCTION_TEXT}
            hasCancelBtn={true}
            cancelBtnOnClickCallBack={closeDialog}
        />
    );
}