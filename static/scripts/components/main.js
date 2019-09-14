//// FILE: main.js

/* =============== module-scope variables ============== */
var channelName = "";

/* ================ websocket functions ================ */

// When connected, add event listeners
socket.on('connect', () => {
    _addNewMessageToChannel();
});

/* =================== public methods ================== */


// will open new channel view
function addOnClickEventListenerToChannelNameText(newChannelNode, name) {
    newChannelNode.onclick = () => {
        //displays a title with the name of channel
        document.querySelector("#channel-name").innerHTML = name;
        //store current channel name in memory
        channelName = name;
    }
}

// 
function _addNewMessageToChannel() {
    document.querySelector("#send-message-btn").onclick = () => {
        const messageText = document.querySelector("#message-input").value;

        //submit new message and push data to server
        socket.emit('message submitted', {
            'messageText': messageText,
            'display_name_of_sender': localStorage.getItem("displayName"),
            'channelName': channelName
        });
    }
}