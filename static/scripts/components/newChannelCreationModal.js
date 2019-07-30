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
        const placeOfErrorMessage =
            document.querySelector("#channelname-required");
        const errorMessage =
            "Sorry, this channelname is already in use. Please choose another one."
        showErrorMessage(placeOfErrorMessage, errorMessage)
    });

    socket.on('new channel created', data => {
        hideDialog("#new-channel-modal", "fade-out", "fade-in")
        _addNewChannelToChannelList(data);
    });


    /* =================== private methods ================= */

    // Hides the channel creation modal and calls new channel creation function
    function _addEventListenerToCreateChannelBtn() {
        document.querySelector("#create-channel-btn").onclick = () => {
            const newChannelName =
                document.querySelector("#new-channel-input").value;

            // this is to check if the channel name is valid
            const placeOfErrorMessage =
                document.querySelector("#channelname-required");
            if (!validateInputs(newChannelName, placeOfErrorMessage))
                return;

            socket.emit('channel creation',
                { 'newChannelName': newChannelName });
        }
    }

    // Appends new channel to the list and displays is
    function _addNewChannelToChannelList(data) {
        var newChannelNamePar = document.createElement("P");
        newChannelNamePar.innerHTML = `${data.channelName}`;
        var newChannelNode = document.createElement("DIV");
        newChannelNode.appendChild(newChannelNamePar);

        channels = document.querySelector("#channels")
        // id needed for opening the channel later
        newChannelNode.id = "channels-" + channels.childElementCount;
        newChannelNode.classList.add("pointer-on-hover")
        addOnClickEventListenerToChannelNameText(newChannelNode,
            data.channelName);
        channels.appendChild(newChannelNode);
    }


    /* =================== public methods ================== */

    // Displays the channel creation modal
    function addOnClickEventListenerToNewChannelCreation() {
        document.querySelector("#add-new-channel-surface").onclick = () => {
            newChannelModal = document.querySelector("#new-channel-modal");

            // if it's not the first time this is clicked
            newChannelModal.classList.remove("d-none", "fade-out")
            newChannelModal.classList.add("fade-in");   //adding animation
            newChannelModal.setAttribute("aria-hidden", "false");

            // Clear text input if it was filled in before
            newChannelModal.querySelector("#new-channel-input").value = "";
        }
    }

    // main init method
    function init() {
        addOnClickEventListenerToNewChannelCreation();
    }

    /* =============== export public methods =============== */
    return {
        init: init,
    };

}());

