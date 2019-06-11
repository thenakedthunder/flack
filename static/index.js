// ---------------------------------- STARTUP --------------------------------

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

var displayNameInput = document.querySelector("#displayname-input");

// Load current value of displayName, if stored from previous session
function putDisplayNameInInputField() {
    var displayName = localStorage.getItem("displayName");
    if (displayName != null) {
        displayNameInput.value = displayName;
    }
}

function addOnclickEventListenersToButton() {
    // Save the chosen display name to local storage and hide dialog
    document.querySelector("#display-name-ok-btn").onclick = () => {
        saveDisplayName();
        hideDialog();
    }
}


function saveDisplayName() {
    // Overwrite the display name currently saved in local storage
    displayName = displayNameInput.value;
    localStorage.setItem("displayName", displayName);
}

function hideDialog() {
    // Hide the dialog
    let dialog = document.querySelector("#input-modal");
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
        addEventListenerToCreateChannelBtn();
    }
}

// Hides the channel creation modal and calls new channel creation function
function addEventListenerToCreateChannelBtn() {
    document.querySelector("#create-channel-btn").onclick = () => {
        newChannelModal.classList.replace("fade-in", "fade-out");
        createNewChannelRequest();
    };
}

function createNewChannelRequest() {

}
