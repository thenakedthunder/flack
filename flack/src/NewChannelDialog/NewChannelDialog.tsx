// -------------------- IMPORTS --------------------

// react components
import React from 'react';

// styling
import './NewChannelDialog.css';

import FlackDialog from '../FlackDialog/FlackDialog';

export default function NewChannelDialog(props: {
    closeDialogCallback: () => void;
}) {

    // ------------------- CONSTANTS --------------------

    const CHANNEL_NAME_INPUT_DEFAULT_LABEL = "Channel Name";
    const DIALOG_INSTRUCTION_TEXT =
        "Please provide a name for the new channel."
    const CHANNEL_NAME_TAKEN_ERROR_LABEL =
        "Sorry, this name is already used. Please choose another one.";


    // --------------- HANDLER FUNCTIONS ----------------

    const handleSubmitClick = (newChannelName: string) => {
        if (!newChannelName)
            throw Error("Unexpected error: empty string provided as channel" +
                "name");

        const result = handleChannelCreation(newChannelName);
        if (result !== 'SUCCESS')
            return getChannelCreationErrorObjectFrom(result);

        hideDialogWithAnimation();
        // gives time for the animation to end
        setTimeout(() => closeDialog(), 750); 

        return { success: true }
    }

    const handleChannelCreation = (newChannelName: string) => {
        const channelDataStringified = JSON.stringify({
            'newChannelName': newChannelName,
            'display_name_of_creator': localStorage.getItem('displayName')
        })

        const request = getChannelCreationRequest()
        return getResponseFromChannelCreationRequest(
            channelDataStringified, request)
    };

    // ---------------- HELPER FUNCTIONS ----------------

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector("#channelname-input-dialog");
        if (dialog == null) {
            throw Error("Unexpected error: dialog element not found")
        }

        dialog.classList.add("fade-out");
    }

    const closeDialog = () => props.closeDialogCallback();

    const getChannelCreationErrorObjectFrom = (result: string) => {
        if (result === 'CHANNEL_NAME_TAKEN') {
            return {
                success: false,
                errorMessage: CHANNEL_NAME_TAKEN_ERROR_LABEL
            };
        }

        return {
            success: false,
            errorMessage: result
        }
    }

    const getChannelCreationRequest = () => {
        const url = 'http://localhost:5000/channel_creation'
        const request = new XMLHttpRequest()
        // for the right functioning, this request requires to be synchronous
        request.open('POST', url, false)
        request.setRequestHeader("Content-Type", "application/json");

        return request;
    }

    const getResponseFromChannelCreationRequest =
        (channelData: string, request: XMLHttpRequest): string => {
            request.send(channelData)
            if (request.status !== 200) {
                return "Unexpected error :("
            }

            return request.responseText
    }


    // -------------- RENDERING COMPONENT ---------------

    return (
        <FlackDialog
            nameInputDefaultLabel={CHANNEL_NAME_INPUT_DEFAULT_LABEL}
            dialogId="channelname-input-dialog"
            inputId="channelname-input"
            submitButtonId="channel-name-ok-btn"
            classNameForAnimation="fade-in"
            isOpen={true}
            handleCloseCallback={handleSubmitClick}
            nameType="channel"
            contentText={DIALOG_INSTRUCTION_TEXT}
            hasCancelBtn={true}
            cancelBtnOnClickCallBack={closeDialog}
        />
    );
}