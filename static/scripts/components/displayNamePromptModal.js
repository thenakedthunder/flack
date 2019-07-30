// FILE: displayNamePromptModal.js


var displayNamePromptModal = (function () {


    /* =============== module-scope variables ============== */

    // display name the user of the device used in previous session
    let displayName = localStorage.getItem("displayName");


    /* =================== public methods ================== */

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

            // validate input for empty string, leading and trailing whitespaces
            const placeOfErrorMessage =
                document.querySelector("#displayname-required");
            if (!validateInputs(displayNameChosen, placeOfErrorMessage))
                return;

            // Overwrite the display name currently saved in local storage
            localStorage.setItem("displayName", displayNameChosen);
            hideDialog("#input-modal", "hide", "bounce-fade");
        }
    }

    // main init method
    function init() {
        putDisplayNameInInputField();
        addOnclickEventListenersToButton();
    }


    /* =============== export public methods =============== */
    return {
        init: init,
    };

}());