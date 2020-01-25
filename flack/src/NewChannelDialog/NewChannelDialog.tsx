// -------------------- IMPORTS --------------------

// react components
import React from 'react';
// styling
import './NewChannelDialog.css';

import FlackDialog from '../FlackDialog/FlackDialog';




// Prop types
type NewChannelDialogProps = {
    closeDialogCallback: () => void;
};


export default function NewChannelDialog(props: NewChannelDialogProps) {

    // ------------------- CONSTANTS --------------------

    const CHANNEL_NAME_INPUT_DEFAULT_LABEL = "Channel Name";
    const DIALOG_INSTRUCTION_TEXT =
        "Please provide a name for the new channel."
    const CHANNEL_NAME_TAKEN_ERROR_LABEL =
        "Sorry, this name is already used. Please choose another one.";


    // --------------- HANDLER FUNCTIONS ----------------

    const handleSubmitClick = (newChannelName: string) => {
        const result = getResponseFromChannelCreationRequest(
            getChannelDataJSON(newChannelName), getChannelCreationRequest());
        if (result !== 'SUCCESS')
            return getChannelCreationErrorObjectFrom(result);

        hideDialogWithAnimation();
        removeDialogFromDOMAfterAnimationFinished();

        return { success: true }
    }


    // ---------------- HELPER FUNCTIONS ----------------

    const getResponseFromChannelCreationRequest =
        (channelDataJSON: string, request: XMLHttpRequest): string => {

            request.send(channelDataJSON)
            if (request.status !== 200) {
                return "Unexpected error :("
            }

            return request.responseText
        }

    const getChannelDataJSON = (newChannelName: string) => {
        return JSON.stringify({
            'newChannelName': newChannelName,
            'display_name_of_creator': localStorage.getItem('displayName')
        });
    }

    const getChannelCreationRequest = () => {
        const url = 'http://localhost:5000/channel_creation'
        const request = new XMLHttpRequest()
        // for the right functioning, this request requires to be synchronous
        request.open('POST', url, false)
        request.setRequestHeader("Content-Type", "application/json");

        return request;
    }

    const getChannelCreationErrorObjectFrom = (result: string) => {
        switch (result) {
            case 'CHANNEL_NAME_TAKEN':
                return {
                    success: false,
                    errorMessage: CHANNEL_NAME_TAKEN_ERROR_LABEL
                };

            default:
                return {
                    success: false,
                    errorMessage: result
                }
        }
    }

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector("#channelname-input-dialog");
        if (dialog == null) {
            throw Error("Unexpected error: dialog element not found")
        }

        dialog.classList.add("fade-out");
    }

    const removeDialogFromDOMAfterAnimationFinished = () => {
        setTimeout(() => closeDialog(), 750);
    }

    const closeDialog = () => props.closeDialogCallback();


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
            cancelBtnOnClickCallBack={() => props.closeDialogCallback()}
        />
    );
}