// Function to toggle extension state
function toggleExtensionState(tab) {
    chrome.action.getBadgeText({ tabId: tab.id }).then(prevState => {
        const nextState = prevState === 'ON' ? '' : 'ON';

        // Set badge text and color
        chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });
        chrome.action.setBadgeBackgroundColor({
            tabId: tab.id,
            color: '#000000',
        });

        // Execute content script
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });

        // Set icon
        if (nextState === "ON") {
            chrome.action.setIcon({
                tabId: tab.id,
                path: {
                    "16": "icons/LightEditFilled16.png",
                    "32": "icons/LightEditFilled32.png",
                    "48": "icons/LightEditFilled48.png",
                    "128": "icons/LightEditFilled128.png"
                }
            });
        } else if (nextState === "") {
            chrome.action.setIcon({
                tabId: tab.id,
                path: {
                    "16": "icons/LightEditRegular16.png",
                    "32": "icons/LightEditRegular32.png",
                    "48": "icons/LightEditRegular48.png",
                    "128": "icons/LightEditRegular128.png"
                }
            });
        }
    });
}

// Toggle extension state when the extension icon is clicked
chrome.action.onClicked.addListener(function (tab) {
    toggleExtensionState(tab);
});

// Create context menu item
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Edit web page",
        contexts: ['all'],
        id: 'edit-web-page'
    });
});

// Toggle extension state when the context menu item is clicked
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "edit-web-page") {
        toggleExtensionState(tab);
    }
});
