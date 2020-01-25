// -------------------- IMPORTS --------------------

// react components
import React from 'react';
// styling
import './DisplayNameDialog.css';

import FlackDialog from '../FlackDialog/FlackDialog';



export default function DisplayNameDialog() {

    // ------------------- CONSTANTS --------------------

    const DISPLAY_NAME = "displayName";
    const DISPLAYNAME_INPUT_DEFAULT_LABEL = "Your Display Name";
    const DIALOG_INSTRUCTION_TEXT =
        "To get connected with others, you will first need to choose a display name that others can see and call you."


    // ---------------- STATE VARIABLES -----------------

    // this modal comes up right when the app is loaded
    const [open, setOpen] = React.useState(true);

    // --------------- HANDLER FUNCTIONS ----------------

    const handleClose = (displayName: string) => {
        localStorage.setItem(DISPLAY_NAME, displayName);
        hideDialogWithAnimation();

        setTimeout(() => {
            setOpen(false);
        }, 750);            // this gives time for the animation to end

        return { success: true }
    }


    // ---------------- HELPER FUNCTIONS ----------------

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector("#displayname-input-dialog");
        if (dialog == null) {
            throw Error("Unexpected error: dialog element not found")
        }

        dialog.classList.add("hide");
    }

    const getDisplayNameFromLocalStorage = () => {
        const displayName = localStorage.getItem(DISPLAY_NAME);

        return displayName ? displayName : ""
    }


    // -------------- RENDERING COMPONENT ---------------

    return (
        <FlackDialog
            dialogId="displayname-input-dialog"
            classNameForAnimation="bounce-fade"
            isOpen={open}
            nameInputText={getDisplayNameFromLocalStorage()}
            handleCloseCallback={handleClose}
            nameType="display"
            nameInputDefaultLabel={DISPLAYNAME_INPUT_DEFAULT_LABEL}
            contentText={DIALOG_INSTRUCTION_TEXT}
            inputId="displayname-input"
            submitButtonId="display-name-ok-btn"
            hasCancelBtn={false}
        />
    );
}
