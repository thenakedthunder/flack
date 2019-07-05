// FILE: index.js


// -------------------------------- CORE LOGIC -------------------------------

// Make sure page has loaded and is ready to go
if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    initPage();
}
else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        initPage();
    });
}

// When document is loaded, do this
function initPage() {
    displayNamePromptModal.init();
    newChannelCreationModal.init();
}
