/*
Copyright 2023 Ryan Luu

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Function to toggle extension state
function toggleExtensionState(tab) {
    chrome.action.getBadgeText({ tabId: tab.id }).then(prevState => {
        const nextState = prevState === chrome.i18n.getMessage("badge_text") ? '' : chrome.i18n.getMessage("badge_text");

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
    });
}

// Toggle extension state when the extension icon is clicked
chrome.action.onClicked.addListener(function (tab) {
    toggleExtensionState(tab);
});

// Create context menu item
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: chrome.i18n.getMessage("context_menu_title"),
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
