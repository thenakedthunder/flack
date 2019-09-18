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

    // ---------------- STATE VARIABLES -----------------

    // this modal comes up right when the app is loaded
    const [open, setOpen] = React.useState(true);
    // check if a display name is cached from the previous session and offer it
    // as a displayname for the user by autofilling it in the form
    const [displayName, setDisplayName] =
        React.useState(localStorage.getItem("displayName"));
    const [isBtnDisabled, setIsBtnDisabled] =       // for the submit button
        React.useState(displayName ? false : true)


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

        validate(newInput);

        setDisplayName(newInput);

        // displayName could not be used here, most likely because setting the 
        // state works asynchronously
        setIsBtnDisabled(newInput ? false : true);
    }

    // ---------------- HELPER FUNCTIONS ----------------

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector(".bounce-fade");
        dialog.classList.add("hide");
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
                        id="display-name"
                        label="Display Name"
                        type="text"
                        fullWidth
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