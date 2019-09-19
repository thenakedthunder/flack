// -------------------- IMPORTS --------------------

// react components
import React from 'react';
import ReactDOM from 'react-dom';

// Material UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// styling
import './DisplayNameDialog.css';



export default function DisplayNameDialog() {

    // ------------------- CONSTANTS --------------------

    const DISPLAYNAME_INPUT_DEFAULT_LABEL = "Your Display Name";

    // ---------------- STATE VARIABLES -----------------

    // this modal comes up right when the app is loaded
    const [open, setOpen] = React.useState(true);
    // check if a display name is cached from the previous session and offer it
    // as a displayname for the user by autofilling it in the form
    const [displayName, setDisplayName] =
        React.useState(localStorage.getItem("displayName"));
    const [isBtnDisabled, setIsBtnDisabled] =       // for the submit button
        React.useState(displayName ? false : true)

    // for error handling (text changed to error message if needed)
    const [labelOfTextField, setLabelOfTextField] =
        React.useState(DISPLAYNAME_INPUT_DEFAULT_LABEL);
    const [errorShown, setErrorShown] = React.useState(false);



    // --------------- HANDLER FUNCTIONS ----------------

    const handleClose = event => {
        localStorage.setItem("displayName", displayName);
        hideDialogWithAnimation();

        setTimeout(() => {
            setOpen(false);
        }, 750);            // this gives time for the animation to end
    }

    const handleChange = event => {
        const newInput = event.target.value;

        setDisplayName(newInput);
        // displayName could not be used here, most likely because setting the 
        // state works asynchronously
        const inputValid = isInputValid(newInput)
        setErrorShown(!inputValid);

        setIsBtnDisabled(inputValid ? false : true);
    }


    // ---------------- HELPER FUNCTIONS ----------------

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector(".bounce-fade");
        dialog.classList.add("hide");
    }

    const isInputValid = input => {
        const errorMessageWasShown = showErrorMessageIfNeeded(input);            
        return errorMessageWasShown ? false : true;
    }

    const showErrorMessageIfNeeded = input => {
        if (input.charAt(0) === " " ||
            input.charAt(input.length - 1) === " ") {
            setLabelOfTextField(
                "The name cannot start or end with whitespaces.");
            return true;
        }

        if (!input.trim()) {
            setLabelOfTextField("Please provide a display name.");
            return true;
        }

        setLabelOfTextField(DISPLAYNAME_INPUT_DEFAULT_LABEL);
        return false;
    }


    // -------------- RENDERING COMPONENT ---------------

    return (
        <div>
            <Dialog open={open} onClose={handleClose} className="bounce-fade"
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Welcome to Flack!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To get connected with others, you will first need a display name 
                        that others can see to know who they are talking to.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        onChange={handleChange}
                        value={displayName}
                        margin="dense"
                        id="displayname-input"
                        label={labelOfTextField}
                        type="text"
                        fullWidth
                        error={errorShown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                            color="primary" 
                            disabled={isBtnDisabled} >
                        Proceed with this name
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}