//// FILE: main.js


// will open new channel view
function addOnClickEventListenerToChannelNameText(newChannelNode, name) {
    newChannelNode.onclick = () => {
        document.querySelector("#channel-name").innerHTML = name;
    }
}
