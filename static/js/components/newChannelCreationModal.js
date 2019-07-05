// FILE: newChannelCreationModal.js


var newChannelCreationModal = (function () {


    /* =============== module-scope variables ============== */
    // Connection to websocket
    var socket = io.connect(
        location.protocol + '//' + document.domain + ':' + location.port);


    /* ================ websocket functions ================ */

    // When connected, add event listeners
    socket.on('connect', () => {
        _addEventListenerToCreateChannelBtn();
    });

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
        newChannelNamePar.innerHTML = `${data.channelName}`;

        newChannelNode.appendChild(newChannelNamePar);
        document.querySelector("#channels").appendChild(newChannelNode);
    });


    /* =================== private methods ================= */

    // Hides the channel creation modal and calls new channel creation function
    function _addEventListenerToCreateChannelBtn() {
        document.querySelector("#create-channel-btn").onclick = () => {
            const newChannelName =
                document.querySelector("#new-channel-input").value;
            const placeOfErrorMessage =
                document.querySelector("#channelname-required");
            if (!isInputValid(newChannelName, placeOfErrorMessage))
                return;

            socket.emit('channel creation',
                { 'newChannelName': newChannelName });
        }
    }

    /* =================== public methods ================== */

    function addOnclickEventListeners() {
        addOnClickEventListenerToNewChannelCreation();
    }

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

    // main init method
    function init() {
        addOnclickEventListeners();
        addOnClickEventListenerToNewChannelCreation();
    }

    /* =============== export public methods =============== */
    return {
        init: init,
    };

}());