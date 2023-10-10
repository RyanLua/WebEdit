document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: toggleEditing,
            });
        });
    });

    function toggleEditing() {
        if (document.body.contentEditable === 'true') {
            document.body.contentEditable = 'false';
        } else {
            document.body.contentEditable = 'true';
        }
    }
});
