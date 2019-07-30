// FILE: utility.js


/* ================== "private" methods ================ */

// For displaying the correct feedback
function _getErrorMessageFrom(placeOfErrorMessage) {
    if (placeOfErrorMessage.id == "displayname-required")
        return "Please provide a display name."

    return "Please provide a channel name."
}


// returns true, if an error message is already displayed. This is to 
// block the app from "listing" error messages under each other.
function _isErrorMessageAlreadyThere(placeOfErrorMessage) {
    if (placeOfErrorMessage.querySelector(".error-message"))
        return true;

    return false;
}


// creates a new div with the error message and appends it to the right place
function _addErrorMessage(errorMessage, placeOfErrorMessage) {
    const errorMessageDiv = document.createElement("DIV");
    // custom-sized red fonts 
    errorMessageDiv.classList.add("error-message");
    errorMessageDiv.innerHTML = errorMessage;

    placeOfErrorMessage.appendChild(errorMessageDiv);
}

// if the user starts correcting an invalid input, hide the error message
function _removeErrorMessageWhenNeeded(textInput, placeOfErrorMessage) {
    textInput.onkeyup = () => {
        const errorMessage =
            placeOfErrorMessage.querySelector(".error-message");

        if (!errorMessage)
            return;

        placeOfErrorMessage.removeChild(errorMessage);
        // also get rid of the red border showing error
        textInput.classList.remove("border", "border-danger");
    };
}


/* =================== public methods ================== */


function validateInputs(inputValue, placeOfErrorMessage) {
    // checks for empty string in user input
    if (!inputValue.trim()) {
        const errorMessage = _getErrorMessageFrom(placeOfErrorMessage);
        showErrorMessage(placeOfErrorMessage, errorMessage);
        return false;
    }

    // checks for leading and trailing whitespaces in user input
    if (inputValue.charAt(0) == " " ||
        inputValue.charAt(inputValue.length - 1) == " ") {
        showErrorMessage(placeOfErrorMessage,
            "The name cannot start or end with whitespaces.");
        return false;
    }

    return true;
}

// displays an error message with the source of error
function showErrorMessage(placeOfErrorMessage, errorMessage) {
    const textInput =
        placeOfErrorMessage.querySelector(".input-to-validate");
    // adds red border around the input field
    textInput.classList.add("border", "border-danger");

    // without this, the error message will be repeated as many times as 
    // the user clicks
    if (_isErrorMessageAlreadyThere(placeOfErrorMessage))
        return;

    _addErrorMessage(errorMessage, placeOfErrorMessage);

    // event: hide error message when new input is being typed
    _removeErrorMessageWhenNeeded(textInput, placeOfErrorMessage);
}

// Hides the dialog provided by id name
function hideDialog(modalId, classToAdd, classToReplace) {
    const dialog = document.querySelector(modalId);
    dialog.classList.add(classToAdd);
    dialog.setAttribute("aria-hidden", "true");

    // in order to not disturb the layout of other elements on page
    // (classToReplace: selector used for the animation when modal comes in)
    setTimeout(() => {
        dialog.classList.replace(classToReplace, "d-none");
    }, 750);
}

// will open new channel view
function addOnClickEventListenerToChannelNameText(newChannelNode, name) {
    newChannelNode.onclick = () => {
        document.querySelector("#channel-name").innerHTML = name;
    }
}

