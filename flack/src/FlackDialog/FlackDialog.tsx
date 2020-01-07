// -------------------- IMPORTS --------------------

// react components
import React from 'react';

// Material UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import { Function } from '@babel/types';
//import { string } from 'prop-types';


// Prop types
type FlackDialogProps = {
    nameInputDefaultLabel: string;
    handleCloseCallback: (inputText: string) => {
        success: boolean;
        errorMessage?: string;
    };
    nameType: string;
    dialogId: string;
    classNameForAnimation: string;
    isOpen: boolean;
    contentText: string;
    inputId: string;
    submitButtonId: string;
    hasCancelBtn: boolean;
    cancelBtnOnClickCallBack?: () => void;
    nameInputText?: string;
};

//Common dialog component that can be used to compose a specialized dialog
export default function FlackDialog(props: FlackDialogProps) {

    // ---------------- STATE VARIABLES -----------------

    const [nameInputText, setNameInputText] = React.useState(
        props.nameInputText ? props.nameInputText : "");

    // if the text input is empty, users should not be able to submit
    const [isBtnDisabled, setIsBtnDisabled] =
        React.useState(nameInputText ? false : true);

    // for error handling (label changed to error message if needed)
    const [labelOfTextField, setLabelOfTextField] =
        React.useState(props.nameInputDefaultLabel);

    const [errorShown, setErrorShown] = React.useState(false);


    // --------------- HANDLER FUNCTIONS ----------------

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = event.target.value;
        setNameInputText(newInput);       // keep the text input updated
        validate(newInput);
    }

    const handleClose = () => {
        const result = props.handleCloseCallback(nameInputText);
        if (!result.success) {
            if (!result.errorMessage)
                throw Error("an error occured without an error message.")

            setLabelOfTextField(result.errorMessage);
            setErrorShown(true);
            setIsBtnDisabled(true);
        }
    }

    // ---------------- HELPER FUNCTIONS ----------------

    const validate = (newInput: string) => {
        const isInputInvalid = showErrorMessageIfNeeded(newInput);

        setErrorShown(isInputInvalid);
        setIsBtnDisabled(isInputInvalid);
    }


    const showErrorMessageIfNeeded = (input: string) => {
        if (input.charAt(0) === " " ||
            input.charAt(input.length - 1) === " ") {
            setLabelOfTextField(
                "The name cannot start or end with whitespaces.");
            return true;
        }

        if (!input) {
            setLabelOfTextField(
                `Please provide a ${props.nameType} name.`);
            return true;
        }

        setLabelOfTextField(props.nameInputDefaultLabel);
        return false;
    }

    const cancelBtnOnClickCallBack = () => {
        const callBack = props.cancelBtnOnClickCallBack;
        if (!callBack) {
            throw Error("No callback defined for cancel button.")
        }

        return callBack;
    }

    // -------------- RENDERING COMPONENT ---------------

    return (
        <Dialog
            id={props.dialogId}
            className={props.classNameForAnimation}
            open={props.isOpen}
            onClose={() => props.handleCloseCallback(nameInputText)}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Welcome to Flack!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.contentText}
                </DialogContentText>
                <TextField
                    autoFocus
                    onChange={handleChange}
                    value={nameInputText}
                    margin="dense"
                    id={props.inputId}
                    label={labelOfTextField}
                    type="text"
                    fullWidth
                    error={errorShown}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    id={props.submitButtonId}
                    className="submit-btn"
                    onClick={handleClose}
                    color="primary"
                    disabled={isBtnDisabled} >
                    Proceed with this name
                </Button>
                {props.hasCancelBtn &&
                    <Button
                        id="cancel-btn"
                        onClick={() => cancelBtnOnClickCallBack}>
                        Cancel
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}