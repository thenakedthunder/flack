import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './DisplayNameDialog.css';



export default function DisplayNameDialog() {
    // this modal comes up right when the app is loaded
    const [open, setOpen] = React.useState(true);

    function handleClose(event) {
        hideDialogWithAnimation();

        setTimeout(() => {
            setOpen(false);
        }, 750);
    }

    const hideDialogWithAnimation = () => {
        const dialog = document.querySelector(".bounce-fade");
        dialog.classList.add("hide");
    }

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
                        margin="dense"
                        id="display-name"
                        label="Display Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Proceed with this name
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}