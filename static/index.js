var displayName = localStorage.getItem("displayName");
// Connect to websocket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

// When connected, give event listeners
socket.on('connect', () => {
    addEventListenerToCreateChannelBtn();
});

// -------------------------------- CORE LOGIC -------------------------------


// Make sure page has loaded and is ready to go
if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    initPage();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        initPage();
    });
}

// When document is loaded, do this
function initPage() {
    putDisplayNameInInputField();
    addOnclickEventListeners();
}

function addOnclickEventListeners() {
    addOnclickEventListenersToButton();
    addOnClickEventListenerToNewChannelCreation();
}

// --------------- STARTING MODAL: prompt for displayname --------------------


// Load current value of displayName, if stored from previous session
function putDisplayNameInInputField() {
    displayNameInput = document.querySelector("#displayname-input");

    if (displayName != null) {
        displayNameInput.value = displayName;
    }
}

function addOnclickEventListenersToButton() {
    // Save the chosen display name to local storage and hide dialog
    document.querySelector("#display-name-ok-btn").onclick = () => {
        const displayNameChosen = displayNameInput.value;
        const placeOfErrorMessage = document.querySelector("#displayname-required");
        if (!isInputValid(displayNameChosen, placeOfErrorMessage))
            return;

        // Overwrite the display name currently saved in local storage
        localStorage.setItem("displayName", displayNameChosen);
        hideDialog();
    }
}

function hideDialog() {
    // Hide the dialog
    const dialog = document.querySelector("#input-modal");
    dialog.classList.add("hide");
    dialog.setAttribute("aria-hidden", "true");

    setTimeout(() => { dialog.classList.replace("bounce-fade", "d-none");}, 500);
}

// -------------------------- NEW CHANNEL MODAL ------------------------------

// Displays the channel creation modal
function addOnClickEventListenerToNewChannelCreation() {
    document.querySelector("#add-new-channel-surface").onclick = () => {
        newChannelModal = document.querySelector("#new-channel-modal");

        newChannelModal.classList.add("fade-in");
        newChannelModal.setAttribute("aria-hidden", "false");

        // Clear text input if it was filled in before
        newChannelModal.querySelector("#new-channel-input").value = "";
    }
}

// Hides the channel creation modal and calls new channel creation function
function addEventListenerToCreateChannelBtn() {
    document.querySelector("#create-channel-btn").onclick = () => {
        const newChannelName = document.querySelector("#new-channel-input").value;
        const placeOfErrorMessage = document.querySelector("#channelname-required");
        if (!isInputValid(newChannelName, placeOfErrorMessage))
            return;

        socket.emit('channel creation', { 'newChannelName': newChannelName });
    }
}

socket.on('channel name taken', () => {
    const placeOfErrorMessage = document.querySelector("#channelname-required");
    const errorMessage = "Sorry, this channelname is already in use. Please choose another one."
    showErrorMessage(placeOfErrorMessage, errorMessage)
});

socket.on('new channel created', data => {
    newChannelModal.classList.replace("fade-in", "fade-out");
    newChannelModal.setAttribute("aria-hidden", "true");
    setTimeout(() => { newChannelModal.classList.remove("fade-out"); }, 750);

    var newChannelNode = document.createElement("DIV");
    var newChannelNamePar = document.createElement("P");
    newChannelNamePar.innerHTML = `${ data.channelName }`;

    newChannelNode.appendChild(newChannelNamePar);
    document.querySelector("#channels").appendChild(newChannelNode);
});







function isInputValid(inputValue, placeOfErrorMessage) {
    if (!inputValue.trim()) {
        const errorMessage = getErrorMessageFrom(placeOfErrorMessage);
        showErrorMessage(placeOfErrorMessage, errorMessage);
        return false;
    }

    if (inputValue.charAt(0) == " " || inputValue.charAt(inputValue.length - 1) == " ") {
        console.log(inputValue.charAt(0));
        showErrorMessage(placeOfErrorMessage, "The name cannot start or end with whitespaces.");
        return false;
    }
    
    return true;
}

function getErrorMessageFrom(placeOfErrorMessage) {
    if (placeOfErrorMessage.id == "displayname-required")
        return "Please provide a display name."

    return  "Please provide a channel name."
}

function showErrorMessage(placeOfErrorMessage, errorMessage) {
    const textInput = placeOfErrorMessage.querySelector(".input-to-validate");
    textInput.classList.add("border", "border-danger");

    // without this, the error message will be repeated as many times as the
    // user clicks
    if (isErrorMessageAlreadyThere(placeOfErrorMessage))
        return;

    const errorMessageDiv = document.createElement("DIV");
    errorMessageDiv.classList.add("error-message");
    errorMessageDiv.innerHTML = errorMessage;
    placeOfErrorMessage.appendChild(errorMessageDiv);

    removeErrorMessageWhenNeeded(textInput, placeOfErrorMessage);
}

function isErrorMessageAlreadyThere(placeOfErrorMessage) {
    if (placeOfErrorMessage.querySelector(".error-message"))
        return true;

    return false;
}

function removeErrorMessageWhenNeeded(textInput, placeOfErrorMessage) {
    textInput.onkeyup = () => {
        const errorMessage = placeOfErrorMessage.querySelector(".error-message");
        // This event listener will not be removed with the error message
        if (!errorMessage)
            return;

        placeOfErrorMessage.removeChild(errorMessage);
        textInput.classList.remove("border", "border-danger");
    };
}